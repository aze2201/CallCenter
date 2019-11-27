(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['navigation'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "				<button class=\"circle-toolbar\" style=\"background-color: "
    + container.escapeExpression(((helper = (helper = helpers.color || (depth0 != null ? depth0.color : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"color","hash":{},"data":data}) : helper)))
    + " \"></button>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function";

  return "			<li class=\"note with-menu "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.active : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\"  data-id=\""
    + container.escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n				<a href=\"#\">"
    + ((stack1 = ((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</a>\n			</li>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "active";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div id=\"new-note-fixed\">\n	<div>\n		<button type=\"button\" id=\"new-note\" class=\"icon-add\">"
    + alias4(((helper = (helper = helpers.newNoteTxt || (depth0 != null ? depth0.newNoteTxt : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"newNoteTxt","hash":{},"data":data}) : helper)))
    + "</button>\n	</div>\n</div>\n<li id=\"all-notes\">\n	<a href=\"#\" class=\"icon-home svg\">\n		"
    + alias4(((helper = (helper = helpers.allNotesTxt || (depth0 != null ? depth0.allNotesTxt : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"allNotesTxt","hash":{},"data":data}) : helper)))
    + "\n	</a>\n</li>\n<li id=\"colors-folder\" class=\"collapsible open\">\n	<button class=\"collapse\"></button>\n	<a href=\"#\" class=\"icon-search svg\">"
    + alias4(((helper = (helper = helpers.colorsTxt || (depth0 != null ? depth0.colorsTxt : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"colorsTxt","hash":{},"data":data}) : helper)))
    + "</a>\n	<ul>\n		<li style=\"display: flex; justify-content: center;\">\n			<button class=\"circle-toolbar icon-checkmark any-color\"></button>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.colors : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		</li>\n	</ul>\n</li>\n<li id=\"notes-folder\" class=\"collapsible open\">\n	<button class=\"collapse\"></button>\n	<a href=\"#\" class=\"icon-folder svg\">"
    + alias4(((helper = (helper = helpers.notesTxt || (depth0 != null ? depth0.notesTxt : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"notesTxt","hash":{},"data":data}) : helper)))
    + "</a>\n	<ul>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.notes : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	</ul>\n</li>\n";
},"useData":true});
templates['note-item'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "note-active";
},"3":function(container,depth0,helpers,partials,data) {
    return "shared";
},"5":function(container,depth0,helpers,partials,data) {
    return "shareowner";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function";

  return "		<div>\n			<div class='icon-share shared-title' title=\"Shared by "
    + container.escapeExpression(((helper = (helper = helpers.userid || (depth0 != null ? depth0.userid : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"userid","hash":{},"data":data}) : helper)))
    + "\"></div>\n			<div class='note-title'>\n				"
    + ((stack1 = ((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n			</div>\n		</div>\n		<div id='content' class='note-content'>\n			"
    + ((stack1 = ((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n		</div>\n";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function";

  return "		<div>\n			<div class=\"icon-delete hide-delete-icon icon-delete-note\" title=\"Delete\"></div>\n			<!--\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.sharedwith : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "			-->\n			<div class='note-title'>\n				"
    + ((stack1 = ((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n			</div>\n		</div>\n		<div class='note-content'>\n			"
    + ((stack1 = ((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n		</div>\n";
},"10":function(container,depth0,helpers,partials,data) {
    var helper;

  return "			<div class='icon-share shared-title-owner' title=\"Shared with "
    + container.escapeExpression(((helper = (helper = helpers.sharedwith || (depth0 != null ? depth0.sharedwith : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"sharedwith","hash":{},"data":data}) : helper)))
    + "\"></div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"note-grid-item\">\n	<div class=\"quicknote noselect "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.active : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isshared : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.sharedwith : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" style=\"background-color: "
    + alias4(((helper = (helper = helpers.color || (depth0 != null ? depth0.color : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"color","hash":{},"data":data}) : helper)))
    + "\" data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" data-timestamp=\""
    + alias4(((helper = (helper = helpers.timestamp || (depth0 != null ? depth0.timestamp : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"timestamp","hash":{},"data":data}) : helper)))
    + "\" >\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isshared : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.program(9, data, 0),"data":data})) != null ? stack1 : "")
    + "	</div>\n</div>";
},"useData":true});
templates['notes'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"notes-grid\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.notes : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n<div id=\"modal-note-div\" class=\"hide-modal-note modal-note-background\">\n	<div class=\"modal-content\">\n		<div class=\"note-active quicknote\" style=\"background-color: #F7EB96\" data-id=\"-1\">\n			<div>\n				<div contenteditable=\"true\" id='title-editable' class='note-title'></div>\n			</div>\n			<div contenteditable=\"true\" id='content-editable' class='note-content'></div>\n			<div class=\"note-options\">\n				<!--\n				<select class=\"note-share-select\" name=\"users[]\" multiple=\"multiple\"></select>\n				-->\n				<div class=\"note-toolbar\">\n					<a href=\"#\" class=\"circle-toolbar\" style=\"background-color: #F7EB96\"></a>\n					<a href=\"#\" class=\"circle-toolbar\" style=\"background-color: #88B7E3\"></a>\n					<a href=\"#\" class=\"circle-toolbar\" style=\"background-color: #C1ECB0\"></a>\n					<a href=\"#\" class=\"circle-toolbar\" style=\"background-color: #BFA6E9\"></a>\n					<a href=\"#\" class=\"circle-toolbar\" style=\"background-color: #DAF188\"></a>\n					<a href=\"#\" class=\"circle-toolbar\" style=\"background-color: #FF96AC\"></a>\n					<a href=\"#\" class=\"circle-toolbar\" style=\"background-color: #FCF66F\"></a>\n					<a href=\"#\" class=\"circle-toolbar\" style=\"background-color: #F2F1EF\"></a>\n					<a href=\"#\" class=\"circle-toolbar\" style=\"background-color: #C1D756\"></a>\n					<a href=\"#\" class=\"circle-toolbar\" style=\"background-color: #CECECE\"></a>\n				</div>\n				<div class=\"save-button\">\n					<!--\n					<button id='share-button'><?php p($l->t('Share'));?></button>\n					-->\n					<button id='cancel-button'>\n						"
    + alias4(((helper = (helper = helpers.cancelTxt || (depth0 != null ? depth0.cancelTxt : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cancelTxt","hash":{},"data":data}) : helper)))
    + "\n					</button>\n					<button id='save-button'>\n						"
    + alias4(((helper = (helper = helpers.saveTxt || (depth0 != null ? depth0.saveTxt : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"saveTxt","hash":{},"data":data}) : helper)))
    + "\n					</button>\n					</div>\n						<div style=\"clear: both;\"></div>\n					</div>\n				</div>\n			</div>\n		</div>\n	</div>\n</div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "	<div class=\"note-grid-item\">\n		<div class=\"quicknote noselect "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.active : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isshared : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.sharedwith : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" style=\"background-color: "
    + alias4(((helper = (helper = helpers.color || (depth0 != null ? depth0.color : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"color","hash":{},"data":data}) : helper)))
    + "\" data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" data-timestamp=\""
    + alias4(((helper = (helper = helpers.timestamp || (depth0 != null ? depth0.timestamp : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"timestamp","hash":{},"data":data}) : helper)))
    + "\" >\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isshared : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.program(11, data, 0),"data":data})) != null ? stack1 : "")
    + "		</div>\n	</div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "note-active";
},"5":function(container,depth0,helpers,partials,data) {
    return "shared";
},"7":function(container,depth0,helpers,partials,data) {
    return "shareowner";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function";

  return "			<div>\n				<div class='icon-share shared-title' title=\"Shared by "
    + container.escapeExpression(((helper = (helper = helpers.userid || (depth0 != null ? depth0.userid : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"userid","hash":{},"data":data}) : helper)))
    + "\"></div>\n				<div class='note-title'>\n					"
    + ((stack1 = ((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n				</div>\n			</div>\n			<div id='content' class='note-content'>\n				"
    + ((stack1 = ((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n			</div>\n";
},"11":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function";

  return "			<div>\n				<div class=\"icon-delete hide-delete-icon icon-delete-note\" title=\"Delete\"></div>\n				<!--\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.sharedwith : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "				-->\n				<div class='note-title'>\n					"
    + ((stack1 = ((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n				</div>\n			</div>\n			<div class='note-content'>\n				"
    + ((stack1 = ((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n			</div>\n";
},"12":function(container,depth0,helpers,partials,data) {
    var helper;

  return "				<div class='icon-share shared-title-owner' title=\"Shared with "
    + container.escapeExpression(((helper = (helper = helpers.sharedwith || (depth0 != null ? depth0.sharedwith : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"sharedwith","hash":{},"data":data}) : helper)))
    + "\"></div>\n";
},"14":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.loaded : depth0),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.program(17, data, 0),"data":data})) != null ? stack1 : "");
},"15":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"emptycontent\">\n	<div class=\"icon-edit svg\"></div>\n	<h2>\n		"
    + container.escapeExpression(((helper = (helper = helpers.emptyMsg || (depth0 != null ? depth0.emptyMsg : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"emptyMsg","hash":{},"data":data}) : helper)))
    + "\n	</h2>\n</div>\n";
},"17":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"emptycontent\">\n	<div class=\"icon-edit svg\"></div>\n	<h2>\n		"
    + alias4(((helper = (helper = helpers.loadingMsg || (depth0 != null ? depth0.loadingMsg : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"loadingMsg","hash":{},"data":data}) : helper)))
    + "\n	</h2>\n	<img class=\"loadingimport\" src=\""
    + alias4(((helper = (helper = helpers.loadingIcon || (depth0 != null ? depth0.loadingIcon : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"loadingIcon","hash":{},"data":data}) : helper)))
    + "\"/>\n</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.notes : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(14, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});
})();