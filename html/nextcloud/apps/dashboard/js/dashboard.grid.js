/**
 * Nextcloud - Dashboard app
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Maxence Lange <maxence@artificial-owl.com>
 * @copyright 2018, Maxence Lange <maxence@artificial-owl.com>
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */


var grid = {

	init: function () {
		var options = {
			auto: true,
			float: true
		};

		nav.elements.divGridStack.gridstack(options);
		nav.elements.gridStack = nav.elements.divGridStack.data('gridstack');
		nav.elements.gridStack.setStatic(true);

		nav.elements.divGridStack.on('dragstop resizestop', function () {
			nav.elements.gridStack.setStatic(true);
			grid.saveGrid();
		});

		nav.elements.divGridStack.on('resizestop', function (event) {
			var widget = settings.getWidget($(event.target).attr('data-widget-id'));
			if (widget === null || widget.setup.resize === undefined) {
				return;
			}

			setTimeout(function () {
				nav.executeFunction(widget.setup.resize, window, grid.getInfoFromDiv($(event.target)));
			}, 200);
		});

	},


	fillGrid: function () {
		nav.elements.gridStack.setStatic(false);

		nav.elements.gridStack.removeAll();
		for (var i = 0; i < curr.widgets.length; i++) {
			var item = curr.widgets[i];
			if (item.config.enabled === false) {
				continue;
			}

			grid.addWidget(item, false);
		}

		nav.elements.gridStack.setStatic(true);
	},


	addWidget: function (item, auto) {

		settings.updateWidgetEnabledStatus(item.widget.id, true);

		if (auto === undefined) {
			auto = true;
		}

		var widgetDiv = $('<div>', {
			class: 'grid-stack-item-content',
			'data-widget-id': item.widget.id
		});

		var widget = $('<div>', {
			'data-widget-id': item.widget.id
		}).append(widgetDiv);

		widgetDiv.append(this.generateWidgetHeader(item, widget));
		var widgetContent = $('<div>', {class: 'widget-content'});
		widgetDiv.append(widgetContent);

		var widgetContentFront = $('<div>', {class: 'front'}).html(item.html);
		widgetContent.append(widgetContentFront);

		if (item.setup.settings !== undefined) {
			var widgetContentBack = $('<div>', {class: 'back'}).html(
				settings.generateSettingsPanel(item));
			widgetContent.append(widgetContentBack);
			widgetContent.flip({
				trigger: 'manual',
				axis: 'y'
			});
		}

		var position = grid.initPosition(item);

		nav.elements.gridStack.addWidget(widget,
			position.x, position.y, position.width, position.height, auto,
			position.minWidth, position.maxWidth, position.minHeight, position.maxHeight);

		widget.on('mouseover', function () {
			curr.mouseOverWidget = item.widget.id;
			widget.find('.ui-resizable-handle').stop().fadeIn(150);
			widget.find('.widget-right-icon').stop().fadeTo(150, 0.65);
		}).on('mouseout', function () {
			curr.mouseOverWidget = '';
			widget.find('.ui-resizable-handle').stop().fadeOut(150);
			settings.removeAllWidgetRightIcon();
		});

		widget.find('.ui-resizable-handle').on('mousedown', function () {
			nav.elements.gridStack.setStatic(false);
		});
		widget.find('.ui-resizable-handle').on('click', function () {
			nav.elements.gridStack.setStatic(true);
		});

		if (auto) {
			grid.saveGrid();
		}

		nav.elements.gridStack.setStatic(true);
		settings.firstInstall();

		if (item.template.function !== '') {
			nav.executeFunction(item.template.function, window, position);
		}

		if (item.setup.jobs !== undefined) {
			curr.jobs[item.widget.id] = [];
			for (var i = 0; i < item.setup.jobs.length; i++) {
				var job = item.setup.jobs[i];
				curr.jobs[item.widget.id].push(setInterval(function () {
					nav.executeFunction(job.function, window);
				}, job.delay * 1000, job.delay * 1000));
			}
		}
	},


	removeWidget: function (widgetId) {
		net.deleteWidget(widgetId);

		var widget = grid.getWidgetFromId(widgetId);
		if (widget === null) {
			return;
		}

		nav.elements.gridStack.removeWidget(widget);
		settings.updateWidgetEnabledStatus(widgetId, false);
		settings.firstInstall();


		if (curr.jobs[widgetId] === undefined || (typeof curr.jobs[widgetId] === undefined)) {
			return;
		}

		for (var i = 0; i < curr.jobs[widgetId].length; i++) {
			clearInterval(curr.jobs[widgetId][i]);
		}

		curr.jobs[widgetId] = [];
	},


	configureWidget: function (widgetId) {
		var widget = grid.getWidgetFromId(widgetId);
		if (widget === null) {
			return;
		}

		widget.find('.widget-content').flip('toggle');
	},

	generateWidgetHeader: function (item, parent) {

		var headerRightMenu = $('<div>', {class: 'popovermenu'}).append($('<ul>'));
		var headerRightIcon = $('<div>', {class: 'widget-right-icon icon-more'});
		headerRightIcon.fadeOut(0).on('click', function (event) {
			event.stopPropagation();
			settings.displayWidgetMenu(headerRightMenu, item);
			parent.children('DIV.ui-resizable-handle').addClass('ui-resizable-handle-hidden');
		}).on('mousedown mouseup', function (event) {
			event.stopPropagation();
		});

		var widgetHeader = $('<div>', {class: 'widget-header'});
		if (item.template.icon !== undefined) {
			var widgetIcon = $('<div>', {class: item.template.icon + ' widget-header-icon'});
			widgetHeader.append(widgetIcon);
		}
		widgetHeader.append($('<h2>', {class: 'widget-header-name'}).text(item.widget.name));

		widgetHeader.on('mousedown', function () {
			nav.elements.gridStack.setStatic(false);
		});
		widgetHeader.on('click', function () {
			nav.elements.gridStack.setStatic(true);
		});

		widgetHeader.append(headerRightIcon);
		widgetHeader.append(headerRightMenu);

		return widgetHeader;
	},


	initPosition: function (item) {
		var position = {};
		if (item.setup.size !== undefined) {
			position = this.defaultPosition(item.setup.size);
		}

		if (item.config.position.x !== undefined) {
			position.x = item.config.position.x;
		}

		if (item.config.position.y !== undefined) {
			position.y = item.config.position.y;
		}

		if (item.config.position.width !== undefined) {
			position.width = item.config.position.width;
		}

		if (item.config.position.height !== undefined) {
			position.height = item.config.position.height;
		}

		position = grid.fixPosition(position);

		return position;
	},


	defaultPosition: function (size) {
		var position = {};
		if (size.default !== undefined) {
			position.width = size.default.width;
			position.height = size.default.height + 1;
		}

		if (size.min !== undefined) {
			if (size.min.width !== undefined) {
				position.minWidth = size.min.width;
			}
			if (size.min.height !== undefined) {
				position.minHeight = size.min.height + 1;
			}
		}

		if (size.max !== undefined) {
			if (size.max.width !== undefined) {
				position.maxWidth = size.max.width;
			}
			if (size.max.height !== undefined) {
				position.maxHeight = size.max.height + 1;
			}
		}

		return position;
	},


	fixPosition: function (position) {
		if (position === undefined) {
			position = {};
		}

		if (position.width === undefined) {
			position.width = 4;
		}

		if (position.height === undefined) {
			position.height = 3;
		}

		if (position.minHeight === undefined) {
			position.minHeight = 2;
		}

		if (position.minWidth === undefined) {
			position.minWidth = 2;
		}

		return position;
	},


	getWidgetFromId: function (widgetId) {
		var widget = null;
		nav.elements.divGridStack.children().each(function () {
			if ($(this).attr('data-widget-id') === widgetId) {
				widget = $(this);
			}
		});

		return widget;
	},


	saveGrid: function () {

		setTimeout(function () {
			var currGrid = [];
			nav.elements.divGridStack.children('.grid-stack-item').each(function () {
				var info = grid.getInfoFromDiv($(this));
				info.widgetId = $(this).attr('data-widget-id');
				currGrid.push(info);
			});

			net.saveGrid(currGrid);
		}, 100);
	},


	getInfoFromDiv: function (div) {
		return {
			x: div.attr('data-gs-x'),
			y: div.attr('data-gs-y'),
			width: div.attr('data-gs-width'),
			height: div.attr('data-gs-height')
		};
	}


	// hideSettings: function () {
	// 	nav.elements.gridStack.setStatic(true);
	// 	nav.elements.divGridStack.find('.widget-right-icons').each(function () {
	// 		$(this).stop().fadeOut(150);
	// 	});
	//
	// 	nav.elements.divGridStack.find('.widget-content').each(function () {
	// 		if ($(this).data('flip-model')) {
	// 			$(this).flip(false);
	// 		}
	// 	});
	// },
	//
	// showSettings: function () {
	// 	nav.elements.gridStack.setStatic(false);
	// 	nav.elements.divGridStack.find('.widget-right-icons').each(function () {
	// 		$(this).stop().fadeIn(150);
	// 	});
	// }
};
