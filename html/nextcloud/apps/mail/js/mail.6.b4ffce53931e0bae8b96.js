(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{260:function(t,e,n){var a=n(283);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);(0,n(258).default)("fcfb9244",a,!0,{})},270:function(t,e,n){"use strict";n.d(e,"a",function(){return c});var a=n(321),o=n.n(a),r=n(322),i=n.n(r),c=function(t){var e=o()(t),n=i.a.hex.hsl(e),a=[40*Math.round(n[0]/40),n[1],n[2]];return"#"+i.a.hsl.hex(a)}},282:function(t,e,n){"use strict";var a=n(260);n.n(a).a},283:function(t,e,n){(t.exports=n(257)(!1)).push([t.i,"\np.avatar-settings span.icon-loading-small[data-v-768f6630] {\n\tdisplay: inline-block;\n\tvertical-align: middle;\n\tpadding: 5px 0;\n}\n",""])},287:function(t,e,n){window,t.exports=function(t){var e={};function n(a){if(e[a])return e[a].exports;var o=e[a]={i:a,l:!1,exports:{}};return t[a].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,a){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(a,o,function(e){return t[e]}.bind(null,o));return a},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/dist/",n(n.s=133)}({0:function(t,e,n){"use strict";function a(t,e,n,a,o,r,i,c){var s,l="function"==typeof t?t.options:t;if(e&&(l.render=e,l.staticRenderFns=n,l._compiled=!0),a&&(l.functional=!0),r&&(l._scopeId="data-v-"+r),i?(s=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),o&&o.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(i)},l._ssrRegister=s):o&&(s=c?function(){o.call(this,this.$root.$options.shadowRoot)}:o),s)if(l.functional){l._injectStyles=s;var u=l.render;l.render=function(t,e){return s.call(e),u(t,e)}}else{var d=l.beforeCreate;l.beforeCreate=d?[].concat(d,s):[s]}return{exports:t,options:l}}n.d(e,"a",function(){return a})},133:function(t,e,n){"use strict";n.r(e);var a=n(0),o=Object(a.a)({name:"AppContentDetails"},function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"app-content-details"},[this._t("default")],2)},[],!1,null,null,null).exports;n.d(e,"AppContentDetails",function(){return o}),
/*
 * @copyright 2019 Christoph Wurst <christoph@winzerhof-wurst.at>
 *
 * @author 2019 Christoph Wurst <christoph@winzerhof-wurst.at>
 *
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
 */
e.default=o}})},292:function(e,n,a){"use strict";a(281);var o=a(317),r=a.n(o),i=a(318),c=a.n(i),s=a(319),l=a.n(s),u=a(320),d=a.n(u),p=(a(136),a(262)),f=a.n(p),v=a(270),m=a(19),h={name:"NavigationAccount",components:{AppNavigationItem:f.a},props:{account:{type:Object,required:!0}},data:function(){return{menuOpen:!1}},computed:{visible:function(){return!0!==this.account.isUnified&&!1!==this.account.visible},data:function(){var e=this,n={name:"accountSettings",params:{accountId:this.account.id}},a=this.account.error;return{id:"account"+this.account.id,key:"account"+this.account.id,text:this.account.emailAddress,bullet:a?void 0:Object(v.a)(this.account.name),icon:a?"icon-error":void 0,router:n,utils:{actions:[{icon:"icon-settings",text:t("mail","Edit"),action:function(){e.$router.push(n)}},{icon:"icon-delete",text:t("mail","Delete"),action:function(){e.$store.dispatch("deleteAccount",e.account).catch(function(t){return m.a.error("could not delete account",{error:t})})}},{icon:"icon-add",text:t("mail","Add folder"),input:"text",action:function(t){e.createFolder(t)}}]}}}},methods:{createFolder:function(t){var e=t.target.elements[0].value;m.a.info("creating folder "+e),this.menuOpen=!1,this.$store.dispatch("createFolder",{account:this.account,name:e}).then(function(){return m.a.info("folder ".concat(e," created"))}).catch(function(t){throw m.a.error("could not create folder",{error:t}),t})}}},_=a(70),g=Object(_.a)(h,function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.visible?n("AppNavigationItem",{attrs:{item:t.data,"menu-open":t.menuOpen},on:{"update:menuOpen":function(e){t.menuOpen=e},"update:menu-open":function(e){t.menuOpen=e}}}):t._e()},[],!1,null,null,null).exports,b={name:"NavigationAccount",components:{AppNavigationItem:f.a},props:{account:{type:Object,required:!0}},computed:{data:function(){var e=this;return{id:"collapse-"+this.account.id,key:"collapse-"+this.account.id,classes:["collapse-folders"],text:this.account.collapsed?t("mail","Show all folders"):t("mail","Collapse folders"),action:function(){return e.$store.commit("toggleAccountCollapsed",e.account.id)}}}}},x=Object(_.a)(b,function(){var t=this.$createElement;return(this._self._c||t)("AppNavigationItem",{attrs:{item:this.data}})},[],!1,null,null,null).exports,O=a(42),A=(a(323),a(324),a(8)),S=function(t){if(t.specialUse.length>0)try{return function(t){if(t.specialUse.includes("all"))return Object(A.translate)("mail","All");if(t.specialUse.includes("archive"))return Object(A.translate)("mail","Archive");if(t.specialUse.includes("drafts"))return Object(A.translate)("mail","Drafts");if(t.specialUse.includes("flagged"))return Object(A.translate)("mail","Favorites");if(t.specialUse.includes("inbox"))return Object(A.translate)("mail","Inbox");if(t.specialUse.includes("junk"))return Object(A.translate)("mail","Junk");if(t.specialUse.includes("sent"))return Object(A.translate)("mail","Sent");if(t.specialUse.includes("trash"))return Object(A.translate)("mail","Trash");throw new Error("unknown special use ".concat(t.specialUse))}(t)}catch(e){return console.error(e),atob(t.id)}return atob(t.id)},k={name:"NavigationFolder",components:{AppNavigationItem:f.a},props:{account:{type:Object,required:!0},folder:{type:Object,required:!0}},data:function(){return{menuOpen:!1,loadingFolderStats:!0,folderStats:void 0}},computed:{data:function(){return this.folderToEntry(this.folder,!0)}},watch:{menuOpen:function(){this.menuOpen&&this.fetchFolderStats()}},methods:{folderToEntry:function(e,n){var a=this,o="folder";e.specialRole&&(o=e.specialRole);var r=[];return n&&(this.loadingFolderStats?r.push({icon:"icon-info",text:atob(this.folder.id),longtext:t("mail","Loading …")}):r.push({icon:"icon-info",text:atob(this.folder.id),longtext:t("mail","{total} messages ({unread} unread)",{total:this.folderStats.total,unread:this.folderStats.unread})})),n&&(r.push({icon:"icon-checkmark",text:t("mail","Mark all as read"),longtext:t("mail","Mark all messages of this folder as read"),action:this.markAsRead(e)}),r.push({icon:"icon-add",text:t("mail","Add subfolder"),input:"text",action:this.createFolder})),{id:"account"+this.account.id+"_"+e.id,key:"account"+this.account.id+"_"+e.id,text:S(e),icon:"icon-"+o,router:{name:"folder",params:{accountId:this.account.id,folderId:e.id},exact:!1},utils:{actions:r,counter:e.unread},collapsible:!0,opened:e.opened,children:this.$store.getters.getSubfolders(this.account.id,e.id).map(function(t){return a.folderToEntry(t,!1)})}},fetchFolderStats:function(){var t=this;this.loadingFolderStats=!0,Object(O.c)(this.account.id,this.folder.id).then(function(e){m.a.debug("loaded folder stats",{stats:e}),t.folderStats=e,t.loadingFolderStats=!1}).catch(function(e){return m.a.error("could not load folder states for ".concat(t.folder.id),{error:e})})},createFolder:function(t){var e=t.target.elements[0].value,n=atob(this.folder.id)+this.folder.delimiter+e;m.a.info("creating folder ".concat(n," as subfolder of ").concat(this.folder.id)),this.menuOpen=!1,this.$store.dispatch("createFolder",{account:this.account,name:n}).then(function(){return m.a.info("folder ".concat(n," created"))}).catch(function(t){throw m.a.error("could not create folder ".concat(n),{error:t}),t})},markAsRead:function(t){var e=this;return function(){e.menuOpen=!1,e.$store.dispatch("markFolderRead",{account:e.account,folderId:t.id}).then(function(){return m.a.info("folder ".concat(t.id," marked as read"))}).catch(function(e){return m.a.error("could not mark folder ".concat(t.id," as read"),{error:e})})}}}},y=Object(_.a)(k,function(){var t=this,e=t.$createElement;return(t._self._c||e)("AppNavigationItem",{attrs:{item:t.data,"menu-open":t.menuOpen},on:{"update:menuOpen":function(e){t.menuOpen=e},"update:menu-open":function(e){t.menuOpen=e}}})},[],!1,null,null,null).exports,w={name:"AppSettingsMenu",data:function(){return{loadingAvatarSettings:!1}},computed:{useExternalAvatars:function(){return"true"===this.$store.getters.getPreference("external-avatars","true")}},methods:{onToggleExternalAvatars:function(t){var e=this;this.loadingAvatarSettings=!0,this.$store.dispatch("savePreference",{key:"external-avatars",value:t.target.checked?"true":"false"}).catch(function(t){return m.a.error("could not save preferences",{error:t})}).then(function(){e.loadingAvatarSettings=!1})}}},N=(a(282),Object(_.a)(w,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("router-link",{staticClass:"button new-button",attrs:{to:"/setup"}},[t._v(t._s(t.t("mail","Add mail account"))+" ")]),t._v(" "),t.loadingAvatarSettings?n("p",{staticClass:"avatar-settings"},[n("span",{staticClass:"icon-loading-small"}),t._v("\n\t\t"+t._s(t.t("mail","Use Gravatar and favicon avatars"))+"\n\t")]):n("p",[n("input",{staticClass:"checkbox",attrs:{id:"gravatar-enabled",type:"checkbox"},domProps:{checked:t.useExternalAvatars},on:{change:t.onToggleExternalAvatars}}),t._v(" "),n("label",{attrs:{for:"gravatar-enabled"}},[t._v(t._s(t.t("mail","Use Gravatar and favicon avatars")))])]),t._v(" "),n("p",{staticClass:"app-settings-hint"},[n("router-link",{attrs:{to:{name:"keyboardShortcuts"}}},[t._v("\n\t\t\t"+t._s(t.t("mail","Keyboard shortcuts"))+"\n\t\t")])],1),t._v(" "),n("p",{staticClass:"app-settings-hint"},[n("a",{attrs:{href:"https://www.mailvelope.com/",target:"_blank"}},[t._v(t._s(t.t("mail","Looking for a way to encrypt your emails? Install the Mailvelope browser extension!")))])])],1)},[],!1,null,"768f6630",null).exports),C=Object.seal(["inbox","flagged","drafts","sent"]),j={name:"Navigation",components:{AppNavigation:r.a,AppNavigationNew:c.a,AppNavigationSettings:l.a,AppNavigationSpacer:d.a,AppSettingsMenu:N,NavigationAccount:g,NavigationAccountExpandCollapse:x,NavigationFolder:y},data:function(){return{SHOW_COLLAPSED:C}},computed:{menu:function(){var t=this;return this.$store.getters.getAccounts().map(function(e){var n=t.$store.getters.getFolders(e.id).filter(function(t){return!e.collapsed||-1!==C.indexOf(t.specialRole)});return{id:e.id,account:e,folders:n}})}},methods:{onNewMessage:function(){this.$router.push({name:"message",params:{accountId:this.$route.params.accountId,folderId:this.$route.params.folderId,messageUid:"new"}})}}},$=Object(_.a)(j,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("AppNavigation",[n("AppNavigationNew",{attrs:{text:t.t("mail","New message"),"button-id":"mail_new_message","button-class":"icon-add"},on:{click:t.onNewMessage}}),t._v(" "),n("ul",{attrs:{id:"accounts-list"}},[t._l(t.menu,function(e){return[e.account?n("NavigationAccount",{key:e.account.id,attrs:{account:e.account}}):t._e(),t._v(" "),t._l(e.folders,function(a){return n("NavigationFolder",{directives:[{name:"show",rawName:"v-show",value:!e.account.collapsed||-1!==t.SHOW_COLLAPSED.indexOf(a.specialRole),expression:"!group.account.collapsed || SHOW_COLLAPSED.indexOf(item.specialRole) !== -1"}],key:a.key,attrs:{account:e.account,folder:a}})}),t._v(" "),!e.account.isUnified&&e.account.folders.length>0?n("NavigationAccountExpandCollapse",{key:"collapse-"+e.account.id,attrs:{account:e.account}}):t._e(),t._v(" "),n("AppNavigationSpacer",{key:"spacer-"+e.account.id})]})],2),t._v(" "),n("AppNavigationSettings",{attrs:{title:t.t("mail","Settings")}},[n("AppSettingsMenu")],1)],1)},[],!1,null,"783b9159",null);n.a=$.exports},827:function(t,e,n){"use strict";n.r(e);var a=n(311),o=n.n(a),r=n(287),i=n.n(r),c=n(280),s=n.n(c),l=n(292),u={name:"KeyboardShortcuts",components:{AppContent:o.a,AppContentDetails:i.a,Content:s.a,Navigation:l.a}},d=n(70),p=Object(d.a)(u,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("Content",{attrs:{"app-name":"mail"}},[n("Navigation"),t._v(" "),n("AppContent",[n("AppContentDetails",[n("h2",[t._v(t._s(t.t("mail","Keyboard shortcuts")))]),t._v(" "),n("p",[t._v(t._s(t.t("mail","Speed up your Mail experience with these quick shortcuts.")))]),t._v(" "),n("dl",[n("div",[n("dt",[n("kbd",[t._v("C")])]),t._v(" "),n("dd",[t._v(t._s(t.t("mail","Compose new message")))])]),t._v(" "),n("div",[n("dt",[n("kbd",[t._v("←")])]),t._v(" "),n("dd",[t._v(t._s(t.t("mail","Newer message")))])]),t._v(" "),n("div",[n("dt",[n("kbd",[t._v("→")])]),t._v(" "),n("dd",[t._v(t._s(t.t("mail","Older message")))])]),t._v(" "),n("div",[n("dt",[n("kbd",[t._v("S")])]),t._v(" "),n("dd",[t._v(t._s(t.t("mail","Toggle star")))])]),t._v(" "),n("div",[n("dt",[n("kbd",[t._v("U")])]),t._v(" "),n("dd",[t._v(t._s(t.t("mail","Toggle unread")))])]),t._v(" "),n("div",[n("dt",[n("kbd",[t._v("Del")])]),t._v(" "),n("dd",[t._v(t._s(t.t("mail","Delete")))])]),t._v(" "),n("div",[n("dt",[n("kbd",[t._v("Ctrl")]),t._v(" + "),n("kbd",[t._v("F")])]),t._v(" "),n("dd",[t._v(t._s(t.t("mail","Search")))])]),t._v(" "),n("div",[n("dt",[n("kbd",[t._v("Ctrl")]),t._v(" + "),n("kbd",[t._v("Enter")])]),t._v(" "),n("dd",[t._v(t._s(t.t("mail","Send")))])]),t._v(" "),n("div",[n("dt",[n("kbd",[t._v("R")])]),t._v(" "),n("dd",[t._v(t._s(t.t("mail","Refresh")))])])])])],1)],1)},[],!1,null,null,null);e.default=p.exports}}]);
//# sourceMappingURL=mail.6.b4ffce53931e0bae8b96.js.map