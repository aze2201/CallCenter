(function(t){var e=typeof self=="object"&&self.self==self&&self||typeof global=="object"&&global.global==global&&global;if(typeof define==="function"&&define.amd){define(["underscore","jquery","exports"],function(i,r,n){e.Backbone=t(e,n,i,r)})}else if(typeof exports!=="undefined"){var i=require("underscore"),r;try{r=require("jquery")}catch(n){}t(e,exports,i,r)}else{e.Backbone=t(e,{},e._,e.jQuery||e.Zepto||e.ender||e.$)}})(function(t,e,i,r){var n=t.Backbone;var s=Array.prototype.slice;e.VERSION="1.2.3";e.$=r;e.noConflict=function(){t.Backbone=n;return this};e.emulateHTTP=false;e.emulateJSON=false;var a=function(t,e,r){switch(t){case 1:return function(){return i[e](this[r])};case 2:return function(t){return i[e](this[r],t)};case 3:return function(t,n){return i[e](this[r],h(t,this),n)};case 4:return function(t,n,s){return i[e](this[r],h(t,this),n,s)};default:return function(){var t=s.call(arguments);t.unshift(this[r]);return i[e].apply(i,t)}}};var o=function(t,e,r){i.each(e,function(e,n){if(i[n])t.prototype[n]=a(e,n,r)})};var h=function(t,e){if(i.isFunction(t))return t;if(i.isObject(t)&&!e._isModel(t))return u(t);if(i.isString(t))return function(e){return e.get(t)};return t};var u=function(t){var e=i.matches(t);return function(t){return e(t.attributes)}};var l=e.Events={};var c=/\s+/;var f=function(t,e,r,n,s){var a=0,o;if(r&&typeof r==="object"){if(n!==void 0&&"context"in s&&s.context===void 0)s.context=n;for(o=i.keys(r);a<o.length;a++){e=f(t,e,o[a],r[o[a]],s)}}else if(r&&c.test(r)){for(o=r.split(c);a<o.length;a++){e=t(e,o[a],n,s)}}else{e=t(e,r,n,s)}return e};l.on=function(t,e,i){return d(this,t,e,i)};var d=function(t,e,i,r,n){t._events=f(v,t._events||{},e,i,{context:r,ctx:t,listening:n});if(n){var s=t._listeners||(t._listeners={});s[n.id]=n}return t};l.listenTo=function(t,e,r){if(!t)return this;var n=t._listenId||(t._listenId=i.uniqueId("l"));var s=this._listeningTo||(this._listeningTo={});var a=s[n];if(!a){var o=this._listenId||(this._listenId=i.uniqueId("l"));a=s[n]={obj:t,objId:n,id:o,listeningTo:s,count:0}}d(t,e,r,this,a);return this};var v=function(t,e,i,r){if(i){var n=t[e]||(t[e]=[]);var s=r.context,a=r.ctx,o=r.listening;if(o)o.count++;n.push({callback:i,context:s,ctx:s||a,listening:o})}return t};l.off=function(t,e,i){if(!this._events)return this;this._events=f(g,this._events,t,e,{context:i,listeners:this._listeners});return this};l.stopListening=function(t,e,r){var n=this._listeningTo;if(!n)return this;var s=t?[t._listenId]:i.keys(n);for(var a=0;a<s.length;a++){var o=n[s[a]];if(!o)break;o.obj.off(e,r,this)}if(i.isEmpty(n))this._listeningTo=void 0;return this};var g=function(t,e,r,n){if(!t)return;var s=0,a;var o=n.context,h=n.listeners;if(!e&&!r&&!o){var u=i.keys(h);for(;s<u.length;s++){a=h[u[s]];delete h[a.id];delete a.listeningTo[a.objId]}return}var l=e?[e]:i.keys(t);for(;s<l.length;s++){e=l[s];var c=t[e];if(!c)break;var f=[];for(var d=0;d<c.length;d++){var v=c[d];if(r&&r!==v.callback&&r!==v.callback._callback||o&&o!==v.context){f.push(v)}else{a=v.listening;if(a&&--a.count===0){delete h[a.id];delete a.listeningTo[a.objId]}}}if(f.length){t[e]=f}else{delete t[e]}}if(i.size(t))return t};l.once=function(t,e,r){var n=f(p,{},t,e,i.bind(this.off,this));return this.on(n,void 0,r)};l.listenToOnce=function(t,e,r){var n=f(p,{},e,r,i.bind(this.stopListening,this,t));return this.listenTo(t,n)};var p=function(t,e,r,n){if(r){var s=t[e]=i.once(function(){n(e,s);r.apply(this,arguments)});s._callback=r}return t};l.trigger=function(t){if(!this._events)return this;var e=Math.max(0,arguments.length-1);var i=Array(e);for(var r=0;r<e;r++)i[r]=arguments[r+1];f(m,this._events,t,void 0,i);return this};var m=function(t,e,i,r){if(t){var n=t[e];var s=t.all;if(n&&s)s=s.slice();if(n)_(n,r);if(s)_(s,[e].concat(r))}return t};var _=function(t,e){var i,r=-1,n=t.length,s=e[0],a=e[1],o=e[2];switch(e.length){case 0:while(++r<n)(i=t[r]).callback.call(i.ctx);return;case 1:while(++r<n)(i=t[r]).callback.call(i.ctx,s);return;case 2:while(++r<n)(i=t[r]).callback.call(i.ctx,s,a);return;case 3:while(++r<n)(i=t[r]).callback.call(i.ctx,s,a,o);return;default:while(++r<n)(i=t[r]).callback.apply(i.ctx,e);return}};l.bind=l.on;l.unbind=l.off;i.extend(e,l);var y=e.Model=function(t,e){var r=t||{};e||(e={});this.cid=i.uniqueId(this.cidPrefix);this.attributes={};if(e.collection)this.collection=e.collection;if(e.parse)r=this.parse(r,e)||{};r=i.defaults({},r,i.result(this,"defaults"));this.set(r,e);this.changed={};this.initialize.apply(this,arguments)};i.extend(y.prototype,l,{changed:null,validationError:null,idAttribute:"id",cidPrefix:"c",initialize:function(){},toJSON:function(t){return i.clone(this.attributes)},sync:function(){return e.sync.apply(this,arguments)},get:function(t){return this.attributes[t]},escape:function(t){return i.escape(this.get(t))},has:function(t){return this.get(t)!=null},matches:function(t){return!!i.iteratee(t,this)(this.attributes)},set:function(t,e,r){if(t==null)return this;var n;if(typeof t==="object"){n=t;r=e}else{(n={})[t]=e}r||(r={});if(!this._validate(n,r))return false;var s=r.unset;var a=r.silent;var o=[];var h=this._changing;this._changing=true;if(!h){this._previousAttributes=i.clone(this.attributes);this.changed={}}var u=this.attributes;var l=this.changed;var c=this._previousAttributes;for(var f in n){e=n[f];if(!i.isEqual(u[f],e))o.push(f);if(!i.isEqual(c[f],e)){l[f]=e}else{delete l[f]}s?delete u[f]:u[f]=e}this.id=this.get(this.idAttribute);if(!a){if(o.length)this._pending=r;for(var d=0;d<o.length;d++){this.trigger("change:"+o[d],this,u[o[d]],r)}}if(h)return this;if(!a){while(this._pending){r=this._pending;this._pending=false;this.trigger("change",this,r)}}this._pending=false;this._changing=false;return this},unset:function(t,e){return this.set(t,void 0,i.extend({},e,{unset:true}))},clear:function(t){var e={};for(var r in this.attributes)e[r]=void 0;return this.set(e,i.extend({},t,{unset:true}))},hasChanged:function(t){if(t==null)return!i.isEmpty(this.changed);return i.has(this.changed,t)},changedAttributes:function(t){if(!t)return this.hasChanged()?i.clone(this.changed):false;var e=this._changing?this._previousAttributes:this.attributes;var r={};for(var n in t){var s=t[n];if(i.isEqual(e[n],s))continue;r[n]=s}return i.size(r)?r:false},previous:function(t){if(t==null||!this._previousAttributes)return null;return this._previousAttributes[t]},previousAttributes:function(){return i.clone(this._previousAttributes)},fetch:function(t){t=i.extend({parse:true},t);var e=this;var r=t.success;t.success=function(i){var n=t.parse?e.parse(i,t):i;if(!e.set(n,t))return false;if(r)r.call(t.context,e,i,t);e.trigger("sync",e,i,t)};z(this,t);return this.sync("read",this,t)},save:function(t,e,r){var n;if(t==null||typeof t==="object"){n=t;r=e}else{(n={})[t]=e}r=i.extend({validate:true,parse:true},r);var s=r.wait;if(n&&!s){if(!this.set(n,r))return false}else{if(!this._validate(n,r))return false}var a=this;var o=r.success;var h=this.attributes;r.success=function(t){a.attributes=h;var e=r.parse?a.parse(t,r):t;if(s)e=i.extend({},n,e);if(e&&!a.set(e,r))return false;if(o)o.call(r.context,a,t,r);a.trigger("sync",a,t,r)};z(this,r);if(n&&s)this.attributes=i.extend({},h,n);var u=this.isNew()?"create":r.patch?"patch":"update";if(u==="patch"&&!r.attrs)r.attrs=n;var l=this.sync(u,this,r);this.attributes=h;return l},destroy:function(t){t=t?i.clone(t):{};var e=this;var r=t.success;var n=t.wait;var s=function(){e.stopListening();e.trigger("destroy",e,e.collection,t)};t.success=function(i){if(n)s();if(r)r.call(t.context,e,i,t);if(!e.isNew())e.trigger("sync",e,i,t)};var a=false;if(this.isNew()){i.defer(t.success)}else{z(this,t);a=this.sync("delete",this,t)}if(!n)s();return a},url:function(){var t=i.result(this,"urlRoot")||i.result(this.collection,"url")||F();if(this.isNew())return t;var e=this.get(this.idAttribute);return t.replace(/[^\/]$/,"$&/")+encodeURIComponent(e)},parse:function(t,e){return t},clone:function(){return new this.constructor(this.attributes)},isNew:function(){return!this.has(this.idAttribute)},isValid:function(t){return this._validate({},i.defaults({validate:true},t))},_validate:function(t,e){if(!e.validate||!this.validate)return true;t=i.extend({},this.attributes,t);var r=this.validationError=this.validate(t,e)||null;if(!r)return true;this.trigger("invalid",this,r,i.extend(e,{validationError:r}));return false}});var b={keys:1,values:1,pairs:1,invert:1,pick:0,omit:0,chain:1,isEmpty:1};o(y,b,"attributes");var x=e.Collection=function(t,e){e||(e={});if(e.model)this.model=e.model;if(e.comparator!==void 0)this.comparator=e.comparator;this._reset();this.initialize.apply(this,arguments);if(t)this.reset(t,i.extend({silent:true},e))};var w={add:true,remove:true,merge:true};var E={add:true,remove:false};var k=function(t,e,i){i=Math.min(Math.max(i,0),t.length);var r=Array(t.length-i);var n=e.length;for(var s=0;s<r.length;s++)r[s]=t[s+i];for(s=0;s<n;s++)t[s+i]=e[s];for(s=0;s<r.length;s++)t[s+n+i]=r[s]};i.extend(x.prototype,l,{model:y,initialize:function(){},toJSON:function(t){return this.map(function(e){return e.toJSON(t)})},sync:function(){return e.sync.apply(this,arguments)},add:function(t,e){return this.set(t,i.extend({merge:false},e,E))},remove:function(t,e){e=i.extend({},e);var r=!i.isArray(t);t=r?[t]:i.clone(t);var n=this._removeModels(t,e);if(!e.silent&&n)this.trigger("update",this,e);return r?n[0]:n},set:function(t,e){if(t==null)return;e=i.defaults({},e,w);if(e.parse&&!this._isModel(t))t=this.parse(t,e);var r=!i.isArray(t);t=r?[t]:t.slice();var n=e.at;if(n!=null)n=+n;if(n<0)n+=this.length+1;var s=[];var a=[];var o=[];var h={};var u=e.add;var l=e.merge;var c=e.remove;var f=false;var d=this.comparator&&n==null&&e.sort!==false;var v=i.isString(this.comparator)?this.comparator:null;var g;for(var p=0;p<t.length;p++){g=t[p];var m=this.get(g);if(m){if(l&&g!==m){var _=this._isModel(g)?g.attributes:g;if(e.parse)_=m.parse(_,e);m.set(_,e);if(d&&!f)f=m.hasChanged(v)}if(!h[m.cid]){h[m.cid]=true;s.push(m)}t[p]=m}else if(u){g=t[p]=this._prepareModel(g,e);if(g){a.push(g);this._addReference(g,e);h[g.cid]=true;s.push(g)}}}if(c){for(p=0;p<this.length;p++){g=this.models[p];if(!h[g.cid])o.push(g)}if(o.length)this._removeModels(o,e)}var y=false;var b=!d&&u&&c;if(s.length&&b){y=this.length!=s.length||i.some(this.models,function(t,e){return t!==s[e]});this.models.length=0;k(this.models,s,0);this.length=this.models.length}else if(a.length){if(d)f=true;k(this.models,a,n==null?this.length:n);this.length=this.models.length}if(f)this.sort({silent:true});if(!e.silent){for(p=0;p<a.length;p++){if(n!=null)e.index=n+p;g=a[p];g.trigger("add",g,this,e)}if(f||y)this.trigger("sort",this,e);if(a.length||o.length)this.trigger("update",this,e)}return r?t[0]:t},reset:function(t,e){e=e?i.clone(e):{};for(var r=0;r<this.models.length;r++){this._removeReference(this.models[r],e)}e.previousModels=this.models;this._reset();t=this.add(t,i.extend({silent:true},e));if(!e.silent)this.trigger("reset",this,e);return t},push:function(t,e){return this.add(t,i.extend({at:this.length},e))},pop:function(t){var e=this.at(this.length-1);return this.remove(e,t)},unshift:function(t,e){return this.add(t,i.extend({at:0},e))},shift:function(t){var e=this.at(0);return this.remove(e,t)},slice:function(){return s.apply(this.models,arguments)},get:function(t){if(t==null)return void 0;var e=this.modelId(this._isModel(t)?t.attributes:t);return this._byId[t]||this._byId[e]||this._byId[t.cid]},at:function(t){if(t<0)t+=this.length;return this.models[t]},where:function(t,e){return this[e?"find":"filter"](t)},findWhere:function(t){return this.where(t,true)},sort:function(t){var e=this.comparator;if(!e)throw new Error("Cannot sort a set without a comparator");t||(t={});var r=e.length;if(i.isFunction(e))e=i.bind(e,this);if(r===1||i.isString(e)){this.models=this.sortBy(e)}else{this.models.sort(e)}if(!t.silent)this.trigger("sort",this,t);return this},pluck:function(t){return i.invoke(this.models,"get",t)},fetch:function(t){t=i.extend({parse:true},t);var e=t.success;var r=this;t.success=function(i){var n=t.reset?"reset":"set";r[n](i,t);if(e)e.call(t.context,r,i,t);r.trigger("sync",r,i,t)};z(this,t);return this.sync("read",this,t)},create:function(t,e){e=e?i.clone(e):{};var r=e.wait;t=this._prepareModel(t,e);if(!t)return false;if(!r)this.add(t,e);var n=this;var s=e.success;e.success=function(t,e,i){if(r)n.add(t,i);if(s)s.call(i.context,t,e,i)};t.save(null,e);return t},parse:function(t,e){return t},clone:function(){return new this.constructor(this.models,{model:this.model,comparator:this.comparator})},modelId:function(t){return t[this.model.prototype.idAttribute||"id"]},_reset:function(){this.length=0;this.models=[];this._byId={}},_prepareModel:function(t,e){if(this._isModel(t)){if(!t.collection)t.collection=this;return t}e=e?i.clone(e):{};e.collection=this;var r=new this.model(t,e);if(!r.validationError)return r;this.trigger("invalid",this,r.validationError,e);return false},_removeModels:function(t,e){var i=[];for(var r=0;r<t.length;r++){var n=this.get(t[r]);if(!n)continue;var s=this.indexOf(n);this.models.splice(s,1);this.length--;if(!e.silent){e.index=s;n.trigger("remove",n,this,e)}i.push(n);this._removeReference(n,e)}return i.length?i:false},_isModel:function(t){return t instanceof y},_addReference:function(t,e){this._byId[t.cid]=t;var i=this.modelId(t.attributes);if(i!=null)this._byId[i]=t;t.on("all",this._onModelEvent,this)},_removeReference:function(t,e){delete this._byId[t.cid];var i=this.modelId(t.attributes);if(i!=null)delete this._byId[i];if(this===t.collection)delete t.collection;t.off("all",this._onModelEvent,this)},_onModelEvent:function(t,e,i,r){if((t==="add"||t==="remove")&&i!==this)return;if(t==="destroy")this.remove(e,r);if(t==="change"){var n=this.modelId(e.previousAttributes());var s=this.modelId(e.attributes);if(n!==s){if(n!=null)delete this._byId[n];if(s!=null)this._byId[s]=e}}this.trigger.apply(this,arguments)}});var S={forEach:3,each:3,map:3,collect:3,reduce:4,foldl:4,inject:4,reduceRight:4,foldr:4,find:3,detect:3,filter:3,select:3,reject:3,every:3,all:3,some:3,any:3,include:3,includes:3,contains:3,invoke:0,max:3,min:3,toArray:1,size:1,first:3,head:3,take:3,initial:3,rest:3,tail:3,drop:3,last:3,without:0,difference:0,indexOf:3,shuffle:1,lastIndexOf:3,isEmpty:1,chain:1,sample:3,partition:3,groupBy:3,countBy:3,sortBy:3,indexBy:3};o(x,S,"models");var I=e.View=function(t){this.cid=i.uniqueId("view");i.extend(this,i.pick(t,P));this._ensureElement();this.initialize.apply(this,arguments)};var T=/^(\S+)\s*(.*)$/;var P=["model","collection","el","id","attributes","className","tagName","events"];i.extend(I.prototype,l,{tagName:"div",$:function(t){return this.$el.find(t)},initialize:function(){},render:function(){return this},remove:function(){this._removeElement();this.stopListening();return this},_removeElement:function(){this.$el.remove()},setElement:function(t){this.undelegateEvents();this._setElement(t);this.delegateEvents();return this},_setElement:function(t){this.$el=t instanceof e.$?t:e.$(t);this.el=this.$el[0]},delegateEvents:function(t){t||(t=i.result(this,"events"));if(!t)return this;this.undelegateEvents();for(var e in t){var r=t[e];if(!i.isFunction(r))r=this[r];if(!r)continue;var n=e.match(T);this.delegate(n[1],n[2],i.bind(r,this))}return this},delegate:function(t,e,i){this.$el.on(t+".delegateEvents"+this.cid,e,i);return this},undelegateEvents:function(){if(this.$el)this.$el.off(".delegateEvents"+this.cid);return this},undelegate:function(t,e,i){this.$el.off(t+".delegateEvents"+this.cid,e,i);return this},_createElement:function(t){return document.createElement(t)},_ensureElement:function(){if(!this.el){var t=i.extend({},i.result(this,"attributes"));if(this.id)t.id=i.result(this,"id");if(this.className)t["class"]=i.result(this,"className");this.setElement(this._createElement(i.result(this,"tagName")));this._setAttributes(t)}else{this.setElement(i.result(this,"el"))}},_setAttributes:function(t){this.$el.attr(t)}});e.sync=function(t,r,n){var s=H[t];i.defaults(n||(n={}),{emulateHTTP:e.emulateHTTP,emulateJSON:e.emulateJSON});var a={type:s,dataType:"json"};if(!n.url){a.url=i.result(r,"url")||F()}if(n.data==null&&r&&(t==="create"||t==="update"||t==="patch")){a.contentType="application/json";a.data=JSON.stringify(n.attrs||r.toJSON(n))}if(n.emulateJSON){a.contentType="application/x-www-form-urlencoded";a.data=a.data?{model:a.data}:{}}if(n.emulateHTTP&&(s==="PUT"||s==="DELETE"||s==="PATCH")){a.type="POST";if(n.emulateJSON)a.data._method=s;var o=n.beforeSend;n.beforeSend=function(t){t.setRequestHeader("X-HTTP-Method-Override",s);if(o)return o.apply(this,arguments)}}if(a.type!=="GET"&&!n.emulateJSON){a.processData=false}var h=n.error;n.error=function(t,e,i){n.textStatus=e;n.errorThrown=i;if(h)h.call(n.context,t,e,i)};var u=n.xhr=e.ajax(i.extend(a,n));r.trigger("request",r,u,n);return u};var H={create:"POST",update:"PUT",patch:"PATCH","delete":"DELETE",read:"GET"};e.ajax=function(){return e.$.ajax.apply(e.$,arguments)};var $=e.Router=function(t){t||(t={});if(t.routes)this.routes=t.routes;this._bindRoutes();this.initialize.apply(this,arguments)};var A=/\((.*?)\)/g;var C=/(\(\?)?:\w+/g;var R=/\*\w+/g;var j=/[\-{}\[\]+?.,\\\^$|#\s]/g;i.extend($.prototype,l,{initialize:function(){},route:function(t,r,n){if(!i.isRegExp(t))t=this._routeToRegExp(t);if(i.isFunction(r)){n=r;r=""}if(!n)n=this[r];var s=this;e.history.route(t,function(i){var a=s._extractParameters(t,i);if(s.execute(n,a,r)!==false){s.trigger.apply(s,["route:"+r].concat(a));s.trigger("route",r,a);e.history.trigger("route",s,r,a)}});return this},execute:function(t,e,i){if(t)t.apply(this,e)},navigate:function(t,i){e.history.navigate(t,i);return this},_bindRoutes:function(){if(!this.routes)return;this.routes=i.result(this,"routes");var t,e=i.keys(this.routes);while((t=e.pop())!=null){this.route(t,this.routes[t])}},_routeToRegExp:function(t){t=t.replace(j,"\\$&").replace(A,"(?:$1)?").replace(C,function(t,e){return e?t:"([^/?]+)"}).replace(R,"([^?]*?)");return new RegExp("^"+t+"(?:\\?([\\s\\S]*))?$")},_extractParameters:function(t,e){var r=t.exec(e).slice(1);return i.map(r,function(t,e){if(e===r.length-1)return t||null;return t?decodeURIComponent(t):null})}});var M=e.History=function(){this.handlers=[];this.checkUrl=i.bind(this.checkUrl,this);if(typeof window!=="undefined"){this.location=window.location;this.history=window.history}};var N=/^[#\/]|\s+$/g;var O=/^\/+|\/+$/g;var U=/#.*$/;M.started=false;i.extend(M.prototype,l,{interval:50,atRoot:function(){var t=this.location.pathname.replace(/[^\/]$/,"$&/");return t===this.root&&!this.getSearch()},matchRoot:function(){var t=this.decodeFragment(this.location.pathname);var e=t.slice(0,this.root.length-1)+"/";return e===this.root},decodeFragment:function(t){return decodeURI(t.replace(/%25/g,"%2525"))},getSearch:function(){var t=this.location.href.replace(/#.*/,"").match(/\?.+/);return t?t[0]:""},getHash:function(t){var e=(t||this).location.href.match(/#(.*)$/);return e?e[1]:""},getPath:function(){var t=this.decodeFragment(this.location.pathname+this.getSearch()).slice(this.root.length-1);return t.charAt(0)==="/"?t.slice(1):t},getFragment:function(t){if(t==null){if(this._usePushState||!this._wantsHashChange){t=this.getPath()}else{t=this.getHash()}}return t.replace(N,"")},start:function(t){if(M.started)throw new Error("Backbone.history has already been started");M.started=true;this.options=i.extend({root:"/"},this.options,t);this.root=this.options.root;this._wantsHashChange=this.options.hashChange!==false;this._hasHashChange="onhashchange"in window&&(document.documentMode===void 0||document.documentMode>7);this._useHashChange=this._wantsHashChange&&this._hasHashChange;this._wantsPushState=!!this.options.pushState;this._hasPushState=!!(this.history&&this.history.pushState);this._usePushState=this._wantsPushState&&this._hasPushState;this.fragment=this.getFragment();this.root=("/"+this.root+"/").replace(O,"/");if(this._wantsHashChange&&this._wantsPushState){if(!this._hasPushState&&!this.atRoot()){var e=this.root.slice(0,-1)||"/";this.location.replace(e+"#"+this.getPath());return true}else if(this._hasPushState&&this.atRoot()){this.navigate(this.getHash(),{replace:true})}}if(!this._hasHashChange&&this._wantsHashChange&&!this._usePushState){this.iframe=document.createElement("iframe");this.iframe.src="javascript:0";this.iframe.style.display="none";this.iframe.tabIndex=-1;var r=document.body;var n=r.insertBefore(this.iframe,r.firstChild).contentWindow;n.document.open();n.document.close();n.location.hash="#"+this.fragment}var s=window.addEventListener||function(t,e){return attachEvent("on"+t,e)};if(this._usePushState){s("popstate",this.checkUrl,false)}else if(this._useHashChange&&!this.iframe){s("hashchange",this.checkUrl,false)}else if(this._wantsHashChange){this._checkUrlInterval=setInterval(this.checkUrl,this.interval)}if(!this.options.silent)return this.loadUrl()},stop:function(){var t=window.removeEventListener||function(t,e){return detachEvent("on"+t,e)};if(this._usePushState){t("popstate",this.checkUrl,false)}else if(this._useHashChange&&!this.iframe){t("hashchange",this.checkUrl,false)}if(this.iframe){document.body.removeChild(this.iframe);this.iframe=null}if(this._checkUrlInterval)clearInterval(this._checkUrlInterval);M.started=false},route:function(t,e){this.handlers.unshift({route:t,callback:e})},checkUrl:function(t){var e=this.getFragment();if(e===this.fragment&&this.iframe){e=this.getHash(this.iframe.contentWindow)}if(e===this.fragment)return false;if(this.iframe)this.navigate(e);this.loadUrl()},loadUrl:function(t){if(!this.matchRoot())return false;t=this.fragment=this.getFragment(t);return i.some(this.handlers,function(e){if(e.route.test(t)){e.callback(t);return true}})},navigate:function(t,e){if(!M.started)return false;if(!e||e===true)e={trigger:!!e};t=this.getFragment(t||"");var i=this.root;if(t===""||t.charAt(0)==="?"){i=i.slice(0,-1)||"/"}var r=i+t;t=this.decodeFragment(t.replace(U,""));if(this.fragment===t)return;this.fragment=t;if(this._usePushState){this.history[e.replace?"replaceState":"pushState"]({},document.title,r)}else if(this._wantsHashChange){this._updateHash(this.location,t,e.replace);if(this.iframe&&t!==this.getHash(this.iframe.contentWindow)){var n=this.iframe.contentWindow;if(!e.replace){n.document.open();n.document.close()}this._updateHash(n.location,t,e.replace)}}else{return this.location.assign(r)}if(e.trigger)return this.loadUrl(t)},_updateHash:function(t,e,i){if(i){var r=t.href.replace(/(javascript:|#).*$/,"");t.replace(r+"#"+e)}else{t.hash="#"+e}}});e.history=new M;var q=function(t,e){var r=this;var n;if(t&&i.has(t,"constructor")){n=t.constructor}else{n=function(){return r.apply(this,arguments)}}i.extend(n,r,e);var s=function(){this.constructor=n};s.prototype=r.prototype;n.prototype=new s;if(t)i.extend(n.prototype,t);n.__super__=r.prototype;return n};y.extend=x.extend=$.extend=I.extend=M.extend=q;var F=function(){throw new Error('A "url" property or function must be specified')};var z=function(t,e){var i=e.error;e.error=function(r){if(i)i.call(e.context,t,r,e);t.trigger("error",t,r,e)}};return e});
//# sourceMappingURL=backbone-min.map

// Backbone.Radio v2.0.0-pre.1
!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n(require("underscore"),require("backbone")):"function"==typeof define&&define.amd?define(["underscore","backbone"],n):(e.Backbone=e.Backbone||{},e.Backbone.Radio=n(e._,e.Backbone))}(this,function(e,n){"use strict";function t(e,n,t,r){var o=e[n];return t&&t!==o.callback&&t!==o.callback._callback||r&&r!==o.context?void 0:(delete e[n],!0)}function r(n,r,o,i){n||(n={});for(var s=r?[r]:e.keys(n),u=!1,a=0,c=s.length;c>a;a++)r=s[a],n[r]&&t(n,r,o,i)&&(u=!0);return u}function o(n){return l[n]||(l[n]=e.partial(a.log,n))}function i(n){return e.isFunction(n)?n:function(){return n}}e="default"in e?e["default"]:e,n="default"in n?n["default"]:n;var s={};s["typeof"]="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};var u=n.Radio,a=n.Radio={};a.VERSION="2.0.0-pre.1",a.noConflict=function(){return n.Radio=u,this},a.DEBUG=!1,a._debugText=function(e,n,t){return e+(t?" on the "+t+" channel":"")+': "'+n+'"'},a.debugLog=function(e,n,t){a.DEBUG&&console&&console.warn&&console.warn(a._debugText(e,n,t))};var c=/\s+/;a._eventsApi=function(n,t,r,o){if(!r)return!1;var i={};if("object"===("undefined"==typeof r?"undefined":s["typeof"](r))){for(var u in r){var a=n[t].apply(n,[u,r[u]].concat(o));c.test(u)?e.extend(i,a):i[u]=a}return i}if(c.test(r)){for(var l=r.split(c),f=0,h=l.length;h>f;f++)i[l[f]]=n[t].apply(n,[l[f]].concat(o));return i}return!1},a._callHandler=function(e,n,t){var r=t[0],o=t[1],i=t[2];switch(t.length){case 0:return e.call(n);case 1:return e.call(n,r);case 2:return e.call(n,r,o);case 3:return e.call(n,r,o,i);default:return e.apply(n,t)}};var l={};e.extend(a,{log:function(n,t){if("undefined"!=typeof console){var r=e.drop(arguments,2);console.log("["+n+'] "'+t+'"',r)}},tuneIn:function(e){var n=a.channel(e);return n._tunedIn=!0,n.on("all",o(e)),this},tuneOut:function(e){var n=a.channel(e);return n._tunedIn=!1,n.off("all",o(e)),delete l[e],this}}),a.Requests={request:function(n){var t=e.rest(arguments),r=a._eventsApi(this,"request",n,t);if(r)return r;var o=this.channelName,i=this._requests;if(o&&this._tunedIn&&a.log.apply(this,[o,n].concat(t)),i&&(i[n]||i["default"])){var s=i[n]||i["default"];return t=i[n]?t:arguments,a._callHandler(s.callback,s.context,t)}a.debugLog("An unhandled request was fired",n,o)},reply:function(e,n,t){return a._eventsApi(this,"reply",e,[n,t])?this:(this._requests||(this._requests={}),this._requests[e]&&a.debugLog("A request was overwritten",e,this.channelName),this._requests[e]={callback:i(n),context:t||this},this)},replyOnce:function(n,t,r){if(a._eventsApi(this,"replyOnce",n,[t,r]))return this;var o=this,s=e.once(function(){return o.stopReplying(n),i(t).apply(this,arguments)});return this.reply(n,s,r)},stopReplying:function(e,n,t){return a._eventsApi(this,"stopReplying",e)?this:(e||n||t?r(this._requests,e,n,t)||a.debugLog("Attempted to remove the unregistered request",e,this.channelName):delete this._requests,this)}},a._channels={},a.channel=function(e){if(!e)throw new Error("You must provide a name for the channel.");return a._channels[e]?a._channels[e]:a._channels[e]=new a.Channel(e)},a.Channel=function(e){this.channelName=e},e.extend(a.Channel.prototype,n.Events,a.Requests,{reset:function(){return this.off(),this.stopListening(),this.stopReplying(),this}});var f,h,p=[n.Events,a.Requests];return e.each(p,function(n){e.each(n,function(n,t){a[t]=function(n){return h=e.rest(arguments),f=this.channel(n),f[t].apply(f,h)}})}),a.reset=function(n){var t=n?[this._channels[n]]:this._channels;e.invoke(t,"reset")},a});
//# sourceMappingURL=backbone.radio.min.js.map


// MarionetteJS (Backbone.Marionette)
// ----------------------------------
// v3.0.0
//
// Copyright (c)2016 Derick Bailey, Muted Solutions, LLC.
// Distributed under MIT license
//
// http://marionettejs.com
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("backbone"),require("underscore"),require("backbone.radio")):"function"==typeof define&&define.amd?define(["backbone","underscore","backbone.radio"],t):e.Marionette=e.Mn=t(e.Backbone,e._,e.Backbone.Radio)}(this,function(e,t,i){"use strict";function n(e,t,i){return i.toUpperCase()}function r(e){for(var i="on"+e.replace(k,n),r=D.call(this,i),s=void 0,o=arguments.length,h=Array(o>1?o-1:0),d=1;d<o;d++)h[d-1]=arguments[d];return t.isFunction(r)&&(s=r.apply(this,h)),this.trigger.apply(this,[e].concat(h)),s}function s(e){for(var i=t.isFunction(e.triggerMethod)?e.triggerMethod:r,n=arguments.length,s=Array(n>1?n-1:0),o=1;o<n;o++)s[o-1]=arguments[o];return i.apply(e,s)}function o(e,i,n){e._getImmediateChildren&&t.each(e._getImmediateChildren(),function(e){n(e)&&s(e,i,e)})}function h(e){return!e._isAttached}function d(e){return!!h(e)&&(e._isAttached=!0,!0)}function a(e){return e._isAttached}function l(e){return!!a(e)&&(e._isAttached=!1,!0)}function c(e){function t(){o(e,"before:attach",h)}function i(){o(e,"attach",d),u()}function n(){o(e,"before:detach",a)}function r(){o(e,"detach",l)}function c(){u()}function u(){e._isAttached&&e._isRendered&&s(e,"dom:refresh",e)}e._areViewEventsMonitored||(e._areViewEventsMonitored=!0,e.on({"before:attach":t,attach:i,"before:detach":n,detach:r,render:c}))}function u(e,i,n,r,s){var o=r.split(/\s+/);t.each(o,function(t){var r=e[t];if(!r)throw new F('Method "'+t+'" was configured as an event handler, but does not exist.');e[s](i,n,r)})}function f(e,i,n,r){if(i&&n){if(!t.isObject(n))throw new F({message:"Bindings must be an object.",url:"marionette.functions.html#marionettebindevents"});t.each(n,function(n,s){return t.isString(n)?void u(e,i,s,n,r):void e[r](i,s,n)})}}function g(e,t){return f(this,e,t,"listenTo"),this}function p(e,t){return f(this,e,t,"stopListening"),this}function v(e,i,n,r){if(i&&n){if(!t.isObject(n))throw new F({message:"Bindings must be an object.",url:"marionette.functions.html#marionettebindrequests"});var s=U.call(e,n);i[r](s,e)}}function _(e,t){return v(this,e,t,"reply"),this}function m(e,t){return v(this,e,t,"stopReplying"),this}function y(e,i){return e.behaviorClass?e.behaviorClass:t.isFunction(e)?e:t.isFunction(Ce.Behaviors.behaviorsLookup)?Ce.Behaviors.behaviorsLookup(e,i)[i]:Ce.Behaviors.behaviorsLookup[i]}function w(e,i){return t.chain(i).map(function(i,n){var r=y(i,n),s=i===r?{}:i,o=new r(s,e),h=w(e,t.result(o,"behaviors"));return[o].concat(h)}).flatten().value()}function E(e,i){return[e+t.uniqueId(".evt"),i].join(" ")}function b(e,i){t.isString(i)&&(i={event:i});var n=i.event,r=i.preventDefault!==!1,s=i.stopPropagation!==!1;return function(t){r&&t.preventDefault(),s&&t.stopPropagation(),e.triggerMethod(n,e)}}function V(e){e.supportsDestroyLifecycle||s(e,"before:destroy",e);var t=!!e._isAttached;t&&s(e,"before:detach",e),e.remove(),t&&(e._isAttached=!1,s(e,"detach",e)),e._isDestroyed=!0,e.supportsDestroyLifecycle||s(e,"destroy",e)}function C(){throw new F({message:"You must define where your behaviors are stored.",url:"marionette.behaviors.md#behaviorslookup"})}function R(e){return!!be[e]}function M(e,t){return be[e]=t}e="default"in e?e.default:e,t="default"in t?t.default:t,i="default"in i?i.default:i;var x="3.0.0",B=function(e){return function(t){for(var i=arguments.length,n=Array(i>1?i-1:0),r=1;r<i;r++)n[r-1]=arguments[r];return e.apply(t,n)}},I=e.Model.extend,A=function e(i,n){t.isObject(i)&&(i=i.prev+" is going to be removed in the future. Please use "+i.next+" instead."+(i.url?" See: "+i.url:"")),Ce.DEV_MODE&&(void 0!==n&&n||e._cache[i]||(e._warn("Deprecation warning: "+i),e._cache[i]=!0))};A._console="undefined"!=typeof console?console:{},A._warn=function(){var e=A._console.warn||A._console.log||t.noop;return e.apply(A._console,arguments)},A._cache={};var O=function(t){return e.$.contains(document.documentElement,t)},T=function(e,i){e&&t.extend(this,t.pick(e,i))},D=function(e){if(e)return this.options&&void 0!==this.options[e]?this.options[e]:this[e]},U=function(e){var i=this;return t.reduce(e,function(e,n,r){return t.isFunction(n)||(n=i[n]),n&&(e[r]=n),e},{})},k=/(^|:)(\w)/gi,$=["description","fileName","lineNumber","name","message","number"],F=I.call(Error,{urlRoot:"http://marionettejs.com/docs/v"+x+"/",constructor:function(e,i){t.isObject(e)?(i=e,e=i.message):i||(i={});var n=Error.call(this,e);t.extend(this,t.pick(n,$),t.pick(i,$)),this.captureStackTrace(),i.url&&(this.url=this.urlRoot+i.url)},captureStackTrace:function(){Error.captureStackTrace&&Error.captureStackTrace(this,F)},toString:function(){return this.name+": "+this.message+(this.url?" See: "+this.url:"")}});F.extend=I;var S=function(){for(var e=arguments.length,i=Array(e),n=0;n<e;n++)i[n]=arguments[n];this.options=t.extend.apply(t,[{},t.result(this,"options")].concat(i))},z={normalizeMethods:U,_setOptions:S,mergeOptions:T,getOption:D,bindEvents:g,unbindEvents:p},L={_initRadio:function(){var e=t.result(this,"channelName");if(e){if(!i)throw new F({name:"BackboneRadioMissing",message:'The dependency "backbone.radio" is missing.'});var n=this._channel=i.channel(e),r=t.result(this,"radioEvents");this.bindEvents(n,r);var s=t.result(this,"radioRequests");this.bindRequests(n,s),this.on("destroy",this._destroyRadio)}},_destroyRadio:function(){this._channel.stopReplying(null,null,this)},getChannel:function(){return this._channel},bindEvents:g,unbindEvents:p,bindRequests:_,unbindRequests:m},P=["channelName","radioEvents","radioRequests"],j=function(e){this._setOptions(e),this.mergeOptions(e,P),this.cid=t.uniqueId(this.cidPrefix),this._initRadio(),this.initialize.apply(this,arguments)};j.extend=I,t.extend(j.prototype,e.Events,z,L,{cidPrefix:"mno",_isDestroyed:!1,isDestroyed:function(){return this._isDestroyed},initialize:function(){},destroy:function(){if(this._isDestroyed)return this;for(var e=arguments.length,t=Array(e),i=0;i<e;i++)t[i]=arguments[i];return this.triggerMethod.apply(this,["before:destroy",this].concat(t)),this._isDestroyed=!0,this.triggerMethod.apply(this,["destroy",this].concat(t)),this.stopListening(),this},triggerMethod:r});var q=function(e){this.templateId=e};t.extend(q,{templateCaches:{},get:function(e,t){var i=this.templateCaches[e];return i||(i=new q(e),this.templateCaches[e]=i),i.load(t)},clear:function(){for(var e=void 0,t=arguments.length,i=Array(t),n=0;n<t;n++)i[n]=arguments[n];var r=i.length;if(r>0)for(e=0;e<r;e++)delete this.templateCaches[i[e]];else this.templateCaches={}}}),t.extend(q.prototype,{load:function(e){if(this.compiledTemplate)return this.compiledTemplate;var t=this.loadTemplate(this.templateId,e);return this.compiledTemplate=this.compileTemplate(t,e),this.compiledTemplate},loadTemplate:function(t,i){var n=e.$(t);if(!n.length)throw new F({name:"NoTemplateError",message:'Could not find template: "'+t+'"'});return n.html()},compileTemplate:function(e,i){return t.template(e,i)}});var N=t.invokeMap||t.invoke,H=function(e){if(Array.isArray(e)){for(var t=0,i=Array(e.length);t<e.length;t++)i[t]=e[t];return i}return Array.from(e)},K={_initBehaviors:function(){var e=t.result(this,"behaviors");this._behaviors=t.isObject(e)?w(this,e):{}},_getBehaviorTriggers:function(){var e=N(this._behaviors,"getTriggers");return t.extend.apply(t,[{}].concat(H(e)))},_getBehaviorEvents:function(){var e=N(this._behaviors,"getEvents");return t.extend.apply(t,[{}].concat(H(e)))},_proxyBehaviorViewProperties:function(){N(this._behaviors,"proxyViewProperties")},_delegateBehaviorEntityEvents:function(){N(this._behaviors,"delegateEntityEvents")},_undelegateBehaviorEntityEvents:function(){N(this._behaviors,"undelegateEntityEvents")},_destroyBehaviors:function(e){N.apply(void 0,[this._behaviors,"destroy"].concat(H(e)))},_bindBehaviorUIElements:function(){N(this._behaviors,"bindUIElements")},_unbindBehaviorUIElements:function(){N(this._behaviors,"unbindUIElements")},_triggerEventOnBehaviors:function(){for(var e=this._behaviors,t=arguments.length,i=Array(t),n=0;n<t;n++)i[n]=arguments[n];for(var s=0,o=e&&e.length;s<o;s++)r.apply(e[s],i)}},Y={_delegateEntityEvents:function(e,i){this._undelegateEntityEvents(e,i);var n=t.result(this,"modelEvents");g.call(this,e,n);var r=t.result(this,"collectionEvents");g.call(this,i,r)},_undelegateEntityEvents:function(e,i){var n=t.result(this,"modelEvents");p.call(this,e,n);var r=t.result(this,"collectionEvents");p.call(this,i,r)}},Z=/^(\S+)\s*(.*)$/,G=function(e){var t=e.match(Z);return E(t[1],t[2])},J={_getViewTriggers:function(e,i){return t.reduce(i,function(t,i,n){return n=G(n),t[n]=b(e,i),t},{})}},Q=function(e,i){return t.reduce(e,function(e,t,n){var r=W(n,i);return e[r]=t,e},{})},W=function(e,t){return e.replace(/@ui\.[a-zA-Z-_$0-9]*/g,function(e){return t[e.slice(4)]})},X=function e(i,n,r){return t.each(i,function(s,o){t.isString(s)?i[o]=W(s,n):t.isObject(s)&&t.isArray(r)&&(t.extend(s,e(t.pick(s,r),n)),t.each(r,function(e){var i=s[e];t.isString(i)&&(s[e]=W(i,n))}))}),i},ee={normalizeUIKeys:function(e){var t=this._getUIBindings();return Q(e,t)},normalizeUIValues:function(e,t){var i=this._getUIBindings();return X(e,i,t)},_getUIBindings:function(){var e=t.result(this,"_uiBindings"),i=t.result(this,"ui");return e||i},_bindUIElements:function(){var e=this;if(this.ui){this._uiBindings||(this._uiBindings=this.ui);var i=t.result(this,"_uiBindings");this._ui={},t.each(i,function(t,i){e._ui[i]=e.$(t)}),this.ui=this._ui}},_unbindUIElements:function(){var e=this;this.ui&&this._uiBindings&&(t.each(this.ui,function(t,i){delete e.ui[i]}),this.ui=this._uiBindings,delete this._uiBindings,delete this._ui)},_getUI:function(e){return this._ui[e]}},te={supportsRenderLifecycle:!0,supportsDestroyLifecycle:!0,_isDestroyed:!1,isDestroyed:function(){return!!this._isDestroyed},_isRendered:!1,isRendered:function(){return!!this._isRendered},_isAttached:!1,isAttached:function(){return!!this._isAttached},setElement:function(){var t=!!this.el;return e.View.prototype.setElement.apply(this,arguments),t&&(this._isRendered=!!this.$el.length,this._isAttached=O(this.el)),this},delegateEvents:function(i){this._proxyBehaviorViewProperties(),this._buildEventProxies();var n=this._getEvents(i);"undefined"==typeof i&&(this.events=n);var r=t.extend({},this._getBehaviorEvents(),n,this._getBehaviorTriggers(),this.getTriggers());return e.View.prototype.delegateEvents.call(this,r),this},_getEvents:function(e){var i=e||this.events;return t.isFunction(i)?this.normalizeUIKeys(i.call(this)):this.normalizeUIKeys(i)},getTriggers:function(){if(this.triggers){var e=this.normalizeUIKeys(t.result(this,"triggers"));return this._getViewTriggers(this,e)}},delegateEntityEvents:function(){return this._delegateEntityEvents(this.model,this.collection),this._delegateBehaviorEntityEvents(),this},undelegateEntityEvents:function(){return this._undelegateEntityEvents(this.model,this.collection),this._undelegateBehaviorEntityEvents(),this},_ensureViewIsIntact:function(){if(this._isDestroyed)throw new F({name:"ViewDestroyedError",message:'View (cid: "'+this.cid+'") has already been destroyed and cannot be used.'})},destroy:function(){if(this._isDestroyed)return this;for(var e=!!this._isAttached,t=arguments.length,i=Array(t),n=0;n<t;n++)i[n]=arguments[n];return this.triggerMethod.apply(this,["before:destroy",this].concat(i)),e&&this.triggerMethod("before:detach",this),this.unbindUIElements(),this._removeElement(),e&&(this._isAttached=!1,this.triggerMethod("detach",this)),this._removeChildren(),this._destroyBehaviors(i),this._isDestroyed=!0,this._isRendered=!1,this.triggerMethod.apply(this,["destroy",this].concat(i)),this.stopListening(),this},bindUIElements:function(){return this._bindUIElements(),this._bindBehaviorUIElements(),this},unbindUIElements:function(){return this._unbindUIElements(),this._unbindBehaviorUIElements(),this},getUI:function(e){return this._ensureViewIsIntact(),this._getUI(e)},childViewEventPrefix:"childview",triggerMethod:function(){for(var e=arguments.length,t=Array(e),i=0;i<e;i++)t[i]=arguments[i];var n=r.apply(this,t);return this._triggerEventOnBehaviors.apply(this,t),this._triggerEventOnParentLayout.apply(this,t),n},_buildEventProxies:function(){this._childViewEvents=t.result(this,"childViewEvents"),this._childViewTriggers=t.result(this,"childViewTriggers")},_triggerEventOnParentLayout:function(e){var i=this._parentView();if(i){for(var n=t.result(i,"childViewEventPrefix"),r=n+":"+e,s=arguments.length,o=Array(s>1?s-1:0),h=1;h<s;h++)o[h-1]=arguments[h];i.triggerMethod.apply(i,[r].concat(o));var d=i.normalizeMethods(i._childViewEvents);d&&t.isFunction(d[e])&&d[e].apply(i,o);var a=i._childViewTriggers;a&&t.isString(a[e])&&i.triggerMethod.apply(i,[a[e]].concat(o))}},_parentView:function(){for(var e=this._parent;e;){if(e instanceof he)return e;e=e._parent}}};t.extend(te,K,z,Y,J,ee);var ie=["allowMissingEl","parentEl","replaceElement"],ne=j.extend({cidPrefix:"mnr",replaceElement:!1,_isReplaced:!1,constructor:function(t){if(this._setOptions(t),this.mergeOptions(t,ie),this._initEl=this.el=this.getOption("el"),this.el=this.el instanceof e.$?this.el[0]:this.el,!this.el)throw new F({name:"NoElError",message:'An "el" must be specified for a region.'});this.$el=this.getEl(this.el),j.call(this,t)},show:function(e,t){if(this._ensureElement(t))return this._ensureView(e),e===this.currentView?this:(this.triggerMethod("before:show",this,e,t),c(e),this.empty(t),e.on("destroy",this.empty,this),e._parent=this,this._renderView(e),this._attachView(e,t),this.triggerMethod("show",this,e,t),this)},_renderView:function(e){e._isRendered||(e.supportsRenderLifecycle||s(e,"before:render",e),e.render(),e.supportsRenderLifecycle||(e._isRendered=!0,s(e,"render",e)))},_attachView:function(e){var i=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],n=!e._isAttached&&O(this.el),r="undefined"==typeof i.replaceElement?!!t.result(this,"replaceElement"):!!i.replaceElement;n&&s(e,"before:attach",e),this.attachHtml(e,r),n&&(e._isAttached=!0,s(e,"attach",e)),this.currentView=e},_ensureElement:function(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];if(t.isObject(this.el)||(this.$el=this.getEl(this.el),this.el=this.$el[0]),!this.$el||0===this.$el.length){var i="undefined"==typeof e.allowMissingEl?!!t.result(this,"allowMissingEl"):!!e.allowMissingEl;if(i)return!1;throw new F('An "el" must exist in DOM for this region '+this.cid)}return!0},_ensureView:function(e){if(!e)throw new F({name:"ViewNotValid",message:"The view passed is undefined and therefore invalid. You must pass a view instance to show."});if(e._isDestroyed)throw new F({name:"ViewDestroyedError",message:'View (cid: "'+e.cid+'") has already been destroyed and cannot be used.'})},getEl:function(i){return e.$(i,t.result(this,"parentEl"))},_replaceEl:function(e){this._restoreEl();var t=this.el.parentNode;t.replaceChild(e.el,this.el),this._isReplaced=!0},_restoreEl:function(){if(this._isReplaced){var e=this.currentView;if(e){var t=e.el.parentNode;t&&(t.replaceChild(this.el,e.el),this._isReplaced=!1)}}},isReplaced:function(){return!!this._isReplaced},attachHtml:function(e,t){t?this._replaceEl(e):this.el.appendChild(e.el)},empty:function(){var e=arguments.length<=0||void 0===arguments[0]?{allowMissingEl:!0}:arguments[0],t=this.currentView;return t?(t.off("destroy",this.empty,this),this.triggerMethod("before:empty",this,t),this._restoreEl(),delete this.currentView,t._isDestroyed||(this._removeView(t,e),delete t._parent),this.triggerMethod("empty",this,t),this):(this._ensureElement(e)&&this.detachHtml(),this)},_removeView:function(e){var t=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],i=t.preventDestroy,n=!!i;return n?void this._detachView(e):void(e.destroy?e.destroy():V(e))},_detachView:function(e){var t=!!e._isAttached;t&&s(e,"before:detach",e),this.detachHtml(),t&&(e._isAttached=!1,s(e,"detach",e))},detachHtml:function(){this.$el.contents().detach()},hasView:function(){return!!this.currentView},reset:function(e){return this.empty(e),this.$el&&(this.el=this._initEl),delete this.$el,this},destroy:function(e){return this.reset(e),j.prototype.destroy.apply(this,arguments)}}),re={regionClass:ne,_initRegions:function(){this.regions=this.regions||{},this._regions={},this.addRegions(t.result(this,"regions"))},_reInitRegions:function(){N(this._regions,"reset")},addRegion:function(e,t){var i={};return i[e]=t,this.addRegions(i)[e]},addRegions:function(e){if(!t.isEmpty(e))return e=this.normalizeUIValues(e,["selector","el"]),this.regions=t.extend({},this.regions,e),this._addRegions(e)},_addRegions:function(e){var i=this;return t.reduce(e,function(e,t,n){return e[n]=i._buildRegion(t),i._addRegion(e[n],n),e},{})},_buildRegion:function(e){return e instanceof ne?e:this._buildRegionFromDefinition(e)},_buildRegionFromDefinition:function(e){if(t.isString(e))return this._buildRegionFromObject({el:e});if(t.isFunction(e))return this._buildRegionFromRegionClass(e);if(t.isObject(e))return this._buildRegionFromObject(e);throw new F({message:"Improper region configuration type.",url:"marionette.region.html#region-configuration-types"})},_buildRegionFromObject:function(e){var i=e.regionClass||this.regionClass,n=t.omit(e,"regionClass");return t.defaults(n,{el:e.selector,parentEl:t.partial(t.result,this,"el")}),new i(n)},_buildRegionFromRegionClass:function(e){return new e({parentEl:t.partial(t.result,this,"el")})},_addRegion:function(e,t){this.triggerMethod("before:add:region",this,t,e),e._parent=this,this._regions[t]=e,this.triggerMethod("add:region",this,t,e)},removeRegion:function(e){var t=this._regions[e];return this._removeRegion(t,e),t},removeRegions:function(){var e=this.getRegions();return t.each(this._regions,t.bind(this._removeRegion,this)),e},_removeRegion:function(e,t){this.triggerMethod("before:remove:region",this,t,e),e.empty(),e.stopListening(),delete this.regions[t],delete this._regions[t],this.triggerMethod("remove:region",this,t,e)},emptyRegions:function(){var e=this.getRegions();return N(e,"empty"),e},hasRegion:function(e){return!!this.getRegion(e)},getRegion:function(e){return this._regions[e]},getRegions:function(){return t.clone(this._regions)},showChildView:function(e,t){for(var i=this.getRegion(e),n=arguments.length,r=Array(n>2?n-2:0),s=2;s<n;s++)r[s-2]=arguments[s];return i.show.apply(i,[t].concat(r))},getChildView:function(e){return this.getRegion(e).currentView}},se={render:function(e,i){if(!e)throw new F({name:"TemplateNotFoundError",message:"Cannot render the template since its false, null or undefined."});var n=t.isFunction(e)?e:q.get(e);return n(i)}},oe=["behaviors","childViewEventPrefix","childViewEvents","childViewTriggers","collectionEvents","events","modelEvents","regionClass","regions","template","templateContext","triggers","ui"],he=e.View.extend({constructor:function(i){this.render=t.bind(this.render,this),this._setOptions(i),this.mergeOptions(i,oe),c(this),this._initBehaviors(),this._initRegions();var n=Array.prototype.slice.call(arguments);n[0]=this.options,e.View.prototype.constructor.apply(this,n),this.delegateEntityEvents()},serializeData:function(){return this.model||this.collection?this.model?this.serializeModel():{items:this.serializeCollection()}:{}},serializeModel:function(){return this.model?t.clone(this.model.attributes):{}},serializeCollection:function(){return this.collection?this.collection.map(function(e){return t.clone(e.attributes)}):{}},render:function(){return this._ensureViewIsIntact(),this.triggerMethod("before:render",this),this._isRendered&&this._reInitRegions(),this._renderTemplate(),this.bindUIElements(),this._isRendered=!0,this.triggerMethod("render",this),this},_renderTemplate:function(){var e=this.getTemplate();if(e!==!1){var t=this.mixinTemplateContext(this.serializeData()),i=se.render(e,t,this);this.attachElContent(i)}},getTemplate:function(){return this.template},mixinTemplateContext:function(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],i=t.result(this,"templateContext");return t.extend(e,i)},attachElContent:function(e){return this.$el.html(e),this},_removeChildren:function(){this.removeRegions()},_getImmediateChildren:function(){return t.chain(this.getRegions()).map("currentView").compact().value()}});t.extend(he.prototype,te,re);var de=["forEach","each","map","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","toArray","first","initial","rest","last","without","isEmpty","pluck","reduce"],ae=function(e,i){t.each(de,function(n){e[n]=function(){var e=t.values(t.result(this,i)),r=[e].concat(t.toArray(arguments));return t[n].apply(t,r)}})},le=function(e){this._views={},this._indexByModel={},this._indexByCustom={},this._updateLength(),t.each(e,t.bind(this.add,this))};ae(le.prototype,"_views"),t.extend(le.prototype,{add:function(e,t){return this._add(e,t)._updateLength()},_add:function(e,t){var i=e.cid;return this._views[i]=e,e.model&&(this._indexByModel[e.model.cid]=i),t&&(this._indexByCustom[t]=i),this},findByModel:function(e){return this.findByModelCid(e.cid)},findByModelCid:function(e){var t=this._indexByModel[e];return this.findByCid(t)},findByCustom:function(e){var t=this._indexByCustom[e];return this.findByCid(t)},findByIndex:function(e){return t.values(this._views)[e]},findByCid:function(e){return this._views[e]},remove:function(e){return this._remove(e)._updateLength()},_remove:function(e){var i=e.cid;return e.model&&delete this._indexByModel[e.model.cid],t.some(this._indexByCustom,t.bind(function(e,t){if(e===i)return delete this._indexByCustom[t],!0},this)),delete this._views[i],this},_updateLength:function(){return this.length=t.size(this._views),this}});var ce=["behaviors","childView","childViewEventPrefix","childViewEvents","childViewOptions","childViewTriggers","collectionEvents","events","filter","emptyView","emptyViewOptions","modelEvents","reorderOnSort","sort","triggers","ui","viewComparator"],ue=e.View.extend({sort:!0,constructor:function(i){this.render=t.bind(this.render,this),this._setOptions(i),this.mergeOptions(i,ce),c(this),this._initBehaviors(),this.once("render",this._initialEvents),this._initChildViewStorage(),this._bufferedChildren=[];var n=Array.prototype.slice.call(arguments);n[0]=this.options,e.View.prototype.constructor.apply(this,n),this.delegateEntityEvents()},_startBuffering:function(){this._isBuffering=!0},_endBuffering:function(){var e=!!this._isAttached,i=e?this._getImmediateChildren():[];this._isBuffering=!1,t.each(i,function(e){s(e,"before:attach",e)}),this.attachBuffer(this,this._createBuffer()),t.each(i,function(e){e._isAttached=!0,s(e,"attach",e)}),this._bufferedChildren=[]},_getImmediateChildren:function(){return t.values(this.children._views)},_initialEvents:function(){this.collection&&(this.listenTo(this.collection,"add",this._onCollectionAdd),this.listenTo(this.collection,"remove",this._onCollectionRemove),this.listenTo(this.collection,"reset",this.render),this.sort&&this.listenTo(this.collection,"sort",this._sortViews))},_onCollectionAdd:function(e,i,n){var r=void 0!==n.at&&(n.index||i.indexOf(e));if((this.filter||r===!1)&&(r=t.indexOf(this._filteredSortedModels(r),e)),this._shouldAddChild(e,r)){this._destroyEmptyView();var s=this._getChildView(e);this._addChild(e,s,r)}},_onCollectionRemove:function(e){var t=this.children.findByModel(e);this.removeChildView(t),this._checkEmpty()},render:function(){return this._ensureViewIsIntact(),this.triggerMethod("before:render",this),this._renderChildren(),this._isRendered=!0,this.triggerMethod("render",this),this},setFilter:function(e){var t=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],i=t.preventRender,n=this._isRendered&&!this._isDestroyed,r=this.filter!==e,s=n&&r&&!i;if(s){var o=this._filteredSortedModels();this.filter=e;var h=this._filteredSortedModels();this._applyModelDeltas(h,o)}else this.filter=e;return this},removeFilter:function(e){return this.setFilter(null,e)},_applyModelDeltas:function(e,i){var n=this,r={};t.each(e,function(e,t){var i=!n.children.findByModel(e);i&&n._onCollectionAdd(e,n.collection,{at:t}),r[e.cid]=!0}),t.each(i,function(e){var t=!r[e.cid]&&n.children.findByModel(e);t&&n._onCollectionRemove(e)})},reorder:function(){var e=this,i=this.children,n=this._filteredSortedModels();if(!n.length&&this._showingEmptyView)return this;var r=t.some(n,function(e){return!i.findByModel(e)});return r?this.render():!function(){var r=t.map(n,function(e,t){var n=i.findByModel(e);return n._index=t,n.el}),s=i.filter(function(e){return!t.contains(r,e.el)});e.triggerMethod("before:reorder",e),e._appendReorderedChildren(r),t.each(s,t.bind(e.removeChildView,e)),e._checkEmpty(),e.triggerMethod("reorder",e)}(),this},resortView:function(){return this.reorderOnSort?this.reorder():this._renderChildren(),this},_sortViews:function(){var e=this,i=this._filteredSortedModels(),n=t.find(i,function(t,i){var n=e.children.findByModel(t);return!n||n._index!==i});n&&this.resortView()},_emptyViewIndex:-1,_appendReorderedChildren:function(e){this.$el.append(e)},_renderChildren:function(){this._isRendered&&(this._destroyEmptyView(),this._destroyChildren({checkEmpty:!1}));var e=this._filteredSortedModels();this.isEmpty({processedModels:e})?this._showEmptyView():(this.triggerMethod("before:render:children",this),this._startBuffering(),this._showCollection(e),this._endBuffering(),this.triggerMethod("render:children",this))},_showCollection:function(e){var i=this;t.each(e,function(e,t){var n=i._getChildView(e);i._addChild(e,n,t)})},_filteredSortedModels:function(e){if(!this.collection||!this.collection.length)return[];var t=this.getViewComparator(),i=this.collection.models;if(e=Math.min(Math.max(e,0),i.length-1),t){var n=void 0;e&&(n=i[e],i=i.slice(0,e).concat(i.slice(e+1))),i=this._sortModelsBy(i,t),n&&i.splice(e,0,n)}return i=this._filterModels(i)},getViewComparator:function(){return this.viewComparator},_filterModels:function(e){var i=this;return this.filter&&(e=t.filter(e,function(e,t){return i._shouldAddChild(e,t)})),e},_sortModelsBy:function(e,i){return"string"==typeof i?t.sortBy(e,function(e){return e.get(i)}):1===i.length?t.sortBy(e,t.bind(i,this)):e.sort(t.bind(i,this))},_showEmptyView:function(){var i=this._getEmptyView();if(i&&!this._showingEmptyView){this._showingEmptyView=!0;var n=new e.Model,r=this.emptyViewOptions||this.childViewOptions;t.isFunction(r)&&(r=r.call(this,n,this._emptyViewIndex));var s=this.buildChildView(n,i,r);this.triggerMethod("before:render:empty",this,s),this._addChildView(s,0),this.triggerMethod("render:empty",this,s),s._parent=this}},_destroyEmptyView:function(){this._showingEmptyView&&(this.triggerMethod("before:remove:empty",this),this._destroyChildren(),delete this._showingEmptyView,this.triggerMethod("remove:empty",this))},_getEmptyView:function(){var e=this.emptyView;if(e)return this._getView(e)},_getChildView:function(e){var t=this.childView;if(!t)throw new F({name:"NoChildViewError",message:'A "childView" must be specified'});if(t=this._getView(t,e),!t)throw new F({name:"InvalidChildViewError",message:'"childView" must be a view class or a function that returns a view class'});return t},_getView:function(i,n){return i.prototype instanceof e.View||i===e.View?i:t.isFunction(i)?i.call(this,n):void 0},_addChild:function(e,t,i){var n=this._getChildViewOptions(e,i),r=this.buildChildView(e,t,n);return this.addChildView(r,i),r},_getChildViewOptions:function(e,i){return t.isFunction(this.childViewOptions)?this.childViewOptions(e,i):this.childViewOptions},addChildView:function(e,t){return this.triggerMethod("before:add:child",this,e),this._updateIndices(e,!0,t),e._parent=this,this._addChildView(e,t),this.triggerMethod("add:child",this,e),e},_updateIndices:function(e,t,i){this.sort&&(t&&(e._index=i),this.children.each(function(i){i._index>=e._index&&(i._index+=t?1:-1)}))},_addChildView:function(e,t){var i=!this._isBuffering&&this._isAttached;c(e),this._proxyChildEvents(e),this.children.add(e),e.supportsRenderLifecycle||s(e,"before:render",e),e.render(),e.supportsRenderLifecycle||(e._isRendered=!0,s(e,"render",e)),i&&s(e,"before:attach",e),this.attachHtml(this,e,t),i&&(e._isAttached=!0,s(e,"attach",e))},buildChildView:function(e,i,n){var r=t.extend({model:e},n);return new i(r)},removeChildView:function(e){return!e||e._isDestroyed?e:(this.triggerMethod("before:remove:child",this,e),e.destroy?e.destroy():V(e),delete e._parent,this.stopListening(e),this.children.remove(e),this.triggerMethod("remove:child",this,e),this._updateIndices(e,!1),e)},isEmpty:function(e){var i=void 0;return t.result(e,"processedModels")?i=e.processedModels:(i=this.collection?this.collection.models:[],i=this._filterModels(i)),0===i.length},_checkEmpty:function(){this.isEmpty()&&this._showEmptyView()},attachBuffer:function(e,t){e.$el.append(t)},_createBuffer:function(){var e=document.createDocumentFragment();return t.each(this._bufferedChildren,function(t){e.appendChild(t.el)}),e},attachHtml:function(e,t,i){e._isBuffering?e._bufferedChildren.splice(i,0,t):e._insertBefore(t,i)||e._insertAfter(t)},_insertBefore:function(e,t){var i=void 0,n=this.sort&&t<this.children.length-1;return n&&(i=this.children.find(function(e){return e._index===t+1})),!!i&&(i.$el.before(e.el),!0)},_insertAfter:function(e){this.$el.append(e.el)},_initChildViewStorage:function(){this.children=new le},_removeChildren:function(){this._destroyChildren({checkEmpty:!1})},_destroyChildren:function(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],i=e.checkEmpty;this.triggerMethod("before:destroy:children",this);var n=i!==!1,r=this.children.map(t.identity);return this.children.each(t.bind(this.removeChildView,this)),n&&this._checkEmpty(),this.triggerMethod("destroy:children",this),r},_shouldAddChild:function(e,i){var n=this.filter;return!t.isFunction(n)||n.call(this,e,i,this.collection)},_proxyChildEvents:function(e){var i=this,n=t.result(this,"childViewEventPrefix");this.listenTo(e,"all",function(e){for(var r=arguments.length,s=Array(r>1?r-1:0),o=1;o<r;o++)s[o-1]=arguments[o];var h=n+":"+e,d=i.normalizeMethods(i._childViewEvents);"undefined"!=typeof d&&t.isFunction(d[e])&&d[e].apply(i,s);var a=i._childViewTriggers;a&&t.isString(a[e])&&i.triggerMethod.apply(i,[a[e]].concat(s)),i.triggerMethod.apply(i,[h].concat(s))})}});t.extend(ue.prototype,te);var fe=["childViewContainer","template","templateContext"],ge=ue.extend({constructor:function(e){A("CompositeView is deprecated. Convert to View at your earliest convenience"),this.mergeOptions(e,fe),ue.prototype.constructor.apply(this,arguments)},_initialEvents:function(){this.collection&&(this.listenTo(this.collection,"add",this._onCollectionAdd),this.listenTo(this.collection,"remove",this._onCollectionRemove),this.listenTo(this.collection,"reset",this.renderChildren),this.sort&&this.listenTo(this.collection,"sort",this._sortViews))},_getChildView:function(e){var t=this.childView;if(!t)return this.constructor;if(t=this._getView(t,e),!t)throw new F({name:"InvalidChildViewError",message:'"childView" must be a view class or a function that returns a view class'});return t},serializeData:function(){return this.serializeModel()},render:function(){return this._ensureViewIsIntact(),this._isRendering=!0,this.resetChildViewContainer(),this.triggerMethod("before:render",this),this._renderTemplate(),this.bindUIElements(),this.renderChildren(),this._isRendering=!1,this._isRendered=!0,this.triggerMethod("render",this),this},renderChildren:function(){(this._isRendered||this._isRendering)&&ue.prototype._renderChildren.call(this)},attachBuffer:function(e,t){var i=this.getChildViewContainer(e);i.append(t)},_insertAfter:function(e){var t=this.getChildViewContainer(this,e);t.append(e.el)},_appendReorderedChildren:function(e){var t=this.getChildViewContainer(this);t.append(e)},getChildViewContainer:function(e,i){if(e.$childViewContainer)return e.$childViewContainer;var n=void 0,r=e.childViewContainer;if(r){var s=t.result(e,"childViewContainer");if(n="@"===s.charAt(0)&&e.ui?e.ui[s.substr(4)]:e.$(s),n.length<=0)throw new F({name:"ChildViewContainerMissingError",
message:'The specified "childViewContainer" was not found: '+e.childViewContainer})}else n=e.$el;return e.$childViewContainer=n,n},resetChildViewContainer:function(){this.$childViewContainer&&(this.$childViewContainer=void 0)}}),pe=t.pick(he.prototype,"serializeModel","getTemplate","_renderTemplate","mixinTemplateContext","attachElContent");t.extend(ge.prototype,pe);var ve=["collectionEvents","events","modelEvents","triggers","ui"],_e=j.extend({cidPrefix:"mnb",constructor:function(e,i){this.view=i,this.defaults=t.clone(t.result(this,"defaults",{})),this._setOptions(this.defaults,e),this.mergeOptions(this.options,ve),this.ui=t.extend({},t.result(this,"ui"),t.result(i,"ui")),j.apply(this,arguments)},$:function(){return this.view.$.apply(this.view,arguments)},destroy:function(){return this.stopListening(),this},proxyViewProperties:function(){return this.$el=this.view.$el,this.el=this.view.el,this},bindUIElements:function(){return this._bindUIElements(),this},unbindUIElements:function(){return this._unbindUIElements(),this},getUI:function(e){return this.view._ensureViewIsIntact(),this._getUI(e)},delegateEntityEvents:function(){return this._delegateEntityEvents(this.view.model,this.view.collection),this},undelegateEntityEvents:function(){return this._undelegateEntityEvents(this.view.model,this.view.collection),this},getEvents:function(){var e=this.normalizeUIKeys(t.result(this,"events"));return t.reduce(e,function(e,i,n){if(t.isFunction(i)||(i=this[i]),i)return n=G(n),e[n]=t.bind(i,this),e},{},this)},getTriggers:function(){if(this.triggers){var e=this.normalizeUIKeys(t.result(this,"triggers"));return this._getViewTriggers(this.view,e)}}});t.extend(_e.prototype,Y,J,ee);var me=["region","regionClass"],ye=j.extend({cidPrefix:"mna",constructor:function(e){this._setOptions(e),this.mergeOptions(e,me),this._initRegion(),j.prototype.constructor.apply(this,arguments)},regionClass:ne,_initRegion:function(e){var i=this.region,n=this.regionClass;return t.isString(i)?void(this._region=new n({el:i})):void(this._region=i)},getRegion:function(){return this._region},showView:function(e){for(var t=this.getRegion(),i=arguments.length,n=Array(i>1?i-1:0),r=1;r<i;r++)n[r-1]=arguments[r];return t.show.apply(t,[e].concat(n))},getView:function(){return this.getRegion().currentView},start:function(e){return this.triggerMethod("before:start",this,e),this.triggerMethod("start",this,e),this}}),we=["appRoutes","controller"],Ee=e.Router.extend({constructor:function(t){this._setOptions(t),this.mergeOptions(t,we),e.Router.apply(this,arguments);var i=this.appRoutes,n=this._getController();this.processAppRoutes(n,i),this.on("route",this._processOnRoute,this)},appRoute:function(e,t){var i=this._getController();return this._addAppRoute(i,e,t),this},_processOnRoute:function(e,i){if(t.isFunction(this.onRoute)){var n=t.invert(this.appRoutes)[e];this.onRoute(e,n,i)}},processAppRoutes:function(e,i){var n=this;if(!i)return this;var r=t.keys(i).reverse();return t.each(r,function(t){n._addAppRoute(e,t,i[t])}),this},_getController:function(){return this.controller},_addAppRoute:function(e,i,n){var r=e[n];if(!r)throw new F('Method "'+n+'" was not found on the controller');this.route(i,n,t.bind(r,e))},triggerMethod:r});t.extend(Ee.prototype,z);var be={},Ve=e.Marionette,Ce=e.Marionette={};return Ce.noConflict=function(){return e.Marionette=Ve,this},Ce.bindEvents=B(g),Ce.unbindEvents=B(p),Ce.bindRequests=B(_),Ce.unbindRequests=B(m),Ce.mergeOptions=B(T),Ce.getOption=B(D),Ce.normalizeMethods=B(U),Ce.extend=I,Ce.isNodeAttached=O,Ce.deprecate=A,Ce.triggerMethod=B(r),Ce.triggerMethodOn=s,Ce.isEnabled=R,Ce.setEnabled=M,Ce.monitorViewEvents=c,Ce.Behaviors={},Ce.Behaviors.behaviorsLookup=C,Ce.Application=ye,Ce.AppRouter=Ee,Ce.Renderer=se,Ce.TemplateCache=q,Ce.View=he,Ce.CollectionView=ue,Ce.CompositeView=ge,Ce.Behavior=_e,Ce.Region=ne,Ce.Error=F,Ce.Object=j,Ce.DEV_MODE=!1,Ce.FEATURES=be,Ce.VERSION=x,Ce});
//# sourceMappingURL=backbone.marionette.min.js.map


/*! jshashes - New BSD License - https://github.com/h2non/jshashes */
(function(){var n;function e(n){var e,t,r="",o=-1,f;if(n&&n.length){f=n.length;while((o+=1)<f){e=n.charCodeAt(o);t=o+1<f?n.charCodeAt(o+1):0;if(55296<=e&&e<=56319&&56320<=t&&t<=57343){e=65536+((e&1023)<<10)+(t&1023);o+=1}if(e<=127){r+=String.fromCharCode(e)}else if(e<=2047){r+=String.fromCharCode(192|e>>>6&31,128|e&63)}else if(e<=65535){r+=String.fromCharCode(224|e>>>12&15,128|e>>>6&63,128|e&63)}else if(e<=2097151){r+=String.fromCharCode(240|e>>>18&7,128|e>>>12&63,128|e>>>6&63,128|e&63)}}}return r}function t(n){var e,t,r,o,f,i=[],h;e=t=r=o=f=0;if(n&&n.length){h=n.length;n+="";while(e<h){r=n.charCodeAt(e);t+=1;if(r<128){i[t]=String.fromCharCode(r);e+=1}else if(r>191&&r<224){o=n.charCodeAt(e+1);i[t]=String.fromCharCode((r&31)<<6|o&63);e+=2}else{o=n.charCodeAt(e+1);f=n.charCodeAt(e+2);i[t]=String.fromCharCode((r&15)<<12|(o&63)<<6|f&63);e+=3}}}return i.join("")}function r(n,e){var t=(n&65535)+(e&65535),r=(n>>16)+(e>>16)+(t>>16);return r<<16|t&65535}function o(n,e){return n<<e|n>>>32-e}function f(n,e){var t=e?"0123456789ABCDEF":"0123456789abcdef",r="",o,f=0,i=n.length;for(;f<i;f+=1){o=n.charCodeAt(f);r+=t.charAt(o>>>4&15)+t.charAt(o&15)}return r}function i(n){var e,t=n.length,r="";for(e=0;e<t;e+=1){r+=String.fromCharCode(n.charCodeAt(e)&255,n.charCodeAt(e)>>>8&255)}return r}function h(n){var e,t=n.length,r="";for(e=0;e<t;e+=1){r+=String.fromCharCode(n.charCodeAt(e)>>>8&255,n.charCodeAt(e)&255)}return r}function u(n){var e,t=n.length*32,r="";for(e=0;e<t;e+=8){r+=String.fromCharCode(n[e>>5]>>>24-e%32&255)}return r}function a(n){var e,t=n.length*32,r="";for(e=0;e<t;e+=8){r+=String.fromCharCode(n[e>>5]>>>e%32&255)}return r}function c(n){var e,t=n.length*8,r=Array(n.length>>2),o=r.length;for(e=0;e<o;e+=1){r[e]=0}for(e=0;e<t;e+=8){r[e>>5]|=(n.charCodeAt(e/8)&255)<<e%32}return r}function l(n){var e,t=n.length*8,r=Array(n.length>>2),o=r.length;for(e=0;e<o;e+=1){r[e]=0}for(e=0;e<t;e+=8){r[e>>5]|=(n.charCodeAt(e/8)&255)<<24-e%32}return r}function D(n,e){var t=e.length,r=Array(),o,f,i,h,u,a,c,l;a=Array(Math.ceil(n.length/2));h=a.length;for(o=0;o<h;o+=1){a[o]=n.charCodeAt(o*2)<<8|n.charCodeAt(o*2+1)}while(a.length>0){u=Array();i=0;for(o=0;o<a.length;o+=1){i=(i<<16)+a[o];f=Math.floor(i/t);i-=f*t;if(u.length>0||f>0){u[u.length]=f}}r[r.length]=i;a=u}c="";for(o=r.length-1;o>=0;o--){c+=e.charAt(r[o])}l=Math.ceil(n.length*8/(Math.log(e.length)/Math.log(2)));for(o=c.length;o<l;o+=1){c=e[0]+c}return c}function B(n,e){var t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",r="",o=n.length,f,i,h;e=e||"=";for(f=0;f<o;f+=3){h=n.charCodeAt(f)<<16|(f+1<o?n.charCodeAt(f+1)<<8:0)|(f+2<o?n.charCodeAt(f+2):0);for(i=0;i<4;i+=1){if(f*8+i*6>n.length*8){r+=e}else{r+=t.charAt(h>>>6*(3-i)&63)}}}return r}n={VERSION:"1.0.6",Base64:function(){var n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",r="=",o=false,f=true;this.encode=function(t){var o,i,h,u="",a=t.length;r=r||"=";t=f?e(t):t;for(o=0;o<a;o+=3){h=t.charCodeAt(o)<<16|(o+1<a?t.charCodeAt(o+1)<<8:0)|(o+2<a?t.charCodeAt(o+2):0);for(i=0;i<4;i+=1){if(o*8+i*6>a*8){u+=r}else{u+=n.charAt(h>>>6*(3-i)&63)}}}return u};this.decode=function(e){var o,i,h,u,a,c,l,D,B,C,A="",s=[];if(!e){return e}o=C=0;e=e.replace(new RegExp("\\"+r,"gi"),"");do{a=n.indexOf(e.charAt(o+=1));c=n.indexOf(e.charAt(o+=1));l=n.indexOf(e.charAt(o+=1));D=n.indexOf(e.charAt(o+=1));B=a<<18|c<<12|l<<6|D;i=B>>16&255;h=B>>8&255;u=B&255;C+=1;if(l===64){s[C]=String.fromCharCode(i)}else if(D===64){s[C]=String.fromCharCode(i,h)}else{s[C]=String.fromCharCode(i,h,u)}}while(o<e.length);A=s.join("");A=f?t(A):A;return A};this.setPad=function(n){r=n||r;return this};this.setTab=function(e){n=e||n;return this};this.setUTF8=function(n){if(typeof n==="boolean"){f=n}return this}},CRC32:function(n){var t=0,r=0,o=0,f,i,h;n=e(n);f=["00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 ","79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 ","84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F ","63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD ","A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC ","51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 ","B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 ","06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 ","E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 ","12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 ","D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 ","33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 ","CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 ","9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E ","7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D ","806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 ","60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA ","AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 ","5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 ","B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 ","05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 ","F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA ","11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 ","D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F ","30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E ","C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D"].join("");t=t^-1;for(i=0,h=n.length;i<h;i+=1){o=(t^n.charCodeAt(i))&255;r="0x"+f.substr(o*9,8);t=t>>>8^r}return(t^-1)>>>0},MD5:function(n){var t=n&&typeof n.uppercase==="boolean"?n.uppercase:false,i=n&&typeof n.pad==="string"?n.pad:"=",h=n&&typeof n.utf8==="boolean"?n.utf8:true;this.hex=function(n){return f(u(n,h),t)};this.b64=function(n){return B(u(n),i)};this.any=function(n,e){return D(u(n,h),e)};this.raw=function(n){return u(n,h)};this.hex_hmac=function(n,e){return f(l(n,e),t)};this.b64_hmac=function(n,e){return B(l(n,e),i)};this.any_hmac=function(n,e,t){return D(l(n,e),t)};this.vm_test=function(){return hex("abc").toLowerCase()==="900150983cd24fb0d6963f7d28e17f72"};this.setUpperCase=function(n){if(typeof n==="boolean"){t=n}return this};this.setPad=function(n){i=n||i;return this};this.setUTF8=function(n){if(typeof n==="boolean"){h=n}return this};function u(n){n=h?e(n):n;return a(C(c(n),n.length*8))}function l(n,t){var r,o,f,i,u;n=h?e(n):n;t=h?e(t):t;r=c(n);if(r.length>16){r=C(r,n.length*8)}o=Array(16),f=Array(16);for(u=0;u<16;u+=1){o[u]=r[u]^909522486;f[u]=r[u]^1549556828}i=C(o.concat(c(t)),512+t.length*8);return a(C(f.concat(i),512+128))}function C(n,e){var t,o,f,i,h,u=1732584193,a=-271733879,c=-1732584194,l=271733878;n[e>>5]|=128<<e%32;n[(e+64>>>9<<4)+14]=e;for(t=0;t<n.length;t+=16){o=u;f=a;i=c;h=l;u=s(u,a,c,l,n[t+0],7,-680876936);l=s(l,u,a,c,n[t+1],12,-389564586);c=s(c,l,u,a,n[t+2],17,606105819);a=s(a,c,l,u,n[t+3],22,-1044525330);u=s(u,a,c,l,n[t+4],7,-176418897);l=s(l,u,a,c,n[t+5],12,1200080426);c=s(c,l,u,a,n[t+6],17,-1473231341);a=s(a,c,l,u,n[t+7],22,-45705983);u=s(u,a,c,l,n[t+8],7,1770035416);l=s(l,u,a,c,n[t+9],12,-1958414417);c=s(c,l,u,a,n[t+10],17,-42063);a=s(a,c,l,u,n[t+11],22,-1990404162);u=s(u,a,c,l,n[t+12],7,1804603682);l=s(l,u,a,c,n[t+13],12,-40341101);c=s(c,l,u,a,n[t+14],17,-1502002290);a=s(a,c,l,u,n[t+15],22,1236535329);u=w(u,a,c,l,n[t+1],5,-165796510);l=w(l,u,a,c,n[t+6],9,-1069501632);c=w(c,l,u,a,n[t+11],14,643717713);a=w(a,c,l,u,n[t+0],20,-373897302);u=w(u,a,c,l,n[t+5],5,-701558691);l=w(l,u,a,c,n[t+10],9,38016083);c=w(c,l,u,a,n[t+15],14,-660478335);a=w(a,c,l,u,n[t+4],20,-405537848);u=w(u,a,c,l,n[t+9],5,568446438);l=w(l,u,a,c,n[t+14],9,-1019803690);c=w(c,l,u,a,n[t+3],14,-187363961);a=w(a,c,l,u,n[t+8],20,1163531501);u=w(u,a,c,l,n[t+13],5,-1444681467);l=w(l,u,a,c,n[t+2],9,-51403784);c=w(c,l,u,a,n[t+7],14,1735328473);a=w(a,c,l,u,n[t+12],20,-1926607734);u=F(u,a,c,l,n[t+5],4,-378558);l=F(l,u,a,c,n[t+8],11,-2022574463);c=F(c,l,u,a,n[t+11],16,1839030562);a=F(a,c,l,u,n[t+14],23,-35309556);u=F(u,a,c,l,n[t+1],4,-1530992060);l=F(l,u,a,c,n[t+4],11,1272893353);c=F(c,l,u,a,n[t+7],16,-155497632);a=F(a,c,l,u,n[t+10],23,-1094730640);u=F(u,a,c,l,n[t+13],4,681279174);l=F(l,u,a,c,n[t+0],11,-358537222);c=F(c,l,u,a,n[t+3],16,-722521979);a=F(a,c,l,u,n[t+6],23,76029189);u=F(u,a,c,l,n[t+9],4,-640364487);l=F(l,u,a,c,n[t+12],11,-421815835);c=F(c,l,u,a,n[t+15],16,530742520);a=F(a,c,l,u,n[t+2],23,-995338651);u=E(u,a,c,l,n[t+0],6,-198630844);l=E(l,u,a,c,n[t+7],10,1126891415);c=E(c,l,u,a,n[t+14],15,-1416354905);a=E(a,c,l,u,n[t+5],21,-57434055);u=E(u,a,c,l,n[t+12],6,1700485571);l=E(l,u,a,c,n[t+3],10,-1894986606);c=E(c,l,u,a,n[t+10],15,-1051523);a=E(a,c,l,u,n[t+1],21,-2054922799);u=E(u,a,c,l,n[t+8],6,1873313359);l=E(l,u,a,c,n[t+15],10,-30611744);c=E(c,l,u,a,n[t+6],15,-1560198380);a=E(a,c,l,u,n[t+13],21,1309151649);u=E(u,a,c,l,n[t+4],6,-145523070);l=E(l,u,a,c,n[t+11],10,-1120210379);c=E(c,l,u,a,n[t+2],15,718787259);a=E(a,c,l,u,n[t+9],21,-343485551);u=r(u,o);a=r(a,f);c=r(c,i);l=r(l,h)}return Array(u,a,c,l)}function A(n,e,t,f,i,h){return r(o(r(r(e,n),r(f,h)),i),t)}function s(n,e,t,r,o,f,i){return A(e&t|~e&r,n,e,o,f,i)}function w(n,e,t,r,o,f,i){return A(e&r|t&~r,n,e,o,f,i)}function F(n,e,t,r,o,f,i){return A(e^t^r,n,e,o,f,i)}function E(n,e,t,r,o,f,i){return A(t^(e|~r),n,e,o,f,i)}},SHA1:function(n){var t=n&&typeof n.uppercase==="boolean"?n.uppercase:false,i=n&&typeof n.pad==="string"?n.pad:"=",h=n&&typeof n.utf8==="boolean"?n.utf8:true;this.hex=function(n){return f(a(n,h),t)};this.b64=function(n){return B(a(n,h),i)};this.any=function(n,e){return D(a(n,h),e)};this.raw=function(n){return a(n,h)};this.hex_hmac=function(n,e){return f(c(n,e))};this.b64_hmac=function(n,e){return B(c(n,e),i)};this.any_hmac=function(n,e,t){return D(c(n,e),t)};this.vm_test=function(){return hex("abc").toLowerCase()==="900150983cd24fb0d6963f7d28e17f72"};this.setUpperCase=function(n){if(typeof n==="boolean"){t=n}return this};this.setPad=function(n){i=n||i;return this};this.setUTF8=function(n){if(typeof n==="boolean"){h=n}return this};function a(n){n=h?e(n):n;return u(C(l(n),n.length*8))}function c(n,t){var r,o,f,i,a;n=h?e(n):n;t=h?e(t):t;r=l(n);if(r.length>16){r=C(r,n.length*8)}o=Array(16),f=Array(16);for(i=0;i<16;i+=1){o[i]=r[i]^909522486;f[i]=r[i]^1549556828}a=C(o.concat(l(t)),512+t.length*8);return u(C(f.concat(a),512+160))}function C(n,e){var t,f,i,h,u,a,c,l,D=Array(80),B=1732584193,C=-271733879,w=-1732584194,F=271733878,E=-1009589776;n[e>>5]|=128<<24-e%32;n[(e+64>>9<<4)+15]=e;for(t=0;t<n.length;t+=16){h=B;u=C;a=w;c=F;l=E;for(f=0;f<80;f+=1){if(f<16){D[f]=n[t+f]}else{D[f]=o(D[f-3]^D[f-8]^D[f-14]^D[f-16],1)}i=r(r(o(B,5),A(f,C,w,F)),r(r(E,D[f]),s(f)));E=F;F=w;w=o(C,30);C=B;B=i}B=r(B,h);C=r(C,u);w=r(w,a);F=r(F,c);E=r(E,l)}return Array(B,C,w,F,E)}function A(n,e,t,r){if(n<20){return e&t|~e&r}if(n<40){return e^t^r}if(n<60){return e&t|e&r|t&r}return e^t^r}function s(n){return n<20?1518500249:n<40?1859775393:n<60?-1894007588:-899497514}},SHA256:function(n){var t=n&&typeof n.uppercase==="boolean"?n.uppercase:false,o=n&&typeof n.pad==="string"?n.pad:"=",i=n&&typeof n.utf8==="boolean"?n.utf8:true,h;this.hex=function(n){return f(a(n,i))};this.b64=function(n){return B(a(n,i),o)};this.any=function(n,e){return D(a(n,i),e)};this.raw=function(n){return a(n,i)};this.hex_hmac=function(n,e){return f(c(n,e))};this.b64_hmac=function(n,e){return B(c(n,e),o)};this.any_hmac=function(n,e,t){return D(c(n,e),t)};this.vm_test=function(){return hex("abc").toLowerCase()==="900150983cd24fb0d6963f7d28e17f72"};this.setUpperCase=function(n){if(typeof n==="boolean"){t=n}return this};this.setPad=function(n){o=n||o;return this};this.setUTF8=function(n){if(typeof n==="boolean"){i=n}return this};function a(n,t){n=t?e(n):n;return u(m(l(n),n.length*8))}function c(n,t){n=i?e(n):n;t=i?e(t):t;var r,o=0,f=l(n),h=Array(16),a=Array(16);if(f.length>16){f=m(f,n.length*8)}for(;o<16;o+=1){h[o]=f[o]^909522486;a[o]=f[o]^1549556828}r=m(h.concat(l(t)),512+t.length*8);return u(m(a.concat(r),512+256))}function C(n,e){return n>>>e|n<<32-e}function A(n,e){return n>>>e}function s(n,e,t){return n&e^~n&t}function w(n,e,t){return n&e^n&t^e&t}function F(n){return C(n,2)^C(n,13)^C(n,22)}function E(n){return C(n,6)^C(n,11)^C(n,25)}function d(n){return C(n,7)^C(n,18)^A(n,3)}function g(n){return C(n,17)^C(n,19)^A(n,10)}function p(n){return C(n,28)^C(n,34)^C(n,39)}function y(n){return C(n,14)^C(n,18)^C(n,41)}function b(n){return C(n,1)^C(n,8)^A(n,7)}function v(n){return C(n,19)^C(n,61)^A(n,6)}h=[1116352408,1899447441,-1245643825,-373957723,961987163,1508970993,-1841331548,-1424204075,-670586216,310598401,607225278,1426881987,1925078388,-2132889090,-1680079193,-1046744716,-459576895,-272742522,264347078,604807628,770255983,1249150122,1555081692,1996064986,-1740746414,-1473132947,-1341970488,-1084653625,-958395405,-710438585,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,-2117940946,-1838011259,-1564481375,-1474664885,-1035236496,-949202525,-778901479,-694614492,-200395387,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,-2067236844,-1933114872,-1866530822,-1538233109,-1090935817,-965641998];function m(n,e){var t=[1779033703,-1150833019,1013904242,-1521486534,1359893119,-1694144372,528734635,1541459225];var o=new Array(64);var f,i,u,a,c,l,D,B;var C,A,p,y;n[e>>5]|=128<<24-e%32;n[(e+64>>9<<4)+15]=e;for(C=0;C<n.length;C+=16){f=t[0];i=t[1];u=t[2];a=t[3];c=t[4];l=t[5];D=t[6];B=t[7];for(A=0;A<64;A+=1){if(A<16){o[A]=n[A+C]}else{o[A]=r(r(r(g(o[A-2]),o[A-7]),d(o[A-15])),o[A-16])}p=r(r(r(r(B,E(c)),s(c,l,D)),h[A]),o[A]);y=r(F(f),w(f,i,u));B=D;D=l;l=c;c=r(a,p);a=u;u=i;i=f;f=r(p,y)}t[0]=r(f,t[0]);t[1]=r(i,t[1]);t[2]=r(u,t[2]);t[3]=r(a,t[3]);t[4]=r(c,t[4]);t[5]=r(l,t[5]);t[6]=r(D,t[6]);t[7]=r(B,t[7])}return t}},SHA512:function(n){var t=n&&typeof n.uppercase==="boolean"?n.uppercase:false,r=n&&typeof n.pad==="string"?n.pad:"=",o=n&&typeof n.utf8==="boolean"?n.utf8:true,i;this.hex=function(n){return f(h(n))};this.b64=function(n){return B(h(n),r)};this.any=function(n,e){return D(h(n),e)};this.raw=function(n){return h(n,o)};this.hex_hmac=function(n,e){return f(a(n,e))};this.b64_hmac=function(n,e){return B(a(n,e),r)};this.any_hmac=function(n,e,t){return D(a(n,e),t)};this.vm_test=function(){return hex("abc").toLowerCase()==="900150983cd24fb0d6963f7d28e17f72"};this.setUpperCase=function(n){if(typeof n==="boolean"){t=n}return this};this.setPad=function(n){r=n||r;return this};this.setUTF8=function(n){if(typeof n==="boolean"){o=n}return this};function h(n){n=o?e(n):n;return u(c(l(n),n.length*8))}function a(n,t){n=o?e(n):n;t=o?e(t):t;var r,f=0,i=l(n),h=Array(32),a=Array(32);if(i.length>32){i=c(i,n.length*8)}for(;f<32;f+=1){h[f]=i[f]^909522486;a[f]=i[f]^1549556828}r=c(h.concat(l(t)),1024+t.length*8);return u(c(a.concat(r),1024+512))}function c(n,e){var t,r,o,f=new Array(80),h=new Array(16),u=[new C(1779033703,-205731576),new C(-1150833019,-2067093701),new C(1013904242,-23791573),new C(-1521486534,1595750129),new C(1359893119,-1377402159),new C(-1694144372,725511199),new C(528734635,-79577749),new C(1541459225,327033209)],a=new C(0,0),c=new C(0,0),l=new C(0,0),D=new C(0,0),B=new C(0,0),p=new C(0,0),y=new C(0,0),b=new C(0,0),v=new C(0,0),m=new C(0,0),x=new C(0,0),_=new C(0,0),S=new C(0,0),U=new C(0,0),j=new C(0,0),M=new C(0,0),T=new C(0,0);if(i===undefined){i=[new C(1116352408,-685199838),new C(1899447441,602891725),new C(-1245643825,-330482897),new C(-373957723,-2121671748),new C(961987163,-213338824),new C(1508970993,-1241133031),new C(-1841331548,-1357295717),new C(-1424204075,-630357736),new C(-670586216,-1560083902),new C(310598401,1164996542),new C(607225278,1323610764),new C(1426881987,-704662302),new C(1925078388,-226784913),new C(-2132889090,991336113),new C(-1680079193,633803317),new C(-1046744716,-815192428),new C(-459576895,-1628353838),new C(-272742522,944711139),new C(264347078,-1953704523),new C(604807628,2007800933),new C(770255983,1495990901),new C(1249150122,1856431235),new C(1555081692,-1119749164),new C(1996064986,-2096016459),new C(-1740746414,-295247957),new C(-1473132947,766784016),new C(-1341970488,-1728372417),new C(-1084653625,-1091629340),new C(-958395405,1034457026),new C(-710438585,-1828018395),new C(113926993,-536640913),new C(338241895,168717936),new C(666307205,1188179964),new C(773529912,1546045734),new C(1294757372,1522805485),new C(1396182291,-1651133473),new C(1695183700,-1951439906),new C(1986661051,1014477480),new C(-2117940946,1206759142),new C(-1838011259,344077627),new C(-1564481375,1290863460),new C(-1474664885,-1136513023),new C(-1035236496,-789014639),new C(-949202525,106217008),new C(-778901479,-688958952),new C(-694614492,1432725776),new C(-200395387,1467031594),new C(275423344,851169720),new C(430227734,-1194143544),new C(506948616,1363258195),new C(659060556,-544281703),new C(883997877,-509917016),new C(958139571,-976659869),new C(1322822218,-482243893),new C(1537002063,2003034995),new C(1747873779,-692930397),new C(1955562222,1575990012),new C(2024104815,1125592928),new C(-2067236844,-1578062990),new C(-1933114872,442776044),new C(-1866530822,593698344),new C(-1538233109,-561857047),new C(-1090935817,-1295615723),new C(-965641998,-479046869),new C(-903397682,-366583396),new C(-779700025,566280711),new C(-354779690,-840897762),new C(-176337025,-294727304),new C(116418474,1914138554),new C(174292421,-1563912026),new C(289380356,-1090974290),new C(460393269,320620315),new C(685471733,587496836),new C(852142971,1086792851),new C(1017036298,365543100),new C(1126000580,-1676669620),new C(1288033470,-885112138),new C(1501505948,-60457430),new C(1607167915,987167468),new C(1816402316,1246189591)]}for(r=0;r<80;r+=1){f[r]=new C(0,0)}n[e>>5]|=128<<24-(e&31);n[(e+128>>10<<5)+31]=e;o=n.length;for(r=0;r<o;r+=32){A(l,u[0]);A(D,u[1]);A(B,u[2]);A(p,u[3]);A(y,u[4]);A(b,u[5]);A(v,u[6]);A(m,u[7]);for(t=0;t<16;t+=1){f[t].h=n[r+2*t];f[t].l=n[r+2*t+1]}for(t=16;t<80;t+=1){s(j,f[t-2],19);w(M,f[t-2],29);F(T,f[t-2],6);_.l=j.l^M.l^T.l;_.h=j.h^M.h^T.h;s(j,f[t-15],1);s(M,f[t-15],8);F(T,f[t-15],7);x.l=j.l^M.l^T.l;x.h=j.h^M.h^T.h;d(f[t],_,f[t-7],x,f[t-16])}for(t=0;t<80;t+=1){S.l=y.l&b.l^~y.l&v.l;S.h=y.h&b.h^~y.h&v.h;s(j,y,14);s(M,y,18);w(T,y,9);_.l=j.l^M.l^T.l;_.h=j.h^M.h^T.h;s(j,l,28);w(M,l,2);w(T,l,7);x.l=j.l^M.l^T.l;x.h=j.h^M.h^T.h;U.l=l.l&D.l^l.l&B.l^D.l&B.l;U.h=l.h&D.h^l.h&B.h^D.h&B.h;g(a,m,_,S,i[t],f[t]);E(c,x,U);A(m,v);A(v,b);A(b,y);E(y,p,a);A(p,B);A(B,D);A(D,l);E(l,a,c)}E(u[0],u[0],l);E(u[1],u[1],D);E(u[2],u[2],B);E(u[3],u[3],p);E(u[4],u[4],y);E(u[5],u[5],b);E(u[6],u[6],v);E(u[7],u[7],m)}for(r=0;r<8;r+=1){h[2*r]=u[r].h;h[2*r+1]=u[r].l}return h}function C(n,e){this.h=n;this.l=e}function A(n,e){n.h=e.h;n.l=e.l}function s(n,e,t){n.l=e.l>>>t|e.h<<32-t;n.h=e.h>>>t|e.l<<32-t}function w(n,e,t){n.l=e.h>>>t|e.l<<32-t;n.h=e.l>>>t|e.h<<32-t}function F(n,e,t){n.l=e.l>>>t|e.h<<32-t;n.h=e.h>>>t}function E(n,e,t){var r=(e.l&65535)+(t.l&65535);var o=(e.l>>>16)+(t.l>>>16)+(r>>>16);var f=(e.h&65535)+(t.h&65535)+(o>>>16);var i=(e.h>>>16)+(t.h>>>16)+(f>>>16);n.l=r&65535|o<<16;n.h=f&65535|i<<16}function d(n,e,t,r,o){var f=(e.l&65535)+(t.l&65535)+(r.l&65535)+(o.l&65535);var i=(e.l>>>16)+(t.l>>>16)+(r.l>>>16)+(o.l>>>16)+(f>>>16);var h=(e.h&65535)+(t.h&65535)+(r.h&65535)+(o.h&65535)+(i>>>16);var u=(e.h>>>16)+(t.h>>>16)+(r.h>>>16)+(o.h>>>16)+(h>>>16);n.l=f&65535|i<<16;n.h=h&65535|u<<16}function g(n,e,t,r,o,f){var i=(e.l&65535)+(t.l&65535)+(r.l&65535)+(o.l&65535)+(f.l&65535),h=(e.l>>>16)+(t.l>>>16)+(r.l>>>16)+(o.l>>>16)+(f.l>>>16)+(i>>>16),u=(e.h&65535)+(t.h&65535)+(r.h&65535)+(o.h&65535)+(f.h&65535)+(h>>>16),a=(e.h>>>16)+(t.h>>>16)+(r.h>>>16)+(o.h>>>16)+(f.h>>>16)+(u>>>16);n.l=i&65535|h<<16;n.h=u&65535|a<<16}},RMD160:function(n){var t=n&&typeof n.uppercase==="boolean"?n.uppercase:false,i=n&&typeof n.pad==="string"?n.pa:"=",h=n&&typeof n.utf8==="boolean"?n.utf8:true,u=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,7,4,13,1,10,6,15,3,12,0,9,5,2,14,11,8,3,10,14,4,9,15,8,1,2,7,0,6,13,11,5,12,1,9,11,10,0,8,12,4,13,3,7,15,14,5,6,2,4,0,5,9,7,12,2,10,14,1,3,8,11,6,15,13],a=[5,14,7,0,9,2,11,4,13,6,15,8,1,10,3,12,6,11,3,7,0,13,5,10,14,15,8,12,4,9,1,2,15,5,1,3,7,14,6,9,11,8,12,2,10,0,4,13,8,6,4,1,3,11,15,0,5,12,2,13,9,7,10,14,12,15,10,4,1,5,8,7,6,2,13,14,0,3,9,11],l=[11,14,15,12,5,8,7,9,11,13,14,15,6,7,9,8,7,6,8,13,11,9,7,15,7,12,15,9,11,7,13,12,11,13,6,7,14,9,13,15,14,8,13,6,5,12,7,5,11,12,14,15,14,15,9,8,9,14,5,6,8,6,5,12,9,15,5,11,6,8,13,12,5,12,13,14,11,8,5,6],C=[8,9,9,11,13,15,15,5,7,7,8,11,14,14,12,6,9,13,15,7,12,8,9,11,7,7,12,7,6,15,13,11,9,7,15,11,8,6,6,14,12,13,5,14,13,13,7,5,15,5,8,11,14,14,6,14,6,9,12,9,12,5,15,8,8,5,12,9,12,5,14,6,8,13,6,5,15,13,11,11];this.hex=function(n){return f(A(n,h))};this.b64=function(n){return B(A(n,h),i)};this.any=function(n,e){return D(A(n,h),e)};this.raw=function(n){return A(n,h)};this.hex_hmac=function(n,e){return f(s(n,e))};this.b64_hmac=function(n,e){return B(s(n,e),i)};this.any_hmac=function(n,e,t){return D(s(n,e),t)};this.vm_test=function(){return hex("abc").toLowerCase()==="900150983cd24fb0d6963f7d28e17f72"};this.setUpperCase=function(n){if(typeof n==="boolean"){t=n}return this};this.setPad=function(n){if(typeof n!=="undefined"){i=n}return this};this.setUTF8=function(n){if(typeof n==="boolean"){h=n}return this};function A(n){n=h?e(n):n;return w(F(c(n),n.length*8))}function s(n,t){n=h?e(n):n;t=h?e(t):t;var r,o,f=c(n),i=Array(16),u=Array(16);if(f.length>16){f=F(f,n.length*8)}for(r=0;r<16;r+=1){i[r]=f[r]^909522486;u[r]=f[r]^1549556828}o=F(i.concat(c(t)),512+t.length*8);return w(F(u.concat(o),512+160))}function w(n){var e,t="",r=n.length*32;for(e=0;e<r;e+=8){t+=String.fromCharCode(n[e>>5]>>>e%32&255)}return t}function F(n,e){var t,f,i,h,c=1732584193,D=4023233417,B=2562383102,A=271733878,s=3285377520,w,F,p,y,b,v,m,x,_,S;n[e>>5]|=128<<e%32;n[(e+64>>>9<<4)+14]=e;h=n.length;for(i=0;i<h;i+=16){w=v=c;F=m=D;p=x=B;y=_=A;b=S=s;for(f=0;f<=79;f+=1){t=r(w,E(f,F,p,y));t=r(t,n[i+u[f]]);t=r(t,d(f));t=r(o(t,l[f]),b);w=b;b=y;y=o(p,10);p=F;F=t;t=r(v,E(79-f,m,x,_));t=r(t,n[i+a[f]]);t=r(t,g(f));t=r(o(t,C[f]),S);v=S;S=_;_=o(x,10);x=m;m=t}t=r(D,r(p,_));D=r(B,r(y,S));B=r(A,r(b,v));A=r(s,r(w,m));s=r(c,r(F,x));c=t}return[c,D,B,A,s]}function E(n,e,t,r){return 0<=n&&n<=15?e^t^r:16<=n&&n<=31?e&t|~e&r:32<=n&&n<=47?(e|~t)^r:48<=n&&n<=63?e&r|t&~r:64<=n&&n<=79?e^(t|~r):"rmd160_f: j out of range"}function d(n){return 0<=n&&n<=15?0:16<=n&&n<=31?1518500249:32<=n&&n<=47?1859775393:48<=n&&n<=63?2400959708:64<=n&&n<=79?2840853838:"rmd160_K1: j out of range"}function g(n){return 0<=n&&n<=15?1352829926:16<=n&&n<=31?1548603684:32<=n&&n<=47?1836072691:48<=n&&n<=63?2053994217:64<=n&&n<=79?0:"rmd160_K2: j out of range"}}};(function(e,t){var r=false;if(typeof exports==="object"){r=exports;if(exports&&typeof global==="object"&&global&&global===global.global){e=global}}if(typeof define==="function"&&typeof define.amd==="object"&&define.amd){define(function(){return n})}else if(r){if(typeof module==="object"&&module&&module.exports===r){module.exports=n}else{r.Hashes=n}}else{e.Hashes=n}})(this)})();

/*! jquery.caret 2015-02-01 */
!function(a,b){"function"==typeof define&&define.amd?define(["jquery"],function(c){return a.returnExportsGlobal=b(c)}):"object"==typeof exports?module.exports=b(require("jquery")):b(jQuery)}(this,function(a){"use strict";var b,c,d,e,f,g,h,i,j,k,l;k="caret",b=function(){function b(a){this.$inputor=a,this.domInputor=this.$inputor[0]}return b.prototype.setPos=function(){return this.domInputor},b.prototype.getIEPosition=function(){return this.getPosition()},b.prototype.getPosition=function(){var a,b;return b=this.getOffset(),a=this.$inputor.offset(),b.left-=a.left,b.top-=a.top,b},b.prototype.getOldIEPos=function(){var a,b;return b=h.selection.createRange(),a=h.body.createTextRange(),a.moveToElementText(this.domInputor),a.setEndPoint("EndToEnd",b),a.text.length},b.prototype.getPos=function(){var a,b,c;return(c=this.range())?(a=c.cloneRange(),a.selectNodeContents(this.domInputor),a.setEnd(c.endContainer,c.endOffset),b=a.toString().length,a.detach(),b):h.selection?this.getOldIEPos():void 0},b.prototype.getOldIEOffset=function(){var a,b;return a=h.selection.createRange().duplicate(),a.moveStart("character",-1),b=a.getBoundingClientRect(),{height:b.bottom-b.top,left:b.left,top:b.top}},b.prototype.getOffset=function(){var b,c,d,e,f;return j.getSelection&&(d=this.range())?(d.endOffset-1>0&&d.endContainer===!this.domInputor&&(b=d.cloneRange(),b.setStart(d.endContainer,d.endOffset-1),b.setEnd(d.endContainer,d.endOffset),e=b.getBoundingClientRect(),c={height:e.height,left:e.left+e.width,top:e.top},b.detach()),c&&0!==(null!=c?c.height:void 0)||(b=d.cloneRange(),f=a(h.createTextNode("|")),b.insertNode(f[0]),b.selectNode(f[0]),e=b.getBoundingClientRect(),c={height:e.height,left:e.left,top:e.top},f.remove(),b.detach())):h.selection&&(c=this.getOldIEOffset()),c&&(c.top+=a(j).scrollTop(),c.left+=a(j).scrollLeft()),c},b.prototype.range=function(){var a;if(j.getSelection)return a=j.getSelection(),a.rangeCount>0?a.getRangeAt(0):null},b}(),c=function(){function b(a){this.$inputor=a,this.domInputor=this.$inputor[0]}return b.prototype.getIEPos=function(){var a,b,c,d,e,f,g;return b=this.domInputor,f=h.selection.createRange(),e=0,f&&f.parentElement()===b&&(d=b.value.replace(/\r\n/g,"\n"),c=d.length,g=b.createTextRange(),g.moveToBookmark(f.getBookmark()),a=b.createTextRange(),a.collapse(!1),e=g.compareEndPoints("StartToEnd",a)>-1?c:-g.moveStart("character",-c)),e},b.prototype.getPos=function(){return h.selection?this.getIEPos():this.domInputor.selectionStart},b.prototype.setPos=function(a){var b,c;return b=this.domInputor,h.selection?(c=b.createTextRange(),c.move("character",a),c.select()):b.setSelectionRange&&b.setSelectionRange(a,a),b},b.prototype.getIEOffset=function(a){var b,c,d,e;return c=this.domInputor.createTextRange(),a||(a=this.getPos()),c.move("character",a),d=c.boundingLeft,e=c.boundingTop,b=c.boundingHeight,{left:d,top:e,height:b}},b.prototype.getOffset=function(b){var c,d,e;return c=this.$inputor,h.selection?(d=this.getIEOffset(b),d.top+=a(j).scrollTop()+c.scrollTop(),d.left+=a(j).scrollLeft()+c.scrollLeft(),d):(d=c.offset(),e=this.getPosition(b),d={left:d.left+e.left-c.scrollLeft(),top:d.top+e.top-c.scrollTop(),height:e.height})},b.prototype.getPosition=function(a){var b,c,e,f,g,h,i;return b=this.$inputor,f=function(a){return a=a.replace(/<|>|`|"|&/g,"?").replace(/\r\n|\r|\n/g,"<br/>"),/firefox/i.test(navigator.userAgent)&&(a=a.replace(/\s/g,"&nbsp;")),a},void 0===a&&(a=this.getPos()),i=b.val().slice(0,a),e=b.val().slice(a),g="<span style='position: relative; display: inline;'>"+f(i)+"</span>",g+="<span id='caret' style='position: relative; display: inline;'>|</span>",g+="<span style='position: relative; display: inline;'>"+f(e)+"</span>",h=new d(b),c=h.create(g).rect()},b.prototype.getIEPosition=function(a){var b,c,d,e,f;return d=this.getIEOffset(a),c=this.$inputor.offset(),e=d.left-c.left,f=d.top-c.top,b=d.height,{left:e,top:f,height:b}},b}(),d=function(){function b(a){this.$inputor=a}return b.prototype.css_attr=["borderBottomWidth","borderLeftWidth","borderRightWidth","borderTopStyle","borderRightStyle","borderBottomStyle","borderLeftStyle","borderTopWidth","boxSizing","fontFamily","fontSize","fontWeight","height","letterSpacing","lineHeight","marginBottom","marginLeft","marginRight","marginTop","outlineWidth","overflow","overflowX","overflowY","paddingBottom","paddingLeft","paddingRight","paddingTop","textAlign","textOverflow","textTransform","whiteSpace","wordBreak","wordWrap"],b.prototype.mirrorCss=function(){var b,c=this;return b={position:"absolute",left:-9999,top:0,zIndex:-2e4},"TEXTAREA"===this.$inputor.prop("tagName")&&this.css_attr.push("width"),a.each(this.css_attr,function(a,d){return b[d]=c.$inputor.css(d)}),b},b.prototype.create=function(b){return this.$mirror=a("<div></div>"),this.$mirror.css(this.mirrorCss()),this.$mirror.html(b),this.$inputor.after(this.$mirror),this},b.prototype.rect=function(){var a,b,c;return a=this.$mirror.find("#caret"),b=a.position(),c={left:b.left,top:b.top,height:a.height()},this.$mirror.remove(),c},b}(),e={contentEditable:function(a){return!(!a[0].contentEditable||"true"!==a[0].contentEditable)}},g={pos:function(a){return a||0===a?this.setPos(a):this.getPos()},position:function(a){return h.selection?this.getIEPosition(a):this.getPosition(a)},offset:function(a){var b;return b=this.getOffset(a)}},h=null,j=null,i=null,l=function(a){var b;return(b=null!=a?a.iframe:void 0)?(i=b,j=b.contentWindow,h=b.contentDocument||j.document):(i=void 0,j=window,h=document)},f=function(a){var b;h=a[0].ownerDocument,j=h.defaultView||h.parentWindow;try{return i=j.frameElement}catch(c){b=c}},a.fn.caret=function(d,f,h){var i;return g[d]?(a.isPlainObject(f)?(l(f),f=void 0):l(h),i=e.contentEditable(this)?new b(this):new c(this),g[d].apply(i,[f])):a.error("Method "+d+" does not exist on jQuery.caret")},a.fn.caret.EditableCaret=b,a.fn.caret.InputCaret=c,a.fn.caret.Utils=e,a.fn.caret.apis=g});

!function(t,e){"function"==typeof define&&define.amd?define(["jquery"],function(t){return e(t)}):"object"==typeof exports?module.exports=e(require("jquery")):e(jQuery)}(this,function(t){var e,i;i={ESC:27,TAB:9,ENTER:13,CTRL:17,A:65,P:80,N:78,LEFT:37,UP:38,RIGHT:39,DOWN:40,BACKSPACE:8,SPACE:32},e={beforeSave:function(t){return r.arrayToDefaultHash(t)},matcher:function(t,e,i,n){var r,o,s,a,h;return t=t.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&"),i&&(t="(?:^|\\s)"+t),r=decodeURI("%C3%80"),o=decodeURI("%C3%BF"),h=n?" ":"",a=new RegExp(t+"([A-Za-z"+r+"-"+o+"0-9_"+h+"'.+-]*)$|"+t+"([^\\x00-\\xff]*)$","gi"),s=a.exec(e),s?s[2]||s[1]:null},filter:function(t,e,i){var n,r,o,s;for(n=[],r=0,s=e.length;s>r;r++)o=e[r],~new String(o[i]).toLowerCase().indexOf(t.toLowerCase())&&n.push(o);return n},remoteFilter:null,sorter:function(t,e,i){var n,r,o,s;if(!t)return e;for(n=[],r=0,s=e.length;s>r;r++)o=e[r],o.atwho_order=new String(o[i]).toLowerCase().indexOf(t.toLowerCase()),o.atwho_order>-1&&n.push(o);return n.sort(function(t,e){return t.atwho_order-e.atwho_order})},tplEval:function(t,e){var i,n,r;r=t;try{return"string"!=typeof t&&(r=t(e)),r.replace(/\$\{([^\}]*)\}/g,function(t,i,n){return e[i]})}catch(n){return i=n,""}},highlighter:function(t,e){var i;return e?(i=new RegExp(">\\s*([^<]*?)("+e.replace("+","\\+")+")([^<]*)\\s*<","ig"),t.replace(i,function(t,e,i,n){return"> "+e+"<strong>"+i+"</strong>"+n+" <"})):t},beforeInsert:function(t,e,i){return t},beforeReposition:function(t){return t},afterMatchFailed:function(t,e){}};var n;n=function(){function e(e){this.currentFlag=null,this.controllers={},this.aliasMaps={},this.$inputor=t(e),this.setupRootElement(),this.listen()}return e.prototype.createContainer=function(e){var i;return null!=(i=this.$el)&&i.remove(),t(e.body).append(this.$el=t("<div class='atwho-container'></div>"))},e.prototype.setupRootElement=function(e,i){var n,r;if(null==i&&(i=!1),e)this.window=e.contentWindow,this.document=e.contentDocument||this.window.document,this.iframe=e;else{this.document=this.$inputor[0].ownerDocument,this.window=this.document.defaultView||this.document.parentWindow;try{this.iframe=this.window.frameElement}catch(r){if(n=r,this.iframe=null,t.fn.atwho.debug)throw new Error("iframe auto-discovery is failed.\nPlease use `setIframe` to set the target iframe manually.\n"+n)}}return this.createContainer((this.iframeAsRoot=i)?this.document:document)},e.prototype.controller=function(t){var e,i,n,r;if(this.aliasMaps[t])i=this.controllers[this.aliasMaps[t]];else{r=this.controllers;for(n in r)if(e=r[n],n===t){i=e;break}}return i?i:this.controllers[this.currentFlag]},e.prototype.setContextFor=function(t){return this.currentFlag=t,this},e.prototype.reg=function(t,e){var i,n;return n=(i=this.controllers)[t]||(i[t]=this.$inputor.is("[contentEditable]")?new l(this,t):new s(this,t)),e.alias&&(this.aliasMaps[e.alias]=t),n.init(e),this},e.prototype.listen=function(){return this.$inputor.on("compositionstart",function(t){return function(e){var i;return null!=(i=t.controller())&&i.view.hide(),t.isComposing=!0,null}}(this)).on("compositionend",function(t){return function(e){return t.isComposing=!1,setTimeout(function(e){return t.dispatch(e)}),null}}(this)).on("keyup.atwhoInner",function(t){return function(e){return t.onKeyup(e)}}(this)).on("keydown.atwhoInner",function(t){return function(e){return t.onKeydown(e)}}(this)).on("blur.atwhoInner",function(t){return function(e){var i;return(i=t.controller())?(i.expectedQueryCBId=null,i.view.hide(e,i.getOpt("displayTimeout"))):void 0}}(this)).on("click.atwhoInner",function(t){return function(e){return t.dispatch(e)}}(this)).on("scroll.atwhoInner",function(t){return function(){var e;return e=t.$inputor.scrollTop(),function(i){var n,r;return n=i.target.scrollTop,e!==n&&null!=(r=t.controller())&&r.view.hide(i),e=n,!0}}}(this)())},e.prototype.shutdown=function(){var t,e,i;i=this.controllers;for(t in i)e=i[t],e.destroy(),delete this.controllers[t];return this.$inputor.off(".atwhoInner"),this.$el.remove()},e.prototype.dispatch=function(t){var e,i,n,r;n=this.controllers,r=[];for(e in n)i=n[e],r.push(i.lookUp(t));return r},e.prototype.onKeyup=function(e){var n;switch(e.keyCode){case i.ESC:e.preventDefault(),null!=(n=this.controller())&&n.view.hide();break;case i.DOWN:case i.UP:case i.CTRL:case i.ENTER:t.noop();break;case i.P:case i.N:e.ctrlKey||this.dispatch(e);break;default:this.dispatch(e)}},e.prototype.onKeydown=function(e){var n,r;if(r=null!=(n=this.controller())?n.view:void 0,r&&r.visible())switch(e.keyCode){case i.ESC:e.preventDefault(),r.hide(e);break;case i.UP:e.preventDefault(),r.prev();break;case i.DOWN:e.preventDefault(),r.next();break;case i.P:if(!e.ctrlKey)return;e.preventDefault(),r.prev();break;case i.N:if(!e.ctrlKey)return;e.preventDefault(),r.next();break;case i.TAB:case i.ENTER:case i.SPACE:if(!r.visible())return;if(!this.controller().getOpt("spaceSelectsMatch")&&e.keyCode===i.SPACE)return;if(!this.controller().getOpt("tabSelectsMatch")&&e.keyCode===i.TAB)return;r.highlighted()?(e.preventDefault(),r.choose(e)):r.hide(e);break;default:t.noop()}},e}();var r,o=[].slice;r=function(){function i(e,i){this.app=e,this.at=i,this.$inputor=this.app.$inputor,this.id=this.$inputor[0].id||this.uid(),this.expectedQueryCBId=null,this.setting=null,this.query=null,this.pos=0,this.range=null,0===(this.$el=t("#atwho-ground-"+this.id,this.app.$el)).length&&this.app.$el.append(this.$el=t("<div id='atwho-ground-"+this.id+"'></div>")),this.model=new u(this),this.view=new c(this)}return i.prototype.uid=function(){return(Math.random().toString(16)+"000000000").substr(2,8)+(new Date).getTime()},i.prototype.init=function(e){return this.setting=t.extend({},this.setting||t.fn.atwho["default"],e),this.view.init(),this.model.reload(this.setting.data)},i.prototype.destroy=function(){return this.trigger("beforeDestroy"),this.model.destroy(),this.view.destroy(),this.$el.remove()},i.prototype.callDefault=function(){var i,n,r,s;s=arguments[0],i=2<=arguments.length?o.call(arguments,1):[];try{return e[s].apply(this,i)}catch(r){return n=r,t.error(n+" Or maybe At.js doesn't have function "+s)}},i.prototype.trigger=function(t,e){var i,n;return null==e&&(e=[]),e.push(this),i=this.getOpt("alias"),n=i?t+"-"+i+".atwho":t+".atwho",this.$inputor.trigger(n,e)},i.prototype.callbacks=function(t){return this.getOpt("callbacks")[t]||e[t]},i.prototype.getOpt=function(t,e){var i,n;try{return this.setting[t]}catch(n){return i=n,null}},i.prototype.insertContentFor=function(e){var i,n;return n=this.getOpt("insertTpl"),i=t.extend({},e.data("item-data"),{"atwho-at":this.at}),this.callbacks("tplEval").call(this,n,i,"onInsert")},i.prototype.renderView=function(t){var e;return e=this.getOpt("searchKey"),t=this.callbacks("sorter").call(this,this.query.text,t.slice(0,1001),e),this.view.render(t.slice(0,this.getOpt("limit")))},i.arrayToDefaultHash=function(e){var i,n,r,o;if(!t.isArray(e))return e;for(o=[],i=0,r=e.length;r>i;i++)n=e[i],t.isPlainObject(n)?o.push(n):o.push({name:n});return o},i.prototype.lookUp=function(t){var e,i;if((!t||"click"!==t.type||this.getOpt("lookUpOnClick"))&&(!this.getOpt("suspendOnComposing")||!this.app.isComposing))return(e=this.catchQuery(t))?(this.app.setContextFor(this.at),(i=this.getOpt("delay"))?this._delayLookUp(e,i):this._lookUp(e),e):(this.expectedQueryCBId=null,e)},i.prototype._delayLookUp=function(t,e){var i,n;return i=Date.now?Date.now():(new Date).getTime(),this.previousCallTime||(this.previousCallTime=i),n=e-(i-this.previousCallTime),n>0&&e>n?(this.previousCallTime=i,this._stopDelayedCall(),this.delayedCallTimeout=setTimeout(function(e){return function(){return e.previousCallTime=0,e.delayedCallTimeout=null,e._lookUp(t)}}(this),e)):(this._stopDelayedCall(),this.previousCallTime!==i&&(this.previousCallTime=0),this._lookUp(t))},i.prototype._stopDelayedCall=function(){return this.delayedCallTimeout?(clearTimeout(this.delayedCallTimeout),this.delayedCallTimeout=null):void 0},i.prototype._generateQueryCBId=function(){return{}},i.prototype._lookUp=function(e){var i;return i=function(t,e){return t===this.expectedQueryCBId?e&&e.length>0?this.renderView(this.constructor.arrayToDefaultHash(e)):this.view.hide():void 0},this.expectedQueryCBId=this._generateQueryCBId(),this.model.query(e.text,t.proxy(i,this,this.expectedQueryCBId))},i}();var s,a=function(t,e){function i(){this.constructor=t}for(var n in e)h.call(e,n)&&(t[n]=e[n]);return i.prototype=e.prototype,t.prototype=new i,t.__super__=e.prototype,t},h={}.hasOwnProperty;s=function(e){function i(){return i.__super__.constructor.apply(this,arguments)}return a(i,e),i.prototype.catchQuery=function(){var t,e,i,n,r,o,s;return e=this.$inputor.val(),t=this.$inputor.caret("pos",{iframe:this.app.iframe}),s=e.slice(0,t),r=this.callbacks("matcher").call(this,this.at,s,this.getOpt("startWithSpace"),this.getOpt("acceptSpaceBar")),n="string"==typeof r,n&&r.length<this.getOpt("minLen",0)?void 0:(n&&r.length<=this.getOpt("maxLen",20)?(o=t-r.length,i=o+r.length,this.pos=o,r={text:r,headPos:o,endPos:i},this.trigger("matched",[this.at,r.text])):(r=null,this.view.hide()),this.query=r)},i.prototype.rect=function(){var e,i,n;if(e=this.$inputor.caret("offset",this.pos-1,{iframe:this.app.iframe}))return this.app.iframe&&!this.app.iframeAsRoot&&(i=t(this.app.iframe).offset(),e.left+=i.left,e.top+=i.top),n=this.app.document.selection?0:2,{left:e.left,top:e.top,bottom:e.top+e.height+n}},i.prototype.insert=function(t,e){var i,n,r,o,s;return i=this.$inputor,n=i.val(),r=n.slice(0,Math.max(this.query.headPos-this.at.length,0)),o=""===(o=this.getOpt("suffix"))?o:o||" ",t+=o,s=""+r+t+n.slice(this.query.endPos||0),i.val(s),i.caret("pos",r.length+t.length,{iframe:this.app.iframe}),i.is(":focus")||i.focus(),i.change()},i}(r);var l,a=function(t,e){function i(){this.constructor=t}for(var n in e)h.call(e,n)&&(t[n]=e[n]);return i.prototype=e.prototype,t.prototype=new i,t.__super__=e.prototype,t},h={}.hasOwnProperty;l=function(e){function n(){return n.__super__.constructor.apply(this,arguments)}return a(n,e),n.prototype._getRange=function(){var t;return t=this.app.window.getSelection(),t.rangeCount>0?t.getRangeAt(0):void 0},n.prototype._setRange=function(e,i,n){return null==n&&(n=this._getRange()),n&&i?(i=t(i)[0],"after"===e?(n.setEndAfter(i),n.setStartAfter(i)):(n.setEndBefore(i),n.setStartBefore(i)),n.collapse(!1),this._clearRange(n)):void 0},n.prototype._clearRange=function(t){var e;return null==t&&(t=this._getRange()),e=this.app.window.getSelection(),null==this.ctrl_a_pressed?(e.removeAllRanges(),e.addRange(t)):void 0},n.prototype._movingEvent=function(t){var e;return"click"===t.type||(e=t.which)===i.RIGHT||e===i.LEFT||e===i.UP||e===i.DOWN},n.prototype._unwrap=function(e){var i;return e=t(e).unwrap().get(0),(i=e.nextSibling)&&i.nodeValue&&(e.nodeValue+=i.nodeValue,t(i).remove()),e},n.prototype.catchQuery=function(e){var n,r,o,s,a,h,l,u,c,p,f,d;if((d=this._getRange())&&d.collapsed){if(e.which===i.ENTER)return(r=t(d.startContainer).closest(".atwho-query")).contents().unwrap(),r.is(":empty")&&r.remove(),(r=t(".atwho-query",this.app.document)).text(r.text()).contents().last().unwrap(),void this._clearRange();if(/firefox/i.test(navigator.userAgent)){if(t(d.startContainer).is(this.$inputor))return void this._clearRange();e.which===i.BACKSPACE&&d.startContainer.nodeType===document.ELEMENT_NODE&&(c=d.startOffset-1)>=0?(o=d.cloneRange(),o.setStart(d.startContainer,c),t(o.cloneContents()).contents().last().is(".atwho-inserted")&&(a=t(d.startContainer).contents().get(c),this._setRange("after",t(a).contents().last()))):e.which===i.LEFT&&d.startContainer.nodeType===document.TEXT_NODE&&(n=t(d.startContainer.previousSibling),n.is(".atwho-inserted")&&0===d.startOffset&&this._setRange("after",n.contents().last()))}if(t(d.startContainer).closest(".atwho-inserted").addClass("atwho-query").siblings().removeClass("atwho-query"),(r=t(".atwho-query",this.app.document)).length>0&&r.is(":empty")&&0===r.text().length&&r.remove(),this._movingEvent(e)||r.removeClass("atwho-inserted"),r.length>0)switch(e.which){case i.LEFT:return this._setRange("before",r.get(0),d),void r.removeClass("atwho-query");case i.RIGHT:return this._setRange("after",r.get(0).nextSibling,d),void r.removeClass("atwho-query")}if(r.length>0&&(f=r.attr("data-atwho-at-query"))&&(r.empty().html(f).attr("data-atwho-at-query",null),this._setRange("after",r.get(0),d)),o=d.cloneRange(),o.setStart(d.startContainer,0),u=this.callbacks("matcher").call(this,this.at,o.toString(),this.getOpt("startWithSpace"),this.getOpt("acceptSpaceBar")),h="string"==typeof u,0===r.length&&h&&(s=d.startOffset-this.at.length-u.length)>=0&&(d.setStart(d.startContainer,s),r=t("<span/>",this.app.document).attr(this.getOpt("editableAtwhoQueryAttrs")).addClass("atwho-query"),d.surroundContents(r.get(0)),l=r.contents().last().get(0),l&&(/firefox/i.test(navigator.userAgent)?(d.setStart(l,l.length),d.setEnd(l,l.length),this._clearRange(d)):this._setRange("after",l,d))),!(h&&u.length<this.getOpt("minLen",0)))return h&&u.length<=this.getOpt("maxLen",20)?(p={text:u,el:r},this.trigger("matched",[this.at,p.text]),this.query=p):(this.view.hide(),this.query={el:r},r.text().indexOf(this.at)>=0&&(this._movingEvent(e)&&r.hasClass("atwho-inserted")?r.removeClass("atwho-query"):!1!==this.callbacks("afterMatchFailed").call(this,this.at,r)&&this._setRange("after",this._unwrap(r.text(r.text()).contents().first()))),null)}},n.prototype.rect=function(){var e,i,n;return n=this.query.el.offset(),n&&this.query.el[0].getClientRects().length?(this.app.iframe&&!this.app.iframeAsRoot&&(i=(e=t(this.app.iframe)).offset(),n.left+=i.left-this.$inputor.scrollLeft(),n.top+=i.top-this.$inputor.scrollTop()),n.bottom=n.top+this.query.el.height(),n):void 0},n.prototype.insert=function(t,e){var i,n,r,o,s;return this.$inputor.is(":focus")||this.$inputor.focus(),n=this.getOpt("functionOverrides"),n.insert?n.insert.call(this,t,e):(o=""===(o=this.getOpt("suffix"))?o:o||" ",i=e.data("item-data"),this.query.el.removeClass("atwho-query").addClass("atwho-inserted").html(t).attr("data-atwho-at-query",""+i["atwho-at"]+this.query.text).attr("contenteditable","false"),(r=this._getRange())&&(this.query.el.length&&r.setEndAfter(this.query.el[0]),r.collapse(!1),r.insertNode(s=this.app.document.createTextNode(""+o)),this._setRange("after",s,r)),this.$inputor.is(":focus")||this.$inputor.focus(),this.$inputor.change())},n}(r);var u;u=function(){function e(t){this.context=t,this.at=this.context.at,this.storage=this.context.$inputor}return e.prototype.destroy=function(){return this.storage.data(this.at,null)},e.prototype.saved=function(){return this.fetch()>0},e.prototype.query=function(t,e){var i,n,r;return n=this.fetch(),r=this.context.getOpt("searchKey"),n=this.context.callbacks("filter").call(this.context,t,n,r)||[],i=this.context.callbacks("remoteFilter"),n.length>0||!i&&0===n.length?e(n):i.call(this.context,t,e)},e.prototype.fetch=function(){return this.storage.data(this.at)||[]},e.prototype.save=function(t){return this.storage.data(this.at,this.context.callbacks("beforeSave").call(this.context,t||[]))},e.prototype.load=function(t){return!this.saved()&&t?this._load(t):void 0},e.prototype.reload=function(t){return this._load(t)},e.prototype._load=function(e){return"string"==typeof e?t.ajax(e,{dataType:"json"}).done(function(t){return function(e){return t.save(e)}}(this)):this.save(e)},e}();var c;c=function(){function e(e){this.context=e,this.$el=t("<div class='atwho-view'><ul class='atwho-view-ul'></ul></div>"),this.$elUl=this.$el.children(),this.timeoutID=null,this.context.$el.append(this.$el),this.bindEvent()}return e.prototype.init=function(){var t,e;return e=this.context.getOpt("alias")||this.context.at.charCodeAt(0),t=this.context.getOpt("headerTpl"),t&&1===this.$el.children().length&&this.$el.prepend(t),this.$el.attr({id:"at-view-"+e})},e.prototype.destroy=function(){return this.$el.remove()},e.prototype.bindEvent=function(){var e,i,n;return e=this.$el.find("ul"),i=0,n=0,e.on("mousemove.atwho-view","li",function(r){return function(r){var o;if((i!==r.clientX||n!==r.clientY)&&(i=r.clientX,n=r.clientY,o=t(r.currentTarget),!o.hasClass("cur")))return e.find(".cur").removeClass("cur"),o.addClass("cur")}}(this)).on("click.atwho-view","li",function(i){return function(n){return e.find(".cur").removeClass("cur"),t(n.currentTarget).addClass("cur"),i.choose(n),n.preventDefault()}}(this))},e.prototype.visible=function(){return t.expr.filters.visible(this.$el[0])},e.prototype.highlighted=function(){return this.$el.find(".cur").length>0},e.prototype.choose=function(t){var e,i;return(e=this.$el.find(".cur")).length&&(i=this.context.insertContentFor(e),this.context._stopDelayedCall(),this.context.insert(this.context.callbacks("beforeInsert").call(this.context,i,e,t),e),this.context.trigger("inserted",[e,t]),this.hide(t)),this.context.getOpt("hideWithoutSuffix")?this.stopShowing=!0:void 0},e.prototype.reposition=function(e){var i,n,r,o;return i=this.context.app.iframeAsRoot?this.context.app.window:window,e.bottom+this.$el.height()-t(i).scrollTop()>t(i).height()&&(e.bottom=e.top-this.$el.height()),e.left>(r=t(i).width()-this.$el.width()-5)&&(e.left=r),n={left:e.left,top:e.bottom},null!=(o=this.context.callbacks("beforeReposition"))&&o.call(this.context,n),this.$el.offset(n),this.context.trigger("reposition",[n])},e.prototype.next=function(){var t,e,i,n;return t=this.$el.find(".cur").removeClass("cur"),e=t.next(),e.length||(e=this.$el.find("li:first")),e.addClass("cur"),i=e[0],n=i.offsetTop+i.offsetHeight+(i.nextSibling?i.nextSibling.offsetHeight:0),this.scrollTop(Math.max(0,n-this.$el.height()))},e.prototype.prev=function(){var t,e,i,n;return t=this.$el.find(".cur").removeClass("cur"),i=t.prev(),i.length||(i=this.$el.find("li:last")),i.addClass("cur"),n=i[0],e=n.offsetTop+n.offsetHeight+(n.nextSibling?n.nextSibling.offsetHeight:0),this.scrollTop(Math.max(0,e-this.$el.height()))},e.prototype.scrollTop=function(t){var e;return e=this.context.getOpt("scrollDuration"),e?this.$elUl.animate({scrollTop:t},e):this.$elUl.scrollTop(t)},e.prototype.show=function(){var t;return this.stopShowing?void(this.stopShowing=!1):(this.visible()||(this.$el.show(),this.$el.scrollTop(0),this.context.trigger("shown")),(t=this.context.rect())?this.reposition(t):void 0)},e.prototype.hide=function(t,e){var i;if(this.visible())return isNaN(e)?(this.$el.hide(),this.context.trigger("hidden",[t])):(i=function(t){return function(){return t.hide()}}(this),clearTimeout(this.timeoutID),this.timeoutID=setTimeout(i,e))},e.prototype.render=function(e){var i,n,r,o,s,a,h;if(!(t.isArray(e)&&e.length>0))return void this.hide();for(this.$el.find("ul").empty(),n=this.$el.find("ul"),h=this.context.getOpt("displayTpl"),r=0,s=e.length;s>r;r++)o=e[r],o=t.extend({},o,{"atwho-at":this.context.at}),a=this.context.callbacks("tplEval").call(this.context,h,o,"onDisplay"),i=t(this.context.callbacks("highlighter").call(this.context,a,this.context.query.text)),i.data("item-data",o),n.append(i);return this.show(),this.context.getOpt("highlightFirst")?n.find("li:first").addClass("cur"):void 0},e}();var p;p={load:function(t,e){var i;return(i=this.controller(t))?i.model.load(e):void 0},isSelecting:function(){var t;return!!(null!=(t=this.controller())?t.view.visible():void 0)},hide:function(){var t;return null!=(t=this.controller())?t.view.hide():void 0},reposition:function(){var t;return(t=this.controller())?t.view.reposition(t.rect()):void 0},setIframe:function(t,e){return this.setupRootElement(t,e),null},run:function(){return this.dispatch()},destroy:function(){return this.shutdown(),this.$inputor.data("atwho",null)}},t.fn.atwho=function(e){var i,r;return i=arguments,r=null,this.filter('textarea, input, [contenteditable=""], [contenteditable=true]').each(function(){var o,s;return(s=(o=t(this)).data("atwho"))||o.data("atwho",s=new n(this)),"object"!=typeof e&&e?p[e]&&s?r=p[e].apply(s,Array.prototype.slice.call(i,1)):t.error("Method "+e+" does not exist on jQuery.atwho"):s.reg(e.at,e)}),null!=r?r:this},t.fn.atwho["default"]={at:void 0,alias:void 0,data:null,displayTpl:"<li>${name}</li>",insertTpl:"${atwho-at}${name}",headerTpl:null,callbacks:e,functionOverrides:{},searchKey:"name",suffix:void 0,hideWithoutSuffix:!1,startWithSpace:!0,acceptSpaceBar:!1,highlightFirst:!0,limit:5,maxLen:20,minLen:0,displayTimeout:300,delay:null,spaceSelectsMatch:!1,tabSelectsMatch:!0,editableAtwhoQueryAttrs:{},scrollDuration:150,suspendOnComposing:!0,lookUpOnClick:!0},t.fn.atwho.debug=!1});

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.SimpleWebRTC = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

/* global module, chrome */
// getScreenMedia helper by @HenrikJoreteg
var getUserMedia = function getUserMedia(constraints, callback) {
  if (!window.navigator || !window.navigator.mediaDevices || !window.navigator.mediaDevices.getUserMedia) {
    var error = new Error('MediaStreamError');
    error.name = 'NotSupportedError';

    if (callback) {
      callback(error, null);
    }

    return;
  }

  window.navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
    callback(null, stream);
  })["catch"](function (error) {
    callback(error, null);
  });
}; // cache for constraints and callback


var cache = {};

module.exports = function (mode, constraints, cb) {
  var hasConstraints = arguments.length === 3;
  var callback = hasConstraints ? cb : constraints;
  var error;

  if (typeof window === 'undefined' || window.location.protocol === 'http:') {
    error = new Error('NavigatorUserMediaError');
    error.name = 'HTTPS_REQUIRED';
    return callback(error);
  }

  if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
    navigator.mediaDevices.getDisplayMedia({
      video: true
    }).then(function (stream) {
      callback(null, stream);
    })["catch"](function (error) {
      callback(error, null);
    });
  } else if (navigator.webkitGetUserMedia) {
    var chromever = parseInt(window.navigator.userAgent.match(/Chrome\/(\d+)\./)[1], 10);
    var maxver = 33; // Chrome 71 dropped support for "window.chrome.webstore;".

    var isCef = chromever < 71 && !window.chrome.webstore; // "known" crash in chrome 34 and 35 on linux

    if (window.navigator.userAgent.match('Linux')) {
      maxver = 35;
    } // check that the extension is installed by looking for a
    // sessionStorage variable that contains the extension id
    // this has to be set after installation unless the contest
    // script does that


    if (sessionStorage.getScreenMediaJSExtensionId) {
      chrome.runtime.sendMessage(sessionStorage.getScreenMediaJSExtensionId, {
        type: 'getScreen',
        id: 1
      }, null, function (data) {
        if (!data || data.sourceId === '') {
          // user canceled
          var error = new Error('NavigatorUserMediaError');
          error.name = 'PERMISSION_DENIED';
          callback(error);
        } else {
          constraints = hasConstraints && constraints || {
            audio: false,
            video: {
              mandatory: {
                chromeMediaSource: 'desktop',
                maxWidth: window.screen.width,
                maxHeight: window.screen.height,
                maxFrameRate: 3
              }
            }
          };
          constraints.video.mandatory.chromeMediaSourceId = data.sourceId;
          getUserMedia(constraints, callback);
        }
      });
    } else if (window.cefGetScreenMedia) {
      //window.cefGetScreenMedia is experimental - may be removed without notice
      window.cefGetScreenMedia(function (sourceId) {
        if (!sourceId) {
          var error = new Error('cefGetScreenMediaError');
          error.name = 'CEF_GETSCREENMEDIA_CANCELED';
          callback(error);
        } else {
          constraints = hasConstraints && constraints || {
            audio: false,
            video: {
              mandatory: {
                chromeMediaSource: 'desktop',
                maxWidth: window.screen.width,
                maxHeight: window.screen.height,
                maxFrameRate: 3
              },
              optional: [{
                googLeakyBucket: true
              }, {
                googTemporalLayeredScreencast: true
              }]
            }
          };
          constraints.video.mandatory.chromeMediaSourceId = sourceId;
          getUserMedia(constraints, callback);
        }
      });
    } else if (isCef || chromever >= 26 && chromever <= maxver) {
      // chrome 26 - chrome 33 way to do it -- requires bad chrome://flags
      // note: this is basically in maintenance mode and will go away soon
      constraints = hasConstraints && constraints || {
        video: {
          mandatory: {
            googLeakyBucket: true,
            maxWidth: window.screen.width,
            maxHeight: window.screen.height,
            maxFrameRate: 3,
            chromeMediaSource: 'screen'
          }
        }
      };
      getUserMedia(constraints, callback);
    } else {
      // chrome 34+ way requiring an extension
      var pending = window.setTimeout(function () {
        error = new Error('NavigatorUserMediaError');
        error.name = 'EXTENSION_UNAVAILABLE';
        return callback(error);
      }, 1000);
      cache[pending] = [callback, hasConstraints ? constraints : null];
      window.postMessage({
        type: 'getScreen',
        id: pending
      }, '*');
    }
  } else if (window.navigator.userAgent.match('Firefox')) {
    var ffver = parseInt(window.navigator.userAgent.match(/Firefox\/(.*)/)[1], 10);

    if (ffver >= 52) {
      mode = mode || 'window';
      constraints = hasConstraints && constraints || {
        video: {
          mozMediaSource: mode,
          mediaSource: mode
        }
      };
      getUserMedia(constraints, function (err, stream) {
        callback(err, stream);

        if (err) {
          return;
        } // workaround for https://bugzilla.mozilla.org/show_bug.cgi?id=1045810


        var lastTime = stream.currentTime;
        var polly = window.setInterval(function () {
          if (!stream) {
            window.clearInterval(polly);
          }

          if (stream.currentTime === lastTime) {
            window.clearInterval(polly);

            if (stream.onended) {
              stream.onended();
            }
          }

          lastTime = stream.currentTime;
        }, 500);
      });
    } else {
      error = new Error('NavigatorUserMediaError');
      error.name = 'FF52_REQUIRED';
      return callback(error);
    }
  }
};

typeof window !== 'undefined' && window.addEventListener('message', function (event) {
  if (event.origin !== window.location.origin && !event.isTrusted) {
    return;
  }

  if (event.data.type === 'gotScreen' && cache[event.data.id]) {
    var data = cache[event.data.id];
    var constraints = data[1];
    var callback = data[0];
    delete cache[event.data.id];

    if (event.data.sourceId === '') {
      // user canceled
      var error = new Error('NavigatorUserMediaError');
      error.name = 'PERMISSION_DENIED';
      callback(error);
    } else {
      constraints = constraints || {
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            maxWidth: window.screen.width,
            maxHeight: window.screen.height,
            maxFrameRate: 3
          },
          optional: [{
            googLeakyBucket: true
          }, {
            googTemporalLayeredScreencast: true
          }]
        }
      };
      constraints.video.mandatory.chromeMediaSourceId = event.data.sourceId;
      getUserMedia(constraints, callback);
    }
  } else if (event.data.type === 'getScreenPending') {
    window.clearTimeout(event.data.id);
  }
});

},{}],2:[function(require,module,exports){
"use strict";

/* global module */
var util = require('util');

var hark = require('hark');

var getScreenMedia = require('./getscreenmedia');

var WildEmitter = require('wildemitter');

var mockconsole = require('mockconsole');

function isAllTracksEnded(stream) {
  var isAllTracksEnded = true;
  stream.getTracks().forEach(function (t) {
    isAllTracksEnded = t.readyState === 'ended' && isAllTracksEnded;
  });
  return isAllTracksEnded;
}

function LocalMedia(opts) {
  WildEmitter.call(this);
  var config = this.config = {
    detectSpeakingEvents: false,
    audioFallback: false,
    media: {
      audio: true,
      video: true
    },
    harkOptions: null,
    logger: mockconsole
  };
  var item;

  for (item in opts) {
    if (opts.hasOwnProperty(item)) {
      this.config[item] = opts[item];
    }
  }

  this.logger = config.logger;
  this._log = this.logger.log.bind(this.logger, 'LocalMedia:');
  this._logerror = this.logger.error.bind(this.logger, 'LocalMedia:');
  this.localStreams = [];
  this.localScreens = [];

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    this._logerror('Your browser does not support local media capture.');
  }

  this._audioMonitors = [];
  this.on('localStreamStopped', this._stopAudioMonitor.bind(this));
  this.on('localScreenStopped', this._stopAudioMonitor.bind(this));
}

util.inherits(LocalMedia, WildEmitter);

LocalMedia.prototype.start = function (mediaConstraints, cb) {
  var self = this;
  var constraints = mediaConstraints || this.config.media;

  if (!navigator || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    var error = new Error('MediaStreamError');
    error.name = 'NotSupportedError';

    if (cb) {
      return cb(error, null);
    }

    return;
  }

  this.emit('localStreamRequested', constraints);
  navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
    // Although the promise should be resolved only if all the constraints
    // are met Edge resolves it if both audio and video are requested but
    // only audio is available.
    if (constraints.video && stream.getVideoTracks().length === 0) {
      constraints.video = false;
      self.start(constraints, cb);
      return;
    }

    if (constraints.audio && self.config.detectSpeakingEvents) {
      self._setupAudioMonitor(stream, self.config.harkOptions);
    }

    self.localStreams.push(stream);
    stream.getTracks().forEach(function (track) {
      track.addEventListener('ended', function () {
        if (isAllTracksEnded(stream)) {
          self._removeStream(stream);
        }
      });
    });
    self.emit('localStream', stream);

    if (cb) {
      return cb(null, stream);
    }
  })["catch"](function (err) {
    // Fallback for users without a camera
    if (self.config.audioFallback && err.name === 'NotFoundError' && constraints.video !== false) {
      constraints.video = false;
      self.start(constraints, cb);
      return;
    }

    self.emit('localStreamRequestFailed', constraints);

    if (cb) {
      return cb(err, null);
    }
  });
};

LocalMedia.prototype.stop = function (stream) {
  this.stopStream(stream);
  this.stopScreenShare(stream);
};

LocalMedia.prototype.stopStream = function (stream) {
  var self = this;

  if (stream) {
    var idx = this.localStreams.indexOf(stream);

    if (idx > -1) {
      stream.getTracks().forEach(function (track) {
        track.stop();
      });

      this._removeStream(stream);
    }
  } else {
    this.localStreams.forEach(function (stream) {
      stream.getTracks().forEach(function (track) {
        track.stop();
      });

      self._removeStream(stream);
    });
  }
};

LocalMedia.prototype.startScreenShare = function (mode, constraints, cb) {
  var self = this;
  this.emit('localScreenRequested');

  if (typeof constraints === 'function' && !cb) {
    cb = constraints;
    constraints = null;
  }

  getScreenMedia(mode, constraints, function (err, stream) {
    if (!err) {
      self.localScreens.push(stream);
      stream.getTracks().forEach(function (track) {
        track.addEventListener('ended', function () {
          var isAllTracksEnded = true;
          stream.getTracks().forEach(function (t) {
            isAllTracksEnded = t.readyState === 'ended' && isAllTracksEnded;
          });

          if (isAllTracksEnded) {
            self._removeStream(stream);
          }
        });
      });
      self.emit('localScreen', stream);
    } else {
      self.emit('localScreenRequestFailed');
    } // enable the callback


    if (cb) {
      return cb(err, stream);
    }
  });
};

LocalMedia.prototype.stopScreenShare = function (stream) {
  var self = this;

  if (stream) {
    var idx = this.localScreens.indexOf(stream);

    if (idx > -1) {
      stream.getTracks().forEach(function (track) {
        track.stop();
      });

      this._removeStream(stream);
    }
  } else {
    this.localScreens.forEach(function (stream) {
      stream.getTracks().forEach(function (track) {
        track.stop();
      });

      self._removeStream(stream);
    });
  }
}; // Audio controls


LocalMedia.prototype.mute = function () {
  this._audioEnabled(false);

  this.emit('audioOff');
};

LocalMedia.prototype.unmute = function () {
  this._audioEnabled(true);

  this.emit('audioOn');
}; // Video controls


LocalMedia.prototype.pauseVideo = function () {
  this._videoEnabled(false);

  this.emit('videoOff');
};

LocalMedia.prototype.resumeVideo = function () {
  this._videoEnabled(true);

  this.emit('videoOn');
}; // Combined controls


LocalMedia.prototype.pause = function () {
  this.mute();
  this.pauseVideo();
};

LocalMedia.prototype.resume = function () {
  this.unmute();
  this.resumeVideo();
}; // Internal methods for enabling/disabling audio/video


LocalMedia.prototype._audioEnabled = function (bool) {
  this.localStreams.forEach(function (stream) {
    stream.getAudioTracks().forEach(function (track) {
      track.enabled = !!bool;
    });
  });
};

LocalMedia.prototype._videoEnabled = function (bool) {
  this.localStreams.forEach(function (stream) {
    stream.getVideoTracks().forEach(function (track) {
      track.enabled = !!bool;
    });
  });
}; // check if all audio streams are enabled


LocalMedia.prototype.isAudioEnabled = function () {
  var enabled = true;
  var hasAudioTracks = false;
  this.localStreams.forEach(function (stream) {
    var audioTracks = stream.getAudioTracks();

    if (audioTracks.length > 0) {
      hasAudioTracks = true;
      audioTracks.forEach(function (track) {
        enabled = enabled && track.enabled;
      });
    }
  }); // If no audioTracks were found, that means there is no microphone device.
  // In that case, isAudioEnabled should return false.

  if (!hasAudioTracks) {
    return false;
  }

  return enabled;
}; // check if all video streams are enabled


LocalMedia.prototype.isVideoEnabled = function () {
  var enabled = true;
  var hasVideoTracks = false;
  this.localStreams.forEach(function (stream) {
    var videoTracks = stream.getVideoTracks();

    if (videoTracks.length > 0) {
      hasVideoTracks = true;
      videoTracks.forEach(function (track) {
        enabled = enabled && track.enabled;
      });
    }
  }); // If no videoTracks were found, that means there is no camera device.
  // In that case, isVideoEnabled should return false.

  if (!hasVideoTracks) {
    return false;
  }

  return enabled;
};

LocalMedia.prototype._removeStream = function (stream) {
  var idx = this.localStreams.indexOf(stream);

  if (idx > -1) {
    this.localStreams.splice(idx, 1);
    this.emit('localStreamStopped', stream);
  } else {
    idx = this.localScreens.indexOf(stream);

    if (idx > -1) {
      this.localScreens.splice(idx, 1);
      this.emit('localScreenStopped', stream);
    }
  }
};

LocalMedia.prototype._setupAudioMonitor = function (stream, harkOptions) {
  this._log('Setup audio');

  var audio = hark(stream, harkOptions);
  var self = this;
  var timeout;
  audio.on('speaking', function () {
    self.emit('speaking');
  });
  audio.on('stopped_speaking', function () {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(function () {
      self.emit('stoppedSpeaking');
    }, 1000);
  });
  audio.on('volume_change', function (volume, threshold) {
    self.emit('volumeChange', volume, threshold);
  });

  this._audioMonitors.push({
    audio: audio,
    stream: stream
  });
};

LocalMedia.prototype._stopAudioMonitor = function (stream) {
  var idx = -1;

  this._audioMonitors.forEach(function (monitors, i) {
    if (monitors.stream === stream) {
      idx = i;
    }
  });

  if (idx > -1) {
    this._audioMonitors[idx].audio.stop();

    this._audioMonitors.splice(idx, 1);
  }
}; // fallback for old .localScreen behaviour


Object.defineProperty(LocalMedia.prototype, 'localScreen', {
  get: function get() {
    return this.localScreens.length > 0 ? this.localScreens[0] : null;
  }
});
module.exports = LocalMedia;

},{"./getscreenmedia":1,"hark":9,"mockconsole":11,"util":8,"wildemitter":31}],3:[function(require,module,exports){
"use strict";

/* global module */
var util = require('util');

var webrtcSupport = require('webrtcsupport');

var WildEmitter = require('wildemitter');

function isAllTracksEnded(stream) {
  var isAllTracksEnded = true;
  stream.getTracks().forEach(function (t) {
    isAllTracksEnded = t.readyState === 'ended' && isAllTracksEnded;
  });
  return isAllTracksEnded;
}

function Peer(options) {
  var self = this; // call emitter constructor

  WildEmitter.call(this);
  this.id = options.id;
  this.parent = options.parent;
  this.type = options.type || 'video';
  this.oneway = options.oneway || false;
  this.sharemyscreen = options.sharemyscreen || false;
  this.browserPrefix = options.prefix;
  this.stream = options.stream;
  this.sendVideoIfAvailable = options.sendVideoIfAvailable === undefined ? true : options.sendVideoIfAvailable;
  this.enableDataChannels = options.enableDataChannels === undefined ? this.parent.config.enableDataChannels : options.enableDataChannels;
  this.receiveMedia = options.receiveMedia || this.parent.config.receiveMedia;
  this.channels = {};
  this.pendingDCMessages = []; // key (datachannel label) -> value (array[pending messages])

  this.sid = options.sid || Date.now().toString();
  this.pc = new RTCPeerConnection(this.parent.config.peerConnectionConfig);
  this.pc.addEventListener('icecandidate', this.onIceCandidate.bind(this));
  this.pc.addEventListener('endofcandidates', function (event) {
    self.send('endOfCandidates', event);
  });
  this.pc.addEventListener('addstream', this.handleRemoteStreamAdded.bind(this));
  this.pc.addEventListener('datachannel', this.handleDataChannelAdded.bind(this));
  this.pc.addEventListener('removestream', this.handleStreamRemoved.bind(this)); // Just fire negotiation needed events for now
  // When browser re-negotiation handling seems to work
  // we can use this as the trigger for starting the offer/answer process
  // automatically. We'll just leave it be for now while this stabalizes.

  this.pc.addEventListener('negotiationneeded', this.emit.bind(this, 'negotiationNeeded'));
  this.pc.addEventListener('iceconnectionstatechange', this.emit.bind(this, 'iceConnectionStateChange'));
  this.pc.addEventListener('iceconnectionstatechange', function () {
    switch (self.pc.iceConnectionState) {
      case 'failed':
        // currently, in chrome only the initiator goes to failed
        // so we need to signal this to the peer
        if (self.pc.localDescription.type === 'offer') {
          self.parent.emit('iceFailed', self);
          self.send('connectivityError');
        }

        break;
    }
  });
  this.pc.addEventListener('signalingstatechange', this.emit.bind(this, 'signalingStateChange'));
  this.logger = this.parent.logger; // handle screensharing/broadcast mode

  if (options.type === 'screen') {
    if (this.parent.localScreen && this.sharemyscreen) {
      this.logger.log('adding local screen stream to peer connection');
      this.pc.addStream(this.parent.localScreen);
      this.broadcaster = options.broadcaster;
    }
  } else {
    this.parent.localStreams.forEach(function (stream) {
      stream.getTracks().forEach(function (track) {
        if (track.kind !== 'video' || self.sendVideoIfAvailable) {
          self.pc.addTrack(track, stream);
        }
      });
    });
  } // proxy events to parent


  this.on('*', function () {
    self.parent.emit.apply(self.parent, arguments);
  });
}

util.inherits(Peer, WildEmitter);

Peer.prototype.offer = function (options) {
  this.pc.createOffer(options).then(function (offer) {
    this.pc.setLocalDescription(offer).then(function () {
      if (this.parent.config.nick) {
        // The offer is a RTCSessionDescription that only serializes
        // its own attributes to JSON, so if extra attributes are needed
        // a regular object has to be sent instead.
        offer = {
          type: offer.type,
          sdp: offer.sdp,
          nick: this.parent.config.nick
        };
      }

      this.send('offer', offer);
    }.bind(this))["catch"](function (error) {
      console.warn("setLocalDescription for offer failed: ", error);
    }.bind(this));
  }.bind(this))["catch"](function (error) {
    console.warn("createOffer failed: ", error);
  }.bind(this));
};

Peer.prototype.handleOffer = function (offer) {
  this.pc.setRemoteDescription(offer).then(function () {
    this.answer();
  }.bind(this))["catch"](function (error) {
    console.warn("setRemoteDescription for offer failed: ", error);
  }.bind(this));
};

Peer.prototype.answer = function () {
  this.pc.createAnswer().then(function (answer) {
    this.pc.setLocalDescription(answer).then(function () {
      if (this.parent.config.nick) {
        // The answer is a RTCSessionDescription that only serializes
        // its own attributes to JSON, so if extra attributes are needed
        // a regular object has to be sent instead.
        answer = {
          type: answer.type,
          sdp: answer.sdp,
          nick: this.parent.config.nick
        };
      }

      this.send('answer', answer);
    }.bind(this))["catch"](function (error) {
      console.warn("setLocalDescription for answer failed: ", error);
    }.bind(this));
  }.bind(this))["catch"](function (error) {
    console.warn("createAnswer failed: ", error);
  }.bind(this));
};

Peer.prototype.handleAnswer = function (answer) {
  this.pc.setRemoteDescription(answer)["catch"](function (error) {
    console.warn("setRemoteDescription for answer failed: ", error);
  }.bind(this));
};

Peer.prototype.handleMessage = function (message) {
  var self = this;
  this.logger.log('getting', message.type, message);

  if (message.prefix) {
    this.browserPrefix = message.prefix;
  }

  if (message.type === 'offer') {
    if (!this.nick) {
      this.nick = message.payload.nick;
    }

    delete message.payload.nick;
    this.handleOffer(message.payload);
  } else if (message.type === 'answer') {
    if (!this.nick) {
      this.nick = message.payload.nick;
    }

    delete message.payload.nick;
    this.handleAnswer(message.payload);
  } else if (message.type === 'candidate') {
    this.pc.addIceCandidate(message.payload.candidate);
  } else if (message.type === 'connectivityError') {
    this.parent.emit('connectivityError', self);
  } else if (message.type === 'mute') {
    this.parent.emit('mute', {
      id: message.from,
      name: message.payload.name
    });
  } else if (message.type === 'unmute') {
    this.parent.emit('unmute', {
      id: message.from,
      name: message.payload.name
    });
  } else if (message.type === 'endOfCandidates') {
    this.pc.addIceCandidate('');
  } else if (message.type === 'unshareScreen') {
    this.parent.emit('unshareScreen', {
      id: message.from
    });
    this.end();
  }
}; // send via signalling channel


Peer.prototype.send = function (messageType, payload) {
  var message = {
    to: this.id,
    sid: this.sid,
    broadcaster: this.broadcaster,
    roomType: this.type,
    type: messageType,
    payload: payload,
    prefix: webrtcSupport.prefix
  };
  this.logger.log('sending', messageType, message);
  this.parent.emit('message', message);
}; // send via data channel
// returns true when message was sent and false if channel is not open


Peer.prototype.sendDirectly = function (channel, messageType, payload) {
  var message = {
    type: messageType,
    payload: payload
  };
  this.logger.log('sending via datachannel', channel, messageType, message);
  var dc = this.getDataChannel(channel);

  if (dc.readyState !== 'open') {
    if (!this.pendingDCMessages.hasOwnProperty(channel)) {
      this.pendingDCMessages[channel] = [];
    }

    this.pendingDCMessages[channel].push(message);
    return false;
  }

  dc.send(JSON.stringify(message));
  return true;
}; // Internal method registering handlers for a data channel and emitting events on the peer


Peer.prototype._observeDataChannel = function (channel) {
  var self = this;
  channel.onclose = this.emit.bind(this, 'channelClose', channel);
  channel.onerror = this.emit.bind(this, 'channelError', channel);

  channel.onmessage = function (event) {
    self.emit('channelMessage', self, channel.label, JSON.parse(event.data), channel, event);
  };

  channel.onopen = function () {
    self.emit('channelOpen', channel); // Check if there are messages that could not be send

    if (self.pendingDCMessages.hasOwnProperty(channel.label)) {
      var pendingMessages = self.pendingDCMessages[channel.label];

      for (var i = 0; i < pendingMessages.length; i++) {
        self.sendDirectly(channel.label, pendingMessages[i].type, pendingMessages[i].payload);
      }

      self.pendingDCMessages[channel.label] = [];
    }
  };
}; // Fetch or create a data channel by the given name


Peer.prototype.getDataChannel = function (name, opts) {
  if (!webrtcSupport.supportDataChannel) {
    return this.emit('error', new Error('createDataChannel not supported'));
  }

  var channel = this.channels[name];
  opts || (opts = {});

  if (channel) {
    return channel;
  } // if we don't have one by this label, create it


  channel = this.channels[name] = this.pc.createDataChannel(name, opts);

  this._observeDataChannel(channel);

  return channel;
};

Peer.prototype.onIceCandidate = function (event) {
  var candidate = event.candidate;

  if (this.closed) {
    return;
  }

  if (candidate) {
    var pcConfig = this.parent.config.peerConnectionConfig;

    if (webrtcSupport.prefix === 'moz' && pcConfig && pcConfig.iceTransports && candidate.candidate && candidate.candidate.candidate && candidate.candidate.candidate.indexOf(pcConfig.iceTransports) < 0) {
      this.logger.log('Ignoring ice candidate not matching pcConfig iceTransports type: ', pcConfig.iceTransports);
    } else {
      // Retain legacy data structure for compatibility with
      // mobile clients.
      var expandedCandidate = {
        candidate: {
          candidate: candidate.candidate,
          sdpMid: candidate.sdpMid,
          sdpMLineIndex: candidate.sdpMLineIndex
        }
      };
      this.send('candidate', expandedCandidate);
    }
  } else {
    this.logger.log("End of candidates.");
  }
};

Peer.prototype.start = function () {
  // well, the webrtc api requires that we either
  // a) create a datachannel a priori
  // b) do a renegotiation later to add the SCTP m-line
  // Let's do (a) first...
  if (this.enableDataChannels) {
    this.getDataChannel('simplewebrtc');
  }

  this.offer(this.receiveMedia);
};

Peer.prototype.icerestart = function () {
  var constraints = this.receiveMedia;
  constraints.iceRestart = true;
  this.offer(constraints);
};

Peer.prototype.end = function () {
  if (this.closed) {
    return;
  }

  this.pc.close();
  this.handleStreamRemoved();
};

Peer.prototype.handleRemoteStreamAdded = function (event) {
  var self = this;

  if (this.stream) {
    this.logger.warn('Already have a remote stream');
  } else {
    this.stream = event.stream;
    this.stream.getTracks().forEach(function (track) {
      track.addEventListener('ended', function () {
        if (isAllTracksEnded(self.stream)) {
          self.end();
        }
      });
    });
    this.parent.emit('peerStreamAdded', this);
  }
};

Peer.prototype.handleStreamRemoved = function () {
  var peerIndex = this.parent.peers.indexOf(this);

  if (peerIndex > -1) {
    this.parent.peers.splice(peerIndex, 1);
    this.closed = true;
    this.parent.emit('peerStreamRemoved', this);
  }
};

Peer.prototype.handleDataChannelAdded = function (event) {
  var channel = event.channel;
  this.channels[channel.label] = channel;

  this._observeDataChannel(channel);
};

module.exports = Peer;

},{"util":8,"webrtcsupport":30,"wildemitter":31}],4:[function(require,module,exports){
"use strict";

/* global module */
var WebRTC = require('./webrtc');

var WildEmitter = require('wildemitter');

var webrtcSupport = require('webrtcsupport');

var attachMediaStream = require('attachmediastream');

var mockconsole = require('mockconsole');

function SimpleWebRTC(opts) {
  var self = this;
  var options = opts || {};
  var config = this.config = {
    socketio: {
      /* 'force new connection':true*/
    },
    connection: null,
    debug: false,
    localVideoEl: '',
    remoteVideosEl: '',
    enableDataChannels: true,
    autoRequestMedia: false,
    autoRemoveVideos: true,
    adjustPeerVolume: false,
    peerVolumeWhenSpeaking: 0.25,
    media: {
      video: true,
      audio: true
    },
    receiveMedia: {
      offerToReceiveAudio: 1,
      offerToReceiveVideo: 1
    },
    localVideo: {
      autoplay: true,
      mirror: true,
      muted: true
    }
  };
  var item, connection; // We also allow a 'logger' option. It can be any object that implements
  // log, warn, and error methods.
  // We log nothing by default, following "the rule of silence":
  // http://www.linfo.org/rule_of_silence.html

  this.logger = function () {
    // we assume that if you're in debug mode and you didn't
    // pass in a logger, you actually want to log as much as
    // possible.
    if (opts.debug) {
      return opts.logger || console;
    } else {
      // or we'll use your logger which should have its own logic
      // for output. Or we'll return the no-op.
      return opts.logger || mockconsole;
    }
  }(); // set our config from options


  for (item in options) {
    if (options.hasOwnProperty(item)) {
      this.config[item] = options[item];
    }
  } // Override screensharing support detection to fit the custom
  // "getScreenMedia" module.
  // Note that this is a coarse check; calling "getScreenMedia" may fail even
  // if "supportScreenSharing" is true.


  var screenSharingSupported = window.navigator.mediaDevices && window.navigator.mediaDevices.getDisplayMedia || window.navigator.webkitGetUserMedia || window.navigator.userAgent.match('Firefox');
  webrtcSupport.supportScreenSharing = window.location.protocol === 'https:' && screenSharingSupported; // attach detected support for convenience

  this.capabilities = webrtcSupport; // call WildEmitter constructor

  WildEmitter.call(this);

  if (this.config.connection === null) {
    throw 'no connection object given in the configuration';
  } else {
    connection = this.connection = this.config.connection;
  }

  connection.on('connect', function () {
    self.emit('connectionReady', connection.getSessionid());
    self.sessionReady = true;
    self.testReadiness();
  });
  connection.on('message', function (message) {
    var peers = self.webrtc.getPeers(message.from, message.roomType);
    var peer;

    if (message.type === 'offer') {
      if (peers.length) {
        peers.forEach(function (p) {
          if (p.sid === message.sid) {
            peer = p;
          }
        }); //if (!peer) peer = peers[0]; // fallback for old protocol versions
      }

      if (!peer) {
        peer = self.webrtc.createPeer({
          id: message.from,
          sid: message.sid,
          type: message.roomType,
          enableDataChannels: self.config.enableDataChannels && message.roomType !== 'screen',
          sharemyscreen: message.roomType === 'screen' && !message.broadcaster,
          broadcaster: message.roomType === 'screen' && !message.broadcaster ? self.connection.getSessionid() : null,
          sendVideoIfAvailable: self.connection.getSendVideoIfAvailable()
        });
        self.emit('createdPeer', peer);
      }

      peer.handleMessage(message);
    } else if (peers.length) {
      peers.forEach(function (peer) {
        if (message.sid) {
          if (peer.sid === message.sid) {
            peer.handleMessage(message);
          }
        } else {
          peer.handleMessage(message);
        }
      });
    }
  });
  connection.on('remove', function (room) {
    if (room.id !== self.connection.getSessionid()) {
      self.webrtc.removePeers(room.id, room.type);
    }
  }); // instantiate our main WebRTC helper
  // using same logger from logic here

  opts.logger = this.logger;
  opts.debug = false;
  this.webrtc = new WebRTC(opts); // attach a few methods from underlying lib to simple.

  ['mute', 'unmute', 'pauseVideo', 'resumeVideo', 'pause', 'resume', 'sendToAll', 'sendDirectlyToAll', 'getPeers', 'createPeer', 'removePeers'].forEach(function (method) {
    self[method] = self.webrtc[method].bind(self.webrtc);
  }); // proxy events from WebRTC

  this.webrtc.on('*', function () {
    self.emit.apply(self, arguments);
  }); // log all events in debug mode

  if (config.debug) {
    this.on('*', this.logger.log.bind(this.logger, 'SimpleWebRTC event:'));
  } // check for readiness


  this.webrtc.on('localStream', function () {
    self.testReadiness();
  });
  this.webrtc.on('message', function (payload) {
    self.connection.emit('message', payload);
  });
  this.webrtc.on('peerStreamAdded', this.handlePeerStreamAdded.bind(this));
  this.webrtc.on('peerStreamRemoved', this.handlePeerStreamRemoved.bind(this)); // echo cancellation attempts

  if (this.config.adjustPeerVolume) {
    this.webrtc.on('speaking', this.setVolumeForAll.bind(this, this.config.peerVolumeWhenSpeaking));
    this.webrtc.on('stoppedSpeaking', this.setVolumeForAll.bind(this, 1));
  }

  connection.on('stunservers', function (args) {
    // resets/overrides the config
    self.webrtc.config.peerConnectionConfig.iceServers = args;
    self.emit('stunservers', args);
  });
  connection.on('turnservers', function (args) {
    // appends to the config
    self.webrtc.config.peerConnectionConfig.iceServers = self.webrtc.config.peerConnectionConfig.iceServers.concat(args);
    self.emit('turnservers', args);
  });
  this.webrtc.on('iceFailed', function ()
  /*peer*/
  {// local ice failure
  });
  this.webrtc.on('connectivityError', function ()
  /*peer*/
  {// remote ice failure
  }); // sending mute/unmute to all peers

  this.webrtc.on('audioOn', function () {
    self.webrtc.sendToAll('unmute', {
      name: 'audio'
    });
  });
  this.webrtc.on('audioOff', function () {
    self.webrtc.sendToAll('mute', {
      name: 'audio'
    });
  });
  this.webrtc.on('videoOn', function () {
    self.webrtc.sendToAll('unmute', {
      name: 'video'
    });
  });
  this.webrtc.on('videoOff', function () {
    self.webrtc.sendToAll('mute', {
      name: 'video'
    });
  }); // screensharing events

  this.webrtc.on('localScreen', function (stream) {
    var el = document.createElement('video'),
        container = self.getRemoteVideoContainer();

    el.oncontextmenu = function () {
      return false;
    };

    el.id = 'localScreen';
    attachMediaStream(stream, el);

    if (container) {
      container.appendChild(el);
    }

    self.emit('localScreenAdded', el);
    self.connection.emit('shareScreen'); // NOTE: we don't create screen peers for existing video peers here,
    // this is done by the application code in "webrtc.js".
  });
  this.webrtc.on('localScreenStopped', function ()
  /*stream*/
  {
    self.stopScreenShare();
    /*
    self.connection.emit('unshareScreen');
    self.webrtc.peers.forEach(function (peer) {
    	if (peer.sharemyscreen) {
    		peer.end();
    	}
    });
    */
  });
}

SimpleWebRTC.prototype = Object.create(WildEmitter.prototype, {
  constructor: {
    value: SimpleWebRTC
  }
});

SimpleWebRTC.prototype.leaveCall = function () {
  if (this.roomName) {
    while (this.webrtc.peers.length) {
      this.webrtc.peers[0].end();
    }

    if (this.getLocalScreen()) {
      this.stopScreenShare();
    }

    this.emit('leftRoom', this.roomName);
    this.stopLocalVideo();
    this.roomName = undefined;
  }
};

SimpleWebRTC.prototype.disconnect = function () {
  this.connection.disconnect();
  delete this.connection;
};

SimpleWebRTC.prototype.handlePeerStreamAdded = function (peer) {
  var self = this;
  var container = this.getRemoteVideoContainer(); // If there is a video track Chromium does not play audio in a video element
  // until the video track starts to play; an audio element is thus needed to
  // play audio when the remote peer starts with the camera available but
  // disabled.

  var audio = attachMediaStream(peer.stream, null, {
    audio: true
  });
  var video = attachMediaStream(peer.stream);
  video.muted = true; // At least Firefox, Opera and Edge move the video to a wrong position
  // instead of keeping it unchanged	when "transform: scaleX(1)" is used
  // ("transform: scaleX(-1)" is fine); as it should have no effect the
  // transform is removed.

  if (video.style.transform === 'scaleX(1)') {
    video.style.transform = '';
  } // store video element as part of peer for easy removal


  peer.audioEl = audio;
  peer.videoEl = video;
  audio.id = this.getDomId(peer) + '-audio';
  video.id = this.getDomId(peer);

  if (container) {
    container.appendChild(audio);
    container.appendChild(video);
  }

  this.emit('videoAdded', video, audio, peer); // send our mute status to new peer if we're muted
  // currently called with a small delay because it arrives before
  // the video element is created otherwise (which happens after
  // the async setRemoteDescription-createAnswer)

  window.setTimeout(function () {
    if (!self.webrtc.isAudioEnabled()) {
      peer.send('mute', {
        name: 'audio'
      });
    }

    if (!self.webrtc.isVideoEnabled()) {
      peer.send('mute', {
        name: 'video'
      });
    }
  }, 250);
};

SimpleWebRTC.prototype.handlePeerStreamRemoved = function (peer) {
  var container = this.getRemoteVideoContainer();
  var audioEl = peer.audioEl;
  var videoEl = peer.videoEl;

  if (this.config.autoRemoveVideos && container && audioEl) {
    container.removeChild(audioEl);
  }

  if (this.config.autoRemoveVideos && container && videoEl) {
    container.removeChild(videoEl);
  }

  if (videoEl) {
    this.emit('videoRemoved', videoEl, peer);
  }
};

SimpleWebRTC.prototype.getDomId = function (peer) {
  return [peer.id, peer.type, peer.broadcaster ? 'broadcasting' : 'incoming'].join('_');
}; // set volume on video tag for all peers takse a value between 0 and 1


SimpleWebRTC.prototype.setVolumeForAll = function (volume) {
  this.webrtc.peers.forEach(function (peer) {
    if (peer.audioEl) {
      peer.audioEl.volume = volume;
    }
  });
};

SimpleWebRTC.prototype.joinCall = function (name) {
  if (this.config.autoRequestMedia) {
    this.startLocalVideo();
  }

  this.roomName = name;
  this.emit('joinedRoom', name);
};

SimpleWebRTC.prototype.getEl = function (idOrEl) {
  if (typeof idOrEl === 'string') {
    return document.getElementById(idOrEl);
  } else {
    return idOrEl;
  }
};

SimpleWebRTC.prototype.startLocalVideo = function () {
  var self = this;
  this.webrtc.start(this.config.media, function (err, stream) {
    if (err) {
      self.emit('localMediaError', err);
    } else {
      self.emit('localMediaStarted', self.config.media);
      attachMediaStream(stream, self.getLocalVideoContainer(), self.config.localVideo);
    }
  });
};

SimpleWebRTC.prototype.stopLocalVideo = function () {
  this.webrtc.stop();
}; // this accepts either element ID or element
// and either the video tag itself or a container
// that will be used to put the video tag into.


SimpleWebRTC.prototype.getLocalVideoContainer = function () {
  var el = this.getEl(this.config.localVideoEl);

  if (el && el.tagName === 'VIDEO') {
    el.oncontextmenu = function () {
      return false;
    };

    return el;
  } else if (el) {
    var video = document.createElement('video');

    video.oncontextmenu = function () {
      return false;
    };

    el.appendChild(video);
    return video;
  } else {
    return;
  }
};

SimpleWebRTC.prototype.getRemoteVideoContainer = function () {
  return this.getEl(this.config.remoteVideosEl);
};

SimpleWebRTC.prototype.shareScreen = function (mode, cb) {
  this.webrtc.startScreenShare(mode, cb);
};

SimpleWebRTC.prototype.getLocalScreen = function () {
  return this.webrtc.localScreen;
};

SimpleWebRTC.prototype.stopScreenShare = function () {
  this.connection.emit('unshareScreen');
  var videoEl = document.getElementById('localScreen');
  var container = this.getRemoteVideoContainer();

  if (this.config.autoRemoveVideos && container && videoEl) {
    container.removeChild(videoEl);
  } // a hack to emit the event the removes the video
  // element that we want


  if (videoEl) {
    this.emit('videoRemoved', videoEl);
  }

  if (this.getLocalScreen()) {
    this.webrtc.stopScreenShare();
  } // Notify peers were sending to.


  this.webrtc.peers.forEach(function (peer) {
    if (peer.type === 'screen' && peer.sharemyscreen) {
      peer.send('unshareScreen');
    }

    if (peer.broadcaster) {
      peer.end();
    }
  });
};

SimpleWebRTC.prototype.testReadiness = function () {
  var self = this;

  if (this.sessionReady) {
    if (!this.config.media.video && !this.config.media.audio) {
      self.emit('readyToCall', self.connection.getSessionid());
    } else if (this.webrtc.localStreams.length > 0) {
      self.emit('readyToCall', self.connection.getSessionid());
    }
  }
};

SimpleWebRTC.prototype.createRoom = function (name, cb) {
  this.roomName = name;

  if (arguments.length === 2) {
    this.connection.emit('create', name, cb);
  } else {
    this.connection.emit('create', name);
  }
};

module.exports = SimpleWebRTC;

},{"./webrtc":5,"attachmediastream":6,"mockconsole":11,"webrtcsupport":30,"wildemitter":31}],5:[function(require,module,exports){
"use strict";

/* global module */
var util = require('util');

var webrtcSupport = require('webrtcsupport');

var mockconsole = require('mockconsole');

var localMedia = require('./localmedia');

var Peer = require('./peer');

function WebRTC(opts) {
  var self = this;
  var options = opts || {};
  this.config = {
    debug: false,
    // makes the entire PC config overridable
    peerConnectionConfig: {
      iceServers: []
    },
    receiveMedia: {
      offerToReceiveAudio: 1,
      offerToReceiveVideo: 1
    },
    enableDataChannels: true
  };
  var item; // We also allow a 'logger' option. It can be any object that implements
  // log, warn, and error methods.
  // We log nothing by default, following "the rule of silence":
  // http://www.linfo.org/rule_of_silence.html

  this.logger = function () {
    // we assume that if you're in debug mode and you didn't
    // pass in a logger, you actually want to log as much as
    // possible.
    if (opts.debug) {
      return opts.logger || console;
    } else {
      // or we'll use your logger which should have its own logic
      // for output. Or we'll return the no-op.
      return opts.logger || mockconsole;
    }
  }(); // set options


  for (item in options) {
    if (options.hasOwnProperty(item)) {
      this.config[item] = options[item];
    }
  } // check for support


  if (!webrtcSupport.support) {
    this.logger.error('Your browser doesn\'t seem to support WebRTC');
  } // where we'll store our peer connections


  this.peers = []; // call localMedia constructor

  localMedia.call(this, this.config);
  this.on('speaking', function () {
    if (!self.hardMuted) {
      // FIXME: should use sendDirectlyToAll, but currently has different semantics wrt payload
      self.peers.forEach(function (peer) {
        if (peer.enableDataChannels) {
          var dc = peer.getDataChannel('hark');

          if (dc.readyState !== 'open') {
            return;
          }

          dc.send(JSON.stringify({
            type: 'speaking'
          }));
        }
      });
    }
  });
  this.on('stoppedSpeaking', function () {
    if (!self.hardMuted) {
      // FIXME: should use sendDirectlyToAll, but currently has different semantics wrt payload
      self.peers.forEach(function (peer) {
        if (peer.enableDataChannels) {
          var dc = peer.getDataChannel('hark');

          if (dc.readyState !== 'open') {
            return;
          }

          dc.send(JSON.stringify({
            type: 'stoppedSpeaking'
          }));
        }
      });
    }
  });
  this.on('unshareScreen', function (message) {
    // End peers we were receiving the screensharing stream from.
    var peers = self.getPeers(message.from, 'screen');
    peers.forEach(function (peer) {
      if (!peer.sharemyscreen) {
        peer.end();
      }
    });
  }); // log events in debug mode

  if (this.config.debug) {
    this.on('*', function (event, val1, val2) {
      var logger; // if you didn't pass in a logger and you explicitly turning on debug
      // we're just going to assume you're wanting log output with console

      if (self.config.logger === mockconsole) {
        logger = console;
      } else {
        logger = self.logger;
      }

      logger.log('event:', event, val1, val2);
    });
  }
}

util.inherits(WebRTC, localMedia);

WebRTC.prototype.createPeer = function (opts) {
  var peer;
  opts.parent = this;
  peer = new Peer(opts);
  this.peers.push(peer);
  return peer;
}; // removes peers


WebRTC.prototype.removePeers = function (id, type) {
  this.getPeers(id, type).forEach(function (peer) {
    peer.end();
  });
}; // fetches all Peer objects by session id and/or type


WebRTC.prototype.getPeers = function (sessionId, type) {
  return this.peers.filter(function (peer) {
    return (!sessionId || peer.id === sessionId) && (!type || peer.type === type);
  });
}; // sends message to all


WebRTC.prototype.sendToAll = function (message, payload) {
  this.peers.forEach(function (peer) {
    peer.send(message, payload);
  });
}; // sends message to all using a datachannel
// only sends to anyone who has an open datachannel


WebRTC.prototype.sendDirectlyToAll = function (channel, message, payload) {
  this.peers.forEach(function (peer) {
    if (peer.enableDataChannels) {
      peer.sendDirectly(channel, message, payload);
    }
  });
};

module.exports = WebRTC;

},{"./localmedia":2,"./peer":3,"mockconsole":11,"util":8,"webrtcsupport":30}],6:[function(require,module,exports){
"use strict";

var adapter = require('webrtc-adapter');

module.exports = function (stream, el, options) {
  var item;
  var element = el;
  var opts = {
    autoplay: true,
    mirror: false,
    muted: false,
    audio: false,
    disableContextMenu: false
  };

  if (options) {
    for (item in options) {
      opts[item] = options[item];
    }
  }

  if (!element) {
    element = document.createElement(opts.audio ? 'audio' : 'video');
  } else if (element.tagName.toLowerCase() === 'audio') {
    opts.audio = true;
  }

  if (opts.disableContextMenu) {
    element.oncontextmenu = function (e) {
      e.preventDefault();
    };
  }

  if (opts.autoplay) element.autoplay = 'autoplay';
  element.muted = !!opts.muted;

  if (!opts.audio) {
    ['', 'moz', 'webkit', 'o', 'ms'].forEach(function (prefix) {
      var styleName = prefix ? prefix + 'Transform' : 'transform';
      element.style[styleName] = opts.mirror ? 'scaleX(-1)' : 'scaleX(1)';
    });
  }

  if (adapter.browserDetails.browser === 'safari') {
    element.setAttribute('playsinline', true);
  }

  element.srcObject = stream;
  return element;
};

},{"webrtc-adapter":15}],7:[function(require,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

module.exports = function isBuffer(arg) {
  return arg && _typeof(arg) === 'object' && typeof arg.copy === 'function' && typeof arg.fill === 'function' && typeof arg.readUInt8 === 'function';
};

},{}],8:[function(require,module,exports){
(function (process,global){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
var formatRegExp = /%[sdj%]/g;

exports.format = function (f) {
  if (!isString(f)) {
    var objects = [];

    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }

    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function (x) {
    if (x === '%%') return '%';
    if (i >= len) return x;

    switch (x) {
      case '%s':
        return String(args[i++]);

      case '%d':
        return Number(args[i++]);

      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }

      default:
        return x;
    }
  });

  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }

  return str;
}; // Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.


exports.deprecate = function (fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function () {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;

  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }

      warned = true;
    }

    return fn.apply(this, arguments);
  }

  return deprecated;
};

var debugs = {};
var debugEnviron;

exports.debuglog = function (set) {
  if (isUndefined(debugEnviron)) debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();

  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;

      debugs[set] = function () {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function () {};
    }
  }

  return debugs[set];
};
/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */

/* legacy: obj, showHidden, depth, colors*/


function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  }; // legacy...

  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];

  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  } // set default options


  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}

exports.inspect = inspect; // http://en.wikipedia.org/wiki/ANSI_escape_code#graphics

inspect.colors = {
  'bold': [1, 22],
  'italic': [3, 23],
  'underline': [4, 24],
  'inverse': [7, 27],
  'white': [37, 39],
  'grey': [90, 39],
  'black': [30, 39],
  'blue': [34, 39],
  'cyan': [36, 39],
  'green': [32, 39],
  'magenta': [35, 39],
  'red': [31, 39],
  'yellow': [33, 39]
}; // Don't use 'blue' not visible on cmd.exe

inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};

function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return "\x1B[" + inspect.colors[style][0] + 'm' + str + "\x1B[" + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}

function stylizeNoColor(str, styleType) {
  return str;
}

function arrayToHash(array) {
  var hash = {};
  array.forEach(function (val, idx) {
    hash[val] = true;
  });
  return hash;
}

function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect && value && isFunction(value.inspect) && // Filter out the util module, it's inspect function is special
  value.inspect !== exports.inspect && // Also filter out any prototype objects using the circular check.
  !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);

    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }

    return ret;
  } // Primitive types cannot have properties


  var primitive = formatPrimitive(ctx, value);

  if (primitive) {
    return primitive;
  } // Look up the keys of the object.


  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  } // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx


  if (isError(value) && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  } // Some type of object without properties can be shortcutted.


  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }

    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }

    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }

    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '',
      array = false,
      braces = ['{', '}']; // Make Array say that they are Array

  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  } // Make functions say that they are functions


  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  } // Make RegExps say that they are RegExps


  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  } // Make dates with properties first say the date


  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  } // Make error with message first say the error


  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);
  var output;

  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function (key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();
  return reduceToSingleString(output, base, braces);
}

function formatPrimitive(ctx, value) {
  if (isUndefined(value)) return ctx.stylize('undefined', 'undefined');

  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '').replace(/'/g, "\\'").replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }

  if (isNumber(value)) return ctx.stylize('' + value, 'number');
  if (isBoolean(value)) return ctx.stylize('' + value, 'boolean'); // For some reason typeof null is "object", so special case here.

  if (isNull(value)) return ctx.stylize('null', 'null');
}

function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}

function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];

  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
    } else {
      output.push('');
    }
  }

  keys.forEach(function (key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
    }
  });
  return output;
}

function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || {
    value: value[key]
  };

  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }

  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }

  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }

      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function (line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function (line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }

  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }

    name = JSON.stringify('' + key);

    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}

function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function (prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] + (base === '' ? '' : base + '\n ') + ' ' + output.join(',\n  ') + ' ' + braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
} // NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.


function isArray(ar) {
  return Array.isArray(ar);
}

exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}

exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}

exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}

exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}

exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}

exports.isString = isString;

function isSymbol(arg) {
  return _typeof(arg) === 'symbol';
}

exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}

exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}

exports.isRegExp = isRegExp;

function isObject(arg) {
  return _typeof(arg) === 'object' && arg !== null;
}

exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}

exports.isDate = isDate;

function isError(e) {
  return isObject(e) && (objectToString(e) === '[object Error]' || e instanceof Error);
}

exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}

exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null || typeof arg === 'boolean' || typeof arg === 'number' || typeof arg === 'string' || _typeof(arg) === 'symbol' || // ES6 symbol
  typeof arg === 'undefined';
}

exports.isPrimitive = isPrimitive;
exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}

var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']; // 26 Feb 16:19:34

function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
} // log is just a thin wrapper to console.log that prepends a timestamp


exports.log = function () {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};
/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */


exports.inherits = require('inherits');

exports._extend = function (origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;
  var keys = Object.keys(add);
  var i = keys.length;

  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }

  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":7,"_process":12,"inherits":10}],9:[function(require,module,exports){
"use strict";

var WildEmitter = require('wildemitter');

function getMaxVolume(analyser, fftBins) {
  var maxVolume = -Infinity;
  analyser.getFloatFrequencyData(fftBins);

  for (var i = 4, ii = fftBins.length; i < ii; i++) {
    if (fftBins[i] > maxVolume && fftBins[i] < 0) {
      maxVolume = fftBins[i];
    }
  }

  ;
  return maxVolume;
}

var audioContextType;

if (typeof window !== 'undefined') {
  audioContextType = window.AudioContext || window.webkitAudioContext;
} // use a single audio context due to hardware limits


var audioContext = null;

module.exports = function (stream, options) {
  var harker = new WildEmitter(); // make it not break in non-supported browsers

  if (!audioContextType) return harker; //Config

  var options = options || {},
      smoothing = options.smoothing || 0.1,
      interval = options.interval || 50,
      threshold = options.threshold,
      play = options.play,
      history = options.history || 10,
      running = true; // Ensure that just a single AudioContext is internally created

  audioContext = options.audioContext || audioContext || new audioContextType();
  var sourceNode, fftBins, analyser;
  analyser = audioContext.createAnalyser();
  analyser.fftSize = 512;
  analyser.smoothingTimeConstant = smoothing;
  fftBins = new Float32Array(analyser.frequencyBinCount);
  if (stream.jquery) stream = stream[0];

  if (stream instanceof HTMLAudioElement || stream instanceof HTMLVideoElement) {
    //Audio Tag
    sourceNode = audioContext.createMediaElementSource(stream);
    if (typeof play === 'undefined') play = true;
    threshold = threshold || -50;
  } else {
    //WebRTC Stream
    sourceNode = audioContext.createMediaStreamSource(stream);
    threshold = threshold || -50;
  }

  sourceNode.connect(analyser);
  if (play) analyser.connect(audioContext.destination);
  harker.speaking = false;

  harker.suspend = function () {
    return audioContext.suspend();
  };

  harker.resume = function () {
    return audioContext.resume();
  };

  Object.defineProperty(harker, 'state', {
    get: function get() {
      return audioContext.state;
    }
  });

  audioContext.onstatechange = function () {
    harker.emit('state_change', audioContext.state);
  };

  harker.setThreshold = function (t) {
    threshold = t;
  };

  harker.setInterval = function (i) {
    interval = i;
  };

  harker.stop = function () {
    running = false;
    harker.emit('volume_change', -100, threshold);

    if (harker.speaking) {
      harker.speaking = false;
      harker.emit('stopped_speaking');
    }

    analyser.disconnect();
    sourceNode.disconnect();
  };

  harker.speakingHistory = [];

  for (var i = 0; i < history; i++) {
    harker.speakingHistory.push(0);
  } // Poll the analyser node to determine if speaking
  // and emit events if changed


  var looper = function looper() {
    setTimeout(function () {
      //check if stop has been called
      if (!running) {
        return;
      }

      var currentVolume = getMaxVolume(analyser, fftBins);
      harker.emit('volume_change', currentVolume, threshold);
      var history = 0;

      if (currentVolume > threshold && !harker.speaking) {
        // trigger quickly, short history
        for (var i = harker.speakingHistory.length - 3; i < harker.speakingHistory.length; i++) {
          history += harker.speakingHistory[i];
        }

        if (history >= 2) {
          harker.speaking = true;
          harker.emit('speaking');
        }
      } else if (currentVolume < threshold && harker.speaking) {
        for (var i = 0; i < harker.speakingHistory.length; i++) {
          history += harker.speakingHistory[i];
        }

        if (history == 0) {
          harker.speaking = false;
          harker.emit('stopped_speaking');
        }
      }

      harker.speakingHistory.shift();
      harker.speakingHistory.push(0 + (currentVolume > threshold));
      looper();
    }, interval);
  };

  looper();
  return harker;
};

},{"wildemitter":31}],10:[function(require,module,exports){
"use strict";

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor;

    var TempCtor = function TempCtor() {};

    TempCtor.prototype = superCtor.prototype;
    ctor.prototype = new TempCtor();
    ctor.prototype.constructor = ctor;
  };
}

},{}],11:[function(require,module,exports){
"use strict";

var methods = "assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(",");
var l = methods.length;

var fn = function fn() {};

var mockconsole = {};

while (l--) {
  mockconsole[methods[l]] = fn;
}

module.exports = mockconsole;

},{}],12:[function(require,module,exports){
"use strict";

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};

},{}],13:[function(require,module,exports){
/*
 *  Copyright (c) 2017 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */

/* eslint-env node */
'use strict';

var SDPUtils = require('sdp');

function fixStatsType(stat) {
  return {
    inboundrtp: 'inbound-rtp',
    outboundrtp: 'outbound-rtp',
    candidatepair: 'candidate-pair',
    localcandidate: 'local-candidate',
    remotecandidate: 'remote-candidate'
  }[stat.type] || stat.type;
}

function writeMediaSection(transceiver, caps, type, stream, dtlsRole) {
  var sdp = SDPUtils.writeRtpDescription(transceiver.kind, caps); // Map ICE parameters (ufrag, pwd) to SDP.

  sdp += SDPUtils.writeIceParameters(transceiver.iceGatherer.getLocalParameters()); // Map DTLS parameters to SDP.

  sdp += SDPUtils.writeDtlsParameters(transceiver.dtlsTransport.getLocalParameters(), type === 'offer' ? 'actpass' : dtlsRole || 'active');
  sdp += 'a=mid:' + transceiver.mid + '\r\n';

  if (transceiver.rtpSender && transceiver.rtpReceiver) {
    sdp += 'a=sendrecv\r\n';
  } else if (transceiver.rtpSender) {
    sdp += 'a=sendonly\r\n';
  } else if (transceiver.rtpReceiver) {
    sdp += 'a=recvonly\r\n';
  } else {
    sdp += 'a=inactive\r\n';
  }

  if (transceiver.rtpSender) {
    var trackId = transceiver.rtpSender._initialTrackId || transceiver.rtpSender.track.id;
    transceiver.rtpSender._initialTrackId = trackId; // spec.

    var msid = 'msid:' + (stream ? stream.id : '-') + ' ' + trackId + '\r\n';
    sdp += 'a=' + msid; // for Chrome. Legacy should no longer be required.

    sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc + ' ' + msid; // RTX

    if (transceiver.sendEncodingParameters[0].rtx) {
      sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc + ' ' + msid;
      sdp += 'a=ssrc-group:FID ' + transceiver.sendEncodingParameters[0].ssrc + ' ' + transceiver.sendEncodingParameters[0].rtx.ssrc + '\r\n';
    }
  } // FIXME: this should be written by writeRtpDescription.


  sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc + ' cname:' + SDPUtils.localCName + '\r\n';

  if (transceiver.rtpSender && transceiver.sendEncodingParameters[0].rtx) {
    sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc + ' cname:' + SDPUtils.localCName + '\r\n';
  }

  return sdp;
} // Edge does not like
// 1) stun: filtered after 14393 unless ?transport=udp is present
// 2) turn: that does not have all of turn:host:port?transport=udp
// 3) turn: with ipv6 addresses
// 4) turn: occurring muliple times


function filterIceServers(iceServers, edgeVersion) {
  var hasTurn = false;
  iceServers = JSON.parse(JSON.stringify(iceServers));
  return iceServers.filter(function (server) {
    if (server && (server.urls || server.url)) {
      var urls = server.urls || server.url;

      if (server.url && !server.urls) {
        console.warn('RTCIceServer.url is deprecated! Use urls instead.');
      }

      var isString = typeof urls === 'string';

      if (isString) {
        urls = [urls];
      }

      urls = urls.filter(function (url) {
        var validTurn = url.indexOf('turn:') === 0 && url.indexOf('transport=udp') !== -1 && url.indexOf('turn:[') === -1 && !hasTurn;

        if (validTurn) {
          hasTurn = true;
          return true;
        }

        return url.indexOf('stun:') === 0 && edgeVersion >= 14393 && url.indexOf('?transport=udp') === -1;
      });
      delete server.url;
      server.urls = isString ? urls[0] : urls;
      return !!urls.length;
    }
  });
} // Determines the intersection of local and remote capabilities.


function getCommonCapabilities(localCapabilities, remoteCapabilities) {
  var commonCapabilities = {
    codecs: [],
    headerExtensions: [],
    fecMechanisms: []
  };

  var findCodecByPayloadType = function findCodecByPayloadType(pt, codecs) {
    pt = parseInt(pt, 10);

    for (var i = 0; i < codecs.length; i++) {
      if (codecs[i].payloadType === pt || codecs[i].preferredPayloadType === pt) {
        return codecs[i];
      }
    }
  };

  var rtxCapabilityMatches = function rtxCapabilityMatches(lRtx, rRtx, lCodecs, rCodecs) {
    var lCodec = findCodecByPayloadType(lRtx.parameters.apt, lCodecs);
    var rCodec = findCodecByPayloadType(rRtx.parameters.apt, rCodecs);
    return lCodec && rCodec && lCodec.name.toLowerCase() === rCodec.name.toLowerCase();
  };

  localCapabilities.codecs.forEach(function (lCodec) {
    for (var i = 0; i < remoteCapabilities.codecs.length; i++) {
      var rCodec = remoteCapabilities.codecs[i];

      if (lCodec.name.toLowerCase() === rCodec.name.toLowerCase() && lCodec.clockRate === rCodec.clockRate) {
        if (lCodec.name.toLowerCase() === 'rtx' && lCodec.parameters && rCodec.parameters.apt) {
          // for RTX we need to find the local rtx that has a apt
          // which points to the same local codec as the remote one.
          if (!rtxCapabilityMatches(lCodec, rCodec, localCapabilities.codecs, remoteCapabilities.codecs)) {
            continue;
          }
        }

        rCodec = JSON.parse(JSON.stringify(rCodec)); // deepcopy
        // number of channels is the highest common number of channels

        rCodec.numChannels = Math.min(lCodec.numChannels, rCodec.numChannels); // push rCodec so we reply with offerer payload type

        commonCapabilities.codecs.push(rCodec); // determine common feedback mechanisms

        rCodec.rtcpFeedback = rCodec.rtcpFeedback.filter(function (fb) {
          for (var j = 0; j < lCodec.rtcpFeedback.length; j++) {
            if (lCodec.rtcpFeedback[j].type === fb.type && lCodec.rtcpFeedback[j].parameter === fb.parameter) {
              return true;
            }
          }

          return false;
        }); // FIXME: also need to determine .parameters
        //  see https://github.com/openpeer/ortc/issues/569

        break;
      }
    }
  });
  localCapabilities.headerExtensions.forEach(function (lHeaderExtension) {
    for (var i = 0; i < remoteCapabilities.headerExtensions.length; i++) {
      var rHeaderExtension = remoteCapabilities.headerExtensions[i];

      if (lHeaderExtension.uri === rHeaderExtension.uri) {
        commonCapabilities.headerExtensions.push(rHeaderExtension);
        break;
      }
    }
  }); // FIXME: fecMechanisms

  return commonCapabilities;
} // is action=setLocalDescription with type allowed in signalingState


function isActionAllowedInSignalingState(action, type, signalingState) {
  return {
    offer: {
      setLocalDescription: ['stable', 'have-local-offer'],
      setRemoteDescription: ['stable', 'have-remote-offer']
    },
    answer: {
      setLocalDescription: ['have-remote-offer', 'have-local-pranswer'],
      setRemoteDescription: ['have-local-offer', 'have-remote-pranswer']
    }
  }[type][action].indexOf(signalingState) !== -1;
}

function maybeAddCandidate(iceTransport, candidate) {
  // Edge's internal representation adds some fields therefore
  // not all fieldѕ are taken into account.
  var alreadyAdded = iceTransport.getRemoteCandidates().find(function (remoteCandidate) {
    return candidate.foundation === remoteCandidate.foundation && candidate.ip === remoteCandidate.ip && candidate.port === remoteCandidate.port && candidate.priority === remoteCandidate.priority && candidate.protocol === remoteCandidate.protocol && candidate.type === remoteCandidate.type;
  });

  if (!alreadyAdded) {
    iceTransport.addRemoteCandidate(candidate);
  }

  return !alreadyAdded;
}

function makeError(name, description) {
  var e = new Error(description);
  e.name = name; // legacy error codes from https://heycam.github.io/webidl/#idl-DOMException-error-names

  e.code = {
    NotSupportedError: 9,
    InvalidStateError: 11,
    InvalidAccessError: 15,
    TypeError: undefined,
    OperationError: undefined
  }[name];
  return e;
}

module.exports = function (window, edgeVersion) {
  // https://w3c.github.io/mediacapture-main/#mediastream
  // Helper function to add the track to the stream and
  // dispatch the event ourselves.
  function addTrackToStreamAndFireEvent(track, stream) {
    stream.addTrack(track);
    stream.dispatchEvent(new window.MediaStreamTrackEvent('addtrack', {
      track: track
    }));
  }

  function removeTrackFromStreamAndFireEvent(track, stream) {
    stream.removeTrack(track);
    stream.dispatchEvent(new window.MediaStreamTrackEvent('removetrack', {
      track: track
    }));
  }

  function fireAddTrack(pc, track, receiver, streams) {
    var trackEvent = new Event('track');
    trackEvent.track = track;
    trackEvent.receiver = receiver;
    trackEvent.transceiver = {
      receiver: receiver
    };
    trackEvent.streams = streams;
    window.setTimeout(function () {
      pc._dispatchEvent('track', trackEvent);
    });
  }

  var RTCPeerConnection = function RTCPeerConnection(config) {
    var pc = this;

    var _eventTarget = document.createDocumentFragment();

    ['addEventListener', 'removeEventListener', 'dispatchEvent'].forEach(function (method) {
      pc[method] = _eventTarget[method].bind(_eventTarget);
    });
    this.canTrickleIceCandidates = null;
    this.needNegotiation = false;
    this.localStreams = [];
    this.remoteStreams = [];
    this._localDescription = null;
    this._remoteDescription = null;
    this.signalingState = 'stable';
    this.iceConnectionState = 'new';
    this.connectionState = 'new';
    this.iceGatheringState = 'new';
    config = JSON.parse(JSON.stringify(config || {}));
    this.usingBundle = config.bundlePolicy === 'max-bundle';

    if (config.rtcpMuxPolicy === 'negotiate') {
      throw makeError('NotSupportedError', 'rtcpMuxPolicy \'negotiate\' is not supported');
    } else if (!config.rtcpMuxPolicy) {
      config.rtcpMuxPolicy = 'require';
    }

    switch (config.iceTransportPolicy) {
      case 'all':
      case 'relay':
        break;

      default:
        config.iceTransportPolicy = 'all';
        break;
    }

    switch (config.bundlePolicy) {
      case 'balanced':
      case 'max-compat':
      case 'max-bundle':
        break;

      default:
        config.bundlePolicy = 'balanced';
        break;
    }

    config.iceServers = filterIceServers(config.iceServers || [], edgeVersion);
    this._iceGatherers = [];

    if (config.iceCandidatePoolSize) {
      for (var i = config.iceCandidatePoolSize; i > 0; i--) {
        this._iceGatherers.push(new window.RTCIceGatherer({
          iceServers: config.iceServers,
          gatherPolicy: config.iceTransportPolicy
        }));
      }
    } else {
      config.iceCandidatePoolSize = 0;
    }

    this._config = config; // per-track iceGathers, iceTransports, dtlsTransports, rtpSenders, ...
    // everything that is needed to describe a SDP m-line.

    this.transceivers = [];
    this._sdpSessionId = SDPUtils.generateSessionId();
    this._sdpSessionVersion = 0;
    this._dtlsRole = undefined; // role for a=setup to use in answers.

    this._isClosed = false;
  };

  Object.defineProperty(RTCPeerConnection.prototype, 'localDescription', {
    configurable: true,
    get: function get() {
      return this._localDescription;
    }
  });
  Object.defineProperty(RTCPeerConnection.prototype, 'remoteDescription', {
    configurable: true,
    get: function get() {
      return this._remoteDescription;
    }
  }); // set up event handlers on prototype

  RTCPeerConnection.prototype.onicecandidate = null;
  RTCPeerConnection.prototype.onaddstream = null;
  RTCPeerConnection.prototype.ontrack = null;
  RTCPeerConnection.prototype.onremovestream = null;
  RTCPeerConnection.prototype.onsignalingstatechange = null;
  RTCPeerConnection.prototype.oniceconnectionstatechange = null;
  RTCPeerConnection.prototype.onconnectionstatechange = null;
  RTCPeerConnection.prototype.onicegatheringstatechange = null;
  RTCPeerConnection.prototype.onnegotiationneeded = null;
  RTCPeerConnection.prototype.ondatachannel = null;

  RTCPeerConnection.prototype._dispatchEvent = function (name, event) {
    if (this._isClosed) {
      return;
    }

    this.dispatchEvent(event);

    if (typeof this['on' + name] === 'function') {
      this['on' + name](event);
    }
  };

  RTCPeerConnection.prototype._emitGatheringStateChange = function () {
    var event = new Event('icegatheringstatechange');

    this._dispatchEvent('icegatheringstatechange', event);
  };

  RTCPeerConnection.prototype.getConfiguration = function () {
    return this._config;
  };

  RTCPeerConnection.prototype.getLocalStreams = function () {
    return this.localStreams;
  };

  RTCPeerConnection.prototype.getRemoteStreams = function () {
    return this.remoteStreams;
  }; // internal helper to create a transceiver object.
  // (which is not yet the same as the WebRTC 1.0 transceiver)


  RTCPeerConnection.prototype._createTransceiver = function (kind, doNotAdd) {
    var hasBundleTransport = this.transceivers.length > 0;
    var transceiver = {
      track: null,
      iceGatherer: null,
      iceTransport: null,
      dtlsTransport: null,
      localCapabilities: null,
      remoteCapabilities: null,
      rtpSender: null,
      rtpReceiver: null,
      kind: kind,
      mid: null,
      sendEncodingParameters: null,
      recvEncodingParameters: null,
      stream: null,
      associatedRemoteMediaStreams: [],
      wantReceive: true
    };

    if (this.usingBundle && hasBundleTransport) {
      transceiver.iceTransport = this.transceivers[0].iceTransport;
      transceiver.dtlsTransport = this.transceivers[0].dtlsTransport;
    } else {
      var transports = this._createIceAndDtlsTransports();

      transceiver.iceTransport = transports.iceTransport;
      transceiver.dtlsTransport = transports.dtlsTransport;
    }

    if (!doNotAdd) {
      this.transceivers.push(transceiver);
    }

    return transceiver;
  };

  RTCPeerConnection.prototype.addTrack = function (track, stream) {
    if (this._isClosed) {
      throw makeError('InvalidStateError', 'Attempted to call addTrack on a closed peerconnection.');
    }

    var alreadyExists = this.transceivers.find(function (s) {
      return s.track === track;
    });

    if (alreadyExists) {
      throw makeError('InvalidAccessError', 'Track already exists.');
    }

    var transceiver;

    for (var i = 0; i < this.transceivers.length; i++) {
      if (!this.transceivers[i].track && this.transceivers[i].kind === track.kind) {
        transceiver = this.transceivers[i];
      }
    }

    if (!transceiver) {
      transceiver = this._createTransceiver(track.kind);
    }

    this._maybeFireNegotiationNeeded();

    if (this.localStreams.indexOf(stream) === -1) {
      this.localStreams.push(stream);
    }

    transceiver.track = track;
    transceiver.stream = stream;
    transceiver.rtpSender = new window.RTCRtpSender(track, transceiver.dtlsTransport);
    return transceiver.rtpSender;
  };

  RTCPeerConnection.prototype.addStream = function (stream) {
    var pc = this;

    if (edgeVersion >= 15025) {
      stream.getTracks().forEach(function (track) {
        pc.addTrack(track, stream);
      });
    } else {
      // Clone is necessary for local demos mostly, attaching directly
      // to two different senders does not work (build 10547).
      // Fixed in 15025 (or earlier)
      var clonedStream = stream.clone();
      stream.getTracks().forEach(function (track, idx) {
        var clonedTrack = clonedStream.getTracks()[idx];
        track.addEventListener('enabled', function (event) {
          clonedTrack.enabled = event.enabled;
        });
      });
      clonedStream.getTracks().forEach(function (track) {
        pc.addTrack(track, clonedStream);
      });
    }
  };

  RTCPeerConnection.prototype.removeTrack = function (sender) {
    if (this._isClosed) {
      throw makeError('InvalidStateError', 'Attempted to call removeTrack on a closed peerconnection.');
    }

    if (!(sender instanceof window.RTCRtpSender)) {
      throw new TypeError('Argument 1 of RTCPeerConnection.removeTrack ' + 'does not implement interface RTCRtpSender.');
    }

    var transceiver = this.transceivers.find(function (t) {
      return t.rtpSender === sender;
    });

    if (!transceiver) {
      throw makeError('InvalidAccessError', 'Sender was not created by this connection.');
    }

    var stream = transceiver.stream;
    transceiver.rtpSender.stop();
    transceiver.rtpSender = null;
    transceiver.track = null;
    transceiver.stream = null; // remove the stream from the set of local streams

    var localStreams = this.transceivers.map(function (t) {
      return t.stream;
    });

    if (localStreams.indexOf(stream) === -1 && this.localStreams.indexOf(stream) > -1) {
      this.localStreams.splice(this.localStreams.indexOf(stream), 1);
    }

    this._maybeFireNegotiationNeeded();
  };

  RTCPeerConnection.prototype.removeStream = function (stream) {
    var pc = this;
    stream.getTracks().forEach(function (track) {
      var sender = pc.getSenders().find(function (s) {
        return s.track === track;
      });

      if (sender) {
        pc.removeTrack(sender);
      }
    });
  };

  RTCPeerConnection.prototype.getSenders = function () {
    return this.transceivers.filter(function (transceiver) {
      return !!transceiver.rtpSender;
    }).map(function (transceiver) {
      return transceiver.rtpSender;
    });
  };

  RTCPeerConnection.prototype.getReceivers = function () {
    return this.transceivers.filter(function (transceiver) {
      return !!transceiver.rtpReceiver;
    }).map(function (transceiver) {
      return transceiver.rtpReceiver;
    });
  };

  RTCPeerConnection.prototype._createIceGatherer = function (sdpMLineIndex, usingBundle) {
    var pc = this;

    if (usingBundle && sdpMLineIndex > 0) {
      return this.transceivers[0].iceGatherer;
    } else if (this._iceGatherers.length) {
      return this._iceGatherers.shift();
    }

    var iceGatherer = new window.RTCIceGatherer({
      iceServers: this._config.iceServers,
      gatherPolicy: this._config.iceTransportPolicy
    });
    Object.defineProperty(iceGatherer, 'state', {
      value: 'new',
      writable: true
    });
    this.transceivers[sdpMLineIndex].bufferedCandidateEvents = [];

    this.transceivers[sdpMLineIndex].bufferCandidates = function (event) {
      var end = !event.candidate || Object.keys(event.candidate).length === 0; // polyfill since RTCIceGatherer.state is not implemented in
      // Edge 10547 yet.

      iceGatherer.state = end ? 'completed' : 'gathering';

      if (pc.transceivers[sdpMLineIndex].bufferedCandidateEvents !== null) {
        pc.transceivers[sdpMLineIndex].bufferedCandidateEvents.push(event);
      }
    };

    iceGatherer.addEventListener('localcandidate', this.transceivers[sdpMLineIndex].bufferCandidates);
    return iceGatherer;
  }; // start gathering from an RTCIceGatherer.


  RTCPeerConnection.prototype._gather = function (mid, sdpMLineIndex) {
    var pc = this;
    var iceGatherer = this.transceivers[sdpMLineIndex].iceGatherer;

    if (iceGatherer.onlocalcandidate) {
      return;
    }

    var bufferedCandidateEvents = this.transceivers[sdpMLineIndex].bufferedCandidateEvents;
    this.transceivers[sdpMLineIndex].bufferedCandidateEvents = null;
    iceGatherer.removeEventListener('localcandidate', this.transceivers[sdpMLineIndex].bufferCandidates);

    iceGatherer.onlocalcandidate = function (evt) {
      if (pc.usingBundle && sdpMLineIndex > 0) {
        // if we know that we use bundle we can drop candidates with
        // ѕdpMLineIndex > 0. If we don't do this then our state gets
        // confused since we dispose the extra ice gatherer.
        return;
      }

      var event = new Event('icecandidate');
      event.candidate = {
        sdpMid: mid,
        sdpMLineIndex: sdpMLineIndex
      };
      var cand = evt.candidate; // Edge emits an empty object for RTCIceCandidateComplete‥

      var end = !cand || Object.keys(cand).length === 0;

      if (end) {
        // polyfill since RTCIceGatherer.state is not implemented in
        // Edge 10547 yet.
        if (iceGatherer.state === 'new' || iceGatherer.state === 'gathering') {
          iceGatherer.state = 'completed';
        }
      } else {
        if (iceGatherer.state === 'new') {
          iceGatherer.state = 'gathering';
        } // RTCIceCandidate doesn't have a component, needs to be added


        cand.component = 1; // also the usernameFragment. TODO: update SDP to take both variants.

        cand.ufrag = iceGatherer.getLocalParameters().usernameFragment;
        var serializedCandidate = SDPUtils.writeCandidate(cand);
        event.candidate = Object.assign(event.candidate, SDPUtils.parseCandidate(serializedCandidate));
        event.candidate.candidate = serializedCandidate;

        event.candidate.toJSON = function () {
          return {
            candidate: event.candidate.candidate,
            sdpMid: event.candidate.sdpMid,
            sdpMLineIndex: event.candidate.sdpMLineIndex,
            usernameFragment: event.candidate.usernameFragment
          };
        };
      } // update local description.


      var sections = SDPUtils.getMediaSections(pc._localDescription.sdp);

      if (!end) {
        sections[event.candidate.sdpMLineIndex] += 'a=' + event.candidate.candidate + '\r\n';
      } else {
        sections[event.candidate.sdpMLineIndex] += 'a=end-of-candidates\r\n';
      }

      pc._localDescription.sdp = SDPUtils.getDescription(pc._localDescription.sdp) + sections.join('');
      var complete = pc.transceivers.every(function (transceiver) {
        return transceiver.iceGatherer && transceiver.iceGatherer.state === 'completed';
      });

      if (pc.iceGatheringState !== 'gathering') {
        pc.iceGatheringState = 'gathering';

        pc._emitGatheringStateChange();
      } // Emit candidate. Also emit null candidate when all gatherers are
      // complete.


      if (!end) {
        pc._dispatchEvent('icecandidate', event);
      }

      if (complete) {
        pc._dispatchEvent('icecandidate', new Event('icecandidate'));

        pc.iceGatheringState = 'complete';

        pc._emitGatheringStateChange();
      }
    }; // emit already gathered candidates.


    window.setTimeout(function () {
      bufferedCandidateEvents.forEach(function (e) {
        iceGatherer.onlocalcandidate(e);
      });
    }, 0);
  }; // Create ICE transport and DTLS transport.


  RTCPeerConnection.prototype._createIceAndDtlsTransports = function () {
    var pc = this;
    var iceTransport = new window.RTCIceTransport(null);

    iceTransport.onicestatechange = function () {
      pc._updateIceConnectionState();

      pc._updateConnectionState();
    };

    var dtlsTransport = new window.RTCDtlsTransport(iceTransport);

    dtlsTransport.ondtlsstatechange = function () {
      pc._updateConnectionState();
    };

    dtlsTransport.onerror = function () {
      // onerror does not set state to failed by itself.
      Object.defineProperty(dtlsTransport, 'state', {
        value: 'failed',
        writable: true
      });

      pc._updateConnectionState();
    };

    return {
      iceTransport: iceTransport,
      dtlsTransport: dtlsTransport
    };
  }; // Destroy ICE gatherer, ICE transport and DTLS transport.
  // Without triggering the callbacks.


  RTCPeerConnection.prototype._disposeIceAndDtlsTransports = function (sdpMLineIndex) {
    var iceGatherer = this.transceivers[sdpMLineIndex].iceGatherer;

    if (iceGatherer) {
      delete iceGatherer.onlocalcandidate;
      delete this.transceivers[sdpMLineIndex].iceGatherer;
    }

    var iceTransport = this.transceivers[sdpMLineIndex].iceTransport;

    if (iceTransport) {
      delete iceTransport.onicestatechange;
      delete this.transceivers[sdpMLineIndex].iceTransport;
    }

    var dtlsTransport = this.transceivers[sdpMLineIndex].dtlsTransport;

    if (dtlsTransport) {
      delete dtlsTransport.ondtlsstatechange;
      delete dtlsTransport.onerror;
      delete this.transceivers[sdpMLineIndex].dtlsTransport;
    }
  }; // Start the RTP Sender and Receiver for a transceiver.


  RTCPeerConnection.prototype._transceive = function (transceiver, send, recv) {
    var params = getCommonCapabilities(transceiver.localCapabilities, transceiver.remoteCapabilities);

    if (send && transceiver.rtpSender) {
      params.encodings = transceiver.sendEncodingParameters;
      params.rtcp = {
        cname: SDPUtils.localCName,
        compound: transceiver.rtcpParameters.compound
      };

      if (transceiver.recvEncodingParameters.length) {
        params.rtcp.ssrc = transceiver.recvEncodingParameters[0].ssrc;
      }

      transceiver.rtpSender.send(params);
    }

    if (recv && transceiver.rtpReceiver && params.codecs.length > 0) {
      // remove RTX field in Edge 14942
      if (transceiver.kind === 'video' && transceiver.recvEncodingParameters && edgeVersion < 15019) {
        transceiver.recvEncodingParameters.forEach(function (p) {
          delete p.rtx;
        });
      }

      if (transceiver.recvEncodingParameters.length) {
        params.encodings = transceiver.recvEncodingParameters;
      } else {
        params.encodings = [{}];
      }

      params.rtcp = {
        compound: transceiver.rtcpParameters.compound
      };

      if (transceiver.rtcpParameters.cname) {
        params.rtcp.cname = transceiver.rtcpParameters.cname;
      }

      if (transceiver.sendEncodingParameters.length) {
        params.rtcp.ssrc = transceiver.sendEncodingParameters[0].ssrc;
      }

      transceiver.rtpReceiver.receive(params);
    }
  };

  RTCPeerConnection.prototype.setLocalDescription = function (description) {
    var pc = this; // Note: pranswer is not supported.

    if (['offer', 'answer'].indexOf(description.type) === -1) {
      return Promise.reject(makeError('TypeError', 'Unsupported type "' + description.type + '"'));
    }

    if (!isActionAllowedInSignalingState('setLocalDescription', description.type, pc.signalingState) || pc._isClosed) {
      return Promise.reject(makeError('InvalidStateError', 'Can not set local ' + description.type + ' in state ' + pc.signalingState));
    }

    var sections;
    var sessionpart;

    if (description.type === 'offer') {
      // VERY limited support for SDP munging. Limited to:
      // * changing the order of codecs
      sections = SDPUtils.splitSections(description.sdp);
      sessionpart = sections.shift();
      sections.forEach(function (mediaSection, sdpMLineIndex) {
        var caps = SDPUtils.parseRtpParameters(mediaSection);
        pc.transceivers[sdpMLineIndex].localCapabilities = caps;
      });
      pc.transceivers.forEach(function (transceiver, sdpMLineIndex) {
        pc._gather(transceiver.mid, sdpMLineIndex);
      });
    } else if (description.type === 'answer') {
      sections = SDPUtils.splitSections(pc._remoteDescription.sdp);
      sessionpart = sections.shift();
      var isIceLite = SDPUtils.matchPrefix(sessionpart, 'a=ice-lite').length > 0;
      sections.forEach(function (mediaSection, sdpMLineIndex) {
        var transceiver = pc.transceivers[sdpMLineIndex];
        var iceGatherer = transceiver.iceGatherer;
        var iceTransport = transceiver.iceTransport;
        var dtlsTransport = transceiver.dtlsTransport;
        var localCapabilities = transceiver.localCapabilities;
        var remoteCapabilities = transceiver.remoteCapabilities; // treat bundle-only as not-rejected.

        var rejected = SDPUtils.isRejected(mediaSection) && SDPUtils.matchPrefix(mediaSection, 'a=bundle-only').length === 0;

        if (!rejected && !transceiver.rejected) {
          var remoteIceParameters = SDPUtils.getIceParameters(mediaSection, sessionpart);
          var remoteDtlsParameters = SDPUtils.getDtlsParameters(mediaSection, sessionpart);

          if (isIceLite) {
            remoteDtlsParameters.role = 'server';
          }

          if (!pc.usingBundle || sdpMLineIndex === 0) {
            pc._gather(transceiver.mid, sdpMLineIndex);

            if (iceTransport.state === 'new') {
              iceTransport.start(iceGatherer, remoteIceParameters, isIceLite ? 'controlling' : 'controlled');
            }

            if (dtlsTransport.state === 'new') {
              dtlsTransport.start(remoteDtlsParameters);
            }
          } // Calculate intersection of capabilities.


          var params = getCommonCapabilities(localCapabilities, remoteCapabilities); // Start the RTCRtpSender. The RTCRtpReceiver for this
          // transceiver has already been started in setRemoteDescription.

          pc._transceive(transceiver, params.codecs.length > 0, false);
        }
      });
    }

    pc._localDescription = {
      type: description.type,
      sdp: description.sdp
    };

    if (description.type === 'offer') {
      pc._updateSignalingState('have-local-offer');
    } else {
      pc._updateSignalingState('stable');
    }

    return Promise.resolve();
  };

  RTCPeerConnection.prototype.setRemoteDescription = function (description) {
    var pc = this; // Note: pranswer is not supported.

    if (['offer', 'answer'].indexOf(description.type) === -1) {
      return Promise.reject(makeError('TypeError', 'Unsupported type "' + description.type + '"'));
    }

    if (!isActionAllowedInSignalingState('setRemoteDescription', description.type, pc.signalingState) || pc._isClosed) {
      return Promise.reject(makeError('InvalidStateError', 'Can not set remote ' + description.type + ' in state ' + pc.signalingState));
    }

    var streams = {};
    pc.remoteStreams.forEach(function (stream) {
      streams[stream.id] = stream;
    });
    var receiverList = [];
    var sections = SDPUtils.splitSections(description.sdp);
    var sessionpart = sections.shift();
    var isIceLite = SDPUtils.matchPrefix(sessionpart, 'a=ice-lite').length > 0;
    var usingBundle = SDPUtils.matchPrefix(sessionpart, 'a=group:BUNDLE ').length > 0;
    pc.usingBundle = usingBundle;
    var iceOptions = SDPUtils.matchPrefix(sessionpart, 'a=ice-options:')[0];

    if (iceOptions) {
      pc.canTrickleIceCandidates = iceOptions.substr(14).split(' ').indexOf('trickle') >= 0;
    } else {
      pc.canTrickleIceCandidates = false;
    }

    sections.forEach(function (mediaSection, sdpMLineIndex) {
      var lines = SDPUtils.splitLines(mediaSection);
      var kind = SDPUtils.getKind(mediaSection); // treat bundle-only as not-rejected.

      var rejected = SDPUtils.isRejected(mediaSection) && SDPUtils.matchPrefix(mediaSection, 'a=bundle-only').length === 0;
      var protocol = lines[0].substr(2).split(' ')[2];
      var direction = SDPUtils.getDirection(mediaSection, sessionpart);
      var remoteMsid = SDPUtils.parseMsid(mediaSection);
      var mid = SDPUtils.getMid(mediaSection) || SDPUtils.generateIdentifier(); // Reject datachannels which are not implemented yet.

      if (rejected || kind === 'application' && (protocol === 'DTLS/SCTP' || protocol === 'UDP/DTLS/SCTP')) {
        // TODO: this is dangerous in the case where a non-rejected m-line
        //     becomes rejected.
        pc.transceivers[sdpMLineIndex] = {
          mid: mid,
          kind: kind,
          protocol: protocol,
          rejected: true
        };
        return;
      }

      if (!rejected && pc.transceivers[sdpMLineIndex] && pc.transceivers[sdpMLineIndex].rejected) {
        // recycle a rejected transceiver.
        pc.transceivers[sdpMLineIndex] = pc._createTransceiver(kind, true);
      }

      var transceiver;
      var iceGatherer;
      var iceTransport;
      var dtlsTransport;
      var rtpReceiver;
      var sendEncodingParameters;
      var recvEncodingParameters;
      var localCapabilities;
      var track; // FIXME: ensure the mediaSection has rtcp-mux set.

      var remoteCapabilities = SDPUtils.parseRtpParameters(mediaSection);
      var remoteIceParameters;
      var remoteDtlsParameters;

      if (!rejected) {
        remoteIceParameters = SDPUtils.getIceParameters(mediaSection, sessionpart);
        remoteDtlsParameters = SDPUtils.getDtlsParameters(mediaSection, sessionpart);
        remoteDtlsParameters.role = 'client';
      }

      recvEncodingParameters = SDPUtils.parseRtpEncodingParameters(mediaSection);
      var rtcpParameters = SDPUtils.parseRtcpParameters(mediaSection);
      var isComplete = SDPUtils.matchPrefix(mediaSection, 'a=end-of-candidates', sessionpart).length > 0;
      var cands = SDPUtils.matchPrefix(mediaSection, 'a=candidate:').map(function (cand) {
        return SDPUtils.parseCandidate(cand);
      }).filter(function (cand) {
        return cand.component === 1;
      }); // Check if we can use BUNDLE and dispose transports.

      if ((description.type === 'offer' || description.type === 'answer') && !rejected && usingBundle && sdpMLineIndex > 0 && pc.transceivers[sdpMLineIndex]) {
        pc._disposeIceAndDtlsTransports(sdpMLineIndex);

        pc.transceivers[sdpMLineIndex].iceGatherer = pc.transceivers[0].iceGatherer;
        pc.transceivers[sdpMLineIndex].iceTransport = pc.transceivers[0].iceTransport;
        pc.transceivers[sdpMLineIndex].dtlsTransport = pc.transceivers[0].dtlsTransport;

        if (pc.transceivers[sdpMLineIndex].rtpSender) {
          pc.transceivers[sdpMLineIndex].rtpSender.setTransport(pc.transceivers[0].dtlsTransport);
        }

        if (pc.transceivers[sdpMLineIndex].rtpReceiver) {
          pc.transceivers[sdpMLineIndex].rtpReceiver.setTransport(pc.transceivers[0].dtlsTransport);
        }
      }

      if (description.type === 'offer' && !rejected) {
        transceiver = pc.transceivers[sdpMLineIndex] || pc._createTransceiver(kind);
        transceiver.mid = mid;

        if (!transceiver.iceGatherer) {
          transceiver.iceGatherer = pc._createIceGatherer(sdpMLineIndex, usingBundle);
        }

        if (cands.length && transceiver.iceTransport.state === 'new') {
          if (isComplete && (!usingBundle || sdpMLineIndex === 0)) {
            transceiver.iceTransport.setRemoteCandidates(cands);
          } else {
            cands.forEach(function (candidate) {
              maybeAddCandidate(transceiver.iceTransport, candidate);
            });
          }
        }

        localCapabilities = window.RTCRtpReceiver.getCapabilities(kind); // filter RTX until additional stuff needed for RTX is implemented
        // in adapter.js

        if (edgeVersion < 15019) {
          localCapabilities.codecs = localCapabilities.codecs.filter(function (codec) {
            return codec.name !== 'rtx';
          });
        }

        sendEncodingParameters = transceiver.sendEncodingParameters || [{
          ssrc: (2 * sdpMLineIndex + 2) * 1001
        }]; // TODO: rewrite to use http://w3c.github.io/webrtc-pc/#set-associated-remote-streams

        var isNewTrack = false;

        if (direction === 'sendrecv' || direction === 'sendonly') {
          isNewTrack = !transceiver.rtpReceiver;
          rtpReceiver = transceiver.rtpReceiver || new window.RTCRtpReceiver(transceiver.dtlsTransport, kind);

          if (isNewTrack) {
            var stream;
            track = rtpReceiver.track; // FIXME: does not work with Plan B.

            if (remoteMsid && remoteMsid.stream === '-') {// no-op. a stream id of '-' means: no associated stream.
            } else if (remoteMsid) {
              if (!streams[remoteMsid.stream]) {
                streams[remoteMsid.stream] = new window.MediaStream();
                Object.defineProperty(streams[remoteMsid.stream], 'id', {
                  get: function get() {
                    return remoteMsid.stream;
                  }
                });
              }

              Object.defineProperty(track, 'id', {
                get: function get() {
                  return remoteMsid.track;
                }
              });
              stream = streams[remoteMsid.stream];
            } else {
              if (!streams["default"]) {
                streams["default"] = new window.MediaStream();
              }

              stream = streams["default"];
            }

            if (stream) {
              addTrackToStreamAndFireEvent(track, stream);
              transceiver.associatedRemoteMediaStreams.push(stream);
            }

            receiverList.push([track, rtpReceiver, stream]);
          }
        } else if (transceiver.rtpReceiver && transceiver.rtpReceiver.track) {
          transceiver.associatedRemoteMediaStreams.forEach(function (s) {
            var nativeTrack = s.getTracks().find(function (t) {
              return t.id === transceiver.rtpReceiver.track.id;
            });

            if (nativeTrack) {
              removeTrackFromStreamAndFireEvent(nativeTrack, s);
            }
          });
          transceiver.associatedRemoteMediaStreams = [];
        }

        transceiver.localCapabilities = localCapabilities;
        transceiver.remoteCapabilities = remoteCapabilities;
        transceiver.rtpReceiver = rtpReceiver;
        transceiver.rtcpParameters = rtcpParameters;
        transceiver.sendEncodingParameters = sendEncodingParameters;
        transceiver.recvEncodingParameters = recvEncodingParameters; // Start the RTCRtpReceiver now. The RTPSender is started in
        // setLocalDescription.

        pc._transceive(pc.transceivers[sdpMLineIndex], false, isNewTrack);
      } else if (description.type === 'answer' && !rejected) {
        transceiver = pc.transceivers[sdpMLineIndex];
        iceGatherer = transceiver.iceGatherer;
        iceTransport = transceiver.iceTransport;
        dtlsTransport = transceiver.dtlsTransport;
        rtpReceiver = transceiver.rtpReceiver;
        sendEncodingParameters = transceiver.sendEncodingParameters;
        localCapabilities = transceiver.localCapabilities;
        pc.transceivers[sdpMLineIndex].recvEncodingParameters = recvEncodingParameters;
        pc.transceivers[sdpMLineIndex].remoteCapabilities = remoteCapabilities;
        pc.transceivers[sdpMLineIndex].rtcpParameters = rtcpParameters;

        if (cands.length && iceTransport.state === 'new') {
          if ((isIceLite || isComplete) && (!usingBundle || sdpMLineIndex === 0)) {
            iceTransport.setRemoteCandidates(cands);
          } else {
            cands.forEach(function (candidate) {
              maybeAddCandidate(transceiver.iceTransport, candidate);
            });
          }
        }

        if (!usingBundle || sdpMLineIndex === 0) {
          if (iceTransport.state === 'new') {
            iceTransport.start(iceGatherer, remoteIceParameters, 'controlling');
          }

          if (dtlsTransport.state === 'new') {
            dtlsTransport.start(remoteDtlsParameters);
          }
        } // If the offer contained RTX but the answer did not,
        // remove RTX from sendEncodingParameters.


        var commonCapabilities = getCommonCapabilities(transceiver.localCapabilities, transceiver.remoteCapabilities);
        var hasRtx = commonCapabilities.codecs.filter(function (c) {
          return c.name.toLowerCase() === 'rtx';
        }).length;

        if (!hasRtx && transceiver.sendEncodingParameters[0].rtx) {
          delete transceiver.sendEncodingParameters[0].rtx;
        }

        pc._transceive(transceiver, direction === 'sendrecv' || direction === 'recvonly', direction === 'sendrecv' || direction === 'sendonly'); // TODO: rewrite to use http://w3c.github.io/webrtc-pc/#set-associated-remote-streams


        if (rtpReceiver && (direction === 'sendrecv' || direction === 'sendonly')) {
          track = rtpReceiver.track;

          if (remoteMsid) {
            if (!streams[remoteMsid.stream]) {
              streams[remoteMsid.stream] = new window.MediaStream();
            }

            addTrackToStreamAndFireEvent(track, streams[remoteMsid.stream]);
            receiverList.push([track, rtpReceiver, streams[remoteMsid.stream]]);
          } else {
            if (!streams["default"]) {
              streams["default"] = new window.MediaStream();
            }

            addTrackToStreamAndFireEvent(track, streams["default"]);
            receiverList.push([track, rtpReceiver, streams["default"]]);
          }
        } else {
          // FIXME: actually the receiver should be created later.
          delete transceiver.rtpReceiver;
        }
      }
    });

    if (pc._dtlsRole === undefined) {
      pc._dtlsRole = description.type === 'offer' ? 'active' : 'passive';
    }

    pc._remoteDescription = {
      type: description.type,
      sdp: description.sdp
    };

    if (description.type === 'offer') {
      pc._updateSignalingState('have-remote-offer');
    } else {
      pc._updateSignalingState('stable');
    }

    Object.keys(streams).forEach(function (sid) {
      var stream = streams[sid];

      if (stream.getTracks().length) {
        if (pc.remoteStreams.indexOf(stream) === -1) {
          pc.remoteStreams.push(stream);
          var event = new Event('addstream');
          event.stream = stream;
          window.setTimeout(function () {
            pc._dispatchEvent('addstream', event);
          });
        }

        receiverList.forEach(function (item) {
          var track = item[0];
          var receiver = item[1];

          if (stream.id !== item[2].id) {
            return;
          }

          fireAddTrack(pc, track, receiver, [stream]);
        });
      }
    });
    receiverList.forEach(function (item) {
      if (item[2]) {
        return;
      }

      fireAddTrack(pc, item[0], item[1], []);
    }); // check whether addIceCandidate({}) was called within four seconds after
    // setRemoteDescription.

    window.setTimeout(function () {
      if (!(pc && pc.transceivers)) {
        return;
      }

      pc.transceivers.forEach(function (transceiver) {
        if (transceiver.iceTransport && transceiver.iceTransport.state === 'new' && transceiver.iceTransport.getRemoteCandidates().length > 0) {
          console.warn('Timeout for addRemoteCandidate. Consider sending ' + 'an end-of-candidates notification');
          transceiver.iceTransport.addRemoteCandidate({});
        }
      });
    }, 4000);
    return Promise.resolve();
  };

  RTCPeerConnection.prototype.close = function () {
    this.transceivers.forEach(function (transceiver) {
      /* not yet
      if (transceiver.iceGatherer) {
        transceiver.iceGatherer.close();
      }
      */
      if (transceiver.iceTransport) {
        transceiver.iceTransport.stop();
      }

      if (transceiver.dtlsTransport) {
        transceiver.dtlsTransport.stop();
      }

      if (transceiver.rtpSender) {
        transceiver.rtpSender.stop();
      }

      if (transceiver.rtpReceiver) {
        transceiver.rtpReceiver.stop();
      }
    }); // FIXME: clean up tracks, local streams, remote streams, etc

    this._isClosed = true;

    this._updateSignalingState('closed');
  }; // Update the signaling state.


  RTCPeerConnection.prototype._updateSignalingState = function (newState) {
    this.signalingState = newState;
    var event = new Event('signalingstatechange');

    this._dispatchEvent('signalingstatechange', event);
  }; // Determine whether to fire the negotiationneeded event.


  RTCPeerConnection.prototype._maybeFireNegotiationNeeded = function () {
    var pc = this;

    if (this.signalingState !== 'stable' || this.needNegotiation === true) {
      return;
    }

    this.needNegotiation = true;
    window.setTimeout(function () {
      if (pc.needNegotiation) {
        pc.needNegotiation = false;
        var event = new Event('negotiationneeded');

        pc._dispatchEvent('negotiationneeded', event);
      }
    }, 0);
  }; // Update the ice connection state.


  RTCPeerConnection.prototype._updateIceConnectionState = function () {
    var newState;
    var states = {
      'new': 0,
      closed: 0,
      checking: 0,
      connected: 0,
      completed: 0,
      disconnected: 0,
      failed: 0
    };
    this.transceivers.forEach(function (transceiver) {
      if (transceiver.iceTransport && !transceiver.rejected) {
        states[transceiver.iceTransport.state]++;
      }
    });
    newState = 'new';

    if (states.failed > 0) {
      newState = 'failed';
    } else if (states.checking > 0) {
      newState = 'checking';
    } else if (states.disconnected > 0) {
      newState = 'disconnected';
    } else if (states["new"] > 0) {
      newState = 'new';
    } else if (states.connected > 0) {
      newState = 'connected';
    } else if (states.completed > 0) {
      newState = 'completed';
    }

    if (newState !== this.iceConnectionState) {
      this.iceConnectionState = newState;
      var event = new Event('iceconnectionstatechange');

      this._dispatchEvent('iceconnectionstatechange', event);
    }
  }; // Update the connection state.


  RTCPeerConnection.prototype._updateConnectionState = function () {
    var newState;
    var states = {
      'new': 0,
      closed: 0,
      connecting: 0,
      connected: 0,
      completed: 0,
      disconnected: 0,
      failed: 0
    };
    this.transceivers.forEach(function (transceiver) {
      if (transceiver.iceTransport && transceiver.dtlsTransport && !transceiver.rejected) {
        states[transceiver.iceTransport.state]++;
        states[transceiver.dtlsTransport.state]++;
      }
    }); // ICETransport.completed and connected are the same for this purpose.

    states.connected += states.completed;
    newState = 'new';

    if (states.failed > 0) {
      newState = 'failed';
    } else if (states.connecting > 0) {
      newState = 'connecting';
    } else if (states.disconnected > 0) {
      newState = 'disconnected';
    } else if (states["new"] > 0) {
      newState = 'new';
    } else if (states.connected > 0) {
      newState = 'connected';
    }

    if (newState !== this.connectionState) {
      this.connectionState = newState;
      var event = new Event('connectionstatechange');

      this._dispatchEvent('connectionstatechange', event);
    }
  };

  RTCPeerConnection.prototype.createOffer = function () {
    var pc = this;

    if (pc._isClosed) {
      return Promise.reject(makeError('InvalidStateError', 'Can not call createOffer after close'));
    }

    var numAudioTracks = pc.transceivers.filter(function (t) {
      return t.kind === 'audio';
    }).length;
    var numVideoTracks = pc.transceivers.filter(function (t) {
      return t.kind === 'video';
    }).length; // Determine number of audio and video tracks we need to send/recv.

    var offerOptions = arguments[0];

    if (offerOptions) {
      // Reject Chrome legacy constraints.
      if (offerOptions.mandatory || offerOptions.optional) {
        throw new TypeError('Legacy mandatory/optional constraints not supported.');
      }

      if (offerOptions.offerToReceiveAudio !== undefined) {
        if (offerOptions.offerToReceiveAudio === true) {
          numAudioTracks = 1;
        } else if (offerOptions.offerToReceiveAudio === false) {
          numAudioTracks = 0;
        } else {
          numAudioTracks = offerOptions.offerToReceiveAudio;
        }
      }

      if (offerOptions.offerToReceiveVideo !== undefined) {
        if (offerOptions.offerToReceiveVideo === true) {
          numVideoTracks = 1;
        } else if (offerOptions.offerToReceiveVideo === false) {
          numVideoTracks = 0;
        } else {
          numVideoTracks = offerOptions.offerToReceiveVideo;
        }
      }
    }

    pc.transceivers.forEach(function (transceiver) {
      if (transceiver.kind === 'audio') {
        numAudioTracks--;

        if (numAudioTracks < 0) {
          transceiver.wantReceive = false;
        }
      } else if (transceiver.kind === 'video') {
        numVideoTracks--;

        if (numVideoTracks < 0) {
          transceiver.wantReceive = false;
        }
      }
    }); // Create M-lines for recvonly streams.

    while (numAudioTracks > 0 || numVideoTracks > 0) {
      if (numAudioTracks > 0) {
        pc._createTransceiver('audio');

        numAudioTracks--;
      }

      if (numVideoTracks > 0) {
        pc._createTransceiver('video');

        numVideoTracks--;
      }
    }

    var sdp = SDPUtils.writeSessionBoilerplate(pc._sdpSessionId, pc._sdpSessionVersion++);
    pc.transceivers.forEach(function (transceiver, sdpMLineIndex) {
      // For each track, create an ice gatherer, ice transport,
      // dtls transport, potentially rtpsender and rtpreceiver.
      var track = transceiver.track;
      var kind = transceiver.kind;
      var mid = transceiver.mid || SDPUtils.generateIdentifier();
      transceiver.mid = mid;

      if (!transceiver.iceGatherer) {
        transceiver.iceGatherer = pc._createIceGatherer(sdpMLineIndex, pc.usingBundle);
      }

      var localCapabilities = window.RTCRtpSender.getCapabilities(kind); // filter RTX until additional stuff needed for RTX is implemented
      // in adapter.js

      if (edgeVersion < 15019) {
        localCapabilities.codecs = localCapabilities.codecs.filter(function (codec) {
          return codec.name !== 'rtx';
        });
      }

      localCapabilities.codecs.forEach(function (codec) {
        // work around https://bugs.chromium.org/p/webrtc/issues/detail?id=6552
        // by adding level-asymmetry-allowed=1
        if (codec.name === 'H264' && codec.parameters['level-asymmetry-allowed'] === undefined) {
          codec.parameters['level-asymmetry-allowed'] = '1';
        } // for subsequent offers, we might have to re-use the payload
        // type of the last offer.


        if (transceiver.remoteCapabilities && transceiver.remoteCapabilities.codecs) {
          transceiver.remoteCapabilities.codecs.forEach(function (remoteCodec) {
            if (codec.name.toLowerCase() === remoteCodec.name.toLowerCase() && codec.clockRate === remoteCodec.clockRate) {
              codec.preferredPayloadType = remoteCodec.payloadType;
            }
          });
        }
      });
      localCapabilities.headerExtensions.forEach(function (hdrExt) {
        var remoteExtensions = transceiver.remoteCapabilities && transceiver.remoteCapabilities.headerExtensions || [];
        remoteExtensions.forEach(function (rHdrExt) {
          if (hdrExt.uri === rHdrExt.uri) {
            hdrExt.id = rHdrExt.id;
          }
        });
      }); // generate an ssrc now, to be used later in rtpSender.send

      var sendEncodingParameters = transceiver.sendEncodingParameters || [{
        ssrc: (2 * sdpMLineIndex + 1) * 1001
      }];

      if (track) {
        // add RTX
        if (edgeVersion >= 15019 && kind === 'video' && !sendEncodingParameters[0].rtx) {
          sendEncodingParameters[0].rtx = {
            ssrc: sendEncodingParameters[0].ssrc + 1
          };
        }
      }

      if (transceiver.wantReceive) {
        transceiver.rtpReceiver = new window.RTCRtpReceiver(transceiver.dtlsTransport, kind);
      }

      transceiver.localCapabilities = localCapabilities;
      transceiver.sendEncodingParameters = sendEncodingParameters;
    }); // always offer BUNDLE and dispose on return if not supported.

    if (pc._config.bundlePolicy !== 'max-compat') {
      sdp += 'a=group:BUNDLE ' + pc.transceivers.map(function (t) {
        return t.mid;
      }).join(' ') + '\r\n';
    }

    sdp += 'a=ice-options:trickle\r\n';
    pc.transceivers.forEach(function (transceiver, sdpMLineIndex) {
      sdp += writeMediaSection(transceiver, transceiver.localCapabilities, 'offer', transceiver.stream, pc._dtlsRole);
      sdp += 'a=rtcp-rsize\r\n';

      if (transceiver.iceGatherer && pc.iceGatheringState !== 'new' && (sdpMLineIndex === 0 || !pc.usingBundle)) {
        transceiver.iceGatherer.getLocalCandidates().forEach(function (cand) {
          cand.component = 1;
          sdp += 'a=' + SDPUtils.writeCandidate(cand) + '\r\n';
        });

        if (transceiver.iceGatherer.state === 'completed') {
          sdp += 'a=end-of-candidates\r\n';
        }
      }
    });
    var desc = new window.RTCSessionDescription({
      type: 'offer',
      sdp: sdp
    });
    return Promise.resolve(desc);
  };

  RTCPeerConnection.prototype.createAnswer = function () {
    var pc = this;

    if (pc._isClosed) {
      return Promise.reject(makeError('InvalidStateError', 'Can not call createAnswer after close'));
    }

    if (!(pc.signalingState === 'have-remote-offer' || pc.signalingState === 'have-local-pranswer')) {
      return Promise.reject(makeError('InvalidStateError', 'Can not call createAnswer in signalingState ' + pc.signalingState));
    }

    var sdp = SDPUtils.writeSessionBoilerplate(pc._sdpSessionId, pc._sdpSessionVersion++);

    if (pc.usingBundle) {
      sdp += 'a=group:BUNDLE ' + pc.transceivers.map(function (t) {
        return t.mid;
      }).join(' ') + '\r\n';
    }

    sdp += 'a=ice-options:trickle\r\n';
    var mediaSectionsInOffer = SDPUtils.getMediaSections(pc._remoteDescription.sdp).length;
    pc.transceivers.forEach(function (transceiver, sdpMLineIndex) {
      if (sdpMLineIndex + 1 > mediaSectionsInOffer) {
        return;
      }

      if (transceiver.rejected) {
        if (transceiver.kind === 'application') {
          if (transceiver.protocol === 'DTLS/SCTP') {
            // legacy fmt
            sdp += 'm=application 0 DTLS/SCTP 5000\r\n';
          } else {
            sdp += 'm=application 0 ' + transceiver.protocol + ' webrtc-datachannel\r\n';
          }
        } else if (transceiver.kind === 'audio') {
          sdp += 'm=audio 0 UDP/TLS/RTP/SAVPF 0\r\n' + 'a=rtpmap:0 PCMU/8000\r\n';
        } else if (transceiver.kind === 'video') {
          sdp += 'm=video 0 UDP/TLS/RTP/SAVPF 120\r\n' + 'a=rtpmap:120 VP8/90000\r\n';
        }

        sdp += 'c=IN IP4 0.0.0.0\r\n' + 'a=inactive\r\n' + 'a=mid:' + transceiver.mid + '\r\n';
        return;
      } // FIXME: look at direction.


      if (transceiver.stream) {
        var localTrack;

        if (transceiver.kind === 'audio') {
          localTrack = transceiver.stream.getAudioTracks()[0];
        } else if (transceiver.kind === 'video') {
          localTrack = transceiver.stream.getVideoTracks()[0];
        }

        if (localTrack) {
          // add RTX
          if (edgeVersion >= 15019 && transceiver.kind === 'video' && !transceiver.sendEncodingParameters[0].rtx) {
            transceiver.sendEncodingParameters[0].rtx = {
              ssrc: transceiver.sendEncodingParameters[0].ssrc + 1
            };
          }
        }
      } // Calculate intersection of capabilities.


      var commonCapabilities = getCommonCapabilities(transceiver.localCapabilities, transceiver.remoteCapabilities);
      var hasRtx = commonCapabilities.codecs.filter(function (c) {
        return c.name.toLowerCase() === 'rtx';
      }).length;

      if (!hasRtx && transceiver.sendEncodingParameters[0].rtx) {
        delete transceiver.sendEncodingParameters[0].rtx;
      }

      sdp += writeMediaSection(transceiver, commonCapabilities, 'answer', transceiver.stream, pc._dtlsRole);

      if (transceiver.rtcpParameters && transceiver.rtcpParameters.reducedSize) {
        sdp += 'a=rtcp-rsize\r\n';
      }
    });
    var desc = new window.RTCSessionDescription({
      type: 'answer',
      sdp: sdp
    });
    return Promise.resolve(desc);
  };

  RTCPeerConnection.prototype.addIceCandidate = function (candidate) {
    var pc = this;
    var sections;

    if (candidate && !(candidate.sdpMLineIndex !== undefined || candidate.sdpMid)) {
      return Promise.reject(new TypeError('sdpMLineIndex or sdpMid required'));
    } // TODO: needs to go into ops queue.


    return new Promise(function (resolve, reject) {
      if (!pc._remoteDescription) {
        return reject(makeError('InvalidStateError', 'Can not add ICE candidate without a remote description'));
      } else if (!candidate || candidate.candidate === '') {
        for (var j = 0; j < pc.transceivers.length; j++) {
          if (pc.transceivers[j].rejected) {
            continue;
          }

          pc.transceivers[j].iceTransport.addRemoteCandidate({});
          sections = SDPUtils.getMediaSections(pc._remoteDescription.sdp);
          sections[j] += 'a=end-of-candidates\r\n';
          pc._remoteDescription.sdp = SDPUtils.getDescription(pc._remoteDescription.sdp) + sections.join('');

          if (pc.usingBundle) {
            break;
          }
        }
      } else {
        var sdpMLineIndex = candidate.sdpMLineIndex;

        if (candidate.sdpMid) {
          for (var i = 0; i < pc.transceivers.length; i++) {
            if (pc.transceivers[i].mid === candidate.sdpMid) {
              sdpMLineIndex = i;
              break;
            }
          }
        }

        var transceiver = pc.transceivers[sdpMLineIndex];

        if (transceiver) {
          if (transceiver.rejected) {
            return resolve();
          }

          var cand = Object.keys(candidate.candidate).length > 0 ? SDPUtils.parseCandidate(candidate.candidate) : {}; // Ignore Chrome's invalid candidates since Edge does not like them.

          if (cand.protocol === 'tcp' && (cand.port === 0 || cand.port === 9)) {
            return resolve();
          } // Ignore RTCP candidates, we assume RTCP-MUX.


          if (cand.component && cand.component !== 1) {
            return resolve();
          } // when using bundle, avoid adding candidates to the wrong
          // ice transport. And avoid adding candidates added in the SDP.


          if (sdpMLineIndex === 0 || sdpMLineIndex > 0 && transceiver.iceTransport !== pc.transceivers[0].iceTransport) {
            if (!maybeAddCandidate(transceiver.iceTransport, cand)) {
              return reject(makeError('OperationError', 'Can not add ICE candidate'));
            }
          } // update the remoteDescription.


          var candidateString = candidate.candidate.trim();

          if (candidateString.indexOf('a=') === 0) {
            candidateString = candidateString.substr(2);
          }

          sections = SDPUtils.getMediaSections(pc._remoteDescription.sdp);
          sections[sdpMLineIndex] += 'a=' + (cand.type ? candidateString : 'end-of-candidates') + '\r\n';
          pc._remoteDescription.sdp = SDPUtils.getDescription(pc._remoteDescription.sdp) + sections.join('');
        } else {
          return reject(makeError('OperationError', 'Can not add ICE candidate'));
        }
      }

      resolve();
    });
  };

  RTCPeerConnection.prototype.getStats = function (selector) {
    if (selector && selector instanceof window.MediaStreamTrack) {
      var senderOrReceiver = null;
      this.transceivers.forEach(function (transceiver) {
        if (transceiver.rtpSender && transceiver.rtpSender.track === selector) {
          senderOrReceiver = transceiver.rtpSender;
        } else if (transceiver.rtpReceiver && transceiver.rtpReceiver.track === selector) {
          senderOrReceiver = transceiver.rtpReceiver;
        }
      });

      if (!senderOrReceiver) {
        throw makeError('InvalidAccessError', 'Invalid selector.');
      }

      return senderOrReceiver.getStats();
    }

    var promises = [];
    this.transceivers.forEach(function (transceiver) {
      ['rtpSender', 'rtpReceiver', 'iceGatherer', 'iceTransport', 'dtlsTransport'].forEach(function (method) {
        if (transceiver[method]) {
          promises.push(transceiver[method].getStats());
        }
      });
    });
    return Promise.all(promises).then(function (allStats) {
      var results = new Map();
      allStats.forEach(function (stats) {
        stats.forEach(function (stat) {
          results.set(stat.id, stat);
        });
      });
      return results;
    });
  }; // fix low-level stat names and return Map instead of object.


  var ortcObjects = ['RTCRtpSender', 'RTCRtpReceiver', 'RTCIceGatherer', 'RTCIceTransport', 'RTCDtlsTransport'];
  ortcObjects.forEach(function (ortcObjectName) {
    var obj = window[ortcObjectName];

    if (obj && obj.prototype && obj.prototype.getStats) {
      var nativeGetstats = obj.prototype.getStats;

      obj.prototype.getStats = function () {
        return nativeGetstats.apply(this).then(function (nativeStats) {
          var mapStats = new Map();
          Object.keys(nativeStats).forEach(function (id) {
            nativeStats[id].type = fixStatsType(nativeStats[id]);
            mapStats.set(id, nativeStats[id]);
          });
          return mapStats;
        });
      };
    }
  }); // legacy callback shims. Should be moved to adapter.js some days.

  var methods = ['createOffer', 'createAnswer'];
  methods.forEach(function (method) {
    var nativeMethod = RTCPeerConnection.prototype[method];

    RTCPeerConnection.prototype[method] = function () {
      var args = arguments;

      if (typeof args[0] === 'function' || typeof args[1] === 'function') {
        // legacy
        return nativeMethod.apply(this, [arguments[2]]).then(function (description) {
          if (typeof args[0] === 'function') {
            args[0].apply(null, [description]);
          }
        }, function (error) {
          if (typeof args[1] === 'function') {
            args[1].apply(null, [error]);
          }
        });
      }

      return nativeMethod.apply(this, arguments);
    };
  });
  methods = ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'];
  methods.forEach(function (method) {
    var nativeMethod = RTCPeerConnection.prototype[method];

    RTCPeerConnection.prototype[method] = function () {
      var args = arguments;

      if (typeof args[1] === 'function' || typeof args[2] === 'function') {
        // legacy
        return nativeMethod.apply(this, arguments).then(function () {
          if (typeof args[1] === 'function') {
            args[1].apply(null);
          }
        }, function (error) {
          if (typeof args[2] === 'function') {
            args[2].apply(null, [error]);
          }
        });
      }

      return nativeMethod.apply(this, arguments);
    };
  }); // getStats is special. It doesn't have a spec legacy method yet we support
  // getStats(something, cb) without error callbacks.

  ['getStats'].forEach(function (method) {
    var nativeMethod = RTCPeerConnection.prototype[method];

    RTCPeerConnection.prototype[method] = function () {
      var args = arguments;

      if (typeof args[1] === 'function') {
        return nativeMethod.apply(this, arguments).then(function () {
          if (typeof args[1] === 'function') {
            args[1].apply(null);
          }
        });
      }

      return nativeMethod.apply(this, arguments);
    };
  });
  return RTCPeerConnection;
};

},{"sdp":14}],14:[function(require,module,exports){
/* eslint-env node */
'use strict'; // SDP helpers.

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var SDPUtils = {}; // Generate an alphanumeric identifier for cname or mids.
// TODO: use UUIDs instead? https://gist.github.com/jed/982883

SDPUtils.generateIdentifier = function () {
  return Math.random().toString(36).substr(2, 10);
}; // The RTCP CNAME used by all peerconnections from the same JS.


SDPUtils.localCName = SDPUtils.generateIdentifier(); // Splits SDP into lines, dealing with both CRLF and LF.

SDPUtils.splitLines = function (blob) {
  return blob.trim().split('\n').map(function (line) {
    return line.trim();
  });
}; // Splits SDP into sessionpart and mediasections. Ensures CRLF.


SDPUtils.splitSections = function (blob) {
  var parts = blob.split('\nm=');
  return parts.map(function (part, index) {
    return (index > 0 ? 'm=' + part : part).trim() + '\r\n';
  });
}; // returns the session description.


SDPUtils.getDescription = function (blob) {
  var sections = SDPUtils.splitSections(blob);
  return sections && sections[0];
}; // returns the individual media sections.


SDPUtils.getMediaSections = function (blob) {
  var sections = SDPUtils.splitSections(blob);
  sections.shift();
  return sections;
}; // Returns lines that start with a certain prefix.


SDPUtils.matchPrefix = function (blob, prefix) {
  return SDPUtils.splitLines(blob).filter(function (line) {
    return line.indexOf(prefix) === 0;
  });
}; // Parses an ICE candidate line. Sample input:
// candidate:702786350 2 udp 41819902 8.8.8.8 60769 typ relay raddr 8.8.8.8
// rport 55996"


SDPUtils.parseCandidate = function (line) {
  var parts; // Parse both variants.

  if (line.indexOf('a=candidate:') === 0) {
    parts = line.substring(12).split(' ');
  } else {
    parts = line.substring(10).split(' ');
  }

  var candidate = {
    foundation: parts[0],
    component: parseInt(parts[1], 10),
    protocol: parts[2].toLowerCase(),
    priority: parseInt(parts[3], 10),
    ip: parts[4],
    address: parts[4],
    // address is an alias for ip.
    port: parseInt(parts[5], 10),
    // skip parts[6] == 'typ'
    type: parts[7]
  };

  for (var i = 8; i < parts.length; i += 2) {
    switch (parts[i]) {
      case 'raddr':
        candidate.relatedAddress = parts[i + 1];
        break;

      case 'rport':
        candidate.relatedPort = parseInt(parts[i + 1], 10);
        break;

      case 'tcptype':
        candidate.tcpType = parts[i + 1];
        break;

      case 'ufrag':
        candidate.ufrag = parts[i + 1]; // for backward compability.

        candidate.usernameFragment = parts[i + 1];
        break;

      default:
        // extension handling, in particular ufrag
        candidate[parts[i]] = parts[i + 1];
        break;
    }
  }

  return candidate;
}; // Translates a candidate object into SDP candidate attribute.


SDPUtils.writeCandidate = function (candidate) {
  var sdp = [];
  sdp.push(candidate.foundation);
  sdp.push(candidate.component);
  sdp.push(candidate.protocol.toUpperCase());
  sdp.push(candidate.priority);
  sdp.push(candidate.address || candidate.ip);
  sdp.push(candidate.port);
  var type = candidate.type;
  sdp.push('typ');
  sdp.push(type);

  if (type !== 'host' && candidate.relatedAddress && candidate.relatedPort) {
    sdp.push('raddr');
    sdp.push(candidate.relatedAddress);
    sdp.push('rport');
    sdp.push(candidate.relatedPort);
  }

  if (candidate.tcpType && candidate.protocol.toLowerCase() === 'tcp') {
    sdp.push('tcptype');
    sdp.push(candidate.tcpType);
  }

  if (candidate.usernameFragment || candidate.ufrag) {
    sdp.push('ufrag');
    sdp.push(candidate.usernameFragment || candidate.ufrag);
  }

  return 'candidate:' + sdp.join(' ');
}; // Parses an ice-options line, returns an array of option tags.
// a=ice-options:foo bar


SDPUtils.parseIceOptions = function (line) {
  return line.substr(14).split(' ');
}; // Parses an rtpmap line, returns RTCRtpCoddecParameters. Sample input:
// a=rtpmap:111 opus/48000/2


SDPUtils.parseRtpMap = function (line) {
  var parts = line.substr(9).split(' ');
  var parsed = {
    payloadType: parseInt(parts.shift(), 10) // was: id

  };
  parts = parts[0].split('/');
  parsed.name = parts[0];
  parsed.clockRate = parseInt(parts[1], 10); // was: clockrate

  parsed.channels = parts.length === 3 ? parseInt(parts[2], 10) : 1; // legacy alias, got renamed back to channels in ORTC.

  parsed.numChannels = parsed.channels;
  return parsed;
}; // Generate an a=rtpmap line from RTCRtpCodecCapability or
// RTCRtpCodecParameters.


SDPUtils.writeRtpMap = function (codec) {
  var pt = codec.payloadType;

  if (codec.preferredPayloadType !== undefined) {
    pt = codec.preferredPayloadType;
  }

  var channels = codec.channels || codec.numChannels || 1;
  return 'a=rtpmap:' + pt + ' ' + codec.name + '/' + codec.clockRate + (channels !== 1 ? '/' + channels : '') + '\r\n';
}; // Parses an a=extmap line (headerextension from RFC 5285). Sample input:
// a=extmap:2 urn:ietf:params:rtp-hdrext:toffset
// a=extmap:2/sendonly urn:ietf:params:rtp-hdrext:toffset


SDPUtils.parseExtmap = function (line) {
  var parts = line.substr(9).split(' ');
  return {
    id: parseInt(parts[0], 10),
    direction: parts[0].indexOf('/') > 0 ? parts[0].split('/')[1] : 'sendrecv',
    uri: parts[1]
  };
}; // Generates a=extmap line from RTCRtpHeaderExtensionParameters or
// RTCRtpHeaderExtension.


SDPUtils.writeExtmap = function (headerExtension) {
  return 'a=extmap:' + (headerExtension.id || headerExtension.preferredId) + (headerExtension.direction && headerExtension.direction !== 'sendrecv' ? '/' + headerExtension.direction : '') + ' ' + headerExtension.uri + '\r\n';
}; // Parses an ftmp line, returns dictionary. Sample input:
// a=fmtp:96 vbr=on;cng=on
// Also deals with vbr=on; cng=on


SDPUtils.parseFmtp = function (line) {
  var parsed = {};
  var kv;
  var parts = line.substr(line.indexOf(' ') + 1).split(';');

  for (var j = 0; j < parts.length; j++) {
    kv = parts[j].trim().split('=');
    parsed[kv[0].trim()] = kv[1];
  }

  return parsed;
}; // Generates an a=ftmp line from RTCRtpCodecCapability or RTCRtpCodecParameters.


SDPUtils.writeFmtp = function (codec) {
  var line = '';
  var pt = codec.payloadType;

  if (codec.preferredPayloadType !== undefined) {
    pt = codec.preferredPayloadType;
  }

  if (codec.parameters && Object.keys(codec.parameters).length) {
    var params = [];
    Object.keys(codec.parameters).forEach(function (param) {
      if (codec.parameters[param]) {
        params.push(param + '=' + codec.parameters[param]);
      } else {
        params.push(param);
      }
    });
    line += 'a=fmtp:' + pt + ' ' + params.join(';') + '\r\n';
  }

  return line;
}; // Parses an rtcp-fb line, returns RTCPRtcpFeedback object. Sample input:
// a=rtcp-fb:98 nack rpsi


SDPUtils.parseRtcpFb = function (line) {
  var parts = line.substr(line.indexOf(' ') + 1).split(' ');
  return {
    type: parts.shift(),
    parameter: parts.join(' ')
  };
}; // Generate a=rtcp-fb lines from RTCRtpCodecCapability or RTCRtpCodecParameters.


SDPUtils.writeRtcpFb = function (codec) {
  var lines = '';
  var pt = codec.payloadType;

  if (codec.preferredPayloadType !== undefined) {
    pt = codec.preferredPayloadType;
  }

  if (codec.rtcpFeedback && codec.rtcpFeedback.length) {
    // FIXME: special handling for trr-int?
    codec.rtcpFeedback.forEach(function (fb) {
      lines += 'a=rtcp-fb:' + pt + ' ' + fb.type + (fb.parameter && fb.parameter.length ? ' ' + fb.parameter : '') + '\r\n';
    });
  }

  return lines;
}; // Parses an RFC 5576 ssrc media attribute. Sample input:
// a=ssrc:3735928559 cname:something


SDPUtils.parseSsrcMedia = function (line) {
  var sp = line.indexOf(' ');
  var parts = {
    ssrc: parseInt(line.substr(7, sp - 7), 10)
  };
  var colon = line.indexOf(':', sp);

  if (colon > -1) {
    parts.attribute = line.substr(sp + 1, colon - sp - 1);
    parts.value = line.substr(colon + 1);
  } else {
    parts.attribute = line.substr(sp + 1);
  }

  return parts;
};

SDPUtils.parseSsrcGroup = function (line) {
  var parts = line.substr(13).split(' ');
  return {
    semantics: parts.shift(),
    ssrcs: parts.map(function (ssrc) {
      return parseInt(ssrc, 10);
    })
  };
}; // Extracts the MID (RFC 5888) from a media section.
// returns the MID or undefined if no mid line was found.


SDPUtils.getMid = function (mediaSection) {
  var mid = SDPUtils.matchPrefix(mediaSection, 'a=mid:')[0];

  if (mid) {
    return mid.substr(6);
  }
};

SDPUtils.parseFingerprint = function (line) {
  var parts = line.substr(14).split(' ');
  return {
    algorithm: parts[0].toLowerCase(),
    // algorithm is case-sensitive in Edge.
    value: parts[1]
  };
}; // Extracts DTLS parameters from SDP media section or sessionpart.
// FIXME: for consistency with other functions this should only
//   get the fingerprint line as input. See also getIceParameters.


SDPUtils.getDtlsParameters = function (mediaSection, sessionpart) {
  var lines = SDPUtils.matchPrefix(mediaSection + sessionpart, 'a=fingerprint:'); // Note: a=setup line is ignored since we use the 'auto' role.
  // Note2: 'algorithm' is not case sensitive except in Edge.

  return {
    role: 'auto',
    fingerprints: lines.map(SDPUtils.parseFingerprint)
  };
}; // Serializes DTLS parameters to SDP.


SDPUtils.writeDtlsParameters = function (params, setupType) {
  var sdp = 'a=setup:' + setupType + '\r\n';
  params.fingerprints.forEach(function (fp) {
    sdp += 'a=fingerprint:' + fp.algorithm + ' ' + fp.value + '\r\n';
  });
  return sdp;
}; // Parses ICE information from SDP media section or sessionpart.
// FIXME: for consistency with other functions this should only
//   get the ice-ufrag and ice-pwd lines as input.


SDPUtils.getIceParameters = function (mediaSection, sessionpart) {
  var lines = SDPUtils.splitLines(mediaSection); // Search in session part, too.

  lines = lines.concat(SDPUtils.splitLines(sessionpart));
  var iceParameters = {
    usernameFragment: lines.filter(function (line) {
      return line.indexOf('a=ice-ufrag:') === 0;
    })[0].substr(12),
    password: lines.filter(function (line) {
      return line.indexOf('a=ice-pwd:') === 0;
    })[0].substr(10)
  };
  return iceParameters;
}; // Serializes ICE parameters to SDP.


SDPUtils.writeIceParameters = function (params) {
  return 'a=ice-ufrag:' + params.usernameFragment + '\r\n' + 'a=ice-pwd:' + params.password + '\r\n';
}; // Parses the SDP media section and returns RTCRtpParameters.


SDPUtils.parseRtpParameters = function (mediaSection) {
  var description = {
    codecs: [],
    headerExtensions: [],
    fecMechanisms: [],
    rtcp: []
  };
  var lines = SDPUtils.splitLines(mediaSection);
  var mline = lines[0].split(' ');

  for (var i = 3; i < mline.length; i++) {
    // find all codecs from mline[3..]
    var pt = mline[i];
    var rtpmapline = SDPUtils.matchPrefix(mediaSection, 'a=rtpmap:' + pt + ' ')[0];

    if (rtpmapline) {
      var codec = SDPUtils.parseRtpMap(rtpmapline);
      var fmtps = SDPUtils.matchPrefix(mediaSection, 'a=fmtp:' + pt + ' '); // Only the first a=fmtp:<pt> is considered.

      codec.parameters = fmtps.length ? SDPUtils.parseFmtp(fmtps[0]) : {};
      codec.rtcpFeedback = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-fb:' + pt + ' ').map(SDPUtils.parseRtcpFb);
      description.codecs.push(codec); // parse FEC mechanisms from rtpmap lines.

      switch (codec.name.toUpperCase()) {
        case 'RED':
        case 'ULPFEC':
          description.fecMechanisms.push(codec.name.toUpperCase());
          break;

        default:
          // only RED and ULPFEC are recognized as FEC mechanisms.
          break;
      }
    }
  }

  SDPUtils.matchPrefix(mediaSection, 'a=extmap:').forEach(function (line) {
    description.headerExtensions.push(SDPUtils.parseExtmap(line));
  }); // FIXME: parse rtcp.

  return description;
}; // Generates parts of the SDP media section describing the capabilities /
// parameters.


SDPUtils.writeRtpDescription = function (kind, caps) {
  var sdp = ''; // Build the mline.

  sdp += 'm=' + kind + ' ';
  sdp += caps.codecs.length > 0 ? '9' : '0'; // reject if no codecs.

  sdp += ' UDP/TLS/RTP/SAVPF ';
  sdp += caps.codecs.map(function (codec) {
    if (codec.preferredPayloadType !== undefined) {
      return codec.preferredPayloadType;
    }

    return codec.payloadType;
  }).join(' ') + '\r\n';
  sdp += 'c=IN IP4 0.0.0.0\r\n';
  sdp += 'a=rtcp:9 IN IP4 0.0.0.0\r\n'; // Add a=rtpmap lines for each codec. Also fmtp and rtcp-fb.

  caps.codecs.forEach(function (codec) {
    sdp += SDPUtils.writeRtpMap(codec);
    sdp += SDPUtils.writeFmtp(codec);
    sdp += SDPUtils.writeRtcpFb(codec);
  });
  var maxptime = 0;
  caps.codecs.forEach(function (codec) {
    if (codec.maxptime > maxptime) {
      maxptime = codec.maxptime;
    }
  });

  if (maxptime > 0) {
    sdp += 'a=maxptime:' + maxptime + '\r\n';
  }

  sdp += 'a=rtcp-mux\r\n';

  if (caps.headerExtensions) {
    caps.headerExtensions.forEach(function (extension) {
      sdp += SDPUtils.writeExtmap(extension);
    });
  } // FIXME: write fecMechanisms.


  return sdp;
}; // Parses the SDP media section and returns an array of
// RTCRtpEncodingParameters.


SDPUtils.parseRtpEncodingParameters = function (mediaSection) {
  var encodingParameters = [];
  var description = SDPUtils.parseRtpParameters(mediaSection);
  var hasRed = description.fecMechanisms.indexOf('RED') !== -1;
  var hasUlpfec = description.fecMechanisms.indexOf('ULPFEC') !== -1; // filter a=ssrc:... cname:, ignore PlanB-msid

  var ssrcs = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:').map(function (line) {
    return SDPUtils.parseSsrcMedia(line);
  }).filter(function (parts) {
    return parts.attribute === 'cname';
  });
  var primarySsrc = ssrcs.length > 0 && ssrcs[0].ssrc;
  var secondarySsrc;
  var flows = SDPUtils.matchPrefix(mediaSection, 'a=ssrc-group:FID').map(function (line) {
    var parts = line.substr(17).split(' ');
    return parts.map(function (part) {
      return parseInt(part, 10);
    });
  });

  if (flows.length > 0 && flows[0].length > 1 && flows[0][0] === primarySsrc) {
    secondarySsrc = flows[0][1];
  }

  description.codecs.forEach(function (codec) {
    if (codec.name.toUpperCase() === 'RTX' && codec.parameters.apt) {
      var encParam = {
        ssrc: primarySsrc,
        codecPayloadType: parseInt(codec.parameters.apt, 10)
      };

      if (primarySsrc && secondarySsrc) {
        encParam.rtx = {
          ssrc: secondarySsrc
        };
      }

      encodingParameters.push(encParam);

      if (hasRed) {
        encParam = JSON.parse(JSON.stringify(encParam));
        encParam.fec = {
          ssrc: primarySsrc,
          mechanism: hasUlpfec ? 'red+ulpfec' : 'red'
        };
        encodingParameters.push(encParam);
      }
    }
  });

  if (encodingParameters.length === 0 && primarySsrc) {
    encodingParameters.push({
      ssrc: primarySsrc
    });
  } // we support both b=AS and b=TIAS but interpret AS as TIAS.


  var bandwidth = SDPUtils.matchPrefix(mediaSection, 'b=');

  if (bandwidth.length) {
    if (bandwidth[0].indexOf('b=TIAS:') === 0) {
      bandwidth = parseInt(bandwidth[0].substr(7), 10);
    } else if (bandwidth[0].indexOf('b=AS:') === 0) {
      // use formula from JSEP to convert b=AS to TIAS value.
      bandwidth = parseInt(bandwidth[0].substr(5), 10) * 1000 * 0.95 - 50 * 40 * 8;
    } else {
      bandwidth = undefined;
    }

    encodingParameters.forEach(function (params) {
      params.maxBitrate = bandwidth;
    });
  }

  return encodingParameters;
}; // parses http://draft.ortc.org/#rtcrtcpparameters*


SDPUtils.parseRtcpParameters = function (mediaSection) {
  var rtcpParameters = {}; // Gets the first SSRC. Note tha with RTX there might be multiple
  // SSRCs.

  var remoteSsrc = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:').map(function (line) {
    return SDPUtils.parseSsrcMedia(line);
  }).filter(function (obj) {
    return obj.attribute === 'cname';
  })[0];

  if (remoteSsrc) {
    rtcpParameters.cname = remoteSsrc.value;
    rtcpParameters.ssrc = remoteSsrc.ssrc;
  } // Edge uses the compound attribute instead of reducedSize
  // compound is !reducedSize


  var rsize = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-rsize');
  rtcpParameters.reducedSize = rsize.length > 0;
  rtcpParameters.compound = rsize.length === 0; // parses the rtcp-mux attrіbute.
  // Note that Edge does not support unmuxed RTCP.

  var mux = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-mux');
  rtcpParameters.mux = mux.length > 0;
  return rtcpParameters;
}; // parses either a=msid: or a=ssrc:... msid lines and returns
// the id of the MediaStream and MediaStreamTrack.


SDPUtils.parseMsid = function (mediaSection) {
  var parts;
  var spec = SDPUtils.matchPrefix(mediaSection, 'a=msid:');

  if (spec.length === 1) {
    parts = spec[0].substr(7).split(' ');
    return {
      stream: parts[0],
      track: parts[1]
    };
  }

  var planB = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:').map(function (line) {
    return SDPUtils.parseSsrcMedia(line);
  }).filter(function (msidParts) {
    return msidParts.attribute === 'msid';
  });

  if (planB.length > 0) {
    parts = planB[0].value.split(' ');
    return {
      stream: parts[0],
      track: parts[1]
    };
  }
}; // Generate a session ID for SDP.
// https://tools.ietf.org/html/draft-ietf-rtcweb-jsep-20#section-5.2.1
// recommends using a cryptographically random +ve 64-bit value
// but right now this should be acceptable and within the right range


SDPUtils.generateSessionId = function () {
  return Math.random().toString().substr(2, 21);
}; // Write boilder plate for start of SDP
// sessId argument is optional - if not supplied it will
// be generated randomly
// sessVersion is optional and defaults to 2
// sessUser is optional and defaults to 'thisisadapterortc'


SDPUtils.writeSessionBoilerplate = function (sessId, sessVer, sessUser) {
  var sessionId;
  var version = sessVer !== undefined ? sessVer : 2;

  if (sessId) {
    sessionId = sessId;
  } else {
    sessionId = SDPUtils.generateSessionId();
  }

  var user = sessUser || 'thisisadapterortc'; // FIXME: sess-id should be an NTP timestamp.

  return 'v=0\r\n' + 'o=' + user + ' ' + sessionId + ' ' + version + ' IN IP4 127.0.0.1\r\n' + 's=-\r\n' + 't=0 0\r\n';
};

SDPUtils.writeMediaSection = function (transceiver, caps, type, stream) {
  var sdp = SDPUtils.writeRtpDescription(transceiver.kind, caps); // Map ICE parameters (ufrag, pwd) to SDP.

  sdp += SDPUtils.writeIceParameters(transceiver.iceGatherer.getLocalParameters()); // Map DTLS parameters to SDP.

  sdp += SDPUtils.writeDtlsParameters(transceiver.dtlsTransport.getLocalParameters(), type === 'offer' ? 'actpass' : 'active');
  sdp += 'a=mid:' + transceiver.mid + '\r\n';

  if (transceiver.direction) {
    sdp += 'a=' + transceiver.direction + '\r\n';
  } else if (transceiver.rtpSender && transceiver.rtpReceiver) {
    sdp += 'a=sendrecv\r\n';
  } else if (transceiver.rtpSender) {
    sdp += 'a=sendonly\r\n';
  } else if (transceiver.rtpReceiver) {
    sdp += 'a=recvonly\r\n';
  } else {
    sdp += 'a=inactive\r\n';
  }

  if (transceiver.rtpSender) {
    // spec.
    var msid = 'msid:' + stream.id + ' ' + transceiver.rtpSender.track.id + '\r\n';
    sdp += 'a=' + msid; // for Chrome.

    sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc + ' ' + msid;

    if (transceiver.sendEncodingParameters[0].rtx) {
      sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc + ' ' + msid;
      sdp += 'a=ssrc-group:FID ' + transceiver.sendEncodingParameters[0].ssrc + ' ' + transceiver.sendEncodingParameters[0].rtx.ssrc + '\r\n';
    }
  } // FIXME: this should be written by writeRtpDescription.


  sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc + ' cname:' + SDPUtils.localCName + '\r\n';

  if (transceiver.rtpSender && transceiver.sendEncodingParameters[0].rtx) {
    sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc + ' cname:' + SDPUtils.localCName + '\r\n';
  }

  return sdp;
}; // Gets the direction from the mediaSection or the sessionpart.


SDPUtils.getDirection = function (mediaSection, sessionpart) {
  // Look for sendrecv, sendonly, recvonly, inactive, default to sendrecv.
  var lines = SDPUtils.splitLines(mediaSection);

  for (var i = 0; i < lines.length; i++) {
    switch (lines[i]) {
      case 'a=sendrecv':
      case 'a=sendonly':
      case 'a=recvonly':
      case 'a=inactive':
        return lines[i].substr(2);

      default: // FIXME: What should happen here?

    }
  }

  if (sessionpart) {
    return SDPUtils.getDirection(sessionpart);
  }

  return 'sendrecv';
};

SDPUtils.getKind = function (mediaSection) {
  var lines = SDPUtils.splitLines(mediaSection);
  var mline = lines[0].split(' ');
  return mline[0].substr(2);
};

SDPUtils.isRejected = function (mediaSection) {
  return mediaSection.split(' ', 2)[1] === '0';
};

SDPUtils.parseMLine = function (mediaSection) {
  var lines = SDPUtils.splitLines(mediaSection);
  var parts = lines[0].substr(2).split(' ');
  return {
    kind: parts[0],
    port: parseInt(parts[1], 10),
    protocol: parts[2],
    fmt: parts.slice(3).join(' ')
  };
};

SDPUtils.parseOLine = function (mediaSection) {
  var line = SDPUtils.matchPrefix(mediaSection, 'o=')[0];
  var parts = line.substr(2).split(' ');
  return {
    username: parts[0],
    sessionId: parts[1],
    sessionVersion: parseInt(parts[2], 10),
    netType: parts[3],
    addressType: parts[4],
    address: parts[5]
  };
}; // a very naive interpretation of a valid SDP.


SDPUtils.isValidSDP = function (blob) {
  if (typeof blob !== 'string' || blob.length === 0) {
    return false;
  }

  var lines = SDPUtils.splitLines(blob);

  for (var i = 0; i < lines.length; i++) {
    if (lines[i].length < 2 || lines[i].charAt(1) !== '=') {
      return false;
    } // TODO: check the modifier a bit more.

  }

  return true;
}; // Expose public methods.


if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object') {
  module.exports = SDPUtils;
}

},{}],15:[function(require,module,exports){
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */

/* eslint-env node */
'use strict';

var _adapter_factory = require("./adapter_factory.js");

var adapter = (0, _adapter_factory.adapterFactory)({
  window: window
});
module.exports = adapter; // this is the difference from adapter_core.

},{"./adapter_factory.js":16}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adapterFactory = adapterFactory;

var utils = _interopRequireWildcard(require("./utils"));

var chromeShim = _interopRequireWildcard(require("./chrome/chrome_shim"));

var edgeShim = _interopRequireWildcard(require("./edge/edge_shim"));

var firefoxShim = _interopRequireWildcard(require("./firefox/firefox_shim"));

var safariShim = _interopRequireWildcard(require("./safari/safari_shim"));

var commonShim = _interopRequireWildcard(require("./common_shim"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
// Browser shims.
// Shimming starts here.
function adapterFactory() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      window = _ref.window;

  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    shimChrome: true,
    shimFirefox: true,
    shimEdge: true,
    shimSafari: true
  };
  // Utils.
  var logging = utils.log;
  var browserDetails = utils.detectBrowser(window);
  var adapter = {
    browserDetails: browserDetails,
    commonShim: commonShim,
    extractVersion: utils.extractVersion,
    disableLog: utils.disableLog,
    disableWarnings: utils.disableWarnings
  }; // Shim browser if found.

  switch (browserDetails.browser) {
    case 'chrome':
      if (!chromeShim || !chromeShim.shimPeerConnection || !options.shimChrome) {
        logging('Chrome shim is not included in this adapter release.');
        return adapter;
      }

      logging('adapter.js shimming chrome.'); // Export to the adapter global object visible in the browser.

      adapter.browserShim = chromeShim;
      chromeShim.shimGetUserMedia(window);
      chromeShim.shimMediaStream(window);
      chromeShim.shimPeerConnection(window);
      chromeShim.shimOnTrack(window);
      chromeShim.shimAddTrackRemoveTrack(window);
      chromeShim.shimGetSendersWithDtmf(window);
      chromeShim.shimGetStats(window);
      chromeShim.shimSenderReceiverGetStats(window);
      chromeShim.fixNegotiationNeeded(window);
      commonShim.shimRTCIceCandidate(window);
      commonShim.shimConnectionState(window);
      commonShim.shimMaxMessageSize(window);
      commonShim.shimSendThrowTypeError(window);
      commonShim.removeAllowExtmapMixed(window);
      break;

    case 'firefox':
      if (!firefoxShim || !firefoxShim.shimPeerConnection || !options.shimFirefox) {
        logging('Firefox shim is not included in this adapter release.');
        return adapter;
      }

      logging('adapter.js shimming firefox.'); // Export to the adapter global object visible in the browser.

      adapter.browserShim = firefoxShim;
      firefoxShim.shimGetUserMedia(window);
      firefoxShim.shimPeerConnection(window);
      firefoxShim.shimOnTrack(window);
      firefoxShim.shimRemoveStream(window);
      firefoxShim.shimSenderGetStats(window);
      firefoxShim.shimReceiverGetStats(window);
      firefoxShim.shimRTCDataChannel(window);
      commonShim.shimRTCIceCandidate(window);
      commonShim.shimConnectionState(window);
      commonShim.shimMaxMessageSize(window);
      commonShim.shimSendThrowTypeError(window);
      break;

    case 'edge':
      if (!edgeShim || !edgeShim.shimPeerConnection || !options.shimEdge) {
        logging('MS edge shim is not included in this adapter release.');
        return adapter;
      }

      logging('adapter.js shimming edge.'); // Export to the adapter global object visible in the browser.

      adapter.browserShim = edgeShim;
      edgeShim.shimGetUserMedia(window);
      edgeShim.shimGetDisplayMedia(window);
      edgeShim.shimPeerConnection(window);
      edgeShim.shimReplaceTrack(window); // the edge shim implements the full RTCIceCandidate object.

      commonShim.shimMaxMessageSize(window);
      commonShim.shimSendThrowTypeError(window);
      break;

    case 'safari':
      if (!safariShim || !options.shimSafari) {
        logging('Safari shim is not included in this adapter release.');
        return adapter;
      }

      logging('adapter.js shimming safari.'); // Export to the adapter global object visible in the browser.

      adapter.browserShim = safariShim;
      safariShim.shimRTCIceServerUrls(window);
      safariShim.shimCreateOfferLegacy(window);
      safariShim.shimCallbacksAPI(window);
      safariShim.shimLocalStreamsAPI(window);
      safariShim.shimRemoteStreamsAPI(window);
      safariShim.shimTrackEventTransceiver(window);
      safariShim.shimGetUserMedia(window);
      commonShim.shimRTCIceCandidate(window);
      commonShim.shimMaxMessageSize(window);
      commonShim.shimSendThrowTypeError(window);
      commonShim.removeAllowExtmapMixed(window);
      break;

    default:
      logging('Unsupported browser!');
      break;
  }

  return adapter;
}

},{"./chrome/chrome_shim":17,"./common_shim":20,"./edge/edge_shim":21,"./firefox/firefox_shim":25,"./safari/safari_shim":28,"./utils":29}],17:[function(require,module,exports){
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */

/* eslint-env node */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shimMediaStream = shimMediaStream;
exports.shimOnTrack = shimOnTrack;
exports.shimGetSendersWithDtmf = shimGetSendersWithDtmf;
exports.shimGetStats = shimGetStats;
exports.shimSenderReceiverGetStats = shimSenderReceiverGetStats;
exports.shimAddTrackRemoveTrackWithNative = shimAddTrackRemoveTrackWithNative;
exports.shimAddTrackRemoveTrack = shimAddTrackRemoveTrack;
exports.shimPeerConnection = shimPeerConnection;
exports.fixNegotiationNeeded = fixNegotiationNeeded;
Object.defineProperty(exports, "shimGetUserMedia", {
  enumerable: true,
  get: function get() {
    return _getusermedia.shimGetUserMedia;
  }
});
Object.defineProperty(exports, "shimGetDisplayMedia", {
  enumerable: true,
  get: function get() {
    return _getdisplaymedia.shimGetDisplayMedia;
  }
});

var utils = _interopRequireWildcard(require("../utils.js"));

var _getusermedia = require("./getusermedia");

var _getdisplaymedia = require("./getdisplaymedia");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function shimMediaStream(window) {
  window.MediaStream = window.MediaStream || window.webkitMediaStream;
}

function shimOnTrack(window) {
  if (_typeof(window) === 'object' && window.RTCPeerConnection && !('ontrack' in window.RTCPeerConnection.prototype)) {
    Object.defineProperty(window.RTCPeerConnection.prototype, 'ontrack', {
      get: function get() {
        return this._ontrack;
      },
      set: function set(f) {
        if (this._ontrack) {
          this.removeEventListener('track', this._ontrack);
        }

        this.addEventListener('track', this._ontrack = f);
      },
      enumerable: true,
      configurable: true
    });
    var origSetRemoteDescription = window.RTCPeerConnection.prototype.setRemoteDescription;

    window.RTCPeerConnection.prototype.setRemoteDescription = function () {
      var _this = this;

      if (!this._ontrackpoly) {
        this._ontrackpoly = function (e) {
          // onaddstream does not fire when a track is added to an existing
          // stream. But stream.onaddtrack is implemented so we use that.
          e.stream.addEventListener('addtrack', function (te) {
            var receiver;

            if (window.RTCPeerConnection.prototype.getReceivers) {
              receiver = _this.getReceivers().find(function (r) {
                return r.track && r.track.id === te.track.id;
              });
            } else {
              receiver = {
                track: te.track
              };
            }

            var event = new Event('track');
            event.track = te.track;
            event.receiver = receiver;
            event.transceiver = {
              receiver: receiver
            };
            event.streams = [e.stream];

            _this.dispatchEvent(event);
          });
          e.stream.getTracks().forEach(function (track) {
            var receiver;

            if (window.RTCPeerConnection.prototype.getReceivers) {
              receiver = _this.getReceivers().find(function (r) {
                return r.track && r.track.id === track.id;
              });
            } else {
              receiver = {
                track: track
              };
            }

            var event = new Event('track');
            event.track = track;
            event.receiver = receiver;
            event.transceiver = {
              receiver: receiver
            };
            event.streams = [e.stream];

            _this.dispatchEvent(event);
          });
        };

        this.addEventListener('addstream', this._ontrackpoly);
      }

      return origSetRemoteDescription.apply(this, arguments);
    };
  } else {
    // even if RTCRtpTransceiver is in window, it is only used and
    // emitted in unified-plan. Unfortunately this means we need
    // to unconditionally wrap the event.
    utils.wrapPeerConnectionEvent(window, 'track', function (e) {
      if (!e.transceiver) {
        Object.defineProperty(e, 'transceiver', {
          value: {
            receiver: e.receiver
          }
        });
      }

      return e;
    });
  }
}

function shimGetSendersWithDtmf(window) {
  // Overrides addTrack/removeTrack, depends on shimAddTrackRemoveTrack.
  if (_typeof(window) === 'object' && window.RTCPeerConnection && !('getSenders' in window.RTCPeerConnection.prototype) && 'createDTMFSender' in window.RTCPeerConnection.prototype) {
    var shimSenderWithDtmf = function shimSenderWithDtmf(pc, track) {
      return {
        track: track,

        get dtmf() {
          if (this._dtmf === undefined) {
            if (track.kind === 'audio') {
              this._dtmf = pc.createDTMFSender(track);
            } else {
              this._dtmf = null;
            }
          }

          return this._dtmf;
        },

        _pc: pc
      };
    }; // augment addTrack when getSenders is not available.


    if (!window.RTCPeerConnection.prototype.getSenders) {
      window.RTCPeerConnection.prototype.getSenders = function () {
        this._senders = this._senders || [];
        return this._senders.slice(); // return a copy of the internal state.
      };

      var origAddTrack = window.RTCPeerConnection.prototype.addTrack;

      window.RTCPeerConnection.prototype.addTrack = function (track, stream) {
        var sender = origAddTrack.apply(this, arguments);

        if (!sender) {
          sender = shimSenderWithDtmf(this, track);

          this._senders.push(sender);
        }

        return sender;
      };

      var origRemoveTrack = window.RTCPeerConnection.prototype.removeTrack;

      window.RTCPeerConnection.prototype.removeTrack = function (sender) {
        origRemoveTrack.apply(this, arguments);

        var idx = this._senders.indexOf(sender);

        if (idx !== -1) {
          this._senders.splice(idx, 1);
        }
      };
    }

    var origAddStream = window.RTCPeerConnection.prototype.addStream;

    window.RTCPeerConnection.prototype.addStream = function (stream) {
      var _this2 = this;

      this._senders = this._senders || [];
      origAddStream.apply(this, [stream]);
      stream.getTracks().forEach(function (track) {
        _this2._senders.push(shimSenderWithDtmf(_this2, track));
      });
    };

    var origRemoveStream = window.RTCPeerConnection.prototype.removeStream;

    window.RTCPeerConnection.prototype.removeStream = function (stream) {
      var _this3 = this;

      this._senders = this._senders || [];
      origRemoveStream.apply(this, [stream]);
      stream.getTracks().forEach(function (track) {
        var sender = _this3._senders.find(function (s) {
          return s.track === track;
        });

        if (sender) {
          // remove sender
          _this3._senders.splice(_this3._senders.indexOf(sender), 1);
        }
      });
    };
  } else if (_typeof(window) === 'object' && window.RTCPeerConnection && 'getSenders' in window.RTCPeerConnection.prototype && 'createDTMFSender' in window.RTCPeerConnection.prototype && window.RTCRtpSender && !('dtmf' in window.RTCRtpSender.prototype)) {
    var origGetSenders = window.RTCPeerConnection.prototype.getSenders;

    window.RTCPeerConnection.prototype.getSenders = function () {
      var _this4 = this;

      var senders = origGetSenders.apply(this, []);
      senders.forEach(function (sender) {
        return sender._pc = _this4;
      });
      return senders;
    };

    Object.defineProperty(window.RTCRtpSender.prototype, 'dtmf', {
      get: function get() {
        if (this._dtmf === undefined) {
          if (this.track.kind === 'audio') {
            this._dtmf = this._pc.createDTMFSender(this.track);
          } else {
            this._dtmf = null;
          }
        }

        return this._dtmf;
      }
    });
  }
}

function shimGetStats(window) {
  if (!window.RTCPeerConnection) {
    return;
  }

  var origGetStats = window.RTCPeerConnection.prototype.getStats;

  window.RTCPeerConnection.prototype.getStats = function (selector, successCallback, errorCallback) {
    var _this5 = this;

    var args = arguments; // If selector is a function then we are in the old style stats so just
    // pass back the original getStats format to avoid breaking old users.

    if (arguments.length > 0 && typeof selector === 'function') {
      return origGetStats.apply(this, arguments);
    } // When spec-style getStats is supported, return those when called with
    // either no arguments or the selector argument is null.


    if (origGetStats.length === 0 && (arguments.length === 0 || typeof arguments[0] !== 'function')) {
      return origGetStats.apply(this, []);
    }

    var fixChromeStats_ = function fixChromeStats_(response) {
      var standardReport = {};
      var reports = response.result();
      reports.forEach(function (report) {
        var standardStats = {
          id: report.id,
          timestamp: report.timestamp,
          type: {
            localcandidate: 'local-candidate',
            remotecandidate: 'remote-candidate'
          }[report.type] || report.type
        };
        report.names().forEach(function (name) {
          standardStats[name] = report.stat(name);
        });
        standardReport[standardStats.id] = standardStats;
      });
      return standardReport;
    }; // shim getStats with maplike support


    var makeMapStats = function makeMapStats(stats) {
      return new Map(Object.keys(stats).map(function (key) {
        return [key, stats[key]];
      }));
    };

    if (arguments.length >= 2) {
      var successCallbackWrapper_ = function successCallbackWrapper_(response) {
        args[1](makeMapStats(fixChromeStats_(response)));
      };

      return origGetStats.apply(this, [successCallbackWrapper_, arguments[0]]);
    } // promise-support


    return new Promise(function (resolve, reject) {
      origGetStats.apply(_this5, [function (response) {
        resolve(makeMapStats(fixChromeStats_(response)));
      }, reject]);
    }).then(successCallback, errorCallback);
  };
}

function shimSenderReceiverGetStats(window) {
  if (!(_typeof(window) === 'object' && window.RTCPeerConnection && window.RTCRtpSender && window.RTCRtpReceiver)) {
    return;
  } // shim sender stats.


  if (!('getStats' in window.RTCRtpSender.prototype)) {
    var origGetSenders = window.RTCPeerConnection.prototype.getSenders;

    if (origGetSenders) {
      window.RTCPeerConnection.prototype.getSenders = function () {
        var _this6 = this;

        var senders = origGetSenders.apply(this, []);
        senders.forEach(function (sender) {
          return sender._pc = _this6;
        });
        return senders;
      };
    }

    var origAddTrack = window.RTCPeerConnection.prototype.addTrack;

    if (origAddTrack) {
      window.RTCPeerConnection.prototype.addTrack = function () {
        var sender = origAddTrack.apply(this, arguments);
        sender._pc = this;
        return sender;
      };
    }

    window.RTCRtpSender.prototype.getStats = function () {
      var sender = this;
      return this._pc.getStats().then(function (result) {
        return (
          /* Note: this will include stats of all senders that
           *   send a track with the same id as sender.track as
           *   it is not possible to identify the RTCRtpSender.
           */
          utils.filterStats(result, sender.track, true)
        );
      });
    };
  } // shim receiver stats.


  if (!('getStats' in window.RTCRtpReceiver.prototype)) {
    var origGetReceivers = window.RTCPeerConnection.prototype.getReceivers;

    if (origGetReceivers) {
      window.RTCPeerConnection.prototype.getReceivers = function () {
        var _this7 = this;

        var receivers = origGetReceivers.apply(this, []);
        receivers.forEach(function (receiver) {
          return receiver._pc = _this7;
        });
        return receivers;
      };
    }

    utils.wrapPeerConnectionEvent(window, 'track', function (e) {
      e.receiver._pc = e.srcElement;
      return e;
    });

    window.RTCRtpReceiver.prototype.getStats = function () {
      var receiver = this;
      return this._pc.getStats().then(function (result) {
        return utils.filterStats(result, receiver.track, false);
      });
    };
  }

  if (!('getStats' in window.RTCRtpSender.prototype && 'getStats' in window.RTCRtpReceiver.prototype)) {
    return;
  } // shim RTCPeerConnection.getStats(track).


  var origGetStats = window.RTCPeerConnection.prototype.getStats;

  window.RTCPeerConnection.prototype.getStats = function () {
    if (arguments.length > 0 && arguments[0] instanceof window.MediaStreamTrack) {
      var track = arguments[0];
      var sender;
      var receiver;
      var err;
      this.getSenders().forEach(function (s) {
        if (s.track === track) {
          if (sender) {
            err = true;
          } else {
            sender = s;
          }
        }
      });
      this.getReceivers().forEach(function (r) {
        if (r.track === track) {
          if (receiver) {
            err = true;
          } else {
            receiver = r;
          }
        }

        return r.track === track;
      });

      if (err || sender && receiver) {
        return Promise.reject(new DOMException('There are more than one sender or receiver for the track.', 'InvalidAccessError'));
      } else if (sender) {
        return sender.getStats();
      } else if (receiver) {
        return receiver.getStats();
      }

      return Promise.reject(new DOMException('There is no sender or receiver for the track.', 'InvalidAccessError'));
    }

    return origGetStats.apply(this, arguments);
  };
}

function shimAddTrackRemoveTrackWithNative(window) {
  // shim addTrack/removeTrack with native variants in order to make
  // the interactions with legacy getLocalStreams behave as in other browsers.
  // Keeps a mapping stream.id => [stream, rtpsenders...]
  window.RTCPeerConnection.prototype.getLocalStreams = function () {
    var _this8 = this;

    this._shimmedLocalStreams = this._shimmedLocalStreams || {};
    return Object.keys(this._shimmedLocalStreams).map(function (streamId) {
      return _this8._shimmedLocalStreams[streamId][0];
    });
  };

  var origAddTrack = window.RTCPeerConnection.prototype.addTrack;

  window.RTCPeerConnection.prototype.addTrack = function (track, stream) {
    if (!stream) {
      return origAddTrack.apply(this, arguments);
    }

    this._shimmedLocalStreams = this._shimmedLocalStreams || {};
    var sender = origAddTrack.apply(this, arguments);

    if (!this._shimmedLocalStreams[stream.id]) {
      this._shimmedLocalStreams[stream.id] = [stream, sender];
    } else if (this._shimmedLocalStreams[stream.id].indexOf(sender) === -1) {
      this._shimmedLocalStreams[stream.id].push(sender);
    }

    return sender;
  };

  var origAddStream = window.RTCPeerConnection.prototype.addStream;

  window.RTCPeerConnection.prototype.addStream = function (stream) {
    var _this9 = this;

    this._shimmedLocalStreams = this._shimmedLocalStreams || {};
    stream.getTracks().forEach(function (track) {
      var alreadyExists = _this9.getSenders().find(function (s) {
        return s.track === track;
      });

      if (alreadyExists) {
        throw new DOMException('Track already exists.', 'InvalidAccessError');
      }
    });
    var existingSenders = this.getSenders();
    origAddStream.apply(this, arguments);
    var newSenders = this.getSenders().filter(function (newSender) {
      return existingSenders.indexOf(newSender) === -1;
    });
    this._shimmedLocalStreams[stream.id] = [stream].concat(newSenders);
  };

  var origRemoveStream = window.RTCPeerConnection.prototype.removeStream;

  window.RTCPeerConnection.prototype.removeStream = function (stream) {
    this._shimmedLocalStreams = this._shimmedLocalStreams || {};
    delete this._shimmedLocalStreams[stream.id];
    return origRemoveStream.apply(this, arguments);
  };

  var origRemoveTrack = window.RTCPeerConnection.prototype.removeTrack;

  window.RTCPeerConnection.prototype.removeTrack = function (sender) {
    var _this10 = this;

    this._shimmedLocalStreams = this._shimmedLocalStreams || {};

    if (sender) {
      Object.keys(this._shimmedLocalStreams).forEach(function (streamId) {
        var idx = _this10._shimmedLocalStreams[streamId].indexOf(sender);

        if (idx !== -1) {
          _this10._shimmedLocalStreams[streamId].splice(idx, 1);
        }

        if (_this10._shimmedLocalStreams[streamId].length === 1) {
          delete _this10._shimmedLocalStreams[streamId];
        }
      });
    }

    return origRemoveTrack.apply(this, arguments);
  };
}

function shimAddTrackRemoveTrack(window) {
  if (!window.RTCPeerConnection) {
    return;
  }

  var browserDetails = utils.detectBrowser(window); // shim addTrack and removeTrack.

  if (window.RTCPeerConnection.prototype.addTrack && browserDetails.version >= 65) {
    return shimAddTrackRemoveTrackWithNative(window);
  } // also shim pc.getLocalStreams when addTrack is shimmed
  // to return the original streams.


  var origGetLocalStreams = window.RTCPeerConnection.prototype.getLocalStreams;

  window.RTCPeerConnection.prototype.getLocalStreams = function () {
    var _this11 = this;

    var nativeStreams = origGetLocalStreams.apply(this);
    this._reverseStreams = this._reverseStreams || {};
    return nativeStreams.map(function (stream) {
      return _this11._reverseStreams[stream.id];
    });
  };

  var origAddStream = window.RTCPeerConnection.prototype.addStream;

  window.RTCPeerConnection.prototype.addStream = function (stream) {
    var _this12 = this;

    this._streams = this._streams || {};
    this._reverseStreams = this._reverseStreams || {};
    stream.getTracks().forEach(function (track) {
      var alreadyExists = _this12.getSenders().find(function (s) {
        return s.track === track;
      });

      if (alreadyExists) {
        throw new DOMException('Track already exists.', 'InvalidAccessError');
      }
    }); // Add identity mapping for consistency with addTrack.
    // Unless this is being used with a stream from addTrack.

    if (!this._reverseStreams[stream.id]) {
      var newStream = new window.MediaStream(stream.getTracks());
      this._streams[stream.id] = newStream;
      this._reverseStreams[newStream.id] = stream;
      stream = newStream;
    }

    origAddStream.apply(this, [stream]);
  };

  var origRemoveStream = window.RTCPeerConnection.prototype.removeStream;

  window.RTCPeerConnection.prototype.removeStream = function (stream) {
    this._streams = this._streams || {};
    this._reverseStreams = this._reverseStreams || {};
    origRemoveStream.apply(this, [this._streams[stream.id] || stream]);
    delete this._reverseStreams[this._streams[stream.id] ? this._streams[stream.id].id : stream.id];
    delete this._streams[stream.id];
  };

  window.RTCPeerConnection.prototype.addTrack = function (track, stream) {
    var _this13 = this;

    if (this.signalingState === 'closed') {
      throw new DOMException('The RTCPeerConnection\'s signalingState is \'closed\'.', 'InvalidStateError');
    }

    var streams = [].slice.call(arguments, 1);

    if (streams.length !== 1 || !streams[0].getTracks().find(function (t) {
      return t === track;
    })) {
      // this is not fully correct but all we can manage without
      // [[associated MediaStreams]] internal slot.
      throw new DOMException('The adapter.js addTrack polyfill only supports a single ' + ' stream which is associated with the specified track.', 'NotSupportedError');
    }

    var alreadyExists = this.getSenders().find(function (s) {
      return s.track === track;
    });

    if (alreadyExists) {
      throw new DOMException('Track already exists.', 'InvalidAccessError');
    }

    this._streams = this._streams || {};
    this._reverseStreams = this._reverseStreams || {};
    var oldStream = this._streams[stream.id];

    if (oldStream) {
      // this is using odd Chrome behaviour, use with caution:
      // https://bugs.chromium.org/p/webrtc/issues/detail?id=7815
      // Note: we rely on the high-level addTrack/dtmf shim to
      // create the sender with a dtmf sender.
      oldStream.addTrack(track); // Trigger ONN async.

      Promise.resolve().then(function () {
        _this13.dispatchEvent(new Event('negotiationneeded'));
      });
    } else {
      var newStream = new window.MediaStream([track]);
      this._streams[stream.id] = newStream;
      this._reverseStreams[newStream.id] = stream;
      this.addStream(newStream);
    }

    return this.getSenders().find(function (s) {
      return s.track === track;
    });
  }; // replace the internal stream id with the external one and
  // vice versa.


  function replaceInternalStreamId(pc, description) {
    var sdp = description.sdp;
    Object.keys(pc._reverseStreams || []).forEach(function (internalId) {
      var externalStream = pc._reverseStreams[internalId];
      var internalStream = pc._streams[externalStream.id];
      sdp = sdp.replace(new RegExp(internalStream.id, 'g'), externalStream.id);
    });
    return new RTCSessionDescription({
      type: description.type,
      sdp: sdp
    });
  }

  function replaceExternalStreamId(pc, description) {
    var sdp = description.sdp;
    Object.keys(pc._reverseStreams || []).forEach(function (internalId) {
      var externalStream = pc._reverseStreams[internalId];
      var internalStream = pc._streams[externalStream.id];
      sdp = sdp.replace(new RegExp(externalStream.id, 'g'), internalStream.id);
    });
    return new RTCSessionDescription({
      type: description.type,
      sdp: sdp
    });
  }

  ['createOffer', 'createAnswer'].forEach(function (method) {
    var nativeMethod = window.RTCPeerConnection.prototype[method];

    window.RTCPeerConnection.prototype[method] = function () {
      var _this14 = this;

      var args = arguments;
      var isLegacyCall = arguments.length && typeof arguments[0] === 'function';

      if (isLegacyCall) {
        return nativeMethod.apply(this, [function (description) {
          var desc = replaceInternalStreamId(_this14, description);
          args[0].apply(null, [desc]);
        }, function (err) {
          if (args[1]) {
            args[1].apply(null, err);
          }
        }, arguments[2]]);
      }

      return nativeMethod.apply(this, arguments).then(function (description) {
        return replaceInternalStreamId(_this14, description);
      });
    };
  });
  var origSetLocalDescription = window.RTCPeerConnection.prototype.setLocalDescription;

  window.RTCPeerConnection.prototype.setLocalDescription = function () {
    if (!arguments.length || !arguments[0].type) {
      return origSetLocalDescription.apply(this, arguments);
    }

    arguments[0] = replaceExternalStreamId(this, arguments[0]);
    return origSetLocalDescription.apply(this, arguments);
  }; // TODO: mangle getStats: https://w3c.github.io/webrtc-stats/#dom-rtcmediastreamstats-streamidentifier


  var origLocalDescription = Object.getOwnPropertyDescriptor(window.RTCPeerConnection.prototype, 'localDescription');
  Object.defineProperty(window.RTCPeerConnection.prototype, 'localDescription', {
    get: function get() {
      var description = origLocalDescription.get.apply(this);

      if (description.type === '') {
        return description;
      }

      return replaceInternalStreamId(this, description);
    }
  });

  window.RTCPeerConnection.prototype.removeTrack = function (sender) {
    var _this15 = this;

    if (this.signalingState === 'closed') {
      throw new DOMException('The RTCPeerConnection\'s signalingState is \'closed\'.', 'InvalidStateError');
    } // We can not yet check for sender instanceof RTCRtpSender
    // since we shim RTPSender. So we check if sender._pc is set.


    if (!sender._pc) {
      throw new DOMException('Argument 1 of RTCPeerConnection.removeTrack ' + 'does not implement interface RTCRtpSender.', 'TypeError');
    }

    var isLocal = sender._pc === this;

    if (!isLocal) {
      throw new DOMException('Sender was not created by this connection.', 'InvalidAccessError');
    } // Search for the native stream the senders track belongs to.


    this._streams = this._streams || {};
    var stream;
    Object.keys(this._streams).forEach(function (streamid) {
      var hasTrack = _this15._streams[streamid].getTracks().find(function (track) {
        return sender.track === track;
      });

      if (hasTrack) {
        stream = _this15._streams[streamid];
      }
    });

    if (stream) {
      if (stream.getTracks().length === 1) {
        // if this is the last track of the stream, remove the stream. This
        // takes care of any shimmed _senders.
        this.removeStream(this._reverseStreams[stream.id]);
      } else {
        // relying on the same odd chrome behaviour as above.
        stream.removeTrack(sender.track);
      }

      this.dispatchEvent(new Event('negotiationneeded'));
    }
  };
}

function shimPeerConnection(window) {
  if (!window.RTCPeerConnection && window.webkitRTCPeerConnection) {
    // very basic support for old versions.
    window.RTCPeerConnection = window.webkitRTCPeerConnection;
  }

  if (!window.RTCPeerConnection) {
    return;
  } // shim implicit creation of RTCSessionDescription/RTCIceCandidate


  ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'].forEach(function (method) {
    var nativeMethod = window.RTCPeerConnection.prototype[method];

    window.RTCPeerConnection.prototype[method] = function () {
      arguments[0] = new (method === 'addIceCandidate' ? window.RTCIceCandidate : window.RTCSessionDescription)(arguments[0]);
      return nativeMethod.apply(this, arguments);
    };
  }); // support for addIceCandidate(null or undefined)

  var nativeAddIceCandidate = window.RTCPeerConnection.prototype.addIceCandidate;

  window.RTCPeerConnection.prototype.addIceCandidate = function () {
    if (!arguments[0]) {
      if (arguments[1]) {
        arguments[1].apply(null);
      }

      return Promise.resolve();
    }

    return nativeAddIceCandidate.apply(this, arguments);
  };
}

function fixNegotiationNeeded(window) {
  utils.wrapPeerConnectionEvent(window, 'negotiationneeded', function (e) {
    var pc = e.target;

    if (pc.signalingState !== 'stable') {
      return;
    }

    return e;
  });
}

},{"../utils.js":29,"./getdisplaymedia":18,"./getusermedia":19}],18:[function(require,module,exports){
/*
 *  Copyright (c) 2018 The adapter.js project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */

/* eslint-env node */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shimGetDisplayMedia = shimGetDisplayMedia;

function shimGetDisplayMedia(window, getSourceId) {
  if (window.navigator.mediaDevices && 'getDisplayMedia' in window.navigator.mediaDevices) {
    return;
  }

  if (!window.navigator.mediaDevices) {
    return;
  } // getSourceId is a function that returns a promise resolving with
  // the sourceId of the screen/window/tab to be shared.


  if (typeof getSourceId !== 'function') {
    console.error('shimGetDisplayMedia: getSourceId argument is not ' + 'a function');
    return;
  }

  window.navigator.mediaDevices.getDisplayMedia = function (constraints) {
    return getSourceId(constraints).then(function (sourceId) {
      var widthSpecified = constraints.video && constraints.video.width;
      var heightSpecified = constraints.video && constraints.video.height;
      var frameRateSpecified = constraints.video && constraints.video.frameRate;
      constraints.video = {
        mandatory: {
          chromeMediaSource: 'desktop',
          chromeMediaSourceId: sourceId,
          maxFrameRate: frameRateSpecified || 3
        }
      };

      if (widthSpecified) {
        constraints.video.mandatory.maxWidth = widthSpecified;
      }

      if (heightSpecified) {
        constraints.video.mandatory.maxHeight = heightSpecified;
      }

      return window.navigator.mediaDevices.getUserMedia(constraints);
    });
  };
}

},{}],19:[function(require,module,exports){
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */

/* eslint-env node */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shimGetUserMedia = shimGetUserMedia;

var utils = _interopRequireWildcard(require("../utils.js"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var logging = utils.log;

function shimGetUserMedia(window) {
  var navigator = window && window.navigator;

  if (!navigator.mediaDevices) {
    return;
  }

  var browserDetails = utils.detectBrowser(window);

  var constraintsToChrome_ = function constraintsToChrome_(c) {
    if (_typeof(c) !== 'object' || c.mandatory || c.optional) {
      return c;
    }

    var cc = {};
    Object.keys(c).forEach(function (key) {
      if (key === 'require' || key === 'advanced' || key === 'mediaSource') {
        return;
      }

      var r = _typeof(c[key]) === 'object' ? c[key] : {
        ideal: c[key]
      };

      if (r.exact !== undefined && typeof r.exact === 'number') {
        r.min = r.max = r.exact;
      }

      var oldname_ = function oldname_(prefix, name) {
        if (prefix) {
          return prefix + name.charAt(0).toUpperCase() + name.slice(1);
        }

        return name === 'deviceId' ? 'sourceId' : name;
      };

      if (r.ideal !== undefined) {
        cc.optional = cc.optional || [];
        var oc = {};

        if (typeof r.ideal === 'number') {
          oc[oldname_('min', key)] = r.ideal;
          cc.optional.push(oc);
          oc = {};
          oc[oldname_('max', key)] = r.ideal;
          cc.optional.push(oc);
        } else {
          oc[oldname_('', key)] = r.ideal;
          cc.optional.push(oc);
        }
      }

      if (r.exact !== undefined && typeof r.exact !== 'number') {
        cc.mandatory = cc.mandatory || {};
        cc.mandatory[oldname_('', key)] = r.exact;
      } else {
        ['min', 'max'].forEach(function (mix) {
          if (r[mix] !== undefined) {
            cc.mandatory = cc.mandatory || {};
            cc.mandatory[oldname_(mix, key)] = r[mix];
          }
        });
      }
    });

    if (c.advanced) {
      cc.optional = (cc.optional || []).concat(c.advanced);
    }

    return cc;
  };

  var shimConstraints_ = function shimConstraints_(constraints, func) {
    if (browserDetails.version >= 61) {
      return func(constraints);
    }

    constraints = JSON.parse(JSON.stringify(constraints));

    if (constraints && _typeof(constraints.audio) === 'object') {
      var remap = function remap(obj, a, b) {
        if (a in obj && !(b in obj)) {
          obj[b] = obj[a];
          delete obj[a];
        }
      };

      constraints = JSON.parse(JSON.stringify(constraints));
      remap(constraints.audio, 'autoGainControl', 'googAutoGainControl');
      remap(constraints.audio, 'noiseSuppression', 'googNoiseSuppression');
      constraints.audio = constraintsToChrome_(constraints.audio);
    }

    if (constraints && _typeof(constraints.video) === 'object') {
      // Shim facingMode for mobile & surface pro.
      var face = constraints.video.facingMode;
      face = face && (_typeof(face) === 'object' ? face : {
        ideal: face
      });
      var getSupportedFacingModeLies = browserDetails.version < 66;

      if (face && (face.exact === 'user' || face.exact === 'environment' || face.ideal === 'user' || face.ideal === 'environment') && !(navigator.mediaDevices.getSupportedConstraints && navigator.mediaDevices.getSupportedConstraints().facingMode && !getSupportedFacingModeLies)) {
        delete constraints.video.facingMode;
        var matches;

        if (face.exact === 'environment' || face.ideal === 'environment') {
          matches = ['back', 'rear'];
        } else if (face.exact === 'user' || face.ideal === 'user') {
          matches = ['front'];
        }

        if (matches) {
          // Look for matches in label, or use last cam for back (typical).
          return navigator.mediaDevices.enumerateDevices().then(function (devices) {
            devices = devices.filter(function (d) {
              return d.kind === 'videoinput';
            });
            var dev = devices.find(function (d) {
              return matches.some(function (match) {
                return d.label.toLowerCase().includes(match);
              });
            });

            if (!dev && devices.length && matches.includes('back')) {
              dev = devices[devices.length - 1]; // more likely the back cam
            }

            if (dev) {
              constraints.video.deviceId = face.exact ? {
                exact: dev.deviceId
              } : {
                ideal: dev.deviceId
              };
            }

            constraints.video = constraintsToChrome_(constraints.video);
            logging('chrome: ' + JSON.stringify(constraints));
            return func(constraints);
          });
        }
      }

      constraints.video = constraintsToChrome_(constraints.video);
    }

    logging('chrome: ' + JSON.stringify(constraints));
    return func(constraints);
  };

  var shimError_ = function shimError_(e) {
    if (browserDetails.version >= 64) {
      return e;
    }

    return {
      name: {
        PermissionDeniedError: 'NotAllowedError',
        PermissionDismissedError: 'NotAllowedError',
        InvalidStateError: 'NotAllowedError',
        DevicesNotFoundError: 'NotFoundError',
        ConstraintNotSatisfiedError: 'OverconstrainedError',
        TrackStartError: 'NotReadableError',
        MediaDeviceFailedDueToShutdown: 'NotAllowedError',
        MediaDeviceKillSwitchOn: 'NotAllowedError',
        TabCaptureError: 'AbortError',
        ScreenCaptureError: 'AbortError',
        DeviceCaptureError: 'AbortError'
      }[e.name] || e.name,
      message: e.message,
      constraint: e.constraint || e.constraintName,
      toString: function toString() {
        return this.name + (this.message && ': ') + this.message;
      }
    };
  };

  var getUserMedia_ = function getUserMedia_(constraints, onSuccess, onError) {
    shimConstraints_(constraints, function (c) {
      navigator.webkitGetUserMedia(c, onSuccess, function (e) {
        if (onError) {
          onError(shimError_(e));
        }
      });
    });
  };

  navigator.getUserMedia = getUserMedia_.bind(navigator); // Even though Chrome 45 has navigator.mediaDevices and a getUserMedia
  // function which returns a Promise, it does not accept spec-style
  // constraints.

  if (navigator.mediaDevices.getUserMedia) {
    var origGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);

    navigator.mediaDevices.getUserMedia = function (cs) {
      return shimConstraints_(cs, function (c) {
        return origGetUserMedia(c).then(function (stream) {
          if (c.audio && !stream.getAudioTracks().length || c.video && !stream.getVideoTracks().length) {
            stream.getTracks().forEach(function (track) {
              track.stop();
            });
            throw new DOMException('', 'NotFoundError');
          }

          return stream;
        }, function (e) {
          return Promise.reject(shimError_(e));
        });
      });
    };
  }
}

},{"../utils.js":29}],20:[function(require,module,exports){
/*
 *  Copyright (c) 2017 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */

/* eslint-env node */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shimRTCIceCandidate = shimRTCIceCandidate;
exports.shimMaxMessageSize = shimMaxMessageSize;
exports.shimSendThrowTypeError = shimSendThrowTypeError;
exports.shimConnectionState = shimConnectionState;
exports.removeAllowExtmapMixed = removeAllowExtmapMixed;

var _sdp = _interopRequireDefault(require("sdp"));

var utils = _interopRequireWildcard(require("./utils"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function shimRTCIceCandidate(window) {
  // foundation is arbitrarily chosen as an indicator for full support for
  // https://w3c.github.io/webrtc-pc/#rtcicecandidate-interface
  if (!window.RTCIceCandidate || window.RTCIceCandidate && 'foundation' in window.RTCIceCandidate.prototype) {
    return;
  }

  var NativeRTCIceCandidate = window.RTCIceCandidate;

  window.RTCIceCandidate = function (args) {
    // Remove the a= which shouldn't be part of the candidate string.
    if (_typeof(args) === 'object' && args.candidate && args.candidate.indexOf('a=') === 0) {
      args = JSON.parse(JSON.stringify(args));
      args.candidate = args.candidate.substr(2);
    }

    if (args.candidate && args.candidate.length) {
      // Augment the native candidate with the parsed fields.
      var nativeCandidate = new NativeRTCIceCandidate(args);

      var parsedCandidate = _sdp["default"].parseCandidate(args.candidate);

      var augmentedCandidate = Object.assign(nativeCandidate, parsedCandidate); // Add a serializer that does not serialize the extra attributes.

      augmentedCandidate.toJSON = function () {
        return {
          candidate: augmentedCandidate.candidate,
          sdpMid: augmentedCandidate.sdpMid,
          sdpMLineIndex: augmentedCandidate.sdpMLineIndex,
          usernameFragment: augmentedCandidate.usernameFragment
        };
      };

      return augmentedCandidate;
    }

    return new NativeRTCIceCandidate(args);
  };

  window.RTCIceCandidate.prototype = NativeRTCIceCandidate.prototype; // Hook up the augmented candidate in onicecandidate and
  // addEventListener('icecandidate', ...)

  utils.wrapPeerConnectionEvent(window, 'icecandidate', function (e) {
    if (e.candidate) {
      Object.defineProperty(e, 'candidate', {
        value: new window.RTCIceCandidate(e.candidate),
        writable: 'false'
      });
    }

    return e;
  });
}

function shimMaxMessageSize(window) {
  if (window.RTCSctpTransport || !window.RTCPeerConnection) {
    return;
  }

  var browserDetails = utils.detectBrowser(window);

  if (!('sctp' in window.RTCPeerConnection.prototype)) {
    Object.defineProperty(window.RTCPeerConnection.prototype, 'sctp', {
      get: function get() {
        return typeof this._sctp === 'undefined' ? null : this._sctp;
      }
    });
  }

  var sctpInDescription = function sctpInDescription(description) {
    if (!description || !description.sdp) {
      return false;
    }

    var sections = _sdp["default"].splitSections(description.sdp);

    sections.shift();
    return sections.some(function (mediaSection) {
      var mLine = _sdp["default"].parseMLine(mediaSection);

      return mLine && mLine.kind === 'application' && mLine.protocol.indexOf('SCTP') !== -1;
    });
  };

  var getRemoteFirefoxVersion = function getRemoteFirefoxVersion(description) {
    // TODO: Is there a better solution for detecting Firefox?
    var match = description.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);

    if (match === null || match.length < 2) {
      return -1;
    }

    var version = parseInt(match[1], 10); // Test for NaN (yes, this is ugly)

    return version !== version ? -1 : version;
  };

  var getCanSendMaxMessageSize = function getCanSendMaxMessageSize(remoteIsFirefox) {
    // Every implementation we know can send at least 64 KiB.
    // Note: Although Chrome is technically able to send up to 256 KiB, the
    //       data does not reach the other peer reliably.
    //       See: https://bugs.chromium.org/p/webrtc/issues/detail?id=8419
    var canSendMaxMessageSize = 65536;

    if (browserDetails.browser === 'firefox') {
      if (browserDetails.version < 57) {
        if (remoteIsFirefox === -1) {
          // FF < 57 will send in 16 KiB chunks using the deprecated PPID
          // fragmentation.
          canSendMaxMessageSize = 16384;
        } else {
          // However, other FF (and RAWRTC) can reassemble PPID-fragmented
          // messages. Thus, supporting ~2 GiB when sending.
          canSendMaxMessageSize = 2147483637;
        }
      } else if (browserDetails.version < 60) {
        // Currently, all FF >= 57 will reset the remote maximum message size
        // to the default value when a data channel is created at a later
        // stage. :(
        // See: https://bugzilla.mozilla.org/show_bug.cgi?id=1426831
        canSendMaxMessageSize = browserDetails.version === 57 ? 65535 : 65536;
      } else {
        // FF >= 60 supports sending ~2 GiB
        canSendMaxMessageSize = 2147483637;
      }
    }

    return canSendMaxMessageSize;
  };

  var getMaxMessageSize = function getMaxMessageSize(description, remoteIsFirefox) {
    // Note: 65536 bytes is the default value from the SDP spec. Also,
    //       every implementation we know supports receiving 65536 bytes.
    var maxMessageSize = 65536; // FF 57 has a slightly incorrect default remote max message size, so
    // we need to adjust it here to avoid a failure when sending.
    // See: https://bugzilla.mozilla.org/show_bug.cgi?id=1425697

    if (browserDetails.browser === 'firefox' && browserDetails.version === 57) {
      maxMessageSize = 65535;
    }

    var match = _sdp["default"].matchPrefix(description.sdp, 'a=max-message-size:');

    if (match.length > 0) {
      maxMessageSize = parseInt(match[0].substr(19), 10);
    } else if (browserDetails.browser === 'firefox' && remoteIsFirefox !== -1) {
      // If the maximum message size is not present in the remote SDP and
      // both local and remote are Firefox, the remote peer can receive
      // ~2 GiB.
      maxMessageSize = 2147483637;
    }

    return maxMessageSize;
  };

  var origSetRemoteDescription = window.RTCPeerConnection.prototype.setRemoteDescription;

  window.RTCPeerConnection.prototype.setRemoteDescription = function () {
    this._sctp = null;

    if (sctpInDescription(arguments[0])) {
      // Check if the remote is FF.
      var isFirefox = getRemoteFirefoxVersion(arguments[0]); // Get the maximum message size the local peer is capable of sending

      var canSendMMS = getCanSendMaxMessageSize(isFirefox); // Get the maximum message size of the remote peer.

      var remoteMMS = getMaxMessageSize(arguments[0], isFirefox); // Determine final maximum message size

      var maxMessageSize;

      if (canSendMMS === 0 && remoteMMS === 0) {
        maxMessageSize = Number.POSITIVE_INFINITY;
      } else if (canSendMMS === 0 || remoteMMS === 0) {
        maxMessageSize = Math.max(canSendMMS, remoteMMS);
      } else {
        maxMessageSize = Math.min(canSendMMS, remoteMMS);
      } // Create a dummy RTCSctpTransport object and the 'maxMessageSize'
      // attribute.


      var sctp = {};
      Object.defineProperty(sctp, 'maxMessageSize', {
        get: function get() {
          return maxMessageSize;
        }
      });
      this._sctp = sctp;
    }

    return origSetRemoteDescription.apply(this, arguments);
  };
}

function shimSendThrowTypeError(window) {
  if (!(window.RTCPeerConnection && 'createDataChannel' in window.RTCPeerConnection.prototype)) {
    return;
  } // Note: Although Firefox >= 57 has a native implementation, the maximum
  //       message size can be reset for all data channels at a later stage.
  //       See: https://bugzilla.mozilla.org/show_bug.cgi?id=1426831


  function wrapDcSend(dc, pc) {
    var origDataChannelSend = dc.send;

    dc.send = function () {
      var data = arguments[0];
      var length = data.length || data.size || data.byteLength;

      if (dc.readyState === 'open' && pc.sctp && length > pc.sctp.maxMessageSize) {
        throw new TypeError('Message too large (can send a maximum of ' + pc.sctp.maxMessageSize + ' bytes)');
      }

      return origDataChannelSend.apply(dc, arguments);
    };
  }

  var origCreateDataChannel = window.RTCPeerConnection.prototype.createDataChannel;

  window.RTCPeerConnection.prototype.createDataChannel = function () {
    var dataChannel = origCreateDataChannel.apply(this, arguments);
    wrapDcSend(dataChannel, this);
    return dataChannel;
  };

  utils.wrapPeerConnectionEvent(window, 'datachannel', function (e) {
    wrapDcSend(e.channel, e.target);
    return e;
  });
}
/* shims RTCConnectionState by pretending it is the same as iceConnectionState.
 * See https://bugs.chromium.org/p/webrtc/issues/detail?id=6145#c12
 * for why this is a valid hack in Chrome. In Firefox it is slightly incorrect
 * since DTLS failures would be hidden. See
 * https://bugzilla.mozilla.org/show_bug.cgi?id=1265827
 * for the Firefox tracking bug.
 */


function shimConnectionState(window) {
  if (!window.RTCPeerConnection || 'connectionState' in window.RTCPeerConnection.prototype) {
    return;
  }

  var proto = window.RTCPeerConnection.prototype;
  Object.defineProperty(proto, 'connectionState', {
    get: function get() {
      return {
        completed: 'connected',
        checking: 'connecting'
      }[this.iceConnectionState] || this.iceConnectionState;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(proto, 'onconnectionstatechange', {
    get: function get() {
      return this._onconnectionstatechange || null;
    },
    set: function set(cb) {
      if (this._onconnectionstatechange) {
        this.removeEventListener('connectionstatechange', this._onconnectionstatechange);
        delete this._onconnectionstatechange;
      }

      if (cb) {
        this.addEventListener('connectionstatechange', this._onconnectionstatechange = cb);
      }
    },
    enumerable: true,
    configurable: true
  });
  ['setLocalDescription', 'setRemoteDescription'].forEach(function (method) {
    var origMethod = proto[method];

    proto[method] = function () {
      if (!this._connectionstatechangepoly) {
        this._connectionstatechangepoly = function (e) {
          var pc = e.target;

          if (pc._lastConnectionState !== pc.connectionState) {
            pc._lastConnectionState = pc.connectionState;
            var newEvent = new Event('connectionstatechange', e);
            pc.dispatchEvent(newEvent);
          }

          return e;
        };

        this.addEventListener('iceconnectionstatechange', this._connectionstatechangepoly);
      }

      return origMethod.apply(this, arguments);
    };
  });
}

function removeAllowExtmapMixed(window) {
  /* remove a=extmap-allow-mixed for Chrome < M71 */
  if (!window.RTCPeerConnection) {
    return;
  }

  var browserDetails = utils.detectBrowser(window);

  if (browserDetails.browser === 'chrome' && browserDetails.version >= 71) {
    return;
  }

  var nativeSRD = window.RTCPeerConnection.prototype.setRemoteDescription;

  window.RTCPeerConnection.prototype.setRemoteDescription = function (desc) {
    if (desc && desc.sdp && desc.sdp.indexOf('\na=extmap-allow-mixed') !== -1) {
      desc.sdp = desc.sdp.split('\n').filter(function (line) {
        return line.trim() !== 'a=extmap-allow-mixed';
      }).join('\n');
    }

    return nativeSRD.apply(this, arguments);
  };
}

},{"./utils":29,"sdp":14}],21:[function(require,module,exports){
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */

/* eslint-env node */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shimPeerConnection = shimPeerConnection;
exports.shimReplaceTrack = shimReplaceTrack;
Object.defineProperty(exports, "shimGetUserMedia", {
  enumerable: true,
  get: function get() {
    return _getusermedia.shimGetUserMedia;
  }
});
Object.defineProperty(exports, "shimGetDisplayMedia", {
  enumerable: true,
  get: function get() {
    return _getdisplaymedia.shimGetDisplayMedia;
  }
});

var utils = _interopRequireWildcard(require("../utils"));

var _filtericeservers = require("./filtericeservers");

var _rtcpeerconnectionShim = _interopRequireDefault(require("rtcpeerconnection-shim"));

var _getusermedia = require("./getusermedia");

var _getdisplaymedia = require("./getdisplaymedia");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function shimPeerConnection(window) {
  var browserDetails = utils.detectBrowser(window);

  if (window.RTCIceGatherer) {
    if (!window.RTCIceCandidate) {
      window.RTCIceCandidate = function (args) {
        return args;
      };
    }

    if (!window.RTCSessionDescription) {
      window.RTCSessionDescription = function (args) {
        return args;
      };
    } // this adds an additional event listener to MediaStrackTrack that signals
    // when a tracks enabled property was changed. Workaround for a bug in
    // addStream, see below. No longer required in 15025+


    if (browserDetails.version < 15025) {
      var origMSTEnabled = Object.getOwnPropertyDescriptor(window.MediaStreamTrack.prototype, 'enabled');
      Object.defineProperty(window.MediaStreamTrack.prototype, 'enabled', {
        set: function set(value) {
          origMSTEnabled.set.call(this, value);
          var ev = new Event('enabled');
          ev.enabled = value;
          this.dispatchEvent(ev);
        }
      });
    }
  } // ORTC defines the DTMF sender a bit different.
  // https://github.com/w3c/ortc/issues/714


  if (window.RTCRtpSender && !('dtmf' in window.RTCRtpSender.prototype)) {
    Object.defineProperty(window.RTCRtpSender.prototype, 'dtmf', {
      get: function get() {
        if (this._dtmf === undefined) {
          if (this.track.kind === 'audio') {
            this._dtmf = new window.RTCDtmfSender(this);
          } else if (this.track.kind === 'video') {
            this._dtmf = null;
          }
        }

        return this._dtmf;
      }
    });
  } // Edge currently only implements the RTCDtmfSender, not the
  // RTCDTMFSender alias. See http://draft.ortc.org/#rtcdtmfsender2*


  if (window.RTCDtmfSender && !window.RTCDTMFSender) {
    window.RTCDTMFSender = window.RTCDtmfSender;
  }

  var RTCPeerConnectionShim = (0, _rtcpeerconnectionShim["default"])(window, browserDetails.version);

  window.RTCPeerConnection = function (config) {
    if (config && config.iceServers) {
      config.iceServers = (0, _filtericeservers.filterIceServers)(config.iceServers, browserDetails.version);
      utils.log('ICE servers after filtering:', config.iceServers);
    }

    return new RTCPeerConnectionShim(config);
  };

  window.RTCPeerConnection.prototype = RTCPeerConnectionShim.prototype;
}

function shimReplaceTrack(window) {
  // ORTC has replaceTrack -- https://github.com/w3c/ortc/issues/614
  if (window.RTCRtpSender && !('replaceTrack' in window.RTCRtpSender.prototype)) {
    window.RTCRtpSender.prototype.replaceTrack = window.RTCRtpSender.prototype.setTrack;
  }
}

},{"../utils":29,"./filtericeservers":22,"./getdisplaymedia":23,"./getusermedia":24,"rtcpeerconnection-shim":13}],22:[function(require,module,exports){
/*
 *  Copyright (c) 2018 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */

/* eslint-env node */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterIceServers = filterIceServers;

var utils = _interopRequireWildcard(require("../utils"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

// Edge does not like
// 1) stun: filtered after 14393 unless ?transport=udp is present
// 2) turn: that does not have all of turn:host:port?transport=udp
// 3) turn: with ipv6 addresses
// 4) turn: occurring muliple times
function filterIceServers(iceServers, edgeVersion) {
  var hasTurn = false;
  iceServers = JSON.parse(JSON.stringify(iceServers));
  return iceServers.filter(function (server) {
    if (server && (server.urls || server.url)) {
      var urls = server.urls || server.url;

      if (server.url && !server.urls) {
        utils.deprecated('RTCIceServer.url', 'RTCIceServer.urls');
      }

      var isString = typeof urls === 'string';

      if (isString) {
        urls = [urls];
      }

      urls = urls.filter(function (url) {
        // filter STUN unconditionally.
        if (url.indexOf('stun:') === 0) {
          return false;
        }

        var validTurn = url.startsWith('turn') && !url.startsWith('turn:[') && url.includes('transport=udp');

        if (validTurn && !hasTurn) {
          hasTurn = true;
          return true;
        }

        return validTurn && !hasTurn;
      });
      delete server.url;
      server.urls = isString ? urls[0] : urls;
      return !!urls.length;
    }
  });
}

},{"../utils":29}],23:[function(require,module,exports){
/*
 *  Copyright (c) 2018 The adapter.js project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */

/* eslint-env node */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shimGetDisplayMedia = shimGetDisplayMedia;

function shimGetDisplayMedia(window) {
  if (!('getDisplayMedia' in window.navigator)) {
    return;
  }

  if (!window.navigator.mediaDevices) {
    return;
  }

  if (window.navigator.mediaDevices && 'getDisplayMedia' in window.navigator.mediaDevices) {
    return;
  }

  window.navigator.mediaDevices.getDisplayMedia = window.navigator.getDisplayMedia.bind(window.navigator);
}

},{}],24:[function(require,module,exports){
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */

/* eslint-env node */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shimGetUserMedia = shimGetUserMedia;

function shimGetUserMedia(window) {
  var navigator = window && window.navigator;

  var shimError_ = function shimError_(e) {
    return {
      name: {
        PermissionDeniedError: 'NotAllowedError'
      }[e.name] || e.name,
      message: e.message,
      constraint: e.constraint,
      toString: function toString() {
        return this.name;
      }
    };
  }; // getUserMedia error shim.


  var origGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);

  navigator.mediaDevices.getUserMedia = function (c) {
    return origGetUserMedia(c)["catch"](function (e) {
      return Promise.reject(shimError_(e));
    });
  };
}

},{}],25:[function(require,module,exports){
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */

/* eslint-env node */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shimOnTrack = shimOnTrack;
exports.shimPeerConnection = shimPeerConnection;
exports.shimSenderGetStats = shimSenderGetStats;
exports.shimReceiverGetStats = shimReceiverGetStats;
exports.shimRemoveStream = shimRemoveStream;
exports.shimRTCDataChannel = shimRTCDataChannel;
Object.defineProperty(exports, "shimGetUserMedia", {
  enumerable: true,
  get: function get() {
    return _getusermedia.shimGetUserMedia;
  }
});
Object.defineProperty(exports, "shimGetDisplayMedia", {
  enumerable: true,
  get: function get() {
    return _getdisplaymedia.shimGetDisplayMedia;
  }
});

var utils = _interopRequireWildcard(require("../utils"));

var _getusermedia = require("./getusermedia");

var _getdisplaymedia = require("./getdisplaymedia");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function shimOnTrack(window) {
  if (_typeof(window) === 'object' && window.RTCTrackEvent && 'receiver' in window.RTCTrackEvent.prototype && !('transceiver' in window.RTCTrackEvent.prototype)) {
    Object.defineProperty(window.RTCTrackEvent.prototype, 'transceiver', {
      get: function get() {
        return {
          receiver: this.receiver
        };
      }
    });
  }
}

function shimPeerConnection(window) {
  var browserDetails = utils.detectBrowser(window);

  if (_typeof(window) !== 'object' || !(window.RTCPeerConnection || window.mozRTCPeerConnection)) {
    return; // probably media.peerconnection.enabled=false in about:config
  }

  if (!window.RTCPeerConnection && window.mozRTCPeerConnection) {
    // very basic support for old versions.
    window.RTCPeerConnection = window.mozRTCPeerConnection;
  } // shim away need for obsolete RTCIceCandidate/RTCSessionDescription.


  ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'].forEach(function (method) {
    var nativeMethod = window.RTCPeerConnection.prototype[method];

    window.RTCPeerConnection.prototype[method] = function () {
      arguments[0] = new (method === 'addIceCandidate' ? window.RTCIceCandidate : window.RTCSessionDescription)(arguments[0]);
      return nativeMethod.apply(this, arguments);
    };
  }); // support for addIceCandidate(null or undefined)

  var nativeAddIceCandidate = window.RTCPeerConnection.prototype.addIceCandidate;

  window.RTCPeerConnection.prototype.addIceCandidate = function () {
    if (!arguments[0]) {
      if (arguments[1]) {
        arguments[1].apply(null);
      }

      return Promise.resolve();
    }

    return nativeAddIceCandidate.apply(this, arguments);
  };

  var modernStatsTypes = {
    inboundrtp: 'inbound-rtp',
    outboundrtp: 'outbound-rtp',
    candidatepair: 'candidate-pair',
    localcandidate: 'local-candidate',
    remotecandidate: 'remote-candidate'
  };
  var nativeGetStats = window.RTCPeerConnection.prototype.getStats;

  window.RTCPeerConnection.prototype.getStats = function (selector, onSucc, onErr) {
    return nativeGetStats.apply(this, [selector || null]).then(function (stats) {
      if (browserDetails.version < 53 && !onSucc) {
        // Shim only promise getStats with spec-hyphens in type names
        // Leave callback version alone; misc old uses of forEach before Map
        try {
          stats.forEach(function (stat) {
            stat.type = modernStatsTypes[stat.type] || stat.type;
          });
        } catch (e) {
          if (e.name !== 'TypeError') {
            throw e;
          } // Avoid TypeError: "type" is read-only, in old versions. 34-43ish


          stats.forEach(function (stat, i) {
            stats.set(i, Object.assign({}, stat, {
              type: modernStatsTypes[stat.type] || stat.type
            }));
          });
        }
      }

      return stats;
    }).then(onSucc, onErr);
  };
}

function shimSenderGetStats(window) {
  if (!(_typeof(window) === 'object' && window.RTCPeerConnection && window.RTCRtpSender)) {
    return;
  }

  if (window.RTCRtpSender && 'getStats' in window.RTCRtpSender.prototype) {
    return;
  }

  var origGetSenders = window.RTCPeerConnection.prototype.getSenders;

  if (origGetSenders) {
    window.RTCPeerConnection.prototype.getSenders = function () {
      var _this = this;

      var senders = origGetSenders.apply(this, []);
      senders.forEach(function (sender) {
        return sender._pc = _this;
      });
      return senders;
    };
  }

  var origAddTrack = window.RTCPeerConnection.prototype.addTrack;

  if (origAddTrack) {
    window.RTCPeerConnection.prototype.addTrack = function () {
      var sender = origAddTrack.apply(this, arguments);
      sender._pc = this;
      return sender;
    };
  }

  window.RTCRtpSender.prototype.getStats = function () {
    return this.track ? this._pc.getStats(this.track) : Promise.resolve(new Map());
  };
}

function shimReceiverGetStats(window) {
  if (!(_typeof(window) === 'object' && window.RTCPeerConnection && window.RTCRtpSender)) {
    return;
  }

  if (window.RTCRtpSender && 'getStats' in window.RTCRtpReceiver.prototype) {
    return;
  }

  var origGetReceivers = window.RTCPeerConnection.prototype.getReceivers;

  if (origGetReceivers) {
    window.RTCPeerConnection.prototype.getReceivers = function () {
      var _this2 = this;

      var receivers = origGetReceivers.apply(this, []);
      receivers.forEach(function (receiver) {
        return receiver._pc = _this2;
      });
      return receivers;
    };
  }

  utils.wrapPeerConnectionEvent(window, 'track', function (e) {
    e.receiver._pc = e.srcElement;
    return e;
  });

  window.RTCRtpReceiver.prototype.getStats = function () {
    return this._pc.getStats(this.track);
  };
}

function shimRemoveStream(window) {
  if (!window.RTCPeerConnection || 'removeStream' in window.RTCPeerConnection.prototype) {
    return;
  }

  window.RTCPeerConnection.prototype.removeStream = function (stream) {
    var _this3 = this;

    utils.deprecated('removeStream', 'removeTrack');
    this.getSenders().forEach(function (sender) {
      if (sender.track && stream.getTracks().includes(sender.track)) {
        _this3.removeTrack(sender);
      }
    });
  };
}

function shimRTCDataChannel(window) {
  // rename DataChannel to RTCDataChannel (native fix in FF60):
  // https://bugzilla.mozilla.org/show_bug.cgi?id=1173851
  if (window.DataChannel && !window.RTCDataChannel) {
    window.RTCDataChannel = window.DataChannel;
  }
}

},{"../utils":29,"./getdisplaymedia":26,"./getusermedia":27}],26:[function(require,module,exports){
/*
 *  Copyright (c) 2018 The adapter.js project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */

/* eslint-env node */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shimGetDisplayMedia = shimGetDisplayMedia;

function shimGetDisplayMedia(window, preferredMediaSource) {
  if (window.navigator.mediaDevices && 'getDisplayMedia' in window.navigator.mediaDevices) {
    return;
  }

  if (!window.navigator.mediaDevices) {
    return;
  }

  window.navigator.mediaDevices.getDisplayMedia = function (constraints) {
    if (!(constraints && constraints.video)) {
      var err = new DOMException('getDisplayMedia without video ' + 'constraints is undefined');
      err.name = 'NotFoundError'; // from https://heycam.github.io/webidl/#idl-DOMException-error-names

      err.code = 8;
      return Promise.reject(err);
    }

    if (constraints.video === true) {
      constraints.video = {
        mediaSource: preferredMediaSource
      };
    } else {
      constraints.video.mediaSource = preferredMediaSource;
    }

    return window.navigator.mediaDevices.getUserMedia(constraints);
  };
}

},{}],27:[function(require,module,exports){
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */

/* eslint-env node */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shimGetUserMedia = shimGetUserMedia;

var utils = _interopRequireWildcard(require("../utils"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function shimGetUserMedia(window) {
  var browserDetails = utils.detectBrowser(window);
  var navigator = window && window.navigator;
  var MediaStreamTrack = window && window.MediaStreamTrack;

  navigator.getUserMedia = function (constraints, onSuccess, onError) {
    // Replace Firefox 44+'s deprecation warning with unprefixed version.
    utils.deprecated('navigator.getUserMedia', 'navigator.mediaDevices.getUserMedia');
    navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
  };

  if (!(browserDetails.version > 55 && 'autoGainControl' in navigator.mediaDevices.getSupportedConstraints())) {
    var remap = function remap(obj, a, b) {
      if (a in obj && !(b in obj)) {
        obj[b] = obj[a];
        delete obj[a];
      }
    };

    var nativeGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);

    navigator.mediaDevices.getUserMedia = function (c) {
      if (_typeof(c) === 'object' && _typeof(c.audio) === 'object') {
        c = JSON.parse(JSON.stringify(c));
        remap(c.audio, 'autoGainControl', 'mozAutoGainControl');
        remap(c.audio, 'noiseSuppression', 'mozNoiseSuppression');
      }

      return nativeGetUserMedia(c);
    };

    if (MediaStreamTrack && MediaStreamTrack.prototype.getSettings) {
      var nativeGetSettings = MediaStreamTrack.prototype.getSettings;

      MediaStreamTrack.prototype.getSettings = function () {
        var obj = nativeGetSettings.apply(this, arguments);
        remap(obj, 'mozAutoGainControl', 'autoGainControl');
        remap(obj, 'mozNoiseSuppression', 'noiseSuppression');
        return obj;
      };
    }

    if (MediaStreamTrack && MediaStreamTrack.prototype.applyConstraints) {
      var nativeApplyConstraints = MediaStreamTrack.prototype.applyConstraints;

      MediaStreamTrack.prototype.applyConstraints = function (c) {
        if (this.kind === 'audio' && _typeof(c) === 'object') {
          c = JSON.parse(JSON.stringify(c));
          remap(c, 'autoGainControl', 'mozAutoGainControl');
          remap(c, 'noiseSuppression', 'mozNoiseSuppression');
        }

        return nativeApplyConstraints.apply(this, [c]);
      };
    }
  }
}

},{"../utils":29}],28:[function(require,module,exports){
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shimLocalStreamsAPI = shimLocalStreamsAPI;
exports.shimRemoteStreamsAPI = shimRemoteStreamsAPI;
exports.shimCallbacksAPI = shimCallbacksAPI;
exports.shimGetUserMedia = shimGetUserMedia;
exports.shimConstraints = shimConstraints;
exports.shimRTCIceServerUrls = shimRTCIceServerUrls;
exports.shimTrackEventTransceiver = shimTrackEventTransceiver;
exports.shimCreateOfferLegacy = shimCreateOfferLegacy;

var utils = _interopRequireWildcard(require("../utils"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function shimLocalStreamsAPI(window) {
  if (_typeof(window) !== 'object' || !window.RTCPeerConnection) {
    return;
  }

  if (!('getLocalStreams' in window.RTCPeerConnection.prototype)) {
    window.RTCPeerConnection.prototype.getLocalStreams = function () {
      if (!this._localStreams) {
        this._localStreams = [];
      }

      return this._localStreams;
    };
  }

  if (!('addStream' in window.RTCPeerConnection.prototype)) {
    var _addTrack = window.RTCPeerConnection.prototype.addTrack;

    window.RTCPeerConnection.prototype.addStream = function (stream) {
      var _this = this;

      if (!this._localStreams) {
        this._localStreams = [];
      }

      if (!this._localStreams.includes(stream)) {
        this._localStreams.push(stream);
      }

      stream.getTracks().forEach(function (track) {
        return _addTrack.call(_this, track, stream);
      });
    };

    window.RTCPeerConnection.prototype.addTrack = function (track, stream) {
      if (stream) {
        if (!this._localStreams) {
          this._localStreams = [stream];
        } else if (!this._localStreams.includes(stream)) {
          this._localStreams.push(stream);
        }
      }

      return _addTrack.call(this, track, stream);
    };
  }

  if (!('removeStream' in window.RTCPeerConnection.prototype)) {
    window.RTCPeerConnection.prototype.removeStream = function (stream) {
      var _this2 = this;

      if (!this._localStreams) {
        this._localStreams = [];
      }

      var index = this._localStreams.indexOf(stream);

      if (index === -1) {
        return;
      }

      this._localStreams.splice(index, 1);

      var tracks = stream.getTracks();
      this.getSenders().forEach(function (sender) {
        if (tracks.includes(sender.track)) {
          _this2.removeTrack(sender);
        }
      });
    };
  }
}

function shimRemoteStreamsAPI(window) {
  if (_typeof(window) !== 'object' || !window.RTCPeerConnection) {
    return;
  }

  if (!('getRemoteStreams' in window.RTCPeerConnection.prototype)) {
    window.RTCPeerConnection.prototype.getRemoteStreams = function () {
      return this._remoteStreams ? this._remoteStreams : [];
    };
  }

  if (!('onaddstream' in window.RTCPeerConnection.prototype)) {
    Object.defineProperty(window.RTCPeerConnection.prototype, 'onaddstream', {
      get: function get() {
        return this._onaddstream;
      },
      set: function set(f) {
        var _this3 = this;

        if (this._onaddstream) {
          this.removeEventListener('addstream', this._onaddstream);
          this.removeEventListener('track', this._onaddstreampoly);
        }

        this.addEventListener('addstream', this._onaddstream = f);
        this.addEventListener('track', this._onaddstreampoly = function (e) {
          e.streams.forEach(function (stream) {
            if (!_this3._remoteStreams) {
              _this3._remoteStreams = [];
            }

            if (_this3._remoteStreams.includes(stream)) {
              return;
            }

            _this3._remoteStreams.push(stream);

            var event = new Event('addstream');
            event.stream = stream;

            _this3.dispatchEvent(event);
          });
        });
      }
    });
    var origSetRemoteDescription = window.RTCPeerConnection.prototype.setRemoteDescription;

    window.RTCPeerConnection.prototype.setRemoteDescription = function () {
      var pc = this;

      if (!this._onaddstreampoly) {
        this.addEventListener('track', this._onaddstreampoly = function (e) {
          e.streams.forEach(function (stream) {
            if (!pc._remoteStreams) {
              pc._remoteStreams = [];
            }

            if (pc._remoteStreams.indexOf(stream) >= 0) {
              return;
            }

            pc._remoteStreams.push(stream);

            var event = new Event('addstream');
            event.stream = stream;
            pc.dispatchEvent(event);
          });
        });
      }

      return origSetRemoteDescription.apply(pc, arguments);
    };
  }
}

function shimCallbacksAPI(window) {
  if (_typeof(window) !== 'object' || !window.RTCPeerConnection) {
    return;
  }

  var prototype = window.RTCPeerConnection.prototype;
  var createOffer = prototype.createOffer;
  var createAnswer = prototype.createAnswer;
  var setLocalDescription = prototype.setLocalDescription;
  var setRemoteDescription = prototype.setRemoteDescription;
  var addIceCandidate = prototype.addIceCandidate;

  prototype.createOffer = function (successCallback, failureCallback) {
    var options = arguments.length >= 2 ? arguments[2] : arguments[0];
    var promise = createOffer.apply(this, [options]);

    if (!failureCallback) {
      return promise;
    }

    promise.then(successCallback, failureCallback);
    return Promise.resolve();
  };

  prototype.createAnswer = function (successCallback, failureCallback) {
    var options = arguments.length >= 2 ? arguments[2] : arguments[0];
    var promise = createAnswer.apply(this, [options]);

    if (!failureCallback) {
      return promise;
    }

    promise.then(successCallback, failureCallback);
    return Promise.resolve();
  };

  var withCallback = function withCallback(description, successCallback, failureCallback) {
    var promise = setLocalDescription.apply(this, [description]);

    if (!failureCallback) {
      return promise;
    }

    promise.then(successCallback, failureCallback);
    return Promise.resolve();
  };

  prototype.setLocalDescription = withCallback;

  withCallback = function withCallback(description, successCallback, failureCallback) {
    var promise = setRemoteDescription.apply(this, [description]);

    if (!failureCallback) {
      return promise;
    }

    promise.then(successCallback, failureCallback);
    return Promise.resolve();
  };

  prototype.setRemoteDescription = withCallback;

  withCallback = function withCallback(candidate, successCallback, failureCallback) {
    var promise = addIceCandidate.apply(this, [candidate]);

    if (!failureCallback) {
      return promise;
    }

    promise.then(successCallback, failureCallback);
    return Promise.resolve();
  };

  prototype.addIceCandidate = withCallback;
}

function shimGetUserMedia(window) {
  var navigator = window && window.navigator;

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // shim not needed in Safari 12.1
    var mediaDevices = navigator.mediaDevices;

    var _getUserMedia = mediaDevices.getUserMedia.bind(mediaDevices);

    navigator.mediaDevices.getUserMedia = function (constraints) {
      return _getUserMedia(shimConstraints(constraints));
    };
  }

  if (!navigator.getUserMedia && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.getUserMedia = function (constraints, cb, errcb) {
      navigator.mediaDevices.getUserMedia(constraints).then(cb, errcb);
    }.bind(navigator);
  }
}

function shimConstraints(constraints) {
  if (constraints && constraints.video !== undefined) {
    return Object.assign({}, constraints, {
      video: utils.compactObject(constraints.video)
    });
  }

  return constraints;
}

function shimRTCIceServerUrls(window) {
  // migrate from non-spec RTCIceServer.url to RTCIceServer.urls
  var OrigPeerConnection = window.RTCPeerConnection;

  window.RTCPeerConnection = function (pcConfig, pcConstraints) {
    if (pcConfig && pcConfig.iceServers) {
      var newIceServers = [];

      for (var i = 0; i < pcConfig.iceServers.length; i++) {
        var server = pcConfig.iceServers[i];

        if (!server.hasOwnProperty('urls') && server.hasOwnProperty('url')) {
          utils.deprecated('RTCIceServer.url', 'RTCIceServer.urls');
          server = JSON.parse(JSON.stringify(server));
          server.urls = server.url;
          delete server.url;
          newIceServers.push(server);
        } else {
          newIceServers.push(pcConfig.iceServers[i]);
        }
      }

      pcConfig.iceServers = newIceServers;
    }

    return new OrigPeerConnection(pcConfig, pcConstraints);
  };

  window.RTCPeerConnection.prototype = OrigPeerConnection.prototype; // wrap static methods. Currently just generateCertificate.

  if ('generateCertificate' in window.RTCPeerConnection) {
    Object.defineProperty(window.RTCPeerConnection, 'generateCertificate', {
      get: function get() {
        return OrigPeerConnection.generateCertificate;
      }
    });
  }
}

function shimTrackEventTransceiver(window) {
  // Add event.transceiver member over deprecated event.receiver
  if (_typeof(window) === 'object' && window.RTCPeerConnection && 'receiver' in window.RTCTrackEvent.prototype && // can't check 'transceiver' in window.RTCTrackEvent.prototype, as it is
  // defined for some reason even when window.RTCTransceiver is not.
  !window.RTCTransceiver) {
    Object.defineProperty(window.RTCTrackEvent.prototype, 'transceiver', {
      get: function get() {
        return {
          receiver: this.receiver
        };
      }
    });
  }
}

function shimCreateOfferLegacy(window) {
  var origCreateOffer = window.RTCPeerConnection.prototype.createOffer;

  window.RTCPeerConnection.prototype.createOffer = function (offerOptions) {
    if (offerOptions) {
      if (typeof offerOptions.offerToReceiveAudio !== 'undefined') {
        // support bit values
        offerOptions.offerToReceiveAudio = !!offerOptions.offerToReceiveAudio;
      }

      var audioTransceiver = this.getTransceivers().find(function (transceiver) {
        return transceiver.receiver.track.kind === 'audio';
      });

      if (offerOptions.offerToReceiveAudio === false && audioTransceiver) {
        if (audioTransceiver.direction === 'sendrecv') {
          if (audioTransceiver.setDirection) {
            audioTransceiver.setDirection('sendonly');
          } else {
            audioTransceiver.direction = 'sendonly';
          }
        } else if (audioTransceiver.direction === 'recvonly') {
          if (audioTransceiver.setDirection) {
            audioTransceiver.setDirection('inactive');
          } else {
            audioTransceiver.direction = 'inactive';
          }
        }
      } else if (offerOptions.offerToReceiveAudio === true && !audioTransceiver) {
        this.addTransceiver('audio');
      }

      if (typeof offerOptions.offerToReceiveVideo !== 'undefined') {
        // support bit values
        offerOptions.offerToReceiveVideo = !!offerOptions.offerToReceiveVideo;
      }

      var videoTransceiver = this.getTransceivers().find(function (transceiver) {
        return transceiver.receiver.track.kind === 'video';
      });

      if (offerOptions.offerToReceiveVideo === false && videoTransceiver) {
        if (videoTransceiver.direction === 'sendrecv') {
          if (videoTransceiver.setDirection) {
            videoTransceiver.setDirection('sendonly');
          } else {
            videoTransceiver.direction = 'sendonly';
          }
        } else if (videoTransceiver.direction === 'recvonly') {
          if (videoTransceiver.setDirection) {
            videoTransceiver.setDirection('inactive');
          } else {
            videoTransceiver.direction = 'inactive';
          }
        }
      } else if (offerOptions.offerToReceiveVideo === true && !videoTransceiver) {
        this.addTransceiver('video');
      }
    }

    return origCreateOffer.apply(this, arguments);
  };
}

},{"../utils":29}],29:[function(require,module,exports){
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */

/* eslint-env node */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractVersion = extractVersion;
exports.wrapPeerConnectionEvent = wrapPeerConnectionEvent;
exports.disableLog = disableLog;
exports.disableWarnings = disableWarnings;
exports.log = log;
exports.deprecated = deprecated;
exports.detectBrowser = detectBrowser;
exports.compactObject = compactObject;
exports.walkStats = walkStats;
exports.filterStats = filterStats;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var logDisabled_ = true;
var deprecationWarnings_ = true;
/**
 * Extract browser version out of the provided user agent string.
 *
 * @param {!string} uastring userAgent string.
 * @param {!string} expr Regular expression used as match criteria.
 * @param {!number} pos position in the version string to be returned.
 * @return {!number} browser version.
 */

function extractVersion(uastring, expr, pos) {
  var match = uastring.match(expr);
  return match && match.length >= pos && parseInt(match[pos], 10);
} // Wraps the peerconnection event eventNameToWrap in a function
// which returns the modified event object (or false to prevent
// the event).


function wrapPeerConnectionEvent(window, eventNameToWrap, wrapper) {
  if (!window.RTCPeerConnection) {
    return;
  }

  var proto = window.RTCPeerConnection.prototype;
  var nativeAddEventListener = proto.addEventListener;

  proto.addEventListener = function (nativeEventName, cb) {
    if (nativeEventName !== eventNameToWrap) {
      return nativeAddEventListener.apply(this, arguments);
    }

    var wrappedCallback = function wrappedCallback(e) {
      var modifiedEvent = wrapper(e);

      if (modifiedEvent) {
        cb(modifiedEvent);
      }
    };

    this._eventMap = this._eventMap || {};
    this._eventMap[cb] = wrappedCallback;
    return nativeAddEventListener.apply(this, [nativeEventName, wrappedCallback]);
  };

  var nativeRemoveEventListener = proto.removeEventListener;

  proto.removeEventListener = function (nativeEventName, cb) {
    if (nativeEventName !== eventNameToWrap || !this._eventMap || !this._eventMap[cb]) {
      return nativeRemoveEventListener.apply(this, arguments);
    }

    var unwrappedCb = this._eventMap[cb];
    delete this._eventMap[cb];
    return nativeRemoveEventListener.apply(this, [nativeEventName, unwrappedCb]);
  };

  Object.defineProperty(proto, 'on' + eventNameToWrap, {
    get: function get() {
      return this['_on' + eventNameToWrap];
    },
    set: function set(cb) {
      if (this['_on' + eventNameToWrap]) {
        this.removeEventListener(eventNameToWrap, this['_on' + eventNameToWrap]);
        delete this['_on' + eventNameToWrap];
      }

      if (cb) {
        this.addEventListener(eventNameToWrap, this['_on' + eventNameToWrap] = cb);
      }
    },
    enumerable: true,
    configurable: true
  });
}

function disableLog(bool) {
  if (typeof bool !== 'boolean') {
    return new Error('Argument type: ' + _typeof(bool) + '. Please use a boolean.');
  }

  logDisabled_ = bool;
  return bool ? 'adapter.js logging disabled' : 'adapter.js logging enabled';
}
/**
 * Disable or enable deprecation warnings
 * @param {!boolean} bool set to true to disable warnings.
 */


function disableWarnings(bool) {
  if (typeof bool !== 'boolean') {
    return new Error('Argument type: ' + _typeof(bool) + '. Please use a boolean.');
  }

  deprecationWarnings_ = !bool;
  return 'adapter.js deprecation warnings ' + (bool ? 'disabled' : 'enabled');
}

function log() {
  if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object') {
    if (logDisabled_) {
      return;
    }

    if (typeof console !== 'undefined' && typeof console.log === 'function') {
      console.log.apply(console, arguments);
    }
  }
}
/**
 * Shows a deprecation warning suggesting the modern and spec-compatible API.
 */


function deprecated(oldMethod, newMethod) {
  if (!deprecationWarnings_) {
    return;
  }

  console.warn(oldMethod + ' is deprecated, please use ' + newMethod + ' instead.');
}
/**
 * Browser detector.
 *
 * @return {object} result containing browser and version
 *     properties.
 */


function detectBrowser(window) {
  var navigator = window.navigator; // Returned result object.

  var result = {
    browser: null,
    version: null
  }; // Fail early if it's not a browser

  if (typeof window === 'undefined' || !window.navigator) {
    result.browser = 'Not a browser.';
    return result;
  }

  if (navigator.mozGetUserMedia) {
    // Firefox.
    result.browser = 'firefox';
    result.version = extractVersion(navigator.userAgent, /Firefox\/(\d+)\./, 1);
  } else if (navigator.webkitGetUserMedia || window.isSecureContext === false && window.webkitRTCPeerConnection && !window.RTCIceGatherer) {
    // Chrome, Chromium, Webview, Opera.
    // Version matches Chrome/WebRTC version.
    // Chrome 74 removed webkitGetUserMedia on http as well so we need the
    // more complicated fallback to webkitRTCPeerConnection.
    result.browser = 'chrome';
    result.version = extractVersion(navigator.userAgent, /Chrom(e|ium)\/(\d+)\./, 2);
  } else if (navigator.mediaDevices && navigator.userAgent.match(/Edge\/(\d+).(\d+)$/)) {
    // Edge.
    result.browser = 'edge';
    result.version = extractVersion(navigator.userAgent, /Edge\/(\d+).(\d+)$/, 2);
  } else if (window.RTCPeerConnection && navigator.userAgent.match(/AppleWebKit\/(\d+)\./)) {
    // Safari.
    result.browser = 'safari';
    result.version = extractVersion(navigator.userAgent, /AppleWebKit\/(\d+)\./, 1);
  } else {
    // Default fallthrough: not supported.
    result.browser = 'Not a supported browser.';
    return result;
  }

  return result;
}
/**
 * Remove all empty objects and undefined values
 * from a nested object -- an enhanced and vanilla version
 * of Lodash's `compact`.
 */


function compactObject(data) {
  if (_typeof(data) !== 'object') {
    return data;
  }

  return Object.keys(data).reduce(function (accumulator, key) {
    var isObject = _typeof(data[key]) === 'object';
    var value = isObject ? compactObject(data[key]) : data[key];
    var isEmptyObject = isObject && !Object.keys(value).length;

    if (value === undefined || isEmptyObject) {
      return accumulator;
    }

    return Object.assign(accumulator, _defineProperty({}, key, value));
  }, {});
}
/* iterates the stats graph recursively. */


function walkStats(stats, base, resultSet) {
  if (!base || resultSet.has(base.id)) {
    return;
  }

  resultSet.set(base.id, base);
  Object.keys(base).forEach(function (name) {
    if (name.endsWith('Id')) {
      walkStats(stats, stats.get(base[name]), resultSet);
    } else if (name.endsWith('Ids')) {
      base[name].forEach(function (id) {
        walkStats(stats, stats.get(id), resultSet);
      });
    }
  });
}
/* filter getStats for a sender/receiver track. */


function filterStats(result, track, outbound) {
  var streamStatsType = outbound ? 'outbound-rtp' : 'inbound-rtp';
  var filteredResult = new Map();

  if (track === null) {
    return filteredResult;
  }

  var trackStats = [];
  result.forEach(function (value) {
    if (value.type === 'track' && value.trackIdentifier === track.id) {
      trackStats.push(value);
    }
  });
  trackStats.forEach(function (trackStat) {
    result.forEach(function (stats) {
      if (stats.type === streamStatsType && stats.trackId === trackStat.id) {
        walkStats(result, stats, filteredResult);
      }
    });
  });
  return filteredResult;
}

},{}],30:[function(require,module,exports){
"use strict";

// created by @HenrikJoreteg
var prefix;
var version;

if (window.mozRTCPeerConnection || navigator.mozGetUserMedia) {
  prefix = 'moz';
  version = parseInt(navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1], 10);
} else if (window.webkitRTCPeerConnection || navigator.webkitGetUserMedia) {
  prefix = 'webkit';
  version = navigator.userAgent.match(/Chrom(e|ium)/) && parseInt(navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)[2], 10);
}

var PC = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
var IceCandidate = window.mozRTCIceCandidate || window.RTCIceCandidate;
var SessionDescription = window.mozRTCSessionDescription || window.RTCSessionDescription;
var MediaStream = window.webkitMediaStream || window.MediaStream;
var screenSharing = window.location.protocol === 'https:' && (prefix === 'webkit' && version >= 26 || prefix === 'moz' && version >= 33);
var AudioContext = window.AudioContext || window.webkitAudioContext;
var videoEl = document.createElement('video');
var supportVp8 = videoEl && videoEl.canPlayType && videoEl.canPlayType('video/webm; codecs="vp8", vorbis') === "probably";
var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia || navigator.mozGetUserMedia; // export support flags and constructors.prototype && PC

module.exports = {
  prefix: prefix,
  browserVersion: version,
  support: !!PC && !!getUserMedia,
  // new support style
  supportRTCPeerConnection: !!PC,
  supportVp8: supportVp8,
  supportGetUserMedia: !!getUserMedia,
  supportDataChannel: !!(PC && PC.prototype && PC.prototype.createDataChannel),
  supportWebAudio: !!(AudioContext && AudioContext.prototype.createMediaStreamSource),
  supportMediaStream: !!(MediaStream && MediaStream.prototype.removeTrack),
  supportScreenSharing: !!screenSharing,
  // constructors
  AudioContext: AudioContext,
  PeerConnection: PC,
  SessionDescription: SessionDescription,
  IceCandidate: IceCandidate,
  MediaStream: MediaStream,
  getUserMedia: getUserMedia
};

},{}],31:[function(require,module,exports){
"use strict";

/*
WildEmitter.js is a slim little event emitter by @henrikjoreteg largely based
on @visionmedia's Emitter from UI Kit.

Why? I wanted it standalone.

I also wanted support for wildcard emitters like this:

emitter.on('*', function (eventName, other, event, payloads) {

});

emitter.on('somenamespace*', function (eventName, payloads) {

});

Please note that callbacks triggered by wildcard registered events also get
the event name as the first argument.
*/
module.exports = WildEmitter;

function WildEmitter() {}

WildEmitter.mixin = function (constructor) {
  var prototype = constructor.prototype || constructor;
  prototype.isWildEmitter = true; // Listen on the given `event` with `fn`. Store a group name if present.

  prototype.on = function (event, groupName, fn) {
    this.callbacks = this.callbacks || {};
    var hasGroup = arguments.length === 3,
        group = hasGroup ? arguments[1] : undefined,
        func = hasGroup ? arguments[2] : arguments[1];
    func._groupName = group;
    (this.callbacks[event] = this.callbacks[event] || []).push(func);
    return this;
  }; // Adds an `event` listener that will be invoked a single
  // time then automatically removed.


  prototype.once = function (event, groupName, fn) {
    var self = this,
        hasGroup = arguments.length === 3,
        group = hasGroup ? arguments[1] : undefined,
        func = hasGroup ? arguments[2] : arguments[1];

    function on() {
      self.off(event, on);
      func.apply(this, arguments);
    }

    this.on(event, group, on);
    return this;
  }; // Unbinds an entire group


  prototype.releaseGroup = function (groupName) {
    this.callbacks = this.callbacks || {};
    var item, i, len, handlers;

    for (item in this.callbacks) {
      handlers = this.callbacks[item];

      for (i = 0, len = handlers.length; i < len; i++) {
        if (handlers[i]._groupName === groupName) {
          //console.log('removing');
          // remove it and shorten the array we're looping through
          handlers.splice(i, 1);
          i--;
          len--;
        }
      }
    }

    return this;
  }; // Remove the given callback for `event` or all
  // registered callbacks.


  prototype.off = function (event, fn) {
    this.callbacks = this.callbacks || {};
    var callbacks = this.callbacks[event],
        i;
    if (!callbacks) return this; // remove all handlers

    if (arguments.length === 1) {
      delete this.callbacks[event];
      return this;
    } // remove specific handler


    i = callbacks.indexOf(fn);
    callbacks.splice(i, 1);

    if (callbacks.length === 0) {
      delete this.callbacks[event];
    }

    return this;
  }; /// Emit `event` with the given args.
  // also calls any `*` handlers


  prototype.emit = function (event) {
    this.callbacks = this.callbacks || {};
    var args = [].slice.call(arguments, 1),
        callbacks = this.callbacks[event],
        specialCallbacks = this.getWildcardCallbacks(event),
        i,
        len,
        item,
        listeners;

    if (callbacks) {
      listeners = callbacks.slice();

      for (i = 0, len = listeners.length; i < len; ++i) {
        if (!listeners[i]) {
          break;
        }

        listeners[i].apply(this, args);
      }
    }

    if (specialCallbacks) {
      len = specialCallbacks.length;
      listeners = specialCallbacks.slice();

      for (i = 0, len = listeners.length; i < len; ++i) {
        if (!listeners[i]) {
          break;
        }

        listeners[i].apply(this, [event].concat(args));
      }
    }

    return this;
  }; // Helper for for finding special wildcard event handlers that match the event


  prototype.getWildcardCallbacks = function (eventName) {
    this.callbacks = this.callbacks || {};
    var item,
        split,
        result = [];

    for (item in this.callbacks) {
      split = item.split('*');

      if (item === '*' || split.length === 2 && eventName.slice(0, split[0].length) === split[0]) {
        result = result.concat(this.callbacks[item]);
      }
    }

    return result;
  };
};

WildEmitter.mixin(WildEmitter);

},{}]},{},[4])(4)
});


/* global Backbone, OC, OCA */

/**
 *
 * @copyright Copyright (c) 2017, Daniel Calviño Sánchez (danxuliu@gmail.com)
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
 *
 */

(function(OCA, OC, Backbone) {
	'use strict';

	OCA.SpreedMe = OCA.SpreedMe || {};
	OCA.SpreedMe.Models = OCA.SpreedMe.Models || {};

	/**
	 * Model for chat messages.
	 *
	 * ChatMessage can be used as the model of a ChatMessageCollection or as a
	 * standalone model. When used as a standalone model the room token must be
	 * provided in the constructor options (as "token").
	 *
	 * In any case, "create" is the only synchronization method allowed; chat
	 * messages can not be edited nor deleted, and they can not be got
	 * individually either, but as a list through ChatMessageCollection.
	 *
	 * To send a new message create a standalone ChatMessage object and call
	 * "save".
	 */
	var ChatMessage = Backbone.Model.extend({

		defaults: {
			actorType: '',
			actorId: '',
			actorDisplayName: '',
			timestamp: 0,
			message: '',
			messageParameters: []
		},

		url: function() {
			if (this.token === undefined) {
				throw 'Missing parameter token';
			}

			return OC.linkToOCS('apps/spreed/api/v1/chat', 2) + this.token;
		},

		initialize: function(options) {
			// Only needed in standalone mode; when used as the model of a
			// ChatMessageCollection the synchronization is performed by the
			// collection instead.
			this.token = options.token;
		},

		sync: function(method, model, options) {
			if (method !== 'create') {
				throw 'Synchronization method not supported by ChatMessage: ' + method;
			}

			return Backbone.Model.prototype.sync.call(this, method, model, options);
		},

		updateGuestName: function(data) {
			if (this.get('actorType') === 'guests' && this.get('actorId') === data.sessionId && this.get('actorDisplayName') !== data.displayName) {
				this.set('actorDisplayName', data.displayName);
			}
		}

	});

	OCA.SpreedMe.Models.ChatMessage = ChatMessage;

})(OCA, OC, Backbone);


/* global Backbone, OC, OCA */

/**
 *
 * @copyright Copyright (c) 2017, Daniel Calviño Sánchez (danxuliu@gmail.com)
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
 *
 */

(function(OCA, OC, Backbone) {
	'use strict';

	OCA.SpreedMe = OCA.SpreedMe || {};
	OCA.SpreedMe.Models = OCA.SpreedMe.Models || {};

	/**
	 * Collection for chat messages.
	 *
	 * The ChatMessageCollection gives read access to all the chat messages from
	 * a specific chat room. The room token must be provided in the constructor
	 * options (as "token"), either as an actual room token or as null. It is
	 * possible to change the room of a ChatMessageCollection at any time by
	 * calling "setRoomToken". In any case, although null is supported as a
	 * temporal or reset value, note that an actual room token must be set
	 * before synchronizing the collection.
	 *
	 * "read" is the only synchronization method allowed; chat messages can not
	 * be edited nor deleted, and to send a new message a standalone ChatMessage
	 * should be used instead.
	 *
	 * To get the messages from the server "receiveMessages" should be used. It
	 * will enable polling to the server and automatically update the collection
	 * when new messages are received. Once enabled, the polling will go on
	 * indefinitely. Due to this "stopReceivingMessages" must be called once
	 * the ChatMessageCollection is no longer needed.
	 */
	var ChatMessageCollection = Backbone.Collection.extend({

		model: OCA.SpreedMe.Models.ChatMessage,

		initialize: function(models, options) {
			if (options.token === undefined) {
				throw 'Missing parameter token';
			}

			this._handler = this._messagesReceived.bind(this);
			this.setRoomToken(options.token);
		},

		parse: function(result) {
			return result.ocs.data;
		},

		/**
		 * Changes the room that this ChatMessageCollection gets its messages
		 * from.
		 *
		 * When a token is set this collection is reset, so the messages from
		 * the previous room are removed.
		 *
		 * If polling was currently being done to the previous room it will be
		 * automatically stopped. Note, however, that "receiveMessages" must be
		 * explicitly called if needed.
		 *
		 * @param {?string} token the token of the room.
		 */
		setRoomToken: function(token) {
			this.stopReceivingMessages();

			this.token = token;

			if (token !== null) {
				this.signaling = OCA.SpreedMe.app.signaling;
			} else {
				this.signaling = null;
			}

			this.reset();
		},

		updateGuestName: function(sessionId, newDisplayName) {
			this.invoke('updateGuestName', {sessionId: sessionId, displayName: newDisplayName});
		},

		_messagesReceived: function(messages) {
			this.trigger('add:start');
			this.set(messages);
			this.trigger('add:end');
		},

		receiveMessages: function() {
			if (this.signaling) {
				this.signaling.on("chatMessagesReceived", this._handler);
				this.signaling.startReceiveMessages();
			}
		},

		stopReceivingMessages: function() {
			if (this.signaling) {
				this.signaling.off("chatMessagesReceived", this._handler);
				this.signaling.stopReceiveMessages();
			}
		}

	});

	OCA.SpreedMe.Models.ChatMessageCollection = ChatMessageCollection;

})(OCA, OC, Backbone);


/* global Backbone, OCA */

/**
 * @author Christoph Wurst <christoph@winzerhof-wurst.at>
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
 *
 */

(function(OCA, Backbone) {
	'use strict';

	OCA.SpreedMe = OCA.SpreedMe || {};
	OCA.SpreedMe.Models = OCA.SpreedMe.Models || {};

	/**
	 * Model for rooms.
	 *
	 * Room can be used as the model of a RoomCollection or as a standalone
	 * model. When used as a standalone model the token must be provided in the
	 * constructor options.
	 *
	 * Besides fetching the data from the server it supports renaming the room
	 * by calling "save('displayName', nameToSet, options)"; in this case the
	 * options must contain, at least, "patch: true" (it may contain other
	 * options like a success callback too if needed).
	 */
	var Room = Backbone.Model.extend({
		defaults: {
			id: '',
			token: '',
			name: '',
			type: 0,
			displayName: '',
			objectType: '',
			objectId: '',
			participantType: 0,
			participantFlags: 0,
			count: 0,
			hasPassword: false,
			hasCall: false,
			lastActivity: 0,
			unreadMessages: 0,
			unreadMention: false,
			isFavorite: false,
			notificationLevel: 0,
			lastPing: 0,
			sessionId: '0',
			participants: [],
			numGuests: 0,
			guestList: '',
			lastMessage: [],
			active: false
		},
		url: function() {
			return OC.linkToOCS('apps/spreed/api/v1/room', 2) + this.get('token');
		},
		parse: function(result) {
			// When the model is created by a RoomCollection "Room.parse" will
			// be called with the result already parsed by
			// "RoomCollection.parse", so the given result is already the
			// attributes hash to be set on the model.
			return (result.ocs === undefined)? result : result.ocs.data;
		},
		validate: function(attributes) {
			if (!attributes.name) {
				return t('spreed', 'Room name can not be empty');
			}
		},
		sync: function(method, model, options) {
			// When saving a model "Backbone.Model.save" calls "sync" with an
			// "update" method, which by default sends a "PUT" request that
			// contains all the attributes of the model. In order to send only
			// the attributes to be saved "patch: true" must be set in the
			// options. However, this causes a "PATCH" request instead of a
			// "PUT" request to be sent, so the "method" must be changed from
			// "patch" to "update", as the backend expects a "PUT" request.
			// Moreover, the endpoint to rename a room expects the name to be
			// provided in a "roomName" attribute instead of a "name"
			// attribute, so that has to be changed too.
			if (method === 'patch' && options.attrs.name !== undefined) {
				method = 'update';

				options.attrs.roomName = options.attrs.name;
				delete options.attrs.name;
			}

			return Backbone.Model.prototype.sync.call(this, method, model, options);
		},
		join: function() {
			OCA.SpreedMe.app.connection.joinRoom(this.get('token'));
		},
		leave: function() {
			if (!this.get('active')) {
				return;
			}

			OCA.SpreedMe.app.connection.leaveCurrentRoom();
		},
		removeSelf: function(options) {
			var self = this;

			// Removing self can fail, so wait for the server response to remove
			// the model from its collection and to leave the room.
			var success = options? options.success: undefined;
			options = _.extend({}, options, {
				url: this.url() + '/participants/self',
				wait: true,
				success: function() {
					self.leave();

					if (success) {
						success.apply(this, arguments);
					}
				}
			});

			return Backbone.Model.prototype.destroy.call(this, options);
		},
		destroy: function(options) {
			// Destroying a room is not expected to fail, so leave the room
			// without waiting for the server response for a snappier UI.
			this.leave();

			return Backbone.Model.prototype.destroy.call(this, options);
		},
	});

	OCA.SpreedMe.Models.Room = Room;

})(OCA, Backbone);


/* global Backbone, OC, OCA */

/**
 * @author Christoph Wurst <christoph@winzerhof-wurst.at>
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
 *
 */

(function(OCA, OC, Backbone) {
	'use strict';

	OCA.SpreedMe = OCA.SpreedMe || {};
	OCA.SpreedMe.Models = OCA.SpreedMe.Models || {};

	var RoomCollection = Backbone.Collection.extend({
		model: OCA.SpreedMe.Models.Room,
		comparator: function(modelA, modelB) {
			var	favoriteA = modelA.get('isFavorite'),
				favoriteB = modelB.get('isFavorite');

			if (favoriteA !== favoriteB) {
				return favoriteB - favoriteA;
			}

			return modelB.get('lastActivity') - modelA.get('lastActivity');
		},
		url: OC.linkToOCS('apps/spreed/api/v1', 2) + 'room',
		/**
		 * @param {Array} result
		 * @returns {Array}
		 */
		parse: function(result) {
			return result.ocs.data;
		}
	});

	OCA.SpreedMe.Models.RoomCollection = RoomCollection;

})(OCA, OC, Backbone);


/* global Marionette */

/**
 *
 * @copyright Copyright (c) 2018, Daniel Calviño Sánchez (danxuliu@gmail.com)
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
 *
 */

(function(OCA, Marionette) {

	'use strict';

	OCA.SpreedMe = OCA.SpreedMe || {};
	OCA.Talk = OCA.Talk || {};
	OCA.SpreedMe.Views = OCA.SpreedMe.Views || {};
	OCA.Talk.Views = OCA.Talk.Views || {};

	var roomsChannel = Backbone.Radio.channel('rooms');

	var CallButton  = Marionette.View.extend({

		className: 'call-button',

		template: function(context) {
			// OCA.Talk.Views.Templates may not have been initialized when this
			// view is initialized, so the template can not be directly
			// assigned.
			return OCA.Talk.Views.Templates['callbutton'](context);
		},

		templateContext: function() {
			return {
				isReadOnly: this.model.get('readOnly') === 1,
				isInCall: (this.model.get('participantFlags') & OCA.SpreedMe.app.FLAG_IN_CALL) !== 0,
				hasCall: this.model.get('hasCall'),
				leaveCallText: t('spreed', 'Leave call'),
				joinCallText: t('spreed', 'Join call'),
				startCallText: t('spreed', 'Start call'),
				readOnlyText: t('spreed', 'Calls are disabled in this conversation.'),
			};
		},

		ui: {
			'joinCallButton': 'button.join-call',
			'leaveCallButton': 'button.leave-call',
			'workingIcon': '.icon-loading-small',
		},

		events: {
			'click @ui.joinCallButton': 'joinCall',
			'click @ui.leaveCallButton': 'leaveCall',
		},

		modelEvents: {
			'change:hasCall': function() {
				this.render();
			},
			'change:participantFlags': function() {
				this.render();
			},
			'change:readOnly': function() {
				this.render();
			},
		},

		/**
		 * @param {OCA.SpreedMe.Models.Room} options.model
		 * @param {OCA.Talk.Connection} options.connection
		 */
		initialize: function(options) {
			this._connection = options.connection;

			// While joining or leaving a call the button is disabled; it will
			// be rendered again and thus enabled once the operation finishes
			// and the model changes.
			this.listenTo(roomsChannel, 'joinCall', this._waitForCallToBeJoined);
			this.listenTo(roomsChannel, 'leaveCurrentCall', this._waitForCallToBeLeft);
		},

		joinCall: function() {
			this._connection.joinCall(this.model.get('token'));
		},

		leaveCall: function() {
			this._connection.leaveCurrentCall();
		},

		_waitForCallToBeJoined: function() {
			this.getUI('joinCallButton').prop('disabled', true);
			this.getUI('workingIcon').removeClass('hidden');
		},

		_waitForCallToBeLeft: function() {
			this.getUI('leaveCallButton').prop('disabled', true);
			this.getUI('workingIcon').removeClass('hidden');
		},

	});

	OCA.SpreedMe.Views.CallButton = CallButton;

})(OCA, Marionette);


/* global autosize, Marionette, moment, OC, OCA, OCP */

/**
 *
 * @copyright Copyright (c) 2017, Daniel Calviño Sánchez (danxuliu@gmail.com)
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
 *
 */

(function(OCA, OC, OCP, Marionette, autosize, moment) {
	'use strict';

	OCA.SpreedMe = OCA.SpreedMe || {};
	OCA.Talk = OCA.Talk || {};
	OCA.SpreedMe.Views = OCA.SpreedMe.Views || {};
	OCA.Talk.Views = OCA.Talk.Views || {};

	var ChatView = Marionette.View.extend({

		temporaryNearMessages: 0,
		sameAuthorMessages: 0,

		className: 'chat',

		lastComments: [],
		currentLastComment: -1,

		ui: {
			'guestName': 'div.guest-name'
		},

		regions: {
			'guestName': '@ui.guestName'
		},

		events: {
			'click .newCommentForm .share': '_onAddShare',
			'submit .newCommentForm': '_onSubmitComment',
			'paste div.message': '_onPaste'
		},

		modelEvents: {
			'change:readOnly': function() {
				this.render();
			}
		},

		initialize: function() {
			this.listenTo(this.collection, 'reset', this.render);
			this.listenTo(this.collection, 'add:start', this._onAddModelStart);
			this.listenTo(this.collection, 'add', this._onAddModel);
			this.listenTo(this.collection, 'add:end', this._onAddModelEnd);

			this._guestNameEditableTextLabel = new OCA.SpreedMe.Views.EditableTextLabel({
				model: this.getOption('guestNameModel'),
				modelAttribute: 'nick',

				extraClassNames: 'guest-name',
				labelTagName: 'p',
				labelPlaceholder: t('spreed', 'You'),
				inputMaxLength: '20',
				inputPlaceholder: t('spreed', 'Name'),
				buttonTitle: t('spreed', 'Rename')
			});

			_.bindAll(this, '_onAutoComplete');
		},

		setRoom: function(model) {
			this.model = model;
		},

		_initAutoComplete: function($target) {
			var s = this;
			var limit = 20;
			$target.atwho({
				at: '@',
				limit: limit,
				callbacks: {
					remoteFilter: s._onAutoComplete,
					highlighter: function (li) {
						// misuse the highlighter callback to instead of
						// highlighting loads the avatars.
						var $li = $(li);
						var $avatar = $li.find('.avatar');
						if ($avatar.data('user-id') === 'all') {
							$avatar.addClass('avatar icon icon-contacts');
						} else {
							$avatar.avatar($avatar.data('user-id'), 32);
						}
						return $li;
					},
					sorter: function (q, items) { return items; }
				},
				displayTpl: function (item) {
					return '<li class="chat-view-mention-autocomplete">' +
						'<span class="avatar-name-wrapper">' +
							'<span class="avatar" ' +
									'data-user-id="' + escapeHTML(item.id) + '" ' +
									'data-user-display-name="' + escapeHTML(item.label) + '">' +
							'</span>' +
							'<strong>' + escapeHTML(item.label) + '</strong>' +
						'</span></li>';
				},
				insertTpl: function (item) {
					return '' +
						'<span class="mention-user avatar-name-wrapper">' +
							'<span class="avatar" ' +
									'data-user-id="' + escapeHTML(item.id) + '" ' +
									'data-user-display-name="' + escapeHTML(item.label) + '">' +
							'</span>' +
							'<strong>' + escapeHTML(item.label) + '</strong>' +
						'</span>';
				},
				searchKey: "label"
			});
			$target.on('inserted.atwho', function (je, $el) {
				s._postRenderItem(
					null,
					// we need to pass the parent of the inserted element
					// passing the whole comments form would re-apply and request
					// avatars from the server
					$(je.target).find(
						'span[data-user-id="' + $el.find('[data-user-id]').data('user-id') + '"]'
					).parent()
				);
			});
		},

		_onAutoComplete: function(query, callback) {
			var self = this;

			if(!_.isUndefined(this._autoCompleteRequestTimer)) {
				clearTimeout(this._autoCompleteRequestTimer);
			}
			this._autoCompleteRequestTimer = _.delay(function() {
				if(!_.isUndefined(this._autoCompleteRequestCall)) {
					this._autoCompleteRequestCall.abort();
				}
				this._autoCompleteRequestCall = $.ajax({
					url: OC.linkToOCS('apps/spreed/api/v1/chat', 2) + self.collection.token + '/mentions',
					data: {
						search: query
					},
					beforeSend: function (request) {
						request.setRequestHeader('Accept', 'application/json');
					},
					success: function (result) {
						callback(result.ocs.data);
					}
				});
			}.bind(this), 400);
		},

		/**
		 * Limit pasting to plain text
		 *
		 * @param e
		 * @private
		 */
		_onPaste: function (e) {
			e.preventDefault();
			var text = e.originalEvent.clipboardData.getData("text/plain");
			document.execCommand('insertText', false, text);
		},

		template: function(context) {
			// OCA.Talk.Views.Templates may not have been initialized when
			// this view is initialized, so the template can not be directly
			// assigned.
			return OCA.Talk.Views.Templates['chatview'](context);
		},
		templateContext: {
			emptyResultLabel: t('spreed', 'No messages yet, start the conversation!')
		},

		addCommentTemplate: function(params) {
			if (!this._addCommentTemplate) {
				this._addCommentTemplate = OCA.Talk.Views.Templates['chatview_add_comment'];
			}

			var isReadOnly = this.model && this.model.get('readOnly') === 1;
			var newMessagePlaceholder = t('spreed', 'New message …');
			var submitText = t('spreed', 'Send');
			if (isReadOnly) {
				newMessagePlaceholder = t('spreed', 'You can not send messages, because the conversation is locked.');
				submitText = t('spreed', 'The conversation is locked.');
			}

			return this._addCommentTemplate(_.extend({
				actorId: OC.getCurrentUser().uid,
				actorDisplayName: OC.getCurrentUser().displayName,
				newMessagePlaceholder: newMessagePlaceholder,
				submitText: submitText,
				shareText: t('spreed', 'Share'),
				isReadOnly: isReadOnly,
				canShare: !isReadOnly && OC.getCurrentUser().uid,
			}, params));
		},

		commentTemplate: function(params) {
			if (!this._commentTemplate) {
				this._commentTemplate = OCA.Talk.Views.Templates['chatview_comment'];
			}

			params = _.extend({
				// TODO isUserAuthor is not properly set for guests
				isUserAuthor: OC.getCurrentUser().uid === params.actorId,
				isGuest: params.actorType === 'guests',
			}, params);

			return this._commentTemplate(params);
		},

		onBeforeRender: function() {
			this.getRegion('guestName').reset({ preventDestroy: true, allowMissingEl: true });
		},

		onRender: function() {
			delete this._lastAddedMessageModel;

			this.$el.find('.emptycontent').after(this.addCommentTemplate({}));

			this.$el.find('.has-tooltip').tooltip({container: this._tooltipContainer});
			this.$container = this.$el.find('ul.comments');

			this._virtualList = new OCA.SpreedMe.Views.VirtualList(this.$container);

			if (OC.getCurrentUser().uid) {
				this.$el.find('.avatar').avatar(OC.getCurrentUser().uid, 32, undefined, false, undefined, OC.getCurrentUser().displayName);
			} else {
				this.$el.find('.avatar').imageplaceholder('?', this.getOption('guestNameModel').get('nick'), 128);
				this.$el.find('.avatar').css('background-color', '#b9b9b9');
				this.showChildView('guestName', this._guestNameEditableTextLabel, { replaceElement: true, allowMissingEl: true } );
			}

			this.delegateEvents();
			var $message = this.$el.find('.message');
			if (window.outerHeight > 768) {
				$message.blur().focus();
			}
			$message.on('keydown', function() {
				// Track scroll position to be able to properly update it after
				// the new message field shrinks as a result of pressing the
				// delete or backspace keys.
				this._scrollPositionOnLastKeyDown = this.$container.scrollTop();
			}.bind(this));
			$message.on('keydown input change', _.bind(this._onTypeComment, this));

			// Before the 3.0.0 release jQuery rounded the height to the nearest
			// integer, but Firefox has subpixel accuracy, so the height
			// returned by jQuery can not be used in the calculations.
			this._newMessageFieldHeight = $message.get(0).getBoundingClientRect().height;

			/**
			 * Make sure we focus the actual content part not the placeholder.
			 * Firefox is a bit buggy there: https://stackoverflow.com/a/42170494
			 */
			$message.on("keydown click", function(){
				if(!$message.text().trim().length){
					$message.blur().focus();
				}
			});

			this._initAutoComplete($message);

			autosize(this.$el.find('.newCommentRow .message'));
		},

		focusChatInput: function() {
			this.$el.find('.message').blur().focus();
		},

		/**
		 * Set the tooltip container.
		 *
		 * Depending on the parent elements of the chat view the tooltips may
		 * need to be appended to a specific element to be properly shown (due
		 * to how CSS overflows, clipping areas and positioning contexts work).
		 * If no specific container is ever set, or if it is set to "undefined",
		 * the tooltip elements will be appended as siblings of the element for
		 * which they are shown.
		 *
		 * @param {jQuery} tooltipContainer the element to append the tooltip
		 *        elements to
		 */
		setTooltipContainer: function(tooltipContainer) {
			this._tooltipContainer = tooltipContainer;

			// Update tooltips
			this.$el.find('.has-tooltip').tooltip('destroy');
			this.$el.find('.has-tooltip').tooltip({container: this._tooltipContainer});
		},

		/**
		 * Saves the scroll position of the message list.
		 *
		 * This needs to be called before the chat view is detached in order to
		 * be able to restore the scroll position when attached again.
		 */
		saveScrollPosition: function() {
			if (_.isUndefined(this.$container)) {
				return;
			}

			this._savedScrollPosition = this.$container.scrollTop();
		},

		/**
		 * Restores the scroll position of the message list.
		 *
		 * The scroll position is restored to the given position or, if none is
		 * given, to the last saved position. If neither a scroll position is
		 * given nor a scroll position was saved the current scroll position is
		 * not modified.
		 *
		 * Note that the saved scroll position is valid only if the chat view
		 * was not resized since it was saved; restoring the scroll position
		 * after the chat view was resized may or may not work as expected.
		 *
		 * @param {number} scrollPosition the scroll position to restore to, or
		 *                 undefined to restore to the last saved position.
		 */
		restoreScrollPosition: function(scrollPosition) {
			if (_.isUndefined(this.$container) ||
					(_.isUndefined(this._savedScrollPosition) && _.isUndefined(scrollPosition))) {
				return;
			}

			if (_.isUndefined(scrollPosition)) {
				this.$container.scrollTop(this._savedScrollPosition);

				return;
			}

			this.$container.scrollTop(scrollPosition);
		},

		/**
		 * Returns the last known scroll position of the message list.
		 *
		 * Note that this value is updated asynchronously, so in some cases it
		 * will not match the current scroll position of the message list.
		 * Moreover, it could also be influenced in surprising ways, for
		 * example, by animations that change the width of the message list.
		 *
		 * If possible, save the scroll position explicitly at a known safe
		 * point to be able to restore to it instead of restoring to the value
		 * returned by this method.
		 *
		 * @return {number} the last known scroll position of the message list.
		 */
		getLastKnownScrollPosition: function() {
			if (_.isUndefined(this._virtualList)) {
				return;
			}

			return this._virtualList.getLastKnownScrollPosition();
		},

		/**
		 * Reloads the message list.
		 *
		 * This needs to be called whenever the size of the chat view has
		 * changed.
		 *
		 * When the message list is reloaded its size may have changed (for
		 * example, if the chat view was detached from the main view and
		 * attached to the sidebar); it is not possible to guarantee that
		 * exactly the same messages that were visible before will be visible
		 * after the message list is reloaded. Due to this, in those cases
		 * reloading the message list just ensures that the last message that
		 * was partially visible before will be fully visible after the message
		 * list is reloaded.
		 */
		reloadMessageList: function() {
			if (!this._virtualList) {
				return;
			}

			this._virtualList.reload();
		},

		/**
		 * Scrolls the message list to keep the last visible message at the
		 * bottom when the new message field height changes.
		 *
		 * @param {number} heightDifference The difference between the current
		 *                 height of the new message field and the previous one.
		 */
		onNewMessageFieldHeightChange: function(heightDifference) {
			if (heightDifference < 0) {
				// When the new message field shrunks the message list may be
				// automatically scrolled to fill the now empty space. For
				// example, if the message list has 30px hidden at the bottom
				// and the new message field shrunks 45px the message list is
				// scrolled back 15px to align the bottom of its contents with
				// the bottom of its new visible area. In that case the
				// full height difference should not be scrolled back, only the
				// part that has not been automatically scrolled yet.
				heightDifference += this._scrollPositionOnLastKeyDown - this.$container.scrollTop();
			}

			this.$container.scrollTop(this.$container.scrollTop() + heightDifference);

			this.reloadMessageList();
		},

		_formatItem: function(commentModel) {
			// PHP timestamp is second-based; JavaScript timestamp is
			// millisecond based.
			var timestamp = commentModel.get('timestamp') * 1000;

			var actorDisplayName = commentModel.get('actorDisplayName');
			if (commentModel.get('actorType') === 'guests' &&
				actorDisplayName === '') {
				actorDisplayName = t('spreed', 'Guest');
			}
			if (actorDisplayName === null) {
				actorDisplayName = t('spreed', '[Unknown user name]');
			}

			var formattedMessage = escapeHTML(commentModel.get('message'));
			formattedMessage = this._plainToRich(formattedMessage);
			formattedMessage = formattedMessage.replace(/\n/g, '<br/>');
			formattedMessage = OCA.SpreedMe.Views.RichObjectStringParser.parseMessage(
				formattedMessage, commentModel.get('messageParameters'));

			var data = _.extend({}, commentModel.attributes, {
				actorDisplayName: actorDisplayName,
				timestamp: timestamp,
				date: OC.Util.formatDate(timestamp, 'LT'),
				altDate: OC.Util.formatDate(timestamp),
				isNotSystemMessage: commentModel.get('systemMessage') === '',
				formattedMessage: formattedMessage
			});
			return data;
		},

		_plainToRich: function(message) {
			/**
			 * In Talk we only parse URLs with a protocol to avoid undesired
			 * clickables like composer.json. Therefor the method and regex were
			 * copied from OCP.Comments and adjusted accordingly.
			 */
			// var urlRegex = /(\s|^)(https?:\/\/)?((?:[-A-Z0-9+_]+\.)+[-A-Z]+(?:\/[-A-Z0-9+&@#%?=~_|!:,.;()]*)*)(\s|$)/ig;
			var urlRegex = /(\s|\(|^)(https?:\/\/)((?:[-A-Z0-9+_]+\.)+[-A-Z]+(?:\/[-A-Z0-9+&@#%?=~_|!:,.;()]*)*)(?=\s|\)|$)/ig;
			return message.replace(urlRegex, function (_, leadingSpace, protocol, url) {
				var trailingClosingBracket = '';
				if (url.substr(-1) === ')' && (url.indexOf('(') === -1 || leadingSpace === '(')) {
					url = url.substr(0, url.length - 1);
					trailingClosingBracket = ')';
				}
				var linkText = url;
				// if (!protocol) {
				// 	protocol = 'https://';
				// } else
				if (protocol === 'http://') {
					linkText = protocol + url;
				}

				return leadingSpace + '<a class="external" target="_blank" rel="noopener noreferrer" href="' + protocol + url + '">' + linkText + '</a>' + trailingClosingBracket;
			});
		},

		_onAddModelStart: function() {
			this._virtualList.appendElementStart();

			this._scrollToNew = this._virtualList.getLastElement() === this._virtualList.getLastVisibleElement();
		},

		_onAddModel: function(model) {
			var $el = $(this.commentTemplate(this._formatItem(model)));
			this._virtualList.appendElement($el);

			if (this._modelsHaveSameActor(this._lastAddedMessageModel, model) &&
				this._modelsAreTemporaryNear(this._lastAddedMessageModel, model, 3600) &&
				this.sameAuthorMessages < 20

			) {
				this.sameAuthorMessages++;
				if (this._modelsAreTemporaryNear(this._lastAddedMessageModel, model) &&
					this.temporaryNearMessages < 5) {
					$el.addClass('grouped');

					this.temporaryNearMessages++;
				} else {
					$el.addClass('same-author');
					this.temporaryNearMessages = 0;
				}
			} else {
				this.sameAuthorMessages = 0;
				this.temporaryNearMessages = 0;
			}

			// PHP timestamp is second-based; JavaScript timestamp is
			// millisecond based.
			model.set('date', new Date(model.get('timestamp') * 1000));

			if (!this._lastAddedMessageModel || !this._modelsHaveSameDate(this._lastAddedMessageModel, model)) {
				$el.attr('data-date', this._getDateSeparator(model.get('date')));
				$el.addClass('showDate');
			}

			// Keeping the model for the last added message is not only
			// practical, but needed, as the models for previous messages are
			// removed from the collection each time a new set of messages is
			// received.
			this._lastAddedMessageModel = model;

			this._postRenderItem(model, $el);
		},

		_onAddModelEnd: function() {
			this.$el.find('.emptycontent').toggleClass('hidden', true);

			this._virtualList.appendElementEnd();

			if (this._scrollToNew) {
				this._virtualList.scrollTo(this._virtualList.getLastElement());
			}
		},

		_getDateSeparator: function(timestamp) {
			var date = moment(timestamp, 'x'),
				today = moment(),
				dayOfYear = OC.Util.formatDate(date, 'YYYY-DDD'),
				dayOfYearToday = OC.Util.formatDate(today, 'YYYY-DDD');

			var relativePrefix = '';
			if (dayOfYear === dayOfYearToday) {
				relativePrefix = t('spreed', 'Today');
			} else {
				var yesterday = OC.Util.formatDate(today.subtract(1, 'd'), 'YYYY-DDD');

				if (dayOfYear === yesterday) {
					relativePrefix = t('spreed', 'Yesterday');
				} else {
					relativePrefix = date.fromNow();
				}
			}

			return t('spreed', '{relativeDate}, {absoluteDate}', {
				relativeDate: relativePrefix,
				// 'LL' formats a localized date including day of month, month
				// name and year
				absoluteDate: OC.Util.formatDate(timestamp, 'LL')
			}, undefined, {
				escape: false // French "Today" has a ' in it
			});
		},

		_modelsHaveSameActor: function(model1, model2) {
			if (!model1 || !model2) {
				return false;
			}

			return (model1.get('actorType') !== 'bots' || model1.get('actorId') === 'changelog') &&
				(model1.get('systemMessage').length === 0) === (model2.get('systemMessage').length === 0) &&
				model1.get('actorId') === model2.get('actorId') &&
				model1.get('actorType') === model2.get('actorType');
		},

		_modelsAreTemporaryNear: function(model1, model2, secondsThreshold) {
			if (!model1 || !model2) {
				return false;
			}

			if (_.isUndefined(secondsThreshold)) {
				secondsThreshold = 30;
			}

			return Math.abs(model1.get('timestamp') - model2.get('timestamp')) <= secondsThreshold;
		},

		_modelsHaveSameDate: function(model1, model2) {
			if (!model1 || !model2) {
				return false;
			}

			return model1.get('date').toDateString() === model2.get('date').toDateString();
		},

		/**
		 * If there is no model then it is being called on a message being
		 * composed.
		 */
		_postRenderItem: function(model, $el) {
			$el.find('.has-tooltip').tooltip({container: this._tooltipContainer});

			var setAvatar = function($element, size) {
				if ($element.data('user-id')) {
					if ($element.data('user-id') === 'all') {
						$element.addClass('avatar icon icon-contacts');
					} else {
						$element.avatar($element.data('user-id'), size, undefined, false, undefined, $element.data('user-display-name'));
					}
				} else {
					$element.imageplaceholder('?', $element.data('displayname'), size);
					$element.css('background-color', '#b9b9b9');
				}
			};
			$el.find('.authorRow .avatar').each(function() {
				if (model && model.get('actorType') === 'bots') {
					if (model.get('actorId') === 'changelog') {
						$(this).addClass('icon icon-changelog');
					} else {
						$(this).imageplaceholder('>_', $(this).data('displayname'), 32);
						$(this).css('background-color', '#363636');
					}
				} else {
					setAvatar($(this), 32);
				}
			});
			var inlineAvatars = $el.find('.message .avatar');
			if ($($el.context).hasClass('message')) {
				inlineAvatars = $el.find('.avatar');
			}
			inlineAvatars.each(function () {
				setAvatar($(this), 16);
			});

			if (OC.getCurrentUser().uid &&
				model &&
				model.get('actorType') === 'users' &&
				model.get('actorId') !== OC.getCurrentUser().uid) {
				$el.find('.authorRow .avatar, .authorRow .author').contactsMenu(
					model.get('actorId'), 0, $el.find('.authorRow'));
			}

			var $message = $el.find('.message');
			this._postRenderMessage($message);
		},

		_postRenderMessage: function($el) {
			var self = this;

			$el.find('.filePreview').each(function() {
				self._renderFilePreview($(this));
			});

			// Contacts menu is not shown in public view.
			if (!OC.getCurrentUser().uid) {
				return;
			}

			$el.find('.mention-user').each(function() {
				var $this = $(this);
				var $avatar = $this.find('.avatar');

				var user = $avatar.data('user-id');
				if (user !== OC.getCurrentUser().uid) {
					$this.contactsMenu(user, 0, $this);
				}
			});
		},

		_renderFilePreview: function($filePreview) {
			var previewSize = Math.ceil(128 * window.devicePixelRatio);

			var defaultIconUrl = OC.imagePath('core', 'filetypes/file');
			var previewUrl = defaultIconUrl;
			if ($filePreview.data('preview-available') === 'yes') {
				previewUrl = OC.generateUrl(
					'/core/preview?fileId={fileId}&x={width}&y={height}',
					{
						fileId: $filePreview.data('file-id'),
						width: previewSize,
						height: previewSize
					});
			} else {
				previewUrl = OC.MimeType.getIconUrl($filePreview.data('mimetype'));
			}

			// If the default file icon can not be loaded either there is
			// nothing else that can be done, just remove the loading icon
			// and the image and leave only the message about a shared file.
			var handleDefaultIconLoadError = function() {
				$filePreview.removeClass('icon-loading');
				$filePreview.find('img').remove();
			};

			var img = new Image();

			var handlePreviewLoadError = function() {
				img.onerror = handleDefaultIconLoadError;

				img.src = defaultIconUrl;
			};

			img.onload = function() {
				$filePreview.removeClass('icon-loading');
			};

			$filePreview.addClass('icon-loading');

			img.width = previewSize;
			img.height = previewSize;

			if (OC.getCurrentUser().uid) {
				img.onerror = handlePreviewLoadError;
				img.src = previewUrl;
			} else {
				img.onerror = handleDefaultIconLoadError;
				img.src = defaultIconUrl;
			}

			$filePreview.prepend(img);
		},

		_onTypeComment: function(ev) {
			var $field = $(ev.target);
			var $submitButton = $field.data('submitButtonEl');
			if (!$submitButton) {
				$submitButton = $field.closest('form').find('.submit');
				$field.data('submitButtonEl', $submitButton);
			}

			var newMessageFieldOldHeight = this._newMessageFieldHeight;
			// Before the 3.0.0 release jQuery rounded the height to the nearest
			// integer, but Firefox has subpixel accuracy, so the height
			// returned by jQuery can not be used in the calculations.
			this._newMessageFieldHeight = $field.get(0).getBoundingClientRect().height;
			if (this._newMessageFieldHeight !== newMessageFieldOldHeight) {
				this.triggerMethod('newMessageFieldHeightChange', this._newMessageFieldHeight - newMessageFieldOldHeight);
			}

			// Submits form with Enter, but Shift+Enter is a new line. If the
			// autocomplete popover is being shown Enter does not submit the
			// form either; it will be handled by At.js which will add the
			// currently selected item to the message.
			if (ev.keyCode === 13 && !ev.shiftKey && !$field.atwho('isSelecting')) {
				$submitButton.click();
				ev.preventDefault();
			}

			// Pressing Arrow-up/down in an empty/unchanged input brings back the last sent messages
			if (this.lastComments.length !== 0 && !$field.atwho('isSelecting')) {

				if (ev.keyCode === 38 || ev.keyCode === 40) {
					this._loopThroughLastComments(ev, $field);
				} else {
					this.currentLastComment = -1;
				}
			}
		},

		_loopThroughLastComments: function(ev, $field) {
			if ($field.text().trim().length === 0 ||
				this.currentLastComment !== -1) {

				if (ev.keyCode === 38) {
					this.currentLastComment++;
				} else {
					if (this.currentLastComment === -1) {
						this.currentLastComment = this.lastComments.length - 1;
					} else {
						this.currentLastComment--;
					}
				}

				if (typeof this.lastComments[this.currentLastComment] !== 'undefined') {
					$field.html(this.lastComments[this.currentLastComment]);

					/**
					 * Jump to the end of the editable content:
					 * https://stackoverflow.com/a/3866442
					 */
					var range = document.createRange();//Create a range (a range is a like the selection but invisible)
					range.selectNodeContents(ev.target);//Select the entire contents of the element with the range
					range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
					var selection = window.getSelection();//get the selection object (allows you to change selection)
					selection.removeAllRanges();//remove any selections already made
					selection.addRange(range);//make the range you have just created the visible selection
				} else {
					this.currentLastComment = -1;
					$field.text('');
				}

				ev.preventDefault();
			}

		},

		_commentBodyHTML2Plain: function($el) {
			var $comment = $el.clone();

			$comment.find('.mention-user').each(function () {
				var $this = $(this),
					$inserted = $this.parent(),
					userId = $this.find('.avatar').data('user-id');
				if (userId.indexOf(' ') !== -1) {
					$inserted.html('@"' + userId + '"');
				} else {
					$inserted.html('@' + userId);
				}
			});

			$comment.html($comment.html().replace(/<br>/g, "\n"));
			var message = $comment.text();

			// Little hack to replace the non-breaking space resulting from the editable div content with normal spaces
			return decodeURI(encodeURI(message).replace(/%C2%A0/g, '%20'));
		},

		_onSubmitComment: function(e) {
			var self = this;
			var $form = $(e.target);
			var $submit = $form.find('.submit');
			var $loading = $form.find('.submitLoading');
			var $commentField = $form.find('.message');
			var message = $commentField.text().trim();

			if (!message.length) {
				return false;
			}

			var htmlComment = $commentField.html();
			if (this.lastComments.length === 0 ||
				this.lastComments[0] !== htmlComment) {
				this.lastComments.unshift(htmlComment);
			}
			this.currentLastComment = -1;

			$commentField.prop('contenteditable', false);
			$submit.addClass('hidden');
			$loading.removeClass('hidden');

			message = this._commentBodyHTML2Plain($commentField);
			var data = {
				token: this.collection.token,
				message: message
			};

			if (!OC.getCurrentUser().uid) {
				var guestNick = OCA.SpreedMe.app._localStorageModel.get('nick');
				if (guestNick) {
					data.actorDisplayName = guestNick;
				}
			}

			var comment = new OCA.SpreedMe.Models.ChatMessage(data);
			comment.save({}, {
				success: function(model) {
					self._onSubmitSuccess(model, $form);
				},
				error: function(model, response) {
					if (response.status === 413) {
						self._onSubmitError($form, t('spreed', 'The message you are trying to send is too long'));
					} else {
						self._onSubmitError($form, t('spreed', 'Error occurred while sending message'));
					}
				}
			});

			return false;
		},

		_onSubmitSuccess: function(model, $form) {
			$form.find('.submit').removeClass('hidden');
			$form.find('.submitLoading').addClass('hidden');
			$form.find('.message').text('').prop('contenteditable', true);

			$form.find('.message').focus();

			// The new message does not need to be explicitly added to the list
			// of messages; it will be automatically fetched from the server
			// thanks to the auto-refresh of the list.
		},

		_onSubmitError: function($form, errorMsg) {
			$form.find('.submit').removeClass('hidden');
			$form.find('.submitLoading').addClass('hidden');
			$form.find('.message').prop('contenteditable', true);

			$form.find('.message').focus();

			OC.Notification.show(errorMsg, {type: 'error'});
		},

		_onAddShare: function() {
			var self = this;
			var $form = this.$el.find('.newCommentForm');
			var $shareButton = $form.find('.share');
			var $shareLoadingIcon = $form.find('.shareLoading');

			OC.dialogs.filepicker(t('spreed', 'File to share'), function(targetPath) {
				$shareButton.addClass('hidden');
				$shareLoadingIcon.removeClass('hidden');

				$.ajax({
					type: 'POST',
					url: OC.linkToOCS('apps/files_sharing/api/v1', 2) + 'shares',
					dataType: 'json',
					data: {
						shareType: OC.Share.SHARE_TYPE_ROOM,
						path: targetPath,
						shareWith: self.collection.token
					}
				}).always(function() {
					$shareLoadingIcon.addClass('hidden');
					$shareButton.removeClass('hidden');
				}).fail(function(xhr) {
					var message = t('spreed', 'Error while sharing');

					var result = xhr.responseJSON;
					if (result && result.ocs && result.ocs.meta) {
						if (result.ocs.meta.statuscode === 403) {
							return;
						}
						message = result.ocs.meta.message;
					}

					OC.Notification.showTemporary(message);
				});
			}, false, ['*', 'httpd/unix-directory'], true, OC.dialogs.FILEPICKER_TYPE_CHOOSE);
		},

	});

	OCA.SpreedMe.Views.ChatView = ChatView;

})(OCA, OC, OCP, Marionette, autosize, moment);


/* global Marionette */

/**
 *
 * @copyright Copyright (c) 2017, Daniel Calviño Sánchez (danxuliu@gmail.com)
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
 *
 */

(function(OCA, Marionette) {
	'use strict';

	OCA.SpreedMe = OCA.SpreedMe || {};
	OCA.Talk = OCA.Talk || {};
	OCA.SpreedMe.Views = OCA.SpreedMe.Views || {};
	OCA.Talk.Views = OCA.Talk.Views || {};

	/**
	 * View for an editable text label.
	 *
	 * In its main state, an EditableTextLabel shows text in a label (an HTML
	 * element that can contain a line of text, like "<h1>" or "<p>"). The text
	 * comes from an attribute in a Backbone model and is automatically updated
	 * when the attribute changes.
	 *
	 * It also provides an edition state in which a text input field replaces
	 * the label, making possible to edit and save the attribute of the model.
	 * The EditableTextLabel can be make read-only by calling
	 * "disableEdition()", or read-write by calling "enableEdition()".
	 *
	 * The EditableTextLabel works on a single attribute of a model; they must
	 * be set in the constructor using the "model" and "modelAttribute" options
	 * (the first is the Backbone model to get the attribute from, the second is
	 * the name of the attribute). The "modelSaveOptions" option can be set if
	 * needed to control the options passed to "Model.save", and
	 * "extraClassNames", "labelTagName", "labelPlaceholder", "inputMaxLength",
	 * "inputPlaceholder" and "buttonTitle" can be used to customize some
	 * elements of the view.
	 *
	 * After initialization, and once the view has been rendered, the
	 * "modelAttribute" and "labelPlaceholder" options can be updated using the
	 * "setModelAttribute" and "setLabelPlaceholder" methods.
	 */
	var EditableTextLabel = Marionette.View.extend({

		className: function() {
			return 'editable-text-label' + (this.getOption('extraClassNames')? ' ' + this.getOption('extraClassNames') : '');
		},

		labelTagName: 'p',

		buttonTitle: t('spreed', 'Edit'),

		ui: {
			labelWrapper: '.label-wrapper',
			label: '.label',
			editButton: '.edit-button',
			inputWrapper: '.input-wrapper',
			input: 'input.username',
			confirmButton: '.confirm-button',
		},

		events: {
			'click @ui.editButton': 'showInput',
			'keyup @ui.input': 'handleInputKeyUp',
			'click @ui.confirmButton': 'confirmEdit',
		},

		modelEvents: function() {
			var modelEvents = {};
			modelEvents['change:' + this.modelAttribute] = 'updateText';

			return modelEvents;
		},

		template: function(context) {
			// OCA.Talk.Views.Templates may not have been initialized when this
			// view is initialized, so the template can not be directly
			// assigned.
			return OCA.Talk.Views.Templates['editabletextlabel'](context);
		},

		templateContext: function() {
			return {
				text: this._getText(),

				editionEnabled: this._editionEnabled,

				labelTagName: this.getOption('labelTagName'),
				inputMaxLength: this.getOption('inputMaxLength'),
				// The text of the label is not used as input value as it could
				// contain a placeholder text.
				inputValue: this.model.get(this.modelAttribute),
				inputPlaceholder: this.getOption('inputPlaceholder'),
				buttonTitle: this.getOption('buttonTitle')
			};
		},

		initialize: function(options) {
			this.mergeOptions(options, ['model', 'modelAttribute', 'modelSaveOptions', 'labelPlaceholder']);

			this._editionEnabled = true;
		},

		setModelAttribute: function(modelAttribute) {
			if (this.modelAttribute === modelAttribute) {
				return;
			}

			var modelEvents = _.result(this, 'modelEvents');
			this.unbindEvents(this.model, modelEvents);

			this.modelAttribute = modelAttribute;

			modelEvents = _.result(this, 'modelEvents');
			this.bindEvents(this.model, modelEvents);

			this.updateText();
			this.hideInput();
		},

		setLabelPlaceholder: function(labelPlaceholder) {
			if (this.labelPlaceholder === labelPlaceholder) {
				return;
			}

			this.labelPlaceholder = labelPlaceholder;

			this.updateText();
		},

		enableEdition: function() {
			if (this._editionEnabled) {
				return;
			}

			this._editionEnabled = true;

			this.render();
		},

		disableEdition: function() {
			if (!this._editionEnabled) {
				return;
			}

			this._editionEnabled = false;

			this.render();
		},

		_getText: function() {
			return this.model.get(this.modelAttribute) || this.labelPlaceholder || '';
		},

		updateText: function() {
			this.getUI('label').text(this._getText());
		},

		showInput: function() {
			this.getUI('input').val(this.model.get(this.modelAttribute));

			this.getUI('inputWrapper').removeClass('hidden-important');
			this.getUI('labelWrapper').addClass('hidden-important');

			this.getUI('input').focus();
		},

		hideInput: function() {
			this.getUI('labelWrapper').removeClass('hidden-important');
			this.getUI('inputWrapper').addClass('hidden-important');
		},

		handleInputKeyUp: function(event) {
			if (event.keyCode === 13) {
				// Enter
				this.confirmEdit();
			} else if (event.keyCode === 27) {
				// ESC
				this.hideInput();
			}
		},

		confirmEdit: function() {
			var newText = this.getUI('input').val().trim();

			if (newText === this.model.get(this.modelAttribute)) {
				this.hideInput();

				return;
			}

			// TODO This should show the error message instead of just hiding
			// the input without changes.
			var hideInputOnValidationError = function(/*model, error*/) {
				this.hideInput();
			}.bind(this);
			this.model.listenToOnce(this.model, 'invalid', hideInputOnValidationError);

			var options = _.clone(this.modelSaveOptions || {});
			options.success = _.bind(function() {
				this.model.stopListening(this.model, 'invalid', hideInputOnValidationError);

				this.hideInput();

				if (this.modelSaveOptions && _.isFunction(this.modelSaveOptions.success)) {
					this.modelSaveOptions.success.apply(this, arguments);
				}
			}, this);
			options.error = _.bind(function() {
				this.model.stopListening(this.model, 'invalid', hideInputOnValidationError);

				this.hideInput();
			}, this);

			this.model.save(this.modelAttribute, newText, options);
		},

	});

	OCA.SpreedMe.Views.EditableTextLabel = EditableTextLabel;

})(OCA, Marionette);


/* global Marionette, $ */

/**
 *
 * @copyright Copyright (c) 2018, Daniel Calviño Sánchez (danxuliu@gmail.com)
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
 *
 */

(function(OCA, Marionette, $) {

	'use strict';

	OCA.SpreedMe = OCA.SpreedMe || {};
	OCA.SpreedMe.Views = OCA.SpreedMe.Views || {};

	var roomsChannel = Backbone.Radio.channel('rooms');
	var localMediaChannel = Backbone.Radio.channel('localMedia');

	/**
	 * View for the main empty content message.
	 *
	 * This view does not render its own elements; an existing element must be
	 * provided when the view is created. In the main UI of Talk that element
	 * comes from the templates rendered by the server, which ensures that even
	 * if the UI takes a while to load the user will not see just an empty
	 * screen (which would happen if the view itself rendered the elements).
	 */
	var EmptyContentView  = Marionette.View.extend({

		template: false,

		ui: {
			'icon': '#emptycontent-icon',
			'message': 'h2',
			'messageAdditional': '.emptycontent-additional',
			'shareRoomInput': '.share-room-input',
			'shareRoomClipboardButton': '.shareRoomClipboard',
		},

		/**
		 * @param {string} options.el selector for the existing empty content
		 *                 element.
		 */
		initialize: function(/*options*/) {
			// Force render to create the UI bindings to the existing elements.
			this.render();

			this.listenTo(roomsChannel, 'leaveCurrentRoom', this.setEmptyContentMessageWhenConversationEnded);

			this.listenTo(localMediaChannel, 'webRtcNotSupported', function() {
				this._disableUpdatesOnActiveRoomChanges();

				this.setEmptyContentMessageWhenWebRtcIsNotSupported();
			});
			this.listenTo(localMediaChannel, 'waitingForPermissions', function() {
				this._disableUpdatesOnActiveRoomChanges();

				this.setEmptyContentMessageWhenWaitingForMediaPermissions();
			});
			this.listenTo(localMediaChannel, 'startLocalMedia', function() {
				this.setEmptyContentMessageWhenWaitingForOthersToJoinTheCall();

				this._enableUpdatesOnActiveRoomChanges();
			});
			this.listenTo(localMediaChannel, 'startWithoutLocalMedia', function() {
				this.setEmptyContentMessageWhenWaitingForOthersToJoinTheCall();

				this._enableUpdatesOnActiveRoomChanges();
			});
		},

		setActiveRoom: function(activeRoom) {
			this.stopListening(this._activeRoom, 'destroy', this.setInitialEmptyContentMessage);
			this._disableUpdatesOnActiveRoomChanges();

			this._activeRoom = activeRoom;

			this.setEmptyContentMessageWhenWaitingForOthersToJoinTheCall();

			this.listenTo(this._activeRoom, 'destroy', function() {
				this.stopListening(this._activeRoom, 'destroy', this.setInitialEmptyContentMessage);
				this._disableUpdatesOnActiveRoomChanges();

				this._activeRoom = null;

				// 'leaveCurrentRoom' is sometimes triggered before the
				// 'destroy' event, so when the room is destroyed the initial
				// message overwrites the conversation ended message.
				this.setInitialEmptyContentMessage();
			});
			this._enableUpdatesOnActiveRoomChanges();
		},

		_disableUpdatesOnActiveRoomChanges: function() {
			this.stopListening(this._activeRoom, 'change:participants', this.setEmptyContentMessageWhenWaitingForOthersToJoinTheCall);
			this.stopListening(this._activeRoom, 'change:numGuests', this.setEmptyContentMessageWhenWaitingForOthersToJoinTheCall);
			this.stopListening(this._activeRoom, 'change:participantType', this.setEmptyContentMessageWhenWaitingForOthersToJoinTheCall);
			this.stopListening(this._activeRoom, 'change:type', this.setEmptyContentMessageWhenWaitingForOthersToJoinTheCall);
		},

		_enableUpdatesOnActiveRoomChanges: function() {
			this.listenTo(this._activeRoom, 'change:participants', this.setEmptyContentMessageWhenWaitingForOthersToJoinTheCall);
			this.listenTo(this._activeRoom, 'change:numGuests', this.setEmptyContentMessageWhenWaitingForOthersToJoinTheCall);
			this.listenTo(this._activeRoom, 'change:participantType', this.setEmptyContentMessageWhenWaitingForOthersToJoinTheCall);
			this.listenTo(this._activeRoom, 'change:type', this.setEmptyContentMessageWhenWaitingForOthersToJoinTheCall);
		},

		/**
		 *
		 * @param {string|Object} icon
		 * @param {string} icon.userId
		 * @param {string} icon.displayName
		 * @param {string} message
		 * @param {string} [messageAdditional]
		 * @param {string} [url]
		 */
		setEmptyContentMessage: function(icon, message, messageAdditional, url) {
			//Remove previous icon and avatar from emptycontent
			this.getUI('icon').removeAttr('class').attr('class', '');
			this.getUI('icon').html('');

			if (url) {
				this.getUI('shareRoomInput').removeClass('hidden').val(url);
				this.getUI('shareRoomClipboardButton').removeClass('hidden');
			} else {
				this.getUI('shareRoomInput').addClass('hidden');
				this.getUI('shareRoomClipboardButton').addClass('hidden');
			}

			if (typeof icon === 'string') {
				this.getUI('icon').addClass(icon);
			} else {
				var $avatar = $('<div>');
				$avatar.addClass('avatar room-avatar');
				if (icon.userId !== icon.displayName) {
					$avatar.avatar(icon.userId, 128, undefined, false, undefined, icon.displayName);
				} else {
					$avatar.avatar(icon.userId, 128);
				}
				this.getUI('icon').append($avatar);
			}

			this.getUI('message').html(message);
			this.getUI('messageAdditional').text(messageAdditional ? messageAdditional : '');
		},

		setInitialEmptyContentMessage: function() {
			this.setEmptyContentMessage(
				'icon-talk',
				t('spreed', 'Join a conversation or start a new one'),
				t('spreed', 'Say hi to your friends and colleagues!')
			);
		},

		setEmptyContentMessageWhenWaitingForOthersToJoinTheCall: function() {
			var icon = '';
			var message = '';
			var messageAdditional = '';
			var url = '';

			var isGuest = (OC.getCurrentUser().uid === null);

			var participants = this._activeRoom.get('participants');
			var numberOfParticipants = Object.keys(participants).length;

			if (this._activeRoom.get('type') === OCA.SpreedMe.app.ROOM_TYPE_PUBLIC) {
				icon = 'icon-public';
			} else {
				icon = 'icon-contacts-dark';
			}

			if (numberOfParticipants === 1 && this._activeRoom.get('numGuests') === 0) {
				message = t('spreed', 'No other people in this call');
			} else if ((!isGuest && numberOfParticipants === 2 && this._activeRoom.get('numGuests') === 0) ||
						(isGuest && numberOfParticipants === 1 && this._activeRoom.get('numGuests') === 1)) {
				var participantId = '',
					participantName = '';

				_.each(participants, function(data, userId) {
					if (OC.getCurrentUser().uid !== userId) {
						participantId = userId;
						participantName = data.name;
					}
				});

				icon = { userId: participantId, displayName: participantName};

				message = t('spreed', 'Waiting for {participantName} to join the call …', {participantName: participantName});
			} else {
				message = t('spreed', 'Waiting for others to join the call …');
			}

			var canModerate = this._activeRoom.get('participantType') === OCA.SpreedMe.app.OWNER ||
								this._activeRoom.get('participantType') === OCA.SpreedMe.app.MODERATOR;

			if (this._activeRoom.get('type') === OCA.SpreedMe.app.ROOM_TYPE_GROUP && canModerate) {
				messageAdditional = t('spreed', 'You can invite others in the participant tab of the sidebar');
			} else if (this._activeRoom.get('type') === OCA.SpreedMe.app.ROOM_TYPE_PUBLIC) {
				messageAdditional = t('spreed', 'Share this link to invite others!');

				canModerate = canModerate ||
								this._activeRoom.get('participantType') === OCA.SpreedMe.app.GUEST_MODERATOR;
				if (canModerate) {
					messageAdditional = t('spreed', 'You can invite others in the participant tab of the sidebar or share this link to invite others!');
				}

				url = window.location.protocol + '//' + window.location.host + OC.generateUrl('/call/' + this._activeRoom.get('token'));
			}

			if (this._activeRoom.get('objectType') === 'share:password' || this._activeRoom.get('objectType') === 'file') {
				messageAdditional = '';
				url = '';
			}

			this.setEmptyContentMessage(icon, message, messageAdditional, url);
		},

		setEmptyContentMessageWhenWebRtcIsNotSupported: function() {
			this.setEmptyContentMessage(
				'icon-video-off',
				t('spreed', 'WebRTC is not supported in your browser :-/'),
				t('spreed', 'Please use a different browser like Firefox or Chrome')
			);
		},

		setEmptyContentMessageWhenWaitingForMediaPermissions: function() {
			this.setEmptyContentMessage(
				'icon-video-off',
				t('spreed', 'Waiting for camera and microphone permissions'),
				t('spreed', 'Please, give your browser access to use your camera and microphone in order to use this app.')
			);
		},

		setEmptyContentMessageWhenConversationEnded: function() {
			// 'leaveCurrentRoom' is sometimes triggered after the 'destroy'
			// event, so do not overwrite the initial message with the
			// conversation ended message.
			if (!this._activeRoom) {
				return;
			}

			this.setEmptyContentMessage(
				'icon-video-off',
				t('spreed', 'This conversation has ended')
			);
		},

	});

	OCA.SpreedMe.Views.EmptyContentView = EmptyContentView;

})(OCA, Marionette, $);


/* global Marionette */

/**
 *
 * @copyright Copyright (c) 2019, Daniel Calviño Sánchez (danxuliu@gmail.com)
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
 *
 */

(function(OCA, Marionette) {

	'use strict';

	OCA.SpreedMe = OCA.SpreedMe || {};
	OCA.Talk = OCA.Talk || {};
	OCA.SpreedMe.Views = OCA.SpreedMe.Views || {};
	OCA.Talk.Views = OCA.Talk.Views || {};

	var LocalVideoView = Marionette.View.extend({

		tagName: 'div',
		className: 'videoContainer videoView',

		id: 'localVideoContainer',

		template: function(context) {
			// OCA.Talk.Views.Templates may not have been initialized when this
			// view is initialized, so the template can not be directly
			// assigned.
			return OCA.Talk.Views.Templates['localvideoview'](context);
		},

		ui: {
			'video': 'video',
			'avatarContainer': '.avatar-container',
			'avatar': '.avatar',
			'nameIndicator': '.nameIndicator',
		},

		regions: {
			'mediaControls': '@ui.nameIndicator',
		},

		initialize: function(options) {
			this._mediaControlsView = new OCA.SpreedMe.Views.MediaControlsView({
				app: options.app,
				webrtc: options.webrtc,
				sharedScreens: options.sharedScreens,
			});
		},

		onBeforeRender: function() {
			// During the rendering the regions of this view are reset, which
			// destroys its child views. If a child view has to be detached
			// instead so it can be attached back after the rendering of the
			// template finishes it is necessary to call "reset" with the
			// "preventDestroy" option (in later Marionette versions a public
			// "detachView" function was introduced instead).
			// "allowMissingEl" is needed for the first time this view is
			// rendered, as the element of the region does not exist yet at that
			// time and without that option the call would fail otherwise.
			this.getRegion('mediaControls').reset({ preventDestroy: true, allowMissingEl: true });
		},

		onRender: function() {
			// Attach the child views again (or for the first time) after the
			// template has been rendered.
			this.showChildView('mediaControls', this._mediaControlsView, { replaceElement: true } );
		},

		setAvatar: function(userId, guestName) {
			if (userId && userId.length) {
				this.getUI('avatar').avatar(userId, 128);
			} else {
				this.getUI('avatar').imageplaceholder('?', guestName, 128);
				this.getUI('avatar').css('background-color', '#b9b9b9');
			}
		},

		setSpeaking: function(speaking) {
			this.$el.toggleClass('speaking', speaking);
		},

		setVideoEnabled: function(videoEnabled) {
			if (videoEnabled) {
				this.getUI('avatarContainer').addClass('hidden');
				this.getUI('video').removeClass('hidden');

				return;
			}

			var userId = OC.getCurrentUser().uid;
			var guestName = localStorage.getItem("nick");
			this.setAvatar(userId, guestName);

			if (!userId && !this._displayedGuestNameHint) {
				OC.Notification.showTemporary(t('spreed', 'Set your name in the chat window so other participants can identify you better.'));
				this._displayedGuestNameHint = true;
			}

			this.getUI('avatarContainer').removeClass('hidden');
			this.getUI('video').addClass('hidden');
		},

	});

	OCA.Talk.Views.LocalVideoView = LocalVideoView;

})(OCA, Marionette);


/* global Marionette, $ */

/**
 *
 * @copyright Copyright (c) 2018, Daniel Calviño Sánchez (danxuliu@gmail.com)
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
 *
 */

(function(OC, OCA, Marionette, $) {

	'use strict';

	OCA.SpreedMe = OCA.SpreedMe || {};
	OCA.Talk = OCA.Talk || {};
	OCA.SpreedMe.Views = OCA.SpreedMe.Views || {};
	OCA.Talk.Views = OCA.Talk.Views || {};

	var MediaControlsView  = Marionette.View.extend({

		tagName: 'div',
		className: 'nameIndicator',

		template: function(context) {
			// OCA.Talk.Views.Templates may not have been initialized when this
			// view is initialized, so the template can not be directly
			// assigned.
			return OCA.Talk.Views.Templates['mediacontrolsview'](context);
		},

		templateContext: function() {
			return {
				muteAudioButtonTitle: t('spreed', 'Mute audio'),
				hideVideoButtonTitle: t('spreed', 'Disable video'),
				screensharingButtonTitle: t('spreed', 'Share screen'),
				shareScreenButtonTitle: t('spreed', 'Share whole screen'),
				shareWindowButtonTitle: t('spreed', 'Share a single window'),
				showScreenButtonTitle: t('spreed', 'Show your screen'),
				stopScreenButtonTitle: t('spreed', 'Stop screensharing')
			};
		},

		ui: {
			'audioButton': '#mute',
			'videoButton': '#hideVideo',
			'screensharingButton': '#screensharing-button',
			'screensharingMenu': '#screensharing-menu',
			'shareScreenEntry': '#share-screen-entry',
			'shareScreenButton': '#share-screen-button',
			'shareWindowEntry': '#share-window-entry',
			'shareWindowButton': '#share-window-button',
			'showScreenEntry': '#show-screen-entry',
			'showScreenButton': '#show-screen-button',
			'stopScreenEntry': '#stop-screen-entry',
			'stopScreenButton': '#stop-screen-button',
		},

		events: {
			'click @ui.audioButton': 'toggleAudio',
			'click @ui.videoButton': 'toggleVideo',
			'click @ui.screensharingButton': 'toggleScreensharingMenu',
			'click @ui.shareScreenButton': 'shareScreen',
			'click @ui.shareWindowButton': 'shareWindow',
			'click @ui.showScreenButton': 'showScreen',
			'click @ui.stopScreenButton': 'stopScreen',
		},

		initialize: function(options) {
			this._app = options.app;
			this._webrtc = options.webrtc;
			this._sharedScreens = options.sharedScreens;

			this._audioAvailable = true;
			this._videoAvailable = true;

			this.audioEnabled = !localStorage.getItem('audioDisabled');
			this.videoEnabled = !localStorage.getItem('videoDisabled');
		},

		setWebRtc: function(webrtc) {
			this._webrtc = webrtc;
		},

		setSharedScreens: function(sharedScreens) {
			this._sharedScreens = sharedScreens;
		},

		toggleAudio: function() {
			if (!this._audioAvailable) {
				return;
			}

			if (this.audioEnabled) {
				this.setAudioEnabled(false);
				localStorage.setItem('audioDisabled', true);
			} else {
				this.setAudioEnabled(true);
				localStorage.removeItem('audioDisabled');
			}
		},

		setAudioEnabled: function(audioEnabled) {
			if (!this._audioAvailable || !this._webrtc) {
				return;
			}

			if (audioEnabled) {
				this._webrtc.unmute();

				this.getUI('audioButton').attr('data-original-title', t('spreed', 'Mute audio (m)'))
					.removeClass('audio-disabled icon-audio-off')
					.addClass('icon-audio');
			} else {
				this._webrtc.mute();

				this.getUI('audioButton').attr('data-original-title', t('spreed', 'Unmute audio (m)'))
					.addClass('audio-disabled icon-audio-off')
					.removeClass('icon-audio');
			}

			this.audioEnabled = audioEnabled;
		},

		/**
		 * Sets the audio as available or not available.
		 *
		 * "setAudioEnabled(bool)" is expected to be called with the appropriate
		 * value after the audio is set as available.
		 */
		setAudioAvailable: function(audioAvailable) {
			if (audioAvailable) {
				this.getUI('audioButton').removeClass('no-audio-available');
			} else {
				this.getUI('audioButton').removeClass('audio-disabled icon-audio')
					.addClass('no-audio-available icon-audio-off')
					.attr('data-original-title', t('spreed', 'No audio'));
			}

			this._audioAvailable = audioAvailable;
		},

		toggleVideo: function() {
			if (!this._videoAvailable) {
				return;
			}

			if (this.videoEnabled) {
				this._app.setVideoEnabled(false);
				localStorage.setItem('videoDisabled', true);
			} else {
				this._app.setVideoEnabled(true);
				localStorage.removeItem('videoDisabled');
			}
		},

		setVideoEnabled: function(videoEnabled) {
			if (!this._videoAvailable || !this._webrtc) {
				return false;
			}

			if (videoEnabled) {
				this._webrtc.resumeVideo();

				this.getUI('videoButton').attr('data-original-title', t('spreed', 'Disable video (v)'))
					.removeClass('local-video-disabled video-disabled icon-video-off')
					.addClass('icon-video');
				this.getUI('audioButton').removeClass('local-video-disabled');
				this.getUI('screensharingButton').removeClass('local-video-disabled');
			} else {
				this._webrtc.pauseVideo();

				this.getUI('videoButton').attr('data-original-title', this._getEnableVideoButtonTitle())
					.addClass('local-video-disabled video-disabled icon-video-off')
					.removeClass('icon-video');
				this.getUI('audioButton').addClass('local-video-disabled');
				this.getUI('screensharingButton').addClass('local-video-disabled');
			}

			this.videoEnabled = videoEnabled;

			return true;
		},

		_getEnableVideoButtonTitle: function() {
			if (!this._app.signaling || this._app.signaling.getSendVideoIfAvailable()) {
				return t('spreed', 'Enable video (v)');
			}

			return t('spreed', 'Enable video (v) - Your connection will be briefly interrupted when enabling the video for the first time');
		},

		/**
		 * Sets the video as available or not available.
		 *
		 * "setVideoEnabled(bool)" is expected to be called with the appropriate
		 * value after the video is set as available.
		 */
		setVideoAvailable: function(videoAvailable) {
			if (videoAvailable) {
				this.getUI('videoButton').removeClass('no-video-available');
			} else {
				this.getUI('videoButton').removeClass('icon-video')
					.addClass('no-video-available icon-video-off')
					.attr('data-original-title', t('spreed', 'No Camera'));
			}

			this._videoAvailable = videoAvailable;
		},

		toggleScreensharingMenu: function() {
			if (!this._webrtc.capabilities.supportScreenSharing) {
				if (window.location.protocol === 'https:') {
					OC.Notification.showTemporary(t('spreed', 'Screensharing is not supported by your browser.'));
				} else {
					OC.Notification.showTemporary(t('spreed', 'Screensharing requires the page to be loaded through HTTPS.'));
				}
				return;
			}

			// The standard "getDisplayMedia" does not support pre-filtering the
			// type of display sources, so the unified menu is used in that case
			// too.
			var splitShare = false;
			if (window.navigator.userAgent.match('Firefox') && !window.navigator.mediaDevices.getDisplayMedia) {
				var ffver = parseInt(window.navigator.userAgent.match(/Firefox\/(.*)/)[1], 10);
				splitShare = (ffver >= 52);
			}

			if (this._webrtc.getLocalScreen()) {
				this.getUI('shareScreenEntry').addClass('hidden');
				this.getUI('shareWindowEntry').addClass('hidden');
				this.getUI('showScreenEntry').removeClass('hidden');
				this.getUI('stopScreenEntry').removeClass('hidden');
				this.getUI('screensharingMenu').toggleClass('open');
			} else {
				if (splitShare) {
					this.getUI('shareScreenEntry').removeClass('hidden');
					this.getUI('shareWindowEntry').removeClass('hidden');
					this.getUI('showScreenEntry').addClass('hidden');
					this.getUI('stopScreenEntry').addClass('hidden');
					this.getUI('screensharingMenu').toggleClass('open');
					return;
				}

				this.startShareScreen();
			}
		},

		shareScreen: function() {
			if (!this._webrtc.getLocalScreen()) {
				this.startShareScreen('screen');
			}

			this.getUI('screensharingMenu').toggleClass('open', false);
		},

		shareWindow: function() {
			if (!this._webrtc.getLocalScreen()) {
				this.startShareScreen('window');
			}

			this.getUI('screensharingMenu').toggleClass('open', false);
		},

		showScreen: function() {
			if (this._webrtc.getLocalScreen()) {
				var currentUser = this._webrtc.connection.getSessionid();
				this._sharedScreens.switchScreenToId(currentUser);
			}

			this.getUI('screensharingMenu').toggleClass('open', false);
		},

		stopScreen: function() {
			this._webrtc.stopScreenShare();
		},

		startShareScreen: function(mode) {
			this.getUI('screensharingButton').prop('disabled', true);

			this._webrtc.shareScreen(mode, function(err) {
				this.getUI('screensharingButton').prop('disabled', false);
				if (!err) {
					this.getUI('screensharingButton').attr('data-original-title', t('spreed', 'Screensharing options'))
						.removeClass('screensharing-disabled icon-screen-off')
						.addClass('icon-screen');
					return;
				}

				switch (err.name) {
					case 'HTTPS_REQUIRED':
						OC.Notification.showTemporary(t('spreed', 'Screensharing requires the page to be loaded through HTTPS.'));
						break;
					case 'PERMISSION_DENIED':
					case 'NotAllowedError':
					case 'CEF_GETSCREENMEDIA_CANCELED':  // Experimental, may go away in the future.
						break;
					case 'FF52_REQUIRED':
						OC.Notification.showTemporary(t('spreed', 'Sharing your screen only works with Firefox version 52 or newer.'));
						break;
					case 'EXTENSION_UNAVAILABLE':
						var  extensionURL = null;
						if (window.chrome) {// Chrome
							extensionURL = 'https://chrome.google.com/webstore/detail/screensharing-for-nextclo/kepnpjhambipllfmgmbapncekcmabkol';
						}

						if (extensionURL) {
							var text = t('spreed', 'Screensharing extension is required to share your screen.');
							var element = $('<a>').attr('href', extensionURL).attr('target','_blank').text(text);

							OC.Notification.showTemporary(element, {isHTML: true});
						} else {
							OC.Notification.showTemporary(t('spreed', 'Please use a different browser like Firefox or Chrome to share your screen.'));
						}
						break;
					default:
						OC.Notification.showTemporary(t('spreed', 'An error occurred while starting screensharing.'));
						console.log('Could not start screensharing', err);
						break;
				}
			}.bind(this));
		},

		disableScreensharingButton: function() {
			this.getUI('screensharingButton').attr('data-original-title', t('spreed', 'Enable screensharing'))
					.addClass('screensharing-disabled icon-screen-off')
					.removeClass('icon-screen');
			this.getUI('screensharingMenu').toggleClass('open', false);
		},

		hideScreensharingButton: function() {
			this.getUI('screensharingButton').addClass('hidden');
		},

	});

	OCA.SpreedMe.Views.MediaControlsView = MediaControlsView;

})(OC, OCA, Marionette, $);


/* global OC, OCA */

/**
 * @copyright (c) 2016 Joas Schilling <coding@schilljs.com>
 *
 * @author Joas Schilling <coding@schilljs.com>
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 */

(function(OC, OCA) {

	OCA.SpreedMe.Views.RichObjectStringParser = {

		/**
		 * @param {string} subject
		 * @param {Object} parameters
		 * @returns {string}
		 */
		parseMessage: function(subject, parameters) {
			var self = this,
				regex = /\{([a-z0-9-]+)\}/gi,
				matches = subject.match(regex);

			_.each(matches, function(parameter) {
				parameter = parameter.substring(1, parameter.length - 1);
				if (!parameters.hasOwnProperty(parameter) || !parameters[parameter]) {
					// Malformed translation?
					console.error('Potential malformed ROS string: parameter {' + parameter + '} was found in the string but is missing from the parameter list');
					return;
				}

				var parsed = self.parseParameter(parameters[parameter]);
				subject = subject.replace('{' + parameter + '}', parsed);
			});

			return subject;
		},

		/**
		 * @param {Object} parameter
		 * @param {string} parameter.type
		 * @param {string} parameter.id
		 * @param {string} parameter.name
		 * @param {string} parameter.link
		 */
		parseParameter: function(parameter) {
			switch (parameter.type) {
				case 'user':
					if (!this.userLocalTemplate) {
						this.userLocalTemplate = OCA.Talk.Views.Templates['richobjectstringparser_userlocal'];
					}
					if (!parameter.name) {
						parameter.name = parameter.id;
					}
					if (OC.getCurrentUser().uid === parameter.id) {
						parameter.isCurrentUser = true;
					}
					return this.userLocalTemplate(parameter);

				case 'call':
					if (!this.callTemplate) {
						this.callTemplate = OCA.Talk.Views.Templates['richobjectstringparser_call'];
					}

					return this.callTemplate(parameter);

				case 'file':
					if (!this.filePreviewTemplate) {
						this.filePreviewTemplate = OCA.Talk.Views.Templates['richobjectstringparser_filepreview'];
					}
					return this.filePreviewTemplate(parameter);

				default:
					if (!_.isUndefined(parameter.link)) {
						if (!this.unknownLinkTemplate) {
							this.unknownLinkTemplate = OCA.Talk.Views.Templates['richobjectstringparser_unknownlink'];
						}
						return this.unknownLinkTemplate(parameter);
					}

					if (!this.unknownTemplate) {
						this.unknownTemplate = OCA.Talk.Views.Templates['richobjectstringparser_unknown'];
					}
					return this.unknownTemplate(parameter);
			}
		}

	};

})(OC, OCA);


/* global Marionette */

/**
 *
 * @copyright Copyright (c) 2019, Daniel Calviño Sánchez (danxuliu@gmail.com)
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
 *
 */

(function(OCA, Marionette) {

	'use strict';

	OCA.SpreedMe = OCA.SpreedMe || {};
	OCA.Talk = OCA.Talk || {};
	OCA.SpreedMe.Views = OCA.SpreedMe.Views || {};
	OCA.Talk.Views = OCA.Talk.Views || {};

	var ScreenView = Marionette.View.extend({

		tagName: 'div',
		className: 'screenContainer',

		id: function() {
			return this.options.peerId? 'container_' + this.options.peerId + '_screen_incoming': 'localScreenContainer';
		},

		template: function(context) {
			// OCA.Talk.Views.Templates may not have been initialized when this
			// view is initialized, so the template can not be directly
			// assigned.
			return OCA.Talk.Views.Templates['screenview'](context);
		},

		ui: {
			'video': 'video',
			'nameIndicator': '.nameIndicator',
		},

		initialize: function(options) {
			this.render();

			if (!options.peerId) {
				this.getUI('nameIndicator').text(t('spreed', 'Your screen'));
			}
		},

		setParticipantName: function(participantName) {
			if (!this.options.peerId) {
				return;
			}

			var nameIndicator;
			if (participantName) {
				nameIndicator = t('spreed', "{participantName}'s screen", {participantName: participantName});
			} else {
				nameIndicator = t('spreed', "Guest's screen");
			}

			this.getUI('nameIndicator').text(nameIndicator);
		},

		/**
		 * Sets the element with the video stream.
		 *
		 * @param {HTMLVideoElement|null} videoElement the element to set, or null
		 *        to remove the current one.
		 */
		setVideoElement: function(videoElement) {
			this.getUI('video').remove();

			if (videoElement) {
				this.$el.prepend(videoElement);

				videoElement.oncontextmenu = function() {
					return false;
				};
			}

			this.bindUIElements();
		},

	});

	OCA.Talk.Views.ScreenView = ScreenView;

})(OCA, Marionette);


(function() {
  var template = Handlebars.template, templates = OCA.Talk.Views.Templates = OCA.Talk.Views.Templates || {};
templates['callbutton'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "	<button class=\"leave-call primary\">"
    + container.escapeExpression(((helper = (helper = helpers.leaveCallText || (depth0 != null ? depth0.leaveCallText : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"leaveCallText","hash":{},"data":data}) : helper)))
    + "<span class=\"icon icon-loading-small hidden\"></span></button>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.isReadOnly : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.program(6, data, 0),"data":data})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "		<button class=\"join-call primary has-tooltip\" title=\""
    + alias4(((helper = (helper = helpers.readOnlyText || (depth0 != null ? depth0.readOnlyText : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"readOnlyText","hash":{},"data":data}) : helper)))
    + "\" disabled=\"\">"
    + alias4(((helper = (helper = helpers.startCallText || (depth0 != null ? depth0.startCallText : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"startCallText","hash":{},"data":data}) : helper)))
    + "</button>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.hasCall : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.program(9, data, 0),"data":data})) != null ? stack1 : "");
},"7":function(container,depth0,helpers,partials,data) {
    var helper;

  return "			<button class=\"join-call call-ongoing primary\">"
    + container.escapeExpression(((helper = (helper = helpers.joinCallText || (depth0 != null ? depth0.joinCallText : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"joinCallText","hash":{},"data":data}) : helper)))
    + "<span class=\"icon icon-loading-small hidden\"></span></button>\n";
},"9":function(container,depth0,helpers,partials,data) {
    var helper;

  return "			<button class=\"join-call primary\">"
    + container.escapeExpression(((helper = (helper = helpers.startCallText || (depth0 != null ? depth0.startCallText : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"startCallText","hash":{},"data":data}) : helper)))
    + "<span class=\"icon icon-loading-small hidden\"></span></button>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.isInCall : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});
templates['callinfoview'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "	<a class=\"file-link\" href=\""
    + alias4(((helper = (helper = helpers.fileLink || (depth0 != null ? depth0.fileLink : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fileLink","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\" rel=\"noopener noreferrer\" data-original-title=\""
    + alias4(((helper = (helper = helpers.fileLinkTitle || (depth0 != null ? depth0.fileLinkTitle : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fileLinkTitle","hash":{},"data":data}) : helper)))
    + "\">\n		<span class=\"icon icon-file\"></span>\n	</a>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "	<div class=\"share-link-options\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.canFullModerate : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isPublic : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	</div>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "		<input name=\"link-checkbox\" id=\"link-checkbox\" class=\"checkbox link-checkbox\" value=\"1\" "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isPublic : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " type=\"checkbox\">\n		<label for=\"link-checkbox\" class=\"link-checkbox-label\">"
    + container.escapeExpression(((helper = (helper = helpers.linkCheckboxLabel || (depth0 != null ? depth0.linkCheckboxLabel : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"linkCheckboxLabel","hash":{},"data":data}) : helper)))
    + "</label>\n";
},"5":function(container,depth0,helpers,partials,data) {
    return " checked=\"checked\"";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "		<div class=\"clipboard-button\"><span class=\"button icon-clippy\"></span></div>\n		<div class=\"password-button\">\n			<span class=\"button "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.hasPassword : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.program(10, data, 0),"data":data})) != null ? stack1 : "")
    + "\"></span>\n			<div class=\"popovermenu password-menu menu-right\">\n				<ul>\n					<li>\n						<span class=\"menuitem "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.hasPassword : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.program(10, data, 0),"data":data})) != null ? stack1 : "")
    + " password-option\">\n							<form class=\"password-form\">\n								<input class=\"password-input\" required maxlength=\"200\" type=\"password\"\n									placeholder=\""
    + container.escapeExpression(((helper = (helper = helpers.passwordInputPlaceholder || (depth0 != null ? depth0.passwordInputPlaceholder : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"passwordInputPlaceholder","hash":{},"data":data}) : helper)))
    + "\">\n								<input type=\"submit\" value=\"\" autocomplete=\"new-password\" class=\"icon icon-confirm password-confirm\"></input>\n							</form>\n						</span>\n					</li>\n				</ul>\n			</div>\n		</div>\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "icon-password";
},"10":function(container,depth0,helpers,partials,data) {
    return "icon-no-password";
},"12":function(container,depth0,helpers,partials,data) {
    return "	<div class=\"share-link-options\">\n		<div class=\"clipboard-button\"><span class=\"button icon-clippy\"></span></div>\n	</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"room-name-container\">\n	<div class=\"room-name\"></div>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isRoomForFile : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n<div class=\"call-controls-container\">\n	<div class=\"call-button\"></div>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.canModerate : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.showShareLink : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true});
templates['chatview'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<ul class=\"comments\"></ul>\n<div class=\"emptycontent\">\n	<div class=\"icon-comment\"></div>\n	<p>"
    + container.escapeExpression(((helper = (helper = helpers.emptyResultLabel || (depth0 != null ? depth0.emptyResultLabel : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"emptyResultLabel","hash":{},"data":data}) : helper)))
    + "</p>\n</div>\n<div class=\"loading hidden\" style=\"height: 50px\"></div>\n";
},"useData":true});
templates['chatview_add_comment'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "		<div class=\"author\">"
    + container.escapeExpression(((helper = (helper = helpers.actorDisplayName || (depth0 != null ? depth0.actorDisplayName : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"actorDisplayName","hash":{},"data":data}) : helper)))
    + "</div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "		<div class=\"guest-name\"></div>\n";
},"5":function(container,depth0,helpers,partials,data) {
    return " with-add-button";
},"7":function(container,depth0,helpers,partials,data) {
    return "false";
},"9":function(container,depth0,helpers,partials,data) {
    return "true";
},"11":function(container,depth0,helpers,partials,data) {
    return "disabled=\"\"";
},"13":function(container,depth0,helpers,partials,data) {
    var helper;

  return "		<button class=\"share icon-add has-tooltip\" title=\""
    + container.escapeExpression(((helper = (helper = helpers.shareText || (depth0 != null ? depth0.shareText : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"shareText","hash":{},"data":data}) : helper)))
    + "\"></button>\n		<div class=\"shareLoading icon-loading-small hidden\"></div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"newCommentRow comment\">\n	<div class=\"authorRow currentUser\">\n		<div class=\"avatar\" data-user-id=\""
    + alias4(((helper = (helper = helpers.actorId || (depth0 != null ? depth0.actorId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"actorId","hash":{},"data":data}) : helper)))
    + "\"></div>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.actorId : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "	</div>\n	<form class=\"newCommentForm"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.canShare : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\n		<div contentEditable=\""
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isReadOnly : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.program(9, data, 0),"data":data})) != null ? stack1 : "")
    + "\" class=\"message\" data-placeholder=\""
    + alias4(((helper = (helper = helpers.newMessagePlaceholder || (depth0 != null ? depth0.newMessagePlaceholder : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"newMessagePlaceholder","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"message","hash":{},"data":data}) : helper)))
    + "</div>\n		<input class=\"submit icon-confirm has-tooltip\" type=\"submit\" "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isReadOnly : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " value=\"\" title=\""
    + alias4(((helper = (helper = helpers.submitText || (depth0 != null ? depth0.submitText : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"submitText","hash":{},"data":data}) : helper)))
    + "\"/>\n		<div class=\"submitLoading icon-loading-small hidden\"></div>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.canShare : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	</form>\n</div>\n";
},"useData":true});
templates['chatview_comment'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "";
},"3":function(container,depth0,helpers,partials,data) {
    return " systemMessage";
},"5":function(container,depth0,helpers,partials,data) {
    return " currentUser";
},"7":function(container,depth0,helpers,partials,data) {
    return " guestUser";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "		<div class=\"avatar\" data-user-id=\""
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isGuest : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(10, data, 0),"data":data})) != null ? stack1 : "")
    + "\" data-user-display-name=\""
    + alias4(((helper = (helper = helpers.actorDisplayName || (depth0 != null ? depth0.actorDisplayName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"actorDisplayName","hash":{},"data":data}) : helper)))
    + "\"></div>\n		<div class=\"author\">"
    + alias4(((helper = (helper = helpers.actorDisplayName || (depth0 != null ? depth0.actorDisplayName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"actorDisplayName","hash":{},"data":data}) : helper)))
    + "</div>\n";
},"10":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.actorId || (depth0 != null ? depth0.actorId : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"actorId","hash":{},"data":data}) : helper)));
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<li class=\"comment"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isNotSystemMessage : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\" data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n	<div class=\"authorRow"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isUserAuthor : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isGuest : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isNotSystemMessage : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	</div>\n	<div class=\"contentRow\">\n		<div class=\"message\">"
    + ((stack1 = ((helper = (helper = helpers.formattedMessage || (depth0 != null ? depth0.formattedMessage : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"formattedMessage","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</div>\n		<div class=\"date has-tooltip\" data-timestamp=\""
    + alias4(((helper = (helper = helpers.timestamp || (depth0 != null ? depth0.timestamp : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"timestamp","hash":{},"data":data}) : helper)))
    + "\" title=\""
    + alias4(((helper = (helper = helpers.altDate || (depth0 != null ? depth0.altDate : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"altDate","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.date || (depth0 != null ? depth0.date : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"date","hash":{},"data":data}) : helper)))
    + "</div>\n	</div>\n</li>\n";
},"useData":true});
templates['collectionsview'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"collectionsView\"></div>\n";
},"useData":true});
templates['editabletextlabel'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "	<div class=\"edit-button\"><span class=\"icon button icon-rename\" "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.buttonTitle : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "></span></div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var helper;

  return " title=\""
    + container.escapeExpression(((helper = (helper = helpers.buttonTitle || (depth0 != null ? depth0.buttonTitle : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"buttonTitle","hash":{},"data":data}) : helper)))
    + "\" ";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"input-wrapper hidden-important\">\n	<input class=\"username\" "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.inputMaxLength : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " type=\"text\" value=\""
    + container.escapeExpression(((helper = (helper = helpers.inputValue || (depth0 != null ? depth0.inputValue : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"inputValue","hash":{},"data":data}) : helper)))
    + "\" "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.inputPlaceholder : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n	<input type=\"submit\" value=\"\" class=\"icon icon-confirm confirm-button\"></div>\n</div>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var helper;

  return " maxlength=\""
    + container.escapeExpression(((helper = (helper = helpers.inputMaxLength || (depth0 != null ? depth0.inputMaxLength : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"inputMaxLength","hash":{},"data":data}) : helper)))
    + "\" ";
},"7":function(container,depth0,helpers,partials,data) {
    var helper;

  return " placeholder=\""
    + container.escapeExpression(((helper = (helper = helpers.inputPlaceholder || (depth0 != null ? depth0.inputPlaceholder : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"inputPlaceholder","hash":{},"data":data}) : helper)))
    + "\" ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"label-wrapper\">\n	<"
    + alias4(((helper = (helper = helpers.labelTagName || (depth0 != null ? depth0.labelTagName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelTagName","hash":{},"data":data}) : helper)))
    + " class=\"label\">"
    + alias4(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data}) : helper)))
    + "</"
    + alias4(((helper = (helper = helpers.labelTagName || (depth0 != null ? depth0.labelTagName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelTagName","hash":{},"data":data}) : helper)))
    + ">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.editionEnabled : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.editionEnabled : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
templates['localvideoview'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<video id=\"localVideo\"></video>\n<div class=\"avatar-container hidden\">\n	<div class=\"avatar\"></div>\n</div>\n<div class=\"nameIndicator\"></div>\n";
},"useData":true});
templates['mediacontrolsview'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<button id=\"mute\" class=\"icon-audio force-icon-white-in-call icon-shadow\" data-placement=\"top\" data-toggle=\"tooltip\" data-original-title=\""
    + alias4(((helper = (helper = helpers.muteAudioButtonTitle || (depth0 != null ? depth0.muteAudioButtonTitle : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"muteAudioButtonTitle","hash":{},"data":data}) : helper)))
    + "\"></button>\n<button id=\"hideVideo\" class=\"icon-video force-icon-white-in-call icon-shadow\" data-placement=\"top\" data-toggle=\"tooltip\" data-original-title=\""
    + alias4(((helper = (helper = helpers.hideVideoButtonTitle || (depth0 != null ? depth0.hideVideoButtonTitle : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"hideVideoButtonTitle","hash":{},"data":data}) : helper)))
    + "\"></button>\n<button id=\"screensharing-button\" class=\"app-navigation-entry-utils-menu-button icon-screen-off force-icon-white-in-call icon-shadow screensharing-disabled\" data-placement=\"top\" data-toggle=\"tooltip\" data-original-title=\""
    + alias4(((helper = (helper = helpers.screensharingButtonTitle || (depth0 != null ? depth0.screensharingButtonTitle : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"screensharingButtonTitle","hash":{},"data":data}) : helper)))
    + "\"></button>\n<div id=\"screensharing-menu\" class=\"app-navigation-entry-menu\">\n	<ul>\n		<li id=\"share-screen-entry\">\n			<button id=\"share-screen-button\">\n				<span class=\"icon-screen\"></span>\n				<span>"
    + alias4(((helper = (helper = helpers.shareScreenButtonTitle || (depth0 != null ? depth0.shareScreenButtonTitle : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"shareScreenButtonTitle","hash":{},"data":data}) : helper)))
    + "</span>\n			</button>\n		</li>\n		<li id=\"share-window-entry\">\n			<button id=\"share-window-button\">\n				<span class=\"icon-share-window\"></span>\n				<span>"
    + alias4(((helper = (helper = helpers.shareWindowButtonTitle || (depth0 != null ? depth0.shareWindowButtonTitle : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"shareWindowButtonTitle","hash":{},"data":data}) : helper)))
    + "</span>\n			</button>\n		</li>\n		<li id=\"show-screen-entry\">\n			<button id=\"show-screen-button\">\n				<span class=\"icon-screen\"></span>\n				<span>"
    + alias4(((helper = (helper = helpers.showScreenButtonTitle || (depth0 != null ? depth0.showScreenButtonTitle : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"showScreenButtonTitle","hash":{},"data":data}) : helper)))
    + "</span>\n			</button>\n		</li>\n		<li id=\"stop-screen-entry\">\n			<button id=\"stop-screen-button\">\n				<span class=\"icon-screen-off\"></span>\n				<span>"
    + alias4(((helper = (helper = helpers.stopScreenButtonTitle || (depth0 != null ? depth0.stopScreenButtonTitle : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"stopScreenButtonTitle","hash":{},"data":data}) : helper)))
    + "</span>\n			</button>\n		</li>\n	</ul>\n</div>\n";
},"useData":true});
templates['participantlistview'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<span class=\"participant-moderator-indicator\">"
    + container.escapeExpression(((helper = (helper = helpers.moderatorIndicator || (depth0 != null ? depth0.moderatorIndicator : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"moderatorIndicator","hash":{},"data":data}) : helper)))
    + "</span>";
},"3":function(container,depth0,helpers,partials,data) {
    return "<span class=\"icon icon-video\"></span>";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"participant-entry-utils\">\n	<ul>\n		<li class=\"participant-entry-utils-menu-button\">\n			<button class=\"icon icon-more\"></button>\n			<span class=\"icon icon-loading-small hidden\"></span>\n		</li>\n	</ul>\n</div>\n<div class=\"popovermenu bubble menu\">\n	<ul class=\"popovermenu-list\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.canBeDemoted : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.program(8, data, 0),"data":data})) != null ? stack1 : "")
    + "		<li>\n			<button class=\"remove-participant\">\n				<span class=\"icon icon-delete\"></span>\n				<span>"
    + container.escapeExpression(((helper = (helper = helpers.removeParticipantText || (depth0 != null ? depth0.removeParticipantText : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"removeParticipantText","hash":{},"data":data}) : helper)))
    + "</span>\n			</button>\n		</li>\n	</ul>\n</div>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var helper;

  return "		<li>\n			<button class=\"demote-moderator\">\n				<span class=\"icon icon-rename\"></span>\n				<span>"
    + container.escapeExpression(((helper = (helper = helpers.demoteModeratorText || (depth0 != null ? depth0.demoteModeratorText : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"demoteModeratorText","hash":{},"data":data}) : helper)))
    + "</span>\n			</button>\n		</li>\n";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.canBePromoted : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"9":function(container,depth0,helpers,partials,data) {
    var helper;

  return "		<li>\n			<button class=\"promote-moderator\">\n				<span class=\"icon icon-rename\"></span>\n				<span>"
    + container.escapeExpression(((helper = (helper = helpers.promoteModeratorText || (depth0 != null ? depth0.promoteModeratorText : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"promoteModeratorText","hash":{},"data":data}) : helper)))
    + "</span>\n			</button>\n		</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<a class=\"participant-entry-link\" href=\"#\" data-sessionId=\""
    + alias4(((helper = (helper = helpers.sessionId || (depth0 != null ? depth0.sessionId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"sessionId","hash":{},"data":data}) : helper)))
    + "\">\n	<div class=\"avatar\"></div>\n	"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\n	"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.participantIsOwner : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n	"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.participantIsModerator : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n	"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.participantIsGuestModerator : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n	"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.inCall : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n</a>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.canModerate : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
templates['participantview'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<form class=\"oca-spreedme-add-person\">\n	<input class=\"add-person-input\" type=\"text\" placeholder=\""
    + container.escapeExpression(((helper = (helper = helpers.addParticipantInputPlaceholder || (depth0 != null ? depth0.addParticipantInputPlaceholder : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"addParticipantInputPlaceholder","hash":{},"data":data}) : helper)))
    + "\"/>\n</form>\n<ul class=\"participantWithList\">\n</ul>\n";
},"useData":true});
templates['richobjectstringparser_call'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<span class=\"atwho-inserted\" contenteditable=\"false\"><span class=\"mention-call avatar-name-wrapper currentUser\"><span class=\"avatar icon icon-contacts\" data-user-id=\"all\"></span><strong>"
    + container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"name","hash":{},"data":data}) : helper)))
    + "</strong></span></span>\n";
},"useData":true});
templates['richobjectstringparser_filepreview'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<a href=\""
    + alias4(((helper = (helper = helpers.link || (depth0 != null ? depth0.link : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"link","hash":{},"data":data}) : helper)))
    + "\" class=\"filePreviewContainer\" target=\"_blank\" rel=\"noopener noreferrer\">\n	<span class=\"filePreview\" data-file-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" data-mimetype=\""
    + alias4(((helper = (helper = helpers.mimetype || (depth0 != null ? depth0.mimetype : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"mimetype","hash":{},"data":data}) : helper)))
    + "\" data-preview-available=\""
    + alias4(((helper = (helper = helpers["preview-available"] || (depth0 != null ? depth0["preview-available"] : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"preview-available","hash":{},"data":data}) : helper)))
    + "\"></span>\n	<strong>"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</strong>\n</a>\n";
},"useData":true});
templates['richobjectstringparser_unknown'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<strong>"
    + container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"name","hash":{},"data":data}) : helper)))
    + "</strong>\n";
},"useData":true});
templates['richobjectstringparser_unknownlink'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<a href=\""
    + alias4(((helper = (helper = helpers.link || (depth0 != null ? depth0.link : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"link","hash":{},"data":data}) : helper)))
    + "\" class=\"external\" target=\"_blank\" rel=\"noopener noreferrer\"><strong>"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</strong></a>\n";
},"useData":true});
templates['richobjectstringparser_userlocal'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "currentUser";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<span class=\"atwho-inserted\" contenteditable=\"false\"><span class=\"mention-user avatar-name-wrapper "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isCurrentUser : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\"><span class=\"avatar\" data-user-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" data-user-display-name=\""
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\"></span><strong>"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</strong></span></span>\n";
},"useData":true});
templates['roomlistview'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "	<div class=\"favorite-mark\">\n		<span class=\"icon icon-favorite\" />\n		<span class=\"hidden-visually\">"
    + container.escapeExpression(((helper = (helper = helpers.favoriteMarkText || (depth0 != null ? depth0.favoriteMarkText : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"favoriteMarkText","hash":{},"data":data}) : helper)))
    + "</span>\n	</div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "<li class=\"app-navigation-entry-utils-counter highlighted\"><span>@</span></li>";
},"5":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<li class=\"app-navigation-entry-utils-counter\"><span>"
    + container.escapeExpression(((helper = (helper = helpers.numUnreadMessages || (depth0 != null ? depth0.numUnreadMessages : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"numUnreadMessages","hash":{},"data":data}) : helper)))
    + "</span></li>";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.isFavorite : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.program(10, data, 0),"data":data})) != null ? stack1 : "");
},"8":function(container,depth0,helpers,partials,data) {
    var helper;

  return "		<li>\n			<button class=\"unfavorite-room-button\">\n				<span class=\"icon-star-dark\"></span>\n				<span>"
    + container.escapeExpression(((helper = (helper = helpers.unfavoriteRoomText || (depth0 != null ? depth0.unfavoriteRoomText : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"unfavoriteRoomText","hash":{},"data":data}) : helper)))
    + "</span>\n			</button>\n		</li>\n";
},"10":function(container,depth0,helpers,partials,data) {
    var helper;

  return "		<li>\n			<button class=\"favorite-room-button\">\n				<span class=\"icon-starred\"></span>\n				<span>"
    + container.escapeExpression(((helper = (helper = helpers.favoriteRoomText || (depth0 != null ? depth0.favoriteRoomText : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"favoriteRoomText","hash":{},"data":data}) : helper)))
    + "</span>\n			</button>\n		</li>\n";
},"12":function(container,depth0,helpers,partials,data) {
    return " class=\"active\"";
},"14":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "		<li>\n			<button class=\"remove-room-button\">\n				<span class=\""
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isDeletable : depth0),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.program(17, data, 0),"data":data})) != null ? stack1 : "")
    + "\"></span>\n				<span>"
    + container.escapeExpression(((helper = (helper = helpers.leaveConversationText || (depth0 != null ? depth0.leaveConversationText : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"leaveConversationText","hash":{},"data":data}) : helper)))
    + "</span>\n			</button>\n		</li>\n";
},"15":function(container,depth0,helpers,partials,data) {
    return "icon-close";
},"17":function(container,depth0,helpers,partials,data) {
    return "icon-delete";
},"19":function(container,depth0,helpers,partials,data) {
    var helper;

  return "		<li>\n			<button class=\"delete-room-button\">\n				<span class=\"icon-delete\"></span>\n				<span>"
    + container.escapeExpression(((helper = (helper = helpers.deleteConversationText || (depth0 != null ? depth0.deleteConversationText : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"deleteConversationText","hash":{},"data":data}) : helper)))
    + "</span>\n			</button>\n		</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<a class=\"app-navigation-entry-link\" href=\"#"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" data-token=\""
    + alias4(((helper = (helper = helpers.token || (depth0 != null ? depth0.token : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"token","hash":{},"data":data}) : helper)))
    + "\">\n	<div class=\"avatar "
    + alias4(((helper = (helper = helpers.icon || (depth0 != null ? depth0.icon : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"icon","hash":{},"data":data}) : helper)))
    + "\" data-user=\""
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\" data-user-display-name=\""
    + alias4(((helper = (helper = helpers.displayName || (depth0 != null ? depth0.displayName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"displayName","hash":{},"data":data}) : helper)))
    + "\"></div>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isFavorite : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	"
    + alias4(((helper = (helper = helpers.displayName || (depth0 != null ? depth0.displayName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"displayName","hash":{},"data":data}) : helper)))
    + "\n</a>\n<div class=\"app-navigation-entry-utils\">\n	<ul>\n		"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.unreadMention : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n		"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.unreadMessages : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n		<li class=\"app-navigation-entry-utils-menu-button\"><button></button></li>\n	</ul>\n</div>\n<div class=\"app-navigation-entry-menu\">\n	<ul class=\"app-navigation-entry-menu-list\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.canFavorite : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		<li>\n			<button class=\"clipboard-button\">\n				<span class=\"icon-clippy\"></span>\n				<span>"
    + alias4(((helper = (helper = helpers.copyLinkText || (depth0 != null ? depth0.copyLinkText : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"copyLinkText","hash":{},"data":data}) : helper)))
    + "</span>\n			</button>\n		</li>\n		<li><div class=\"separator\"></div></li>\n		<li"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.notifyAlways : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n			<button class=\"notify-always-button\">\n				<span class=\"icon-sound\"></span>\n				<span>"
    + alias4(((helper = (helper = helpers.notifyAlwaysText || (depth0 != null ? depth0.notifyAlwaysText : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"notifyAlwaysText","hash":{},"data":data}) : helper)))
    + "</span>\n			</button>\n		</li>\n		<li"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.notifyMention : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n			<button class=\"notify-mention-button\">\n				<span class=\"icon-user\"></span>\n				<span>"
    + alias4(((helper = (helper = helpers.notifyMentionText || (depth0 != null ? depth0.notifyMentionText : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"notifyMentionText","hash":{},"data":data}) : helper)))
    + "</span>\n			</button>\n		</li>\n		<li"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.notifyNever : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n			<button class=\"notify-never-button\">\n				<span class=\"icon-sound-off\"></span>\n				<span>"
    + alias4(((helper = (helper = helpers.notifyNeverText || (depth0 != null ? depth0.notifyNeverText : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"notifyNeverText","hash":{},"data":data}) : helper)))
    + "</span>\n			</button>\n		</li>\n		<li><div class=\"separator\"></div></li>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isLeavable : depth0),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isDeletable : depth0),{"name":"if","hash":{},"fn":container.program(19, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	</ul>\n</div>\n";
},"useData":true});
templates['screenview'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"nameIndicator\"></div>\n";
},"useData":true});
templates['sidebarview'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div id=\"app-sidebar-trigger\" class=\"icon-menu-people force-icon-white-in-call icon-shadow\">\n</div>\n<div id=\"app-sidebar\" class=\"detailsView\">\n	<div class=\"detailCallInfoContainer\">\n	</div>\n	<div class=\"tabs\">\n	</div>\n	<a class=\"close icon-close\" href=\"#\"><span class=\"hidden-visually\">"
    + container.escapeExpression(((helper = (helper = helpers.closeLabel || (depth0 != null ? depth0.closeLabel : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"closeLabel","hash":{},"data":data}) : helper)))
    + "</span></a>\n</div>\n";
},"useData":true});
templates['tabview'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"tabHeaders\">\n</div>\n<div class=\"tabsContainer\">\n	<div class=\"tab\">\n	</div>\n</div>\n";
},"useData":true});
templates['tabview_header'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<span class=\"icon "
    + alias4(((helper = (helper = helpers.icon || (depth0 != null ? depth0.icon : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"icon","hash":{},"data":data}) : helper)))
    + "\"></span>\n<a href=\"#\">"
    + alias4(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data}) : helper)))
    + "</a>\n";
},"useData":true});
templates['videoview'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"avatar-container\">\n	<div class=\"avatar\"></div>\n</div>\n<div class=\"nameIndicator\"></div>\n<div class=\"mediaIndicator\">\n	<button class=\"muteIndicator force-icon-white-in-call icon-shadow icon-audio-off audio-on\" disabled=\"true\"/>\n	<button class=\"hideRemoteVideo force-icon-white-in-call icon-shadow icon-video\"/>\n	<button class=\"screensharingIndicator force-icon-white-in-call icon-shadow icon-screen screen-off\"/>\n	<button class=\"iceFailedIndicator force-icon-white-in-call icon-shadow icon-error not-failed\" disabled=\"true\"/>\n</div>\n";
},"useData":true});
})();

/* global Marionette */

/**
 *
 * @copyright Copyright (c) 2019, Daniel Calviño Sánchez (danxuliu@gmail.com)
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
 *
 */

(function(OCA, Marionette) {

	'use strict';

	OCA.SpreedMe = OCA.SpreedMe || {};
	OCA.Talk = OCA.Talk || {};
	OCA.SpreedMe.Views = OCA.SpreedMe.Views || {};
	OCA.Talk.Views = OCA.Talk.Views || {};

	var ConnectionStatus = {
		NEW: 'new',
		CHECKING: 'checking',
		CONNECTED: 'connected',
		COMPLETED: 'completed',
		DISCONNECTED: 'disconnected',
		DISCONNECTED_LONG: 'disconnected-long',
		FAILED: 'failed',
		FAILED_NO_RESTART: 'failed-no-restart',
		CLOSED: 'closed',
	};

	var VideoView = Marionette.View.extend({

		tagName: 'div',
		className: 'videoContainer',

		id: function() {
			return 'container_' + this.options.peerId + '_video_incoming';
		},

		template: OCA.Talk.Views.Templates['videoview'],

		ui: {
			'audio': 'audio',
			'video': 'video',
			'avatarContainer': '.avatar-container',
			'avatar': '.avatar',
			'nameIndicator': '.nameIndicator',
			'mediaIndicator': '.mediaIndicator',
			'muteIndicator': '.muteIndicator',
			'hideRemoteVideoButton': '.hideRemoteVideo',
			'screenSharingIndicator': '.screensharingIndicator',
			'iceFailedIndicator': '.iceFailedIndicator',
		},

		events: {
			'click @ui.hideRemoteVideoButton': 'toggleVideo',
			'click @ui.screenSharingIndicator': 'switchToScreen',
		},

		initialize: function() {
			this._connectionStatus = ConnectionStatus.NEW;

			// Video is enabled by default, even if it is not initially
			// available.
			this._videoEnabled = true;
			this._screenVisible = false;

			this.render();

			this.$el.addClass('not-connected');

			this.getUI('avatar').addClass('icon-loading');

			this.getUI('hideRemoteVideoButton').attr('data-original-title', t('spreed', 'Disable video'));
			this.getUI('hideRemoteVideoButton').addClass('hidden');

			this.getUI('screenSharingIndicator').attr('data-original-title', t('spreed', 'Show screen'));
		},

		onRender: function() {
			this.getUI('hideRemoteVideoButton').tooltip({
				placement: 'top',
				trigger: 'hover'
			});

			this.getUI('screenSharingIndicator').tooltip({
				placement: 'top',
				trigger: 'hover'
			});
		},

		setParticipant: function(userId, participantName) {
			// Needed for guest avatars, as if no name is given the avatar
			// should show "?" instead of the first letter of the "Guest"
			// placeholder.
			var rawParticipantName = participantName;

			// "Guest" placeholder is not shown until the initial connection for
			// consistency with regular users.
			if (!(userId && userId.length) && this._connectionStatus !== ConnectionStatus.NEW) {
				participantName = participantName || t('spreed', 'Guest');
			}

			if (this.hasOwnProperty('_userId') && this.hasOwnProperty('_rawParticipantName') && this.hasOwnProperty('_participantName') &&
					userId === this._userId && rawParticipantName === this._rawParticipantName && participantName === this._participantName) {
				// Do not set again the avatar if it has already been set to
				// workaround the MCU setting the participant again and again
				// and thus causing a loading icon to be shown on the avatar
				// again and again.
				return;
			}

			this._userId = userId;
			this._rawParticipantName = rawParticipantName;
			this._participantName = participantName;

			if (userId && userId.length) {
				this.getUI('avatar').avatar(userId, 128);
			} else {
				this.getUI('avatar').imageplaceholder('?', rawParticipantName, 128);
				this.getUI('avatar').css('background-color', '#b9b9b9');
			}

			this.getUI('nameIndicator').text(participantName);
		},

		/**
		 * Sets the current status of the connection.
		 *
		 * @param OCA.Talk.Views.VideoView.ConnectionStatus the connection
		 *        status.
		 */
		setConnectionStatus: function(connectionStatus) {
			this._connectionStatus = connectionStatus;

			this.$el.addClass('not-connected');

			this.getUI('iceFailedIndicator').addClass('not-failed');

			if (connectionStatus === ConnectionStatus.CHECKING ||
					connectionStatus === ConnectionStatus.DISCONNECTED_LONG ||
					connectionStatus === ConnectionStatus.FAILED) {
				this.getUI('avatar').addClass('icon-loading');

				return;
			}

			this.getUI('avatar').removeClass('icon-loading');

			if (connectionStatus === ConnectionStatus.CONNECTED ||
					connectionStatus === ConnectionStatus.COMPLETED) {
				this.$el.removeClass('not-connected');

				return;
			}

			if (connectionStatus === ConnectionStatus.FAILED_NO_RESTART) {
				this.getUI('muteIndicator').addClass('hidden');
				this.getUI('hideRemoteVideoButton').addClass('hidden');
				this.getUI('screenSharingIndicator').addClass('hidden');
				this.getUI('iceFailedIndicator').removeClass('not-failed');

				return;
			}
		},

		/**
		 * Sets the element with the audio stream.
		 *
		 * @param HTMLVideoElement|null audioElement the element to set, or null
		 *        to remove the current one.
		 */
		setAudioElement: function(audioElement) {
			this.getUI('audio').remove();

			if (audioElement) {
				this.$el.prepend(audioElement);
			}

			this.bindUIElements();

			this.getUI('audio').addClass('hidden');
		},

		setAudioAvailable: function(audioAvailable) {
			if (!audioAvailable) {
				this.getUI('muteIndicator')
						.removeClass('audio-on')
						.addClass('audio-off');
				this.setSpeaking(false);

				return;
			}

			this.getUI('muteIndicator')
					.removeClass('audio-off')
					.addClass('audio-on');
		},

		setSpeaking: function(speaking) {
			this.$el.toggleClass('speaking', speaking);
		},

		/**
		 * Sets the element with the video stream.
		 *
		 * @param HTMLVideoElement|null videoElement the element to set, or null
		 *        to remove the current one.
		 */
		setVideoElement: function(videoElement) {
			this.getUI('video').remove();

			if (videoElement) {
				this.$el.prepend(videoElement);

				videoElement.oncontextmenu = function() {
					return false;
				};
			}

			this.bindUIElements();

			// Hide the video until it is explicitly marked as available and
			// enabled.
			this.getUI('video').addClass('hidden');
		},

		setVideoAvailable: function(videoAvailable) {
			if (!videoAvailable) {
				this.getUI('avatarContainer').removeClass('hidden');
				this.getUI('video').addClass('hidden');
				this.getUI('hideRemoteVideoButton').addClass('hidden');

				return;
			}

			this.getUI('hideRemoteVideoButton').removeClass('hidden');

			if (this._videoEnabled) {
				this.getUI('avatarContainer').addClass('hidden');
				this.getUI('video').removeClass('hidden');
			}
		},

		setVideoEnabled: function(videoEnabled) {
			this._videoEnabled = videoEnabled;

			if (!videoEnabled) {
				this.getUI('avatarContainer').removeClass('hidden');
				this.getUI('video').addClass('hidden');
				this.getUI('hideRemoteVideoButton')
						.attr('data-original-title', t('spreed', 'Enable video'))
						.removeClass('icon-video')
						.addClass('icon-video-off');

				return;
			}

			this.getUI('avatarContainer').addClass('hidden');
			this.getUI('video').removeClass('hidden');
			this.getUI('hideRemoteVideoButton')
					.attr('data-original-title', t('spreed', 'Disable video'))
					.removeClass('icon-video-off')
					.addClass('icon-video');
		},

		toggleVideo: function() {
			if (this._videoEnabled) {
				this.setVideoEnabled(false);
			} else {
				this.setVideoEnabled(true);
			}

			OCA.SpreedMe.speakers.updateVideoContainerDummyIfLatestSpeaker(this.options.peerId);
		},

		setPromoted: function(promoted) {
			this.$el.toggleClass('promoted', promoted);
		},

		setScreenAvailable: function(screenAvailable) {
			if (!screenAvailable) {
				this.getUI('screenSharingIndicator')
						.removeClass('screen-on')
						.addClass('screen-off');

				return;
			}

			this.getUI('screenSharingIndicator')
					.removeClass('screen-off')
					.addClass('screen-on');
		},

		setScreenVisible: function(screenVisible) {
			this._screenVisible = screenVisible;

			this.getUI('screenSharingIndicator').toggleClass('screen-visible', screenVisible);
		},

		switchToScreen: function() {
			if (!this._screenVisible) {
				OCA.SpreedMe.sharedScreens.switchScreenToId(this.options.peerId);
			}

			this.getUI('screenSharingIndicator').tooltip('hide');
		},

		/**
		 * Creates a dummy video container element to show the indicators when
		 * this video view is promoted.
		 *
		 * @return jQuery The jQuery wrapper for the dummy element.
		 */
		newDummyVideoContainer: function() {
			var $dummy = $('<div>')
					.addClass('videoContainer videoContainer-dummy')
					.append(this.getUI('nameIndicator').clone())
					.append(this.getUI('mediaIndicator').clone());

			// Cloning does not copy event handlers by default; it could be
			// forced with a parameter, but the tooltip would have to be
			// explicitly set on the new element anyway. Due to this the click
			// handler is explicitly copied too.
			$dummy.find('.hideRemoteVideo').click(this.toggleVideo.bind(this));
			$dummy.find('.hideRemoteVideo').tooltip({
				placement: 'top',
				trigger: 'hover'
			});

			return $dummy;
		},

	});

	OCA.Talk.Views.VideoView = VideoView;
	OCA.Talk.Views.VideoView.ConnectionStatus = ConnectionStatus;

})(OCA, Marionette);


/* global _, $ */

/**
 *
 * @copyright Copyright (c) 2018, Daniel Calviño Sánchez (danxuliu@gmail.com)
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
 *
 */

(function(_, $) {

	'use strict';

	OCA.SpreedMe = OCA.SpreedMe || {};
	OCA.SpreedMe.Views = OCA.SpreedMe.Views || {};

	/**
	 * Virtual list of DOM elements.
	 *
	 * The virtual list makes possible to create a list with an "unlimited"*
	 * number of elements. Despite the browser optimizations there is a limit in
	 * the number of elements that can be added to a document before the browser
	 * becomes sluggish when the document is further modified (due to having to
	 * layout/reflow a high number of elements); the virtual list solves that by
	 * keeping in the document only those elements that are currently visible,
	 * and refreshing them as needed when the list is scrolled.
	 *
	 * *The actual limit depends, among other things, on the maximum height for
	 * an element supported by the browser, the available memory to hold the
	 * elements, and the performance traversing linked lists, although it should
	 * be high enough for most common uses.
	 *
	 * The virtual list receives the container of the list (the element that the
	 * list elements would have been appended to if the virtual list was not
	 * used) in its constructor.
	 *
	 * The CSS style of the container must have a "visible" or (preferred) an
	 * "auto" value for its "overflow-y" property. Similarly, the positioning of
	 * the ".wrapper-background" and ".wrapper" elements child of the container
	 * must be set to "absolute".
	 *
	 * Elements are appended to the virtual list by first notifying the list
	 * that elements are going to be appended, then appending the elements, and
	 * finally processing the appended elements. Thus, even if there is only one
	 * element to add, first "appendElementStart()" must be called, followed by
	 * one or more calls to "appendElement()" each one with a single element,
	 * and followed by a final call to "appendElementEnd()". Elements are
	 * prepended in a similar way using the equivalent methods.
	 *
	 * The elements in the list can have different heights, and they can
	 * partially overlap their previous or next element due to the use of a
	 * negative top margin, but their top position must not exceed the top
	 * position of its previous element, and their bottom position must not
	 * exceed the bottom position of its next element.
	 *
	 * It is assumed that the position and size of an element will not change
	 * once added to the list. Changing the size of the container could change
	 * the position and size of all the elements, so in that case "reload()"
	 * needs to be called.
	 *
	 * Some operations on the virtual list, like reloading it, updating the
	 * visible elements or scrolling to certain element, require that the
	 * container is visible; if called while the container is hidden those
	 * operations will just be ignored.
	 *
	 * Adding new elements is still possible while the virtual list is hidden,
	 * but note that "reload()" must be explicitly called once the container is
	 * visible again for the added elements to be loaded.
	 *
	 *
	 *
	 * Internal description:
	 * ---------------------
	 *
	 * Feast your eyes on this glorious ASCII art representation of the virtual
	 * list:
	 *
	 * ············· - List start / Wrapper background start - Top position = 0
	 * ·           ·
	 * ·  _  _  _  · _ First loaded element
	 * ·           ·
	 * · _ _ _ _ _ · _ Wrapper start - Top position ~= scroll position
	 * :___________: _
	 * | ~~~     | |   Viewport start / Container top
	 * | ~~      |||
	 * | ~~      |||
	 * | ~~~~~   | |   Viewport end / Container bottom
	 * :¯¯¯¯¯¯¯¯¯¯¯: ¯
	 * · ¯ ¯ ¯ ¯ ¯ · ¯ Wrapper end
	 * ·           ·
	 * ·           ·
	 * ·  ¯  ¯  ¯  · ¯ Last loaded element
	 * ·           ·
	 * ·           ·
	 * ·           ·
	 * ·           ·
	 * ············· - List end / Wrapper background end
	 *
	 * When the children of an element are larger than its parent and the parent
	 * can not grow any further the parent becomes a viewport for its children:
	 * it can only show a partial area of the children, but it provides an
	 * scroll bar to move the viewport up and down.
	 *
	 * The virtual list is based on that behaviour. In order to reduce the
	 * elements in the document, when the virtual list is set for a container,
	 * only those children of the container that are currently visible in the
	 * viewport are actually in the document; whenever the container is scrolled
	 * the elements are added and removed as needed.
	 *
	 * Specifically, the visible elements are added to and removed from a direct
	 * child of the container, a wrapper that only holds the visible elements.
	 *
	 * Besides the wrapper, the container has another direct children, a
	 * background element that simulates the full length of the list; although
	 * the background is empty its height is set to the height of all the
	 * elements in the list, so when the list is longer than the container the
	 * background causes the scroll bar to appear in the container as if it
	 * contained the real list.
	 *
	 * Both the background and the wrapper have an absolute position; this
	 * absolute position makes possible for the wrapper to move freely over the
	 * background, and also limits the layout calculations only to the wrapper
	 * itself when adding and removing the visible elements (although for better
	 * performance the updates are also done off-line, that is, with the wrapper
	 * detached from the document so only two reflows, one when it is detached
	 * and one when it is attached again, are done no matter the number of
	 * updated elements).
	 *
	 * Whenever the container is scrolled the elements are updated in the
	 * wrapper as needed; the top position of the wrapper is set so its elements
	 * are at the same distance from the top of the background as they would be
	 * if all their previous elements were in the document.
	 *
	 * In order to know where the elements should be in the full list as well as
	 * whether they are visible or not their position and size must have been
	 * calculated before. Thus, when elements are added to the virtual list they
	 * are briefly added to the document in a temporal wrapper; the position of
	 * this temporal wrapper is set based on the already added elements, so the
	 * browser can layout the new elements and their real position and size can
	 * be cached.
	 *
	 * Reloading the list recalculates the position and size of all the
	 * elements. When the list contains a lot of elements it is not possible to
	 * recalculate the values for all the elements at once, so they are first
	 * recalculated for the visible elements and then they are progressively
	 * recalculated for the rest of elements. During that process it is possible
	 * to scroll only to the already loaded elements (although eventually all
	 * the elements will be loaded and it will be possible to scroll again to
	 * any element).
	 */
	var VirtualList = function($container) {
		this._$container = $container;

		this._$firstElement = null;
		this._$lastElement = null;
		this._$firstLoadedElement = null;
		this._$lastLoadedElement = null;
		this._$firstVisibleElement = null;
		this._$lastVisibleElement = null;

		this._$wrapperBackground = $('<div class="wrapper-background"></div>');
		this._$wrapperBackground.height(0);

		this._$wrapper = $('<div class="wrapper"></div>');
		this._$wrapper._top = 0;

		this._$container.append(this._$wrapperBackground);
		this._$container.append(this._$wrapper);

		var self = this;
		this._$container.on('scroll', function() {
			self._lastKnownScrollPosition = self._$container.scrollTop();

			self.updateVisibleElements();
		});
	};

	VirtualList.prototype = {

		getFirstElement: function() {
			return this._$firstElement;
		},

		getFirstVisibleElement: function() {
			return this._$firstVisibleElement;
		},

		getLastElement: function() {
			return this._$lastElement;
		},

		getLastVisibleElement: function() {
			return this._$lastVisibleElement;
		},

		getLastKnownScrollPosition: function() {
			return this._lastKnownScrollPosition;
		},

		prependElementStart: function() {
			this._prependedElementsBuffer = document.createDocumentFragment();

			delete this._$firstPrependedElement;
			delete this._$lastPrependedElement;
		},

		appendElementStart: function() {
			this._appendedElementsBuffer = document.createDocumentFragment();

			delete this._$firstAppendedElement;
			delete this._$lastAppendedElement;
		},

		prependElement: function($element) {
			// ParentNode.prepend() is not compatible with older browsers.
			this._prependedElementsBuffer.insertBefore($element.get(0), this._prependedElementsBuffer.firstChild);

			if (this._$firstElement) {
				this._$firstElement._previous = $element;
			}
			$element._next = this._$firstElement;
			$element._previous = null;
			this._$firstElement = $element;

			if (!this._$lastElement) {
				this._$lastElement = $element;
			}

			if (!this._$firstPrependedElement) {
				this._$firstPrependedElement = $element;
			}
			this._$lastPrependedElement = $element;
		},

		appendElement: function($element) {
			// ParentNode.append() is not compatible with older browsers.
			this._appendedElementsBuffer.appendChild($element.get(0));

			if (this._$lastElement) {
				this._$lastElement._next = $element;
			}
			$element._previous = this._$lastElement;
			$element._next = null;
			this._$lastElement = $element;

			if (!this._$firstElement) {
				this._$firstElement = $element;
			}

			if (!this._$firstAppendedElement) {
				this._$firstAppendedElement = $element;
			}
			this._$lastAppendedElement = $element;
		},

		prependElementEnd: function() {
			if (this._isContainerHidden()) {
				delete this._prependedElementsBuffer;

				return;
			}

			// If the prepended elements are not immediately before the first
			// loaded element there is nothing to load now; they will be loaded
			// as needed with the other pending elements.
			if (this._$firstPrependedElement._next !== this._$firstLoadedElement) {
				delete this._prependedElementsBuffer;

				return;
			}

			if (this._lastContainerWidth !== this._$container.width()) {
				delete this._prependedElementsBuffer;

				this.reload();

				return;
			}

			this._loadPreviousElements(
				this._$firstPrependedElement,
				this._$lastPrependedElement,
				this._prependedElementsBuffer
			);

			delete this._prependedElementsBuffer;

			this.updateVisibleElements();
		},

		appendElementEnd: function() {
			if (this._isContainerHidden()) {
				delete this._prependedElementsBuffer;

				return;
			}

			// If the appended elements are not immediately after the last
			// loaded element there is nothing to load now; they will be loaded
			// as needed with the other pending elements.
			if (this._$firstAppendedElement._previous !== this._$lastLoadedElement) {
				delete this._appendedElementsBuffer;

				return;
			}

			if (this._lastContainerWidth !== this._$container.width()) {
				delete this._appendedElementsBuffer;

				this.reload();

				return;
			}

			this._loadNextElements(
				this._$firstAppendedElement,
				this._$lastAppendedElement,
				this._appendedElementsBuffer
			);

			delete this._appendedElementsBuffer;

			this.updateVisibleElements();
		},

		/**
		 * Reloads the list to adjust to the new size of the container.
		 *
		 * This needs to be called whenever the size of the container has
		 * changed.
		 *
		 * When the width of the container has changed it is not possible to
		 * guarantee that exactly the same elements that were visible before
		 * will be visible after the list is reloaded. Due to this, in those
		 * cases reloading the list just ensures that the last element that was
		 * partially visible before will be fully visible after the list is
		 * reloaded.
		 *
		 * On the other hand, when only the height has changed no reload is
		 * needed; in that case the visibility of the elements is updated based
		 * on the new height. If some elements were added to the list while its
		 * container was hidden they will be loaded too without a full reload.
		 *
		 * Reloading the list requires to recalculate the position and size of
		 * all the elements. The initial call reloads the last visible element
		 * (if any) and some of its previous and next siblings; the rest of the
		 * elements will be queued to be progressively updated until all are
		 * loaded. During this process it is possible to scroll only to those
		 * elements already loaded, although further elements can be appended or
		 * prepended if needed and they will be available once the reload ends.
		 *
		 * In browsers with subpixel accuracy for the position and size that use
		 * integer values for the scroll position, like Firefox, reloading the
		 * list causes a wiggly effect (and, in some cases, a slight drift) due
		 * to prepending the elements and trying to keep the scroll position, as
		 * the scroll position is rounded to an int but the position of the
		 * elements is a float.
		 */
		reload: function() {
			if (this._isContainerHidden()) {
				return;
			}

			if (this._lastContainerWidth === this._$container.width()) {
				// If the width is the same the cache is still valid, so no need
				// for a full reload.
				this.updateVisibleElements();

				if (this._$firstLoadedElement !== this._$firstElement ||
						this._$lastLoadedElement !== this._$lastElement) {
					this._queueLoadOfPendingElements();
				}

				return;
			}

			if (this._pendingLoad) {
				clearTimeout(this._pendingLoad);
				delete this._pendingLoad;
			}

			this._lastContainerWidth = this._$container.width();

			var $initialElement = this._$lastVisibleElement;
			if (!$initialElement) {
				// No element was visible; either the list was reloaded when
				// empty or during the first append/prepend of elements.
				$initialElement = this._$lastElement;
			}

			if (!$initialElement) {
				// The list is empty, so there is nothing to load.
				return;
			}

			// Detach all the visible elements from the wrapper
			this._$wrapper.detach();

			while (this._$firstVisibleElement && this._$firstVisibleElement !== this._$lastVisibleElement._next) {
				this._$firstVisibleElement.detach();
				this._$firstVisibleElement = this._$firstVisibleElement._next;
			}

			this._$firstVisibleElement = null;
			this._$lastVisibleElement = null;

			this._$wrapper._top = 0;
			this._$wrapper.css('top', this._$wrapper._top);

			this._$wrapper.appendTo(this._$container);

			// Reset wrapper background
			this._setWrapperBackgroundHeight(0);

			this._loadInitialElements($initialElement);

			// Scroll to the last visible element, or to the top of the next one
			// to prevent it from becoming the last visible element when the
			// visibilities are updated.
			if ($initialElement._next) {
				// The implicit "Math.floor()" on the scroll position when the
				// browser has subpixel accuracy but uses int positions for
				// scrolling ensures that the next element to the last visible
				// one will not become visible (which could happen if the value
				// was rounded instead).
				this._$container.scrollTop($initialElement._next._top - this._getElementOuterHeightWithoutMargins(this._$container));
			} else {
				// As the last visible element is also the last element this
				// simply scrolls the list to the bottom.
				this._$container.scrollTop($initialElement._top + $initialElement._height);
			}

			this.updateVisibleElements();

			this._queueLoadOfPendingElements();
		},

		_loadInitialElements: function($initialElement) {
			var $firstElement = $initialElement;
			var $lastElement = $firstElement;

			var elementsBuffer = document.createDocumentFragment();

			var $currentElement = $firstElement;
			var i;
			for (i = 0; i < 50 && $currentElement; i++) {
				// ParentNode.prepend() is not compatible with older browsers.
				elementsBuffer.insertBefore($currentElement.get(0), elementsBuffer.firstChild);
				$lastElement = $currentElement;
				$currentElement = $currentElement._previous;
			}

			$currentElement = $firstElement._next;
			for (i = 0; i < 50 && $currentElement; i++) {
				// ParentNode.append() is not compatible with older browsers.
				elementsBuffer.appendChild($currentElement.get(0));
				$firstElement = $currentElement;
				$currentElement = $currentElement._next;
			}

			this._$firstLoadedElement = null;
			this._$lastLoadedElement = null;

			this._loadPreviousElements(
				$firstElement,
				$lastElement,
				elementsBuffer
			);

			// FIXME it is happily assumed that the initial load covers the full
			// view with 50 and 50 elements before and after... but it should be
			// actually verified and enforced loading again other elements as
			// needed.
		},

		_queueLoadOfPendingElements: function() {
			if (this._pendingLoad) {
				return;
			}

			// To load the elements they need to be rendered again, so it is a
			// rather costly operation. A small interval between loads, even
			// with just a few elements, could hog the browser and cause its UI
			// to become unresponsive, so a "long" interval is used instead; to
			// compensate for the "long" interval the number of elements loaded
			// in each batch is rather large, but still within a reasonable
			// limit that should be renderable by the browser without causing
			// (much :-) ) jank.
			this._pendingLoad = setTimeout(function() {
				delete this._pendingLoad;

				if (this._isContainerHidden()) {
					return;
				}

				var numberOfElementsToLoad = 200;
				numberOfElementsToLoad -= this._loadPreviousPendingElements(numberOfElementsToLoad/2);
				this._loadNextPendingElements(numberOfElementsToLoad);

				// The loaded elements are out of view (it is assumed that the
				// initial load of elements cover the full visible area), so no
				// need to update the visible elements.
			}.bind(this), 100);
		},

		_loadPreviousPendingElements: function(numberOfElementsToLoad) {
			if (!this._$firstLoadedElement || this._$firstLoadedElement === this._$firstElement) {
				return 0;
			}

			var prependedElementsBuffer = document.createDocumentFragment();

			var $firstPrependedElement = this._$firstLoadedElement._previous;
			var $lastPrependedElement = $firstPrependedElement;

			var $currentElement = $firstPrependedElement;
			var i;
			for (i = 0; i < numberOfElementsToLoad && $currentElement; i++) {
				// ParentNode.prepend() is not compatible with older browsers.
				prependedElementsBuffer.insertBefore($currentElement.get(0), prependedElementsBuffer.firstChild);
				$lastPrependedElement = $currentElement;
				$currentElement = $currentElement._previous;
			}

			this._loadPreviousElements(
				$firstPrependedElement,
				$lastPrependedElement,
				prependedElementsBuffer
			);

			this._queueLoadOfPendingElements();

			return i;
		},

		_loadNextPendingElements: function(numberOfElementsToLoad) {
			if (!this._$lastLoadedElement || this._$lastLoadedElement === this._$lastElement) {
				return 0;
			}

			var appendedElementsBuffer = document.createDocumentFragment();

			var $firstAppendedElement = this._$lastLoadedElement._next;
			var $lastAppendedElement = $firstAppendedElement;

			var $currentElement = $firstAppendedElement;
			var i;
			for (i = 0; i < numberOfElementsToLoad && $currentElement; i++) {
				// ParentNode.append() is not compatible with older browsers.
				appendedElementsBuffer.appendChild($currentElement.get(0));
				$lastAppendedElement = $currentElement;
				$currentElement = $currentElement._next;
			}

			this._loadNextElements(
				$firstAppendedElement,
				$lastAppendedElement,
				appendedElementsBuffer
			);

			this._queueLoadOfPendingElements();

			return i;
		},

		_loadPreviousElements: function($firstElementToLoad, $lastElementToLoad, elementsBuffer) {
			var $wrapper = $('<div class="wrapper"></div>');
			$wrapper._top = 0;

			var $firstExistingElement = $firstElementToLoad._next;

			if ($firstExistingElement) {
				// The wrapper is already at the top, so no need to set its
				// position.

				// Include the next element, as its position may change due to
				// collapsing margins.
				$wrapper.append($firstExistingElement.clone());
			}

			this._$container.append($wrapper);

			var previousWrapperHeight = this._getElementHeight($wrapper);

			$wrapper.prepend(elementsBuffer);

			var wrapperHeightDifference = this._getElementHeight($wrapper) - previousWrapperHeight;

			this._setWrapperBackgroundHeight(this._getElementHeight(this._$wrapperBackground) + wrapperHeightDifference);

			// Note that the order of "first/last" is not the same for the main
			// elements and the elements passed to this method.
			if (!this._$lastLoadedElement) {
				this._$lastLoadedElement = $firstElementToLoad;
			}
			this._$firstLoadedElement = $lastElementToLoad;

			while ($firstElementToLoad !== $lastElementToLoad._previous) {
				this._updateCache($firstElementToLoad, $wrapper);

				$firstElementToLoad = $firstElementToLoad._previous;
			}

			// Remove the temporal wrapper used to layout and get the height of
			// the added items.
			$wrapper.detach();
			$wrapper.children().detach();
			$wrapper.remove();

			// Update the cached position of elements after the prepended ones.
			while ($firstExistingElement !== this._$lastLoadedElement._next) {
				$firstExistingElement._top += wrapperHeightDifference;
				$firstExistingElement._topRaw += wrapperHeightDifference;

				$firstExistingElement = $firstExistingElement._next;
			}

			// Keep the scrolling at the same point as before the elements were
			// prepended.
			// Despite having subpixel accuracy for positions and sizes, Firefox
			// uses integer values for the scroll position, so the proper scroll
			// position would be implicitly truncated. Instead, the scroll
			// position is explicitly rounded to mitigate a progressive "drift"
			// when several batches of elements are prepended.
			// Note, however, that rounded the value just mitigates, but does
			// not fully prevent the drift, and when several batches are
			// prepended in a row in a short period of time the result is a
			// wiggly effect in the existing elements due to the successive
			// corrections in the scroll positions.
			// Besides that, the drawback of this approach is that the scrolling
			// in browsers with subpixel accuracy and float values for the
			// scroll position (maybe Firefox mobile?) will not be as accurate
			// as it could be.
			this._$container.scrollTop(Math.round(this._$container.scrollTop() + wrapperHeightDifference));

			// Update the position of the wrapper with the visible elements.
			// This is needed even if "updateVisibleElements()" is called later,
			// as it could "short circuit" before reaching the point where the
			// wrapper position is updated.
			if (this._$firstVisibleElement) {
				this._$wrapper._top += wrapperHeightDifference;
				this._$wrapper.css('top', this._$wrapper._top);
			}
		},

		_loadNextElements: function($firstElementToLoad, $lastElementToLoad, elementsBuffer) {
			var $wrapper = $('<div class="wrapper"></div>');
			$wrapper._top = 0;

			if ($firstElementToLoad._previous) {
				$wrapper.css('top', $firstElementToLoad._previous._topRaw);
				$wrapper._top = $firstElementToLoad._previous._topRaw;

				// Include the previous element, as it may change the
				// position of the newest element due to collapsing margins
				$wrapper.append($firstElementToLoad._previous.clone());
			}

			this._$container.append($wrapper);

			var previousWrapperHeight = this._getElementHeight($wrapper);

			$wrapper.append(elementsBuffer);

			var wrapperHeightDifference = this._getElementHeight($wrapper) - previousWrapperHeight;

			this._setWrapperBackgroundHeight(this._getElementHeight(this._$wrapperBackground) + wrapperHeightDifference);

			if (!this._$firstLoadedElement) {
				this._$firstLoadedElement = $firstElementToLoad;
			}
			this._$lastLoadedElement = $lastElementToLoad;

			while ($firstElementToLoad !== $lastElementToLoad._next) {
				this._updateCache($firstElementToLoad, $wrapper);

				$firstElementToLoad = $firstElementToLoad._next;
			}

			// Remove the temporal wrapper used to layout and get the height of
			// the added items.
			$wrapper.detach();
			$wrapper.children().detach();
			$wrapper.remove();
		},

		/**
		 * Updates the cached position and size of the given element.
		 *
		 * The element must be a child of a wrapper currently in the container
		 * (although it can be a temporal wrapper, it does not need to be the
		 * main one); detached elements can not be used, as the values to cache
		 * would be invalid in that case.
		 *
		 * The element top position is relative to the wrapper, and the wrapper
		 * top position plus the element top position is expected to place the
		 * element at the proper offset from the top of the container.
		 *
		 * @param {jQuery} $element the element to update its cache.
		 * @param {jQuery} $wrapper the parent wrapper of the element.
		 */
		_updateCache: function($element, $wrapper) {
			$element._height = this._getElementOuterHeight($element);

			// The top position of an element must be got from the element
			// itself; it can not be based on the top position and height of the
			// previous element, because the browser may merge/collapse the
			// margins.
			$element._top = $wrapper._top + this._getElementTopPosition($element);
			$element._topRaw = $element._top;
			var marginTop = parseFloat($element.css('margin-top'));
			if (marginTop < 0) {
				$element._topRaw -= marginTop;
			}
		},

		/**
		 * Returns the top position, from the top margin, of the given element.
		 *
		 * The returned value takes into account a negative top margin, which
		 * pulls up the element closer to the previous element.
		 *
		 * @param jQuery $element the jQuery element to get its height.
		 */
		_getElementTopPosition: function($element) {
			// When the margin is positive, jQuery returns the proper top
			// position of the element (that is, including the top margin).
			// However, when it is negative, jQuery returns where the top
			// position of the element would be if there was no margin, so in
			// those cases the top position returned by jQuery is below the
			// actual top position of the element.
			var marginTop = parseFloat($element.css('margin-top'));
			if (marginTop >= 0) {
				return $element.position().top;
			}

			return $element.position().top + marginTop;
		},

		/**
		 * Returns the height of the given element.
		 *
		 * This must be used instead of jQuery.height(); before the 3.0.0
		 * release jQuery rounded the height to the nearest integer, but Firefox
		 * has subpixel accuracy, so the height returned by jQuery can not be
		 * used in the calculations.
		 *
		 * @param jQuery $element the jQuery element to get its height.
		 */
		_getElementHeight: function($element) {
			return $element.get(0).getBoundingClientRect().height;
		},

		/**
		 * Returns the outer height, without margins, of the given element.
		 *
		 * The returned value includes the height, the padding and the border.
		 *
		 * This must be used instead of jQuery.height(); before the 3.0.0
		 * release jQuery rounded the height to the nearest integer, but Firefox
		 * has subpixel accuracy, so the height returned by jQuery can not be
		 * used in the calculations.
		 *
		 * @param jQuery $element the jQuery element to get its height.
		 */
		_getElementOuterHeightWithoutMargins: function($element) {
			// Although before jQuery 3.0.0 the height is rounded to the nearest
			// integer the padding and border width, on the other hand, are
			// returned as a float value as expected.
			var paddingTop = parseFloat($element.css('padding-top'));
			var paddingBottom = parseFloat($element.css('padding-bottom'));
			var borderTop = parseFloat($element.css('border-top-width'));
			var borderBottom = parseFloat($element.css('border-bottom-width'));

			return this._getElementHeight($element) + paddingTop + paddingBottom + borderTop + borderBottom;
		},

		/**
		 * Returns the full outer height, with margins, of the given element.
		 *
		 * The returned value includes the height, the padding, the border and
		 * the margin; negative margins are not taken into account, as they do
		 * not affect the visible height of the element; they only pull up the
		 * element (negative top margin) or its next element (negative bottom
		 * margin), but without modifying its visible height.
		 *
		 * This must be used instead of jQuery.height(); before the 3.0.0
		 * release jQuery rounded the height to the nearest integer, but Firefox
		 * has subpixel accuracy, so the height returned by jQuery can not be
		 * used in the calculations.
		 *
		 * @param jQuery $element the jQuery element to get its height.
		 */
		_getElementOuterHeight: function($element) {
			// Although before jQuery 3.0.0 the height is rounded to the nearest
			// integer the margin, on the other hand, is returned as a float
			// value as expected.
			// Besides that note that outerHeight(true) would return a smaller
			// height than the actual height when there are negative margins, as
			// in that case jQuery would substract the negative margin from the
			// overall height of the element.
			var marginTop = Math.max(0, parseFloat($element.css('margin-top')));
			var marginBottom = Math.max(0, parseFloat($element.css('margin-bottom')));

			return this._getElementOuterHeightWithoutMargins($element) + marginTop + marginBottom;
		},

		_setWrapperBackgroundHeight: function(height) {
			// Although getting the height with jQuery < 3.X rounds to the
			// nearest integer setting the height respects the given float
			// number.
			this._$wrapperBackground.height(height);

			// If the container is scrollable set its "tabindex" attribute so it
			// is included in the sequential keyboard navigation.
			if (this._getElementHeight(this._$wrapperBackground) > this._getElementHeight(this._$container)) {
				this._$container.attr('tabindex', 0);
			} else {
				this._$container.removeAttr('tabindex');
			}
		},

		/**
		 * Updates the visible elements.
		 *
		 * Elements no longer in the viewport are removed, while elements now in
		 * the viewport are added.
		 *
		 * Note that the float precision problems are not handled in the
		 * visibility checks, so in browsers with subpixel accuracy, like
		 * Firefox, elements in which their bottom is very very close to the top
		 * of the container, or elements in which their top is very very close
		 * to the bottom of the container may be shown or hidden when they
		 * should not. However, this should not be a problem, as only fractions
		 * of a pixel would be wrongly shown or hidden.
		 */
		updateVisibleElements: function() {
			if (this._isContainerHidden()) {
				return;
			}

			if (!this._$firstVisibleElement && !this._$firstLoadedElement) {
				return;
			}

			if (!this._$firstVisibleElement) {
				this._$firstVisibleElement = this._$firstLoadedElement;
				this._$lastVisibleElement = this._$firstVisibleElement;

				this._$wrapper.append(this._$firstVisibleElement);
			}

			var visibleAreaTop = this._$container.scrollTop();
			var visibleAreaBottom = visibleAreaTop + this._getElementOuterHeightWithoutMargins(this._$container);

			var firstVisibleElementIsStillPartiallyVisible =
					this._$firstVisibleElement._top <= visibleAreaTop &&
					this._$firstVisibleElement._top + this._$firstVisibleElement._height > visibleAreaTop;
			var lastVisibleElementIsStillPartiallyVisible =
					this._$lastVisibleElement._top < visibleAreaBottom &&
					this._$lastVisibleElement._top + this._$lastVisibleElement._height >= visibleAreaBottom;
			// The first element could be being pulled up into its previous
			// element due to a negative top margin, so it is necessary to
			// ensure that the previous element is not visible even if the first
			// one "crosses" the top of the visible area.
			var previousElementToFirstVisibleElementIsNotVisibleYet =
					!this._$firstVisibleElement._previous ||
					this._$firstVisibleElement._previous._top + this._$firstVisibleElement._previous._height <= visibleAreaTop;
			// The next element could be pulled up into the last visible element
			// due to a negative top margin, so it is necessary to ensure that
			// it is not visible even if the last one "crosses" the bottom of
			// the visible area.
			var nextElementToLastVisibleElementIsNotVisibleYet =
					!this._$lastVisibleElement._next ||
					this._$lastVisibleElement._next._top >= visibleAreaBottom;

			if (firstVisibleElementIsStillPartiallyVisible &&
					lastVisibleElementIsStillPartiallyVisible &&
					previousElementToFirstVisibleElementIsNotVisibleYet &&
					nextElementToLastVisibleElementIsNotVisibleYet) {
				return;
			} else {
				this._$wrapper.detach();
			}

			// The currently visible area does not contain any of the visible
			// elements.
			if (this._$firstVisibleElement._top >= visibleAreaBottom ||
					this._$lastVisibleElement._top + this._$lastVisibleElement._height <= visibleAreaTop) {
				// Remove all visible elements.
				while (this._$firstVisibleElement !== this._$lastVisibleElement._next) {
					this._$firstVisibleElement.detach();
					this._$firstVisibleElement = this._$firstVisibleElement._next;
				}

				// Show the new first visible element.
				this._$firstVisibleElement = this._$firstLoadedElement;
				while (this._$firstVisibleElement._top + this._$firstVisibleElement._height <= visibleAreaTop) {
					this._$firstVisibleElement = this._$firstVisibleElement._next;
				}

				this._$firstVisibleElement.prependTo(this._$wrapper);

				this._$lastVisibleElement = this._$firstVisibleElement;
			}

			// Remove leading elements no longer visible.
			while (this._$firstVisibleElement._top + this._$firstVisibleElement._height <= visibleAreaTop) {
				this._$firstVisibleElement.detach();
				this._$firstVisibleElement = this._$firstVisibleElement._next;
			}

			// Prepend leading elements now visible.
			while (this._$firstVisibleElement._previous &&
					this._$firstVisibleElement._previous !== this._$firstLoadedElement._previous &&
					this._$firstVisibleElement._previous._top + this._$firstVisibleElement._previous._height > visibleAreaTop) {
				this._$firstVisibleElement._previous.prependTo(this._$wrapper);
				this._$firstVisibleElement = this._$firstVisibleElement._previous;
			}

			// Align wrapper with the top raw position (without negative
			// margins) of the first visible element.
			this._$wrapper._top = this._$firstVisibleElement._topRaw;
			this._$wrapper.css('top', this._$wrapper._top);

			// Remove trailing elements no longer visible.
			while (this._$lastVisibleElement._top >= visibleAreaBottom) {
				this._$lastVisibleElement.detach();
				this._$lastVisibleElement = this._$lastVisibleElement._previous;
			}

			// Append trailing elements now visible.
			while (this._$lastVisibleElement._next &&
					this._$lastVisibleElement._next !== this._$lastLoadedElement._next &&
					this._$lastVisibleElement._next._top < visibleAreaBottom) {
				this._$lastVisibleElement._next.appendTo(this._$wrapper);
				this._$lastVisibleElement = this._$lastVisibleElement._next;
			}

			this._$wrapper.appendTo(this._$container);
		},

		_isContainerHidden: function() {
			return this._$container.is(":hidden");
		},

		/**
		 * Scroll the list to the given element.
		 *
		 * The element will be aligned with the top of the list (or as far as
		 * possible, in case the element is at the bottom).
		 *
		 * @param {jQuery} $element the element of the list to scroll to.
		 */
		scrollTo: function($element) {
			if (this._isContainerHidden()) {
				return;
			}

			if (!this._isLoaded($element)) {
				return;
			}

			this._$container.scrollTop($element._top);

			// The visible elements are updated when the scroll event is
			// handled. However, as the scroll event is asynchronous, it is not
			// guaranteed that it will be handled before this method returns; as
			// the caller could expect that the visibility of elements is
			// updated when scrolling programatically this must be explicitly
			// done.
			// Note that, although the event is handled asynchronously (and in
			// some cases several scrolls can be merged in a single event) the
			// value returned by scrollTop() is always the expected one
			// immediately after setting it with scrollTop(value).
			this.updateVisibleElements();
		},

		/**
		 * Returns whether the given element is loaded or not.
		 *
		 * @param {jQuery} $element the element to check.
		 * @return true if the element is loaded, false otherwise.
		 */
		_isLoaded: function($element) {
			if (!this._$firstLoadedElement || !this._$lastLoadedElement) {
				return false;
			}

			var $currentElement = this._$firstLoadedElement;
			while ($currentElement !== this._$lastLoadedElement._next) {
				if ($currentElement === $element) {
					return true;
				}

				$currentElement = $currentElement._next;
			}

			return false;
		},

	};

	OCA.SpreedMe.Views.VirtualList = VirtualList;

})(_, $);


// TODO(fancycode): Should load through AMD if possible.
/* global SimpleWebRTC, OC, OCA: false */

var webrtc;
var guestNamesTable = {};
var spreedMappingTable = {};
var spreedPeerConnectionTable = [];

(function(OCA, OC) {
	'use strict';

	OCA.SpreedMe = OCA.SpreedMe || {};

	var previousUsersInRoom = [];
	var usersInCallMapping = {};
	var ownPeer = null;
	var ownScreenPeer = null;
	var hasLocalMedia = false;
	var selfInCall = 0;  // OCA.SpreedMe.app.FLAG_DISCONNECTED, not available yet.
	var delayedCreatePeer = [];

	function updateParticipantsUI(currentUsersNo) {
		'use strict';
		if (!currentUsersNo) {
			currentUsersNo = 1;
		}

		var $appContentElement = $(OCA.SpreedMe.app.mainCallElementSelector),
			participantsClass = 'participants-' + currentUsersNo,
			hadScreensharing = $appContentElement.hasClass('screensharing'),
			hadSidebar = $appContentElement.hasClass('with-app-sidebar');
		if (!$appContentElement.hasClass(participantsClass)) {
			$appContentElement.attr('class', '').addClass(participantsClass);
			if (currentUsersNo > 1) {
				$appContentElement.addClass('incall');
			} else {
				$appContentElement.removeClass('incall');
			}

			if (hadScreensharing) {
				$appContentElement.addClass('screensharing');
			}

			if (hadSidebar) {
				$appContentElement.addClass('with-app-sidebar');
			}
		}
	}

	function createScreensharingPeer(signaling, sessionId) {
		var currentSessionId = signaling.getSessionid();
		var useMcu = signaling.hasFeature("mcu");

		if (useMcu && !webrtc.webrtc.getPeers(currentSessionId, 'screen').length) {
			if (ownScreenPeer) {
				ownScreenPeer.end();
			}

			// Create own publishing stream.
			ownScreenPeer = webrtc.webrtc.createPeer({
				id: currentSessionId,
				type: 'screen',
				sharemyscreen: true,
				enableDataChannels: false,
				receiveMedia: {
					offerToReceiveAudio: 0,
					offerToReceiveVideo: 0
				},
				broadcaster: currentSessionId,
			});
			webrtc.emit('createdPeer', ownScreenPeer);
			ownScreenPeer.start();
		}

		if (sessionId === currentSessionId) {
			return;
		}

		if (useMcu) {
			// TODO(jojo): Already create peer object to avoid duplicate offers.
			// TODO(jojo): We should use "requestOffer" as with regular
			// audio/video peers. Not possible right now as there is no way
			// for clients to know that screensharing is active and an offer
			// from the MCU should be requested.
			webrtc.connection.sendOffer(sessionId, "screen");
		} else if (!useMcu) {
			var screenPeers = webrtc.webrtc.getPeers(sessionId, 'screen');
			var screenPeerSharedTo = screenPeers.find(function(screenPeer) {
				return screenPeer.sharemyscreen === true;
			});
			if (!screenPeerSharedTo) {
				var peer = webrtc.webrtc.createPeer({
					id: sessionId,
					type: 'screen',
					sharemyscreen: true,
					enableDataChannels: false,
					receiveMedia: {
						offerToReceiveAudio: 0,
						offerToReceiveVideo: 0
					},
					broadcaster: currentSessionId,
				});
				webrtc.emit('createdPeer', peer);
				peer.start();
			}
		}
	}

	function checkStartPublishOwnPeer(signaling) {
		'use strict';
		var currentSessionId = signaling.getSessionid();
		if (!hasLocalMedia || webrtc.webrtc.getPeers(currentSessionId, 'video').length) {
			// No media yet or already publishing.
			return;
		}

		if (ownPeer) {
			OCA.SpreedMe.webrtc.removePeers(ownPeer.id);
			OCA.SpreedMe.speakers.remove(ownPeer.id, true);
			OCA.SpreedMe.videos.remove(ownPeer.id);
			delete spreedMappingTable[ownPeer.id];
			ownPeer.end();
		}

		// Create own publishing stream.
		ownPeer = webrtc.webrtc.createPeer({
			id: currentSessionId,
			type: "video",
			enableDataChannels: true,
			receiveMedia: {
				offerToReceiveAudio: 0,
				offerToReceiveVideo: 0
			},
			sendVideoIfAvailable: signaling.getSendVideoIfAvailable()
		});
		webrtc.emit('createdPeer', ownPeer);
		ownPeer.start();
	}

	function userHasStreams(user) {
		var flags = user;
		if (flags.hasOwnProperty('inCall')) {
			flags = flags.inCall;
		}
		flags = flags || OCA.SpreedMe.app.FLAG_DISCONNECTED;
		var REQUIRED_FLAGS = OCA.SpreedMe.app.FLAG_WITH_AUDIO | OCA.SpreedMe.app.FLAG_WITH_VIDEO;
		return (flags & REQUIRED_FLAGS) !== 0;
	}

	function usersChanged(signaling, newUsers, disconnectedSessionIds) {
		'use strict';
		var currentSessionId = signaling.getSessionid();

		var useMcu = signaling.hasFeature("mcu");
		if (useMcu && newUsers.length) {
			checkStartPublishOwnPeer(signaling);
		}

		newUsers.forEach(function(user) {
			if (!user.inCall) {
				return;
			}

			// TODO(fancycode): Adjust property name of internal PHP backend to be all lowercase.
			var sessionId = user.sessionId || user.sessionid;
			if (!sessionId || sessionId === currentSessionId || previousUsersInRoom.indexOf(sessionId) !== -1) {
				return;
			}

			previousUsersInRoom.push(sessionId);

			// TODO(fancycode): Adjust property name of internal PHP backend to be all lowercase.
			spreedMappingTable[sessionId] = user.userId || user.userid;

			var videoView = OCA.SpreedMe.videos.videoViews[sessionId];
			if (!videoView) {
				OCA.SpreedMe.videos.add(sessionId);
			}

			var createPeer = function() {
				var peer = webrtc.webrtc.createPeer({
					id: sessionId,
					type: "video",
					enableDataChannels: true,
					receiveMedia: {
						offerToReceiveAudio: 1,
						offerToReceiveVideo: 1
					},
					sendVideoIfAvailable: signaling.getSendVideoIfAvailable()
				});
				webrtc.emit('createdPeer', peer);
				peer.start();
			};

			if (!webrtc.webrtc.getPeers(sessionId, 'video').length) {
				if (useMcu) {
					// TODO(jojo): Already create peer object to avoid duplicate offers.
					webrtc.connection.requestOffer(user, "video");
				} else if (userHasStreams(selfInCall) && (!userHasStreams(user) || sessionId < currentSessionId)) {
					// To avoid overloading the user joining a room (who previously called
					// all the other participants), we decide who calls who by comparing
					// the session ids of the users: "larger" ids call "smaller" ones.
					console.log("Starting call with", user);
					createPeer();
				} else if (userHasStreams(selfInCall) && userHasStreams(user) && sessionId > currentSessionId) {
					// If the remote peer is not aware that it was disconnected
					// from the current peer the remote peer will not send a new
					// offer; thus, if the current peer does not receive a new
					// offer in a reasonable time, the current peer calls the
					// remote peer instead of waiting to be called to
					// reestablish the connection.
					delayedCreatePeer[sessionId] = setTimeout(function() {
						createPeer();
					}, 10000);
				}
			}

			//Send shared screen to new participants
			if (webrtc.getLocalScreen()) {
				createScreensharingPeer(signaling, sessionId);
			}
		});

		disconnectedSessionIds.forEach(function(sessionId) {
			console.log('XXX Remove peer', sessionId);
			OCA.SpreedMe.webrtc.removePeers(sessionId);
			OCA.SpreedMe.speakers.remove(sessionId, true);
			OCA.SpreedMe.videos.remove(sessionId);
			delete spreedMappingTable[sessionId];
			delete guestNamesTable[sessionId];
			if (delayedCreatePeer[sessionId]) {
				clearTimeout(delayedCreatePeer[sessionId]);
				delete delayedCreatePeer[sessionId];
			}
		});

		previousUsersInRoom = previousUsersInRoom.diff(disconnectedSessionIds);
		updateParticipantsUI(previousUsersInRoom.length + 1);
	}

	function usersInCallChanged(signaling, users) {
		// The passed list are the users that are currently in the room,
		// i.e. that are in the call and should call each other.
		var currentSessionId = signaling.getSessionid();
		var currentUsersInRoom = [];
		var userMapping = {};
		selfInCall = OCA.SpreedMe.app.FLAG_DISCONNECTED;
		var sessionId;
		for (sessionId in users) {
			if (!users.hasOwnProperty(sessionId)) {
				continue;
			}
			var user = users[sessionId];
			if (!user.inCall) {
				continue;
			}

			if (sessionId === currentSessionId) {
				selfInCall = user.inCall;
				continue;
			}

			currentUsersInRoom.push(sessionId);
			userMapping[sessionId] = user;
		}

		if (!selfInCall) {
			// Own session is no longer in the call, disconnect from all others.
			usersChanged(signaling, [], previousUsersInRoom);
			return;
		}

		var newSessionIds = currentUsersInRoom.diff(previousUsersInRoom);
		var disconnectedSessionIds = previousUsersInRoom.diff(currentUsersInRoom);
		var newUsers = [];
		newSessionIds.forEach(function(sessionId) {
			newUsers.push(userMapping[sessionId]);
		});
		if (newUsers.length || disconnectedSessionIds.length) {
			usersChanged(signaling, newUsers, disconnectedSessionIds);
		}
	}

	/**
	 * @param {OCA.Talk.Application} app
	 */
	function initWebRTC(app) {
		Array.prototype.diff = function(a) {
			return this.filter(function(i) {
				return a.indexOf(i) < 0;
			});
		};

		var signaling = app.signaling;
		signaling.on('usersLeft', function(users) {
			users.forEach(function(user) {
				delete usersInCallMapping[user];
			});
			usersChanged(signaling, [], users);
		});
		signaling.on('usersChanged', function(users) {
			users.forEach(function(user) {
				var sessionId = user.sessionId || user.sessionid;
				usersInCallMapping[sessionId] = user;
			});
			usersInCallChanged(signaling, usersInCallMapping);
		});
		signaling.on('usersInRoom', function(users) {
			usersInCallMapping = {};
			users.forEach(function(user) {
				var sessionId = user.sessionId || user.sessionid;
				usersInCallMapping[sessionId] = user;
			});
			usersInCallChanged(signaling, usersInCallMapping);
		});
		signaling.on('leaveCall', function (token, reconnect) {
			// When the MCU is used and there is a connection error the call is
			// left and then joined again to perform the reconnection. In those
			// cases the call should be kept active from the point of view of
			// WebRTC.
			if (reconnect) {
				return;
			}

			webrtc.leaveCall();
		});

		signaling.on('message', function (message) {
			if (message.type !== 'offer') {
				return;
			}

			var peers = OCA.SpreedMe.webrtc.webrtc.peers;
			var stalePeer = peers.find(function(peer) {
				if (peer.sharemyscreen) {
					return false;
				}

				return peer.id === message.from && peer.type === message.roomType && peer.sid !== message.sid;
			});

			if (stalePeer) {
				stalePeer.end();

				if (message.roomType === 'video') {
					OCA.SpreedMe.speakers.remove(stalePeer.id, true);
					OCA.SpreedMe.videos.remove(stalePeer.id);
				}
			}

			if (message.roomType === 'video' && delayedCreatePeer[message.from]) {
				clearTimeout(delayedCreatePeer[message.from]);
				delete delayedCreatePeer[message.from];
			}

			if (!selfInCall) {
				console.log('Offer received when not in the call, ignore');

				message.type = 'offer-to-ignore';
			}

			// MCU screen offers do not include the "broadcaster" property,
			// which is expected by SimpleWebRTC in screen offers from a remote
			// peer, so it needs to be explicitly added.
			if (signaling.hasFeature("mcu") && message.roomType === 'screen') {
				message.broadcaster = message.from;
			}
		});

		webrtc = new SimpleWebRTC({
			localVideoEl: 'localVideo',
			remoteVideosEl: '',
			autoRequestMedia: true,
			debug: false,
			media: {
				audio: true,
				video: true
			},
			autoAdjustMic: false,
			audioFallback: true,
			detectSpeakingEvents: true,
			connection: signaling,
			enableDataChannels: true,
			nick: OC.getCurrentUser().displayName
		});
		if (signaling.hasFeature('mcu')) {
			// Force "Plan-B" semantics if the MCU is used, which doesn't support
			// "Unified Plan" with SimpleWebRTC yet.
			webrtc.webrtc.config.peerConnectionConfig.sdpSemantics = 'plan-b';
		}
		OCA.SpreedMe.webrtc = webrtc;

		signaling.on('pullMessagesStoppedOnFail', function() {
			// Force leaving the call in WebRTC; when pulling messages stops due
			// to failures the room is left, and leaving the room indirectly
			// runs signaling.leaveCurrentCall(), but if the signaling fails to
			// leave the call (which is likely due to the messages failing to be
			// received) no event will be triggered and the call will not be
			// left from WebRTC point of view.
			webrtc.leaveCall();
		});

		OCA.SpreedMe.webrtc.startMedia = function (token) {
			webrtc.joinCall(token);
		};

		var spreedListofSpeakers = {};
		var spreedListofSharedScreens = {};
		var latestSpeakerId = null;
		var unpromotedSpeakerId = null;
		var latestScreenId = null;
		var screenSharingActive = false;

		window.addEventListener('resize', function() {
			if (screenSharingActive) {
				$('#screens').children('video').each(function() {
					$(this).width('100%');
					$(this).height($('#screens').height());
				});
			}
		});

		var sendDataChannelToAll = function(channel, message, payload) {
			// If running with MCU, the message must be sent through the
			// publishing peer and will be distributed by the MCU to subscribers.
			var conn = OCA.SpreedMe.webrtc.connection;
			if (ownPeer && conn.hasFeature && conn.hasFeature('mcu')) {
				ownPeer.sendDirectly(channel, message, payload);
				return;
			}
			OCA.SpreedMe.webrtc.sendDirectlyToAll(channel, message, payload);
		};

		OCA.SpreedMe.videos = {
			videoViews: [],
			add: function(id) {
				if (!(typeof id === 'string' || id instanceof String)) {
					return;
				}

				var user = usersInCallMapping[id];
				if (user && !userHasStreams(user)) {
					console.log("User has no stream", id);
				}

				var userId = spreedMappingTable[id];

				var videoView = new OCA.Talk.Views.VideoView({
					peerId: id
				});

				// When the MCU is used and the other participant has no streams
				// or when no MCU is used and neither the local participant nor
				// the other one has no streams there will be no Peer for that
				// other participant, so the VideoView status will not be
				// modified later and thus it needs to be fully set now.
				if ((signaling.hasFeature('mcu') && user && !userHasStreams(user)) ||
						(!signaling.hasFeature('mcu') && user && !userHasStreams(user) && !hasLocalMedia)) {
					videoView.setConnectionStatus(OCA.Talk.Views.VideoView.ConnectionStatus.COMPLETED);
					videoView.setAudioAvailable(false);
					videoView.setVideoAvailable(false);
				}

				videoView.setParticipant(userId);
				videoView.setScreenAvailable(!!spreedListofSharedScreens[id]);

				OCA.SpreedMe.videos.videoViews[id] = videoView;

				videoView.$el.prependTo($('#videos'));

				return videoView;
			},
			remove: function(id) {
				if (!(typeof id === 'string' || id instanceof String)) {
					return;
				}

				if (!OCA.SpreedMe.videos.videoViews[id]) {
					return;
				}

				OCA.SpreedMe.videos.videoViews[id].$el.remove();

				delete OCA.SpreedMe.videos.videoViews[id];
			},
			addPeer: function(peer) {
				var signaling = OCA.SpreedMe.app.signaling;
				if (peer.id === webrtc.connection.getSessionid()) {
					console.log("Not adding video for own peer", peer);
					OCA.SpreedMe.videos.startSendingNick(peer);
					return;
				}

				var videoView = OCA.SpreedMe.videos.videoViews[peer.id];
				if (!videoView) {
					videoView = OCA.SpreedMe.videos.add(peer.id);
				}

				// Initialize ice restart counter for peer
				spreedPeerConnectionTable[peer.id] = 0;

				peer.pc.addEventListener('iceconnectionstatechange', function () {
					var userId = spreedMappingTable[peer.id];

					switch (peer.pc.iceConnectionState) {
						case 'checking':
							console.log('Connecting to peer...');

							videoView.setConnectionStatus(OCA.Talk.Views.VideoView.ConnectionStatus.CHECKING);
							break;
						case 'connected':
						case 'completed': // on caller side
							console.log('Connection established.');

							if (peer.pc.iceConnectionState === 'connected') {
								videoView.setConnectionStatus(OCA.Talk.Views.VideoView.ConnectionStatus.CONNECTED);
							} else {
								videoView.setConnectionStatus(OCA.Talk.Views.VideoView.ConnectionStatus.COMPLETED);
							}

							// Ensure that the peer name is shown, as the name
							// indicator for registered users without microphone
							// nor camera will not be updated later.
							if (userId && userId.length) {
								videoView.setParticipant(userId, peer.nick);
							}

							// Send the current information about the video and microphone state
							if (!OCA.SpreedMe.webrtc.webrtc.isVideoEnabled()) {
								OCA.SpreedMe.webrtc.emit('videoOff');
							} else {
								OCA.SpreedMe.webrtc.emit('videoOn');
							}
							if (!OCA.SpreedMe.webrtc.webrtc.isAudioEnabled()) {
								OCA.SpreedMe.webrtc.emit('audioOff');
							} else {
								OCA.SpreedMe.webrtc.emit('audioOn');
							}
							if (!OC.getCurrentUser()['uid']) {
								var currentGuestNick = localStorage.getItem("nick");
								sendDataChannelToAll('status', 'nickChanged', currentGuestNick);
							}

							// Reset ice restart counter for peer
							if (spreedPeerConnectionTable[peer.id] > 0) {
								spreedPeerConnectionTable[peer.id] = 0;
							}
							break;
						case 'disconnected':
							console.log('Disconnected.');

							videoView.setConnectionStatus(OCA.Talk.Views.VideoView.ConnectionStatus.DISCONNECTED);

							setTimeout(function() {
								if (peer.pc.iceConnectionState !== 'disconnected') {
									return;
								}

								videoView.setConnectionStatus(OCA.Talk.Views.VideoView.ConnectionStatus.DISCONNECTED_LONG);

								if (!signaling.hasFeature("mcu")) {
									// ICE failures will be handled in "iceFailed"
									// below for MCU installations.

									// If the peer is still disconnected after 5 seconds we try ICE restart.
									if (spreedPeerConnectionTable[peer.id] < 5) {
										if (peer.pc.localDescription.type === 'offer' &&
											peer.pc.signalingState === 'stable') {
											spreedPeerConnectionTable[peer.id] ++;
											console.log('ICE restart.');
											peer.icerestart();
										}
									}
								}
							}, 5000);
							break;
						case 'failed':
							console.log('Connection failed.');

							videoView.setConnectionStatus(OCA.Talk.Views.VideoView.ConnectionStatus.FAILED);

							if (!signaling.hasFeature("mcu")) {
								// ICE failures will be handled in "iceFailed"
								// below for MCU installations.
								if (spreedPeerConnectionTable[peer.id] < 5) {
									if (peer.pc.localDescription.type === 'offer' &&
										peer.pc.signalingState === 'stable') {
										spreedPeerConnectionTable[peer.id] ++;
										console.log('ICE restart.');
										peer.icerestart();
									}
								} else {
									console.log('ICE failed after 5 tries.');

									videoView.setConnectionStatus(OCA.Talk.Views.VideoView.ConnectionStatus.FAILED_NO_RESTART);
								}
							}
							break;
						case 'closed':
							console.log('Connection closed.');

							videoView.setConnectionStatus(OCA.Talk.Views.VideoView.ConnectionStatus.CLOSED);
							break;
					}

					OCA.SpreedMe.speakers.updateVideoContainerDummyIfLatestSpeaker(peer.id);
				});
			},
			// The nick name below the avatar is distributed through the
			// DataChannel of the PeerConnection and only sent once during
			// establishment. For the MCU case, the sending PeerConnection
			// is created once and then never changed when more participants
			// join. For this, we periodically send the nick to all other
			// participants through the sending PeerConnection.
			//
			// TODO: The name for the avatar should come from the participant
			// list which already has all information and get rid of using the
			// DataChannel for this.
			startSendingNick: function(peer) {
				if (!signaling.hasFeature("mcu")) {
					return;
				}

				OCA.SpreedMe.videos.stopSendingNick(peer);
				peer.nickInterval = setInterval(function() {
					var payload;
					var user = OC.getCurrentUser();
					if (!user.uid) {
						payload = localStorage.getItem("nick");
					} else {
						payload = {
							"name": user.displayName,
							"userid": user.uid
						};
					}
					peer.sendDirectly('status', "nickChanged", payload);
				}, 1000);
			},
			stopSendingNick: function(peer) {
				if (!peer.nickInterval) {
					return;
				}

				clearInterval(peer.nickInterval);
				peer.nickInterval = null;
			}
		};

		OCA.SpreedMe.speakers = {
			switchVideoToId: function(id) {
				if (screenSharingActive || latestSpeakerId === id) {
					return;
				}

				var videoView = OCA.SpreedMe.videos.videoViews[id];
				if (!videoView) {
					console.warn('promote: no video found for ID', id);
					return;
				}

				var oldVideoView = OCA.SpreedMe.videos.videoViews[latestSpeakerId];
				if (oldVideoView) {
					oldVideoView.setPromoted(false);
				}

				videoView.setPromoted(true);
				OCA.SpreedMe.speakers.updateVideoContainerDummy(id);

				latestSpeakerId = id;
			},
			unpromoteLatestSpeaker: function() {
				if (latestSpeakerId) {
					var oldVideoView = OCA.SpreedMe.videos.videoViews[latestSpeakerId];
					if (oldVideoView) {
						oldVideoView.setPromoted(false);
					}

					unpromotedSpeakerId = latestSpeakerId;
					latestSpeakerId = null;
					$('.videoContainer-dummy').remove();
				}
			},
			updateVideoContainerDummyIfLatestSpeaker: function(id) {
				if (latestSpeakerId !== id) {
					return;
				}

				OCA.SpreedMe.speakers.updateVideoContainerDummy(id);
			},
			updateVideoContainerDummy: function(id) {
				$('.videoContainer-dummy').remove();

				var videoView = OCA.SpreedMe.videos.videoViews[id];
				if (videoView) {
					videoView.$el.after(videoView.newDummyVideoContainer());
				}
			},
			add: function(id, notPromote) {
				if (!(typeof id === 'string' || id instanceof String)) {
					return;
				}

				if (notPromote) {
					spreedListofSpeakers[id] = 1;
					return;
				}

				spreedListofSpeakers[id] = (new Date()).getTime();

				var videoView = OCA.SpreedMe.videos.videoViews[id];
				if (videoView) {
					videoView.setSpeaking(true);
				}

				if (latestSpeakerId === id) {
					return;
				}

				OCA.SpreedMe.speakers.switchVideoToId(id);
			},
			remove: function(id, enforce) {
				if (!(typeof id === 'string' || id instanceof String)) {
					return;
				}

				if (enforce) {
					delete spreedListofSpeakers[id];
				}

				var videoView = OCA.SpreedMe.videos.videoViews[id];
				if (videoView) {
					videoView.setSpeaking(false);
				}

				if (latestSpeakerId !== id) {
					return;
				}

				var mostRecentTime = 0,
					mostRecentId = null;
				for (var currentId in spreedListofSpeakers) {
					// skip loop if the property is from prototype
					if (!spreedListofSpeakers.hasOwnProperty(currentId)) {
						continue;
					}

					// skip non-string ids
					if (!(typeof currentId === 'string' || currentId instanceof String)) {
						continue;
					}

					var currentTime = spreedListofSpeakers[currentId];
					if (currentTime > mostRecentTime && OCA.SpreedMe.videos.videoViews[currentId]) {
						mostRecentTime = currentTime;
						mostRecentId = currentId;
					}
				}

				if (mostRecentId !== null) {
					OCA.SpreedMe.speakers.switchVideoToId(mostRecentId);
				} else if (enforce === true) {
					// if there is no mostRecentId available, there is no user left in call
					// remove the remaining dummy container then too
					OCA.SpreedMe.speakers.unpromoteLatestSpeaker();
					$('.videoContainer-dummy').remove();
				}
			}
		};

		OCA.SpreedMe.sharedScreens = {
			screenViews: [],
			switchScreenToId: function(id) {
				var screenView = OCA.SpreedMe.sharedScreens.screenViews[id];
				if (!screenView) {
					console.warn('promote: no screen video found for ID', id);
					return;
				}

				if(latestScreenId === id) {
					return;
				}

				for (var currentId in spreedListofSharedScreens) {
					// skip loop if the property is from prototype
					if (!spreedListofSharedScreens.hasOwnProperty(currentId)) {
						continue;
					}

					// skip non-string ids
					if (!(typeof currentId === 'string' || currentId instanceof String)) {
						continue;
					}

					screenView = OCA.SpreedMe.sharedScreens.screenViews[currentId];
					if (currentId === id) {
						screenView.$el.removeClass('hidden');
					} else {
						screenView.$el.addClass('hidden');
					}
				}

				var oldVideoView = OCA.SpreedMe.videos.videoViews[latestScreenId];
				if (oldVideoView) {
					oldVideoView.setScreenVisible(false);
				}
				var videoView = OCA.SpreedMe.videos.videoViews[id];
				if (videoView) {
					videoView.setScreenVisible(true);
				}

				latestScreenId = id;
			},
			add: function(id) {
				if (!(typeof id === 'string' || id instanceof String)) {
					return;
				}

				spreedListofSharedScreens[id] = (new Date()).getTime();

				var currentUser = OCA.SpreedMe.webrtc.connection.getSessionid();
				if (currentUser !== id) {
					var videoView = OCA.SpreedMe.videos.videoViews[id];
					if (videoView) {
						videoView.setScreenAvailable(true);
					}
				}

				OCA.SpreedMe.sharedScreens.switchScreenToId(id);
			},
			remove: function(id) {
				if (!(typeof id === 'string' || id instanceof String)) {
					return;
				}

				var screenView = OCA.SpreedMe.sharedScreens.screenViews[id];
				if (screenView) {
					screenView.$el.remove();

					delete OCA.SpreedMe.sharedScreens.screenViews[id];
				}

				delete spreedListofSharedScreens[id];

				var videoView = OCA.SpreedMe.videos.videoViews[id];
				if (videoView) {
					videoView.setScreenAvailable(false);
				}

				var mostRecentTime = 0,
					mostRecentId = null;
				for (var currentId in spreedListofSharedScreens) {
					// skip loop if the property is from prototype
					if (!spreedListofSharedScreens.hasOwnProperty(currentId)) {
						continue;
					}

					// skip non-string ids
					if (!(typeof currentId === 'string' || currentId instanceof String)) {
						continue;
					}

					var currentTime = spreedListofSharedScreens[currentId];
					if (currentTime > mostRecentTime) {
						mostRecentTime = currentTime;
						mostRecentId = currentId;
					}
				}

				if (mostRecentId !== null) {
					OCA.SpreedMe.sharedScreens.switchScreenToId(mostRecentId);
				}
			}
		};

		OCA.SpreedMe.webrtc.on('createdPeer', function (peer) {
			console.log('PEER CREATED', peer);
			if (peer.type === 'video') {
				OCA.SpreedMe.videos.addPeer(peer);
				// Make sure required data channels exist for all peers. This
				// is required for peers that get created by SimpleWebRTC from
				// received "Offer" messages. Otherwise the "channelMessage"
				// will not be called.
				peer.getDataChannel('status');
			}
		});

		function checkPeerMedia(peer, track, mediaType) {
			var defer = $.Deferred();
			peer.pc.getStats(track).then(function(stats) {
				var result = false;
				stats.forEach(function(statsReport) {
					if (result || statsReport.mediaType !== mediaType || !statsReport.hasOwnProperty('bytesReceived')) {
						return;
					}

					if (statsReport.bytesReceived > 0) {
						OCA.SpreedMe.webrtc.emit('unmute', {
							id: peer.id,
							name: mediaType
						});
						result = true;
					}
				});
				if (result) {
					defer.resolve();
				} else {
					defer.reject();
				}
			});
			return defer;
		}

		function stopPeerCheckMedia(peer) {
			if (peer.check_audio_interval) {
				clearInterval(peer.check_audio_interval);
				peer.check_audio_interval = null;
			}
			if (peer.check_video_interval) {
				clearInterval(peer.check_video_interval);
				peer.check_video_interval = null;
			}
			OCA.SpreedMe.videos.stopSendingNick(peer);
		}

		function startPeerCheckMedia(peer, stream) {
			stopPeerCheckMedia(peer);
			peer.check_video_interval = setInterval(function() {
				stream.getVideoTracks().forEach(function(video) {
					checkPeerMedia(peer, video, 'video').then(function() {
						clearInterval(peer.check_video_interval);
						peer.check_video_interval = null;
					});
				});
			}, 1000);
			peer.check_audio_interval = setInterval(function() {
				stream.getAudioTracks().forEach(function(audio) {
					checkPeerMedia(peer, audio, 'audio').then(function() {
						clearInterval(peer.check_audio_interval);
						peer.check_audio_interval = null;
					});
				});
			}, 1000);
		}

		OCA.SpreedMe.webrtc.on('peerStreamAdded', function (peer) {
			// With the MCU, a newly subscribed stream might not get the
			// "audioOn"/"videoOn" messages as they are only sent when
			// a user starts publishing. Instead wait for initial data
			// and trigger events locally.
			if (!OCA.SpreedMe.app.signaling.hasFeature("mcu")) {
				return;
			}

			startPeerCheckMedia(peer, peer.stream);
		});

		OCA.SpreedMe.webrtc.on('peerStreamRemoved', function (peer) {
			stopPeerCheckMedia(peer);
		});

		OCA.SpreedMe.webrtc.on('localScreenStopped', function() {
			app.disableScreensharingButton();
		});

		var forceReconnect = function(signaling, flags) {
			if (ownPeer) {
				OCA.SpreedMe.webrtc.removePeers(ownPeer.id);
				OCA.SpreedMe.speakers.remove(ownPeer.id, true);
				OCA.SpreedMe.videos.remove(ownPeer.id);
				delete spreedMappingTable[ownPeer.id];
				ownPeer.end();
				ownPeer = null;
			}

			usersChanged(signaling, [], previousUsersInRoom);
			usersInCallMapping = {};
			previousUsersInRoom = [];

			// Reconnects with a new session id will trigger "usersChanged"
			// with the users in the room and that will re-establish the
			// peerconnection streams.
			// If flags are undefined the current call flags are used.
			signaling.forceReconnect(true, flags);
		};

		OCA.SpreedMe.webrtc.webrtc.on('videoOn', function () {
			var signaling = OCA.SpreedMe.app.signaling;
			if (signaling.getSendVideoIfAvailable()) {
				return;
			}

			// When enabling the local video if the video is not being sent a
			// reconnection is forced to start sending it.
			signaling.setSendVideoIfAvailable(true);

			var flags = signaling.getCurrentCallFlags();
			flags |= OCA.SpreedMe.app.FLAG_WITH_VIDEO;

			forceReconnect(signaling, flags);
		});

		OCA.SpreedMe.webrtc.webrtc.on('iceFailed', function (/* peer */) {
			var signaling = OCA.SpreedMe.app.signaling;
			if (!signaling.hasFeature("mcu")) {
				// ICE restarts will be handled by "iceConnectionStateChange"
				// above.
				return;
			}

			// For now assume the connection to the MCU is interrupted on ICE
			// failures and force a reconnection of all streams.
			forceReconnect(signaling);
		});

		var localStreamRequestedTimeout = null;
		var localStreamRequestedTimeoutNotification = null;

		var clearLocalStreamRequestedTimeoutAndHideNotification = function() {
			clearTimeout(localStreamRequestedTimeout);
			localStreamRequestedTimeout = null;

			if (localStreamRequestedTimeoutNotification) {
				OC.Notification.hide(localStreamRequestedTimeoutNotification);
				localStreamRequestedTimeoutNotification = null;
			}
		};

		// In some cases the browser may enter in a faulty state in which
		// "getUserMedia" does not return neither successfully nor with an
		// error. It is not possible to detect this except by guessing when some
		// time passes and the user has not granted nor rejected the media
		// permissions.
		OCA.SpreedMe.webrtc.on('localStreamRequested', function () {
			clearLocalStreamRequestedTimeoutAndHideNotification();

			localStreamRequestedTimeout = setTimeout(function() {
				// FIXME emit an event and handle it as needed instead of
				// calling UI code from here.
				localStreamRequestedTimeoutNotification = OC.Notification.show(t('spreed', 'This is taking longer than expected. Are the media permissions already granted (or rejected)? If yes please restart your browser, as audio and video are failing'), { type: 'error' });
			}, 10000);
		});

		signaling.on('leaveRoom', function(token) {
			if (signaling.currentRoomToken === token) {
				clearLocalStreamRequestedTimeoutAndHideNotification();
			}
		});

		OCA.SpreedMe.webrtc.on('localMediaStarted', function (configuration) {
			console.log('localMediaStarted');

			clearLocalStreamRequestedTimeoutAndHideNotification();

			app.startLocalMedia(configuration);
			hasLocalMedia = true;
			var signaling = OCA.SpreedMe.app.signaling;
			if (signaling.hasFeature("mcu")) {
				checkStartPublishOwnPeer(signaling);
			}
		});

		OCA.SpreedMe.webrtc.on('localMediaError', function(error) {
			console.log('Access to microphone & camera failed', error);

			clearLocalStreamRequestedTimeoutAndHideNotification();

			hasLocalMedia = false;
			var message;
			if ((error.name === "NotSupportedError" &&
					OCA.SpreedMe.webrtc.capabilities.supportRTCPeerConnection) ||
				(error.name === "NotAllowedError" &&
					error.message && error.message.indexOf("Only secure origins") !== -1)) {
				message = t('spreed', 'Access to microphone & camera is only possible with HTTPS');
				message += ': ' + t('spreed', 'Please move your setup to HTTPS');
			} else if (error.name === "NotAllowedError") {
				message = t('spreed', 'Access to microphone & camera was denied');
			} else if(!OCA.SpreedMe.webrtc.capabilities.support) {
				console.log('WebRTC not supported');

				message = t('spreed', 'WebRTC is not supported in your browser');
				message += ': ' + t('spreed', 'Please use a different browser like Firefox or Chrome');
			} else {
				message = t('spreed', 'Error while accessing microphone & camera');
				console.log('Error while accessing microphone & camera: ', error.message || error.name);
			}

			app.startWithoutLocalMedia({audio: false, video: false});
			OC.Notification.show(message, {
				type: 'error',
				timeout: 15,
			});
		});

		OCA.SpreedMe.webrtc.on('channelOpen', function(channel) {
			console.log('%s datachannel is open', channel.label);
		});

		OCA.SpreedMe.webrtc.on('channelMessage', function (peer, label, data) {
			if (label === 'status') {
				if(data.type === 'speaking') {
					OCA.SpreedMe.speakers.add(peer.id);
				} else if(data.type === 'stoppedSpeaking') {
					OCA.SpreedMe.speakers.remove(peer.id);
				} else if(data.type === 'audioOn') {
					OCA.SpreedMe.webrtc.emit('unmute', {id: peer.id, name:'audio'});
				} else if(data.type === 'audioOff') {
					OCA.SpreedMe.webrtc.emit('mute', {id: peer.id, name:'audio'});
				} else if(data.type === 'videoOn') {
					OCA.SpreedMe.webrtc.emit('unmute', {id: peer.id, name:'video'});
				} else if(data.type === 'videoOff') {
					OCA.SpreedMe.webrtc.emit('mute', {id: peer.id, name:'video'});
				} else if (data.type === 'nickChanged') {
					var payload = data.payload || '';
					if (typeof(payload) === 'string') {
						OCA.SpreedMe.webrtc.emit('nick', {id: peer.id, name:data.payload});
						app._messageCollection.updateGuestName(new Hashes.SHA1().hex(peer.id), data.payload);
					} else {
						OCA.SpreedMe.webrtc.emit('nick', {id: peer.id, name: payload.name, userid: payload.userid});
					}
				}
			} else if (label === 'hark') {
				// Ignore messages from hark datachannel
			} else {
				console.log('Uknown message from %s datachannel', label, data);
			}
		});

		OCA.SpreedMe.webrtc.on('videoAdded', function(video, audio, peer) {
			console.log('VIDEO ADDED', peer);
			if (peer.type === 'screen') {
				OCA.SpreedMe.webrtc.emit('screenAdded', video, peer);
				return;
			}

			var videoView = OCA.SpreedMe.videos.videoViews[peer.id];
			if (videoView) {
				var userId = spreedMappingTable[peer.id];
				var guestName = guestNamesTable[peer.id];

				var participantName = peer.nick;
				if (!userId || !userId.length) {
					participantName = peer.nick || guestName;
				}

				videoView.setParticipant(userId, participantName);

				videoView.setVideoElement(video);
				videoView.setAudioElement(audio);
			}

			var otherSpeakerPromoted = false;
			for (var key in spreedListofSpeakers) {
				if (spreedListofSpeakers.hasOwnProperty(key) && spreedListofSpeakers[key] > 1) {
					otherSpeakerPromoted = true;
					break;
				}
			}
			if (!otherSpeakerPromoted) {
				OCA.SpreedMe.speakers.add(peer.id);
			} else {
				OCA.SpreedMe.speakers.add(peer.id, true);
			}
		});

		OCA.SpreedMe.webrtc.on('speaking', function(){
			sendDataChannelToAll('status', 'speaking');
			OCA.SpreedMe.app._localVideoView.setSpeaking(true);
		});

		OCA.SpreedMe.webrtc.on('stoppedSpeaking', function(){
			sendDataChannelToAll('status', 'stoppedSpeaking');
			OCA.SpreedMe.app._localVideoView.setSpeaking(false);
		});

		// a peer was removed
		OCA.SpreedMe.webrtc.on('videoRemoved', function(video, peer) {
			var screens;

			if (peer) {
				if (peer.type === 'video') {
					// a removed peer can't speak anymore ;)
					OCA.SpreedMe.speakers.remove(peer.id, true);

					var videoView = OCA.SpreedMe.videos.videoViews[peer.id];
					if (videoView) {
						videoView.setVideoElement(null);
					}
				} else if (peer.type === 'screen') {
					OCA.SpreedMe.sharedScreens.remove(peer.id);
				}
			} else if (video.id === 'localScreen') {
				// SimpleWebRTC notifies about stopped screensharing through
				// the generic "videoRemoved" API, but the stream must be
				// handled differently.
				OCA.SpreedMe.webrtc.emit('localScreenStopped');

				OCA.SpreedMe.sharedScreens.remove(OCA.SpreedMe.webrtc.connection.getSessionid());
			}

			// Check if there are still some screens
			screens = document.getElementById('screens');
			if (!screens || !screens.hasChildNodes()) {
				screenSharingActive = false;
				$(OCA.SpreedMe.app.mainCallElementSelector).removeClass('screensharing');
				if (unpromotedSpeakerId) {
					OCA.SpreedMe.speakers.switchVideoToId(unpromotedSpeakerId);
					unpromotedSpeakerId = null;
				}
			}
		});

		// Send the audio on and off events via data channel
		OCA.SpreedMe.webrtc.on('audioOn', function() {
			sendDataChannelToAll('status', 'audioOn');
		});
		OCA.SpreedMe.webrtc.on('audioOff', function() {
			sendDataChannelToAll('status', 'audioOff');
		});
		OCA.SpreedMe.webrtc.on('videoOn', function() {
			sendDataChannelToAll('status', 'videoOn');
		});
		OCA.SpreedMe.webrtc.on('videoOff', function() {
			sendDataChannelToAll('status', 'videoOff');
		});

		OCA.SpreedMe.webrtc.on('screenAdded', function(video, peer) {
			OCA.SpreedMe.speakers.unpromoteLatestSpeaker();

			screenSharingActive = true;
			$(OCA.SpreedMe.app.mainCallElementSelector).addClass('screensharing');

			var screens = document.getElementById('screens');
			if (screens) {
				var screenView = new OCA.Talk.Views.ScreenView({
					peerId: peer? peer.id: undefined
				});
				screenView.setVideoElement(video);

				if (peer) {
					var participantName = peer.nick || guestNamesTable[peer.id];
					screenView.setParticipantName(participantName);
				}

				screenView.$el.prependTo($('#screens'));

				if (peer) {
					OCA.SpreedMe.sharedScreens.screenViews[peer.id] = screenView;

					OCA.SpreedMe.sharedScreens.add(peer.id);
				} else {
					OCA.SpreedMe.sharedScreens.screenViews[OCA.SpreedMe.webrtc.connection.getSessionid()] = screenView;

					OCA.SpreedMe.sharedScreens.add(OCA.SpreedMe.webrtc.connection.getSessionid());
				}
			}
		});

		// Local screen added.
		OCA.SpreedMe.webrtc.on('localScreenAdded', function(video) {
			OCA.SpreedMe.webrtc.emit('screenAdded', video, null);
			var signaling = OCA.SpreedMe.app.signaling;

			var currentSessionId = signaling.getSessionid();
			for (var sessionId in usersInCallMapping) {
				if (!usersInCallMapping.hasOwnProperty(sessionId)) {
					continue;
				} else if (!usersInCallMapping[sessionId].inCall) {
					continue;
				} else if (sessionId === currentSessionId) {
					// Running with MCU, no need to create screensharing
					// subscriber for client itself.
					continue;
				}

				createScreensharingPeer(signaling, sessionId);
			}
		});

		OCA.SpreedMe.webrtc.on('localScreenStopped', function() {
			var signaling = OCA.SpreedMe.app.signaling;
			if (!signaling.hasFeature('mcu')) {
				// Only need to notify clients here if running with MCU.
				// Otherwise SimpleWebRTC will notify each client on its own.
				return;
			}

			var currentSessionId = signaling.getSessionid();
			OCA.SpreedMe.webrtc.getPeers().forEach(function(existingPeer) {
				if (ownScreenPeer && existingPeer.type === 'screen' && existingPeer.id === currentSessionId) {
					ownScreenPeer = null;
					existingPeer.end();
					signaling.sendRoomMessage({
						roomType: 'screen',
						type: 'unshareScreen'
					});
				}
			});
		});

		// Peer changed nick
		OCA.SpreedMe.webrtc.on('nick', function(data) {
			// Video
			var videoView = OCA.SpreedMe.videos.videoViews[data.id];
			if (videoView) {
				videoView.setParticipant(data.userid, data.name);
			}

			//Screen
			var screenView = OCA.SpreedMe.sharedScreens.screenViews[data.id];
			if (screenView) {
				screenView.setParticipantName(data.name);
			}

			if (!data.userid && data.name) {
				guestNamesTable[data.id] = data.name;
			}

			OCA.SpreedMe.speakers.updateVideoContainerDummyIfLatestSpeaker(data.id);
		});

		// Peer is muted
		OCA.SpreedMe.webrtc.on('mute', function(data) {
			var videoView = OCA.SpreedMe.videos.videoViews[data.id];
			if (!videoView) {
				return;
			}

			if (data.name === 'video') {
				videoView.setVideoAvailable(false);
			} else {
				videoView.setAudioAvailable(false);
			}

			OCA.SpreedMe.speakers.updateVideoContainerDummyIfLatestSpeaker(data.id);
		});

		// Peer is umuted
		OCA.SpreedMe.webrtc.on('unmute', function(data) {
			var videoView = OCA.SpreedMe.videos.videoViews[data.id];
			if (!videoView) {
				return;
			}

			if (data.name === 'video') {
				videoView.setVideoAvailable(true);
			} else {
				videoView.setAudioAvailable(true);
			}

			OCA.SpreedMe.speakers.updateVideoContainerDummyIfLatestSpeaker(data.id);
		});
	}

	OCA.SpreedMe.initWebRTC = initWebRTC;

})(OCA, OC);


/** @global console */
(function(OCA, OC, $) {
	'use strict';

	OCA.Talk = OCA.Talk || {};
	OCA.Talk.Signaling = {
		Base: {},
		Internal: {},
		Standalone: {},

		/**
		* Loads the signaling settings.
		*
		* The signaling settings are set in the DOM element in which
		* "createConnection" expects to find them; if the DOM element already
		* exists it is assumed that the settings are already loaded.
		*
		* @return Deferred a Deferred object that will be resolved once the
		*         settings are loaded.
		*/
		loadSettings: function() {
			var deferred = $.Deferred();

			if ($('#app #signaling-settings').length > 0) {
				deferred.resolve();

				return deferred.promise();
			}

			if ($('#app').length === 0) {
				$('body').append('<div id="app"></div>');
			}
			$('#app').append('<script type="text/json" id="signaling-settings"></script>');

			$.ajax({
				url: OC.linkToOCS('apps/spreed/api/v1/signaling', 2) + 'settings',
				type: 'GET',
				dataType: 'json',
				success: function (result) {
					$('#app #signaling-settings').text(JSON.stringify(result.ocs.data));

					deferred.resolve();
				},
				error: function (xhr, textStatus, errorThrown) {
					deferred.reject(xhr, textStatus, errorThrown);
				}
			});

			return deferred.promise();
		},

		createConnection: function() {
			var settings = $("#app #signaling-settings").text();
			if (settings) {
				settings = JSON.parse(settings);
			} else {
				settings = {};
			}
			var urls = settings.server;
			if (urls && urls.length) {
				return new OCA.Talk.Signaling.Standalone(settings, urls);
			} else {
				return new OCA.Talk.Signaling.Internal(settings);
			}
		}
	};

	function Base(settings) {
		this.settings = settings;
		this.sessionId = '';
		this.currentRoomToken = null;
		this.currentCallToken = null;
		this.currentCallFlags = null;
		this.handlers = {};
		this.features = {};
		this.pendingChatRequests = [];
		this._lastChatMessagesFetch = null;
		this.chatBatchSize = 100;
		this._sendVideoIfAvailable = true;
	}

	OCA.Talk.Signaling.Base = Base;
	OCA.Talk.Signaling.Base.prototype.on = function(ev, handler) {
		if (!this.handlers.hasOwnProperty(ev)) {
			this.handlers[ev] = [handler];
		} else {
			this.handlers[ev].push(handler);
		}

		switch (ev) {
			case 'stunservers':
			case 'turnservers':
				var servers = this.settings[ev] || [];
				if (servers.length) {
					// The caller expects the handler to be called when the data
					// is available, so defer to simulate a delayed response.
					_.defer(function() {
						handler(servers);
					});
				}
				break;
		}
	};

	OCA.Talk.Signaling.Base.prototype.off = function(ev, handler) {
		if (!this.handlers.hasOwnProperty(ev)) {
			return;
		}

		var pos = this.handlers[ev].indexOf(handler);
		while (pos !== -1) {
			this.handlers[ev].splice(pos, 1);
			pos = this.handlers[ev].indexOf(handler);
		}
	};

	OCA.Talk.Signaling.Base.prototype._trigger = function(ev, args) {
		var handlers = this.handlers[ev];
		if (!handlers) {
			return;
		}

		handlers = handlers.slice(0);
		for (var i = 0, len = handlers.length; i < len; i++) {
			var handler = handlers[i];
			handler.apply(handler, args);
		}
	};

	OCA.Talk.Signaling.Base.prototype.isNoMcuWarningEnabled = function() {
		return !this.settings.hideWarning;
	};

	OCA.Talk.Signaling.Base.prototype.getSessionid = function() {
		return this.sessionId;
	};

	OCA.Talk.Signaling.Base.prototype.getCurrentCallFlags = function() {
		return this.currentCallFlags;
	};

	OCA.Talk.Signaling.Base.prototype.disconnect = function() {
		this.sessionId = '';
		this.currentCallToken = null;
		this.currentCallFlags = null;
	};

	OCA.Talk.Signaling.Base.prototype.hasFeature = function(feature) {
		return this.features && this.features[feature];
	};

	OCA.Talk.Signaling.Base.prototype.emit = function(ev, data) {
		switch (ev) {
			case 'joinRoom':
				this.joinRoom(data);
				break;
			case 'joinCall':
				this.joinCall(data, arguments[2]);
				break;
			case 'leaveRoom':
				this.leaveCurrentRoom();
				break;
			case 'leaveCall':
				this.leaveCurrentCall();
				break;
			case 'message':
				this.sendCallMessage(data);
				break;
		}
	};

	OCA.Talk.Signaling.Base.prototype.leaveCurrentRoom = function() {
		if (this.currentRoomToken) {
			this.leaveRoom(this.currentRoomToken);
			this.currentRoomToken = null;
		}
	};

	OCA.Talk.Signaling.Base.prototype.leaveCurrentCall = function() {
		if (this.currentCallToken) {
			this.leaveCall(this.currentCallToken);
			this.currentCallToken = null;
			this.currentCallFlags = null;
		}
	};

	OCA.Talk.Signaling.Base.prototype.setRoomCollection = function(rooms) {
		this.roomCollection = rooms;
		return this.syncRooms();
	};

	/**
	 * Sets a single room to be synced.
	 *
	 * If there is a RoomCollection set the synchronization will be performed on
	 * the RoomCollection instead and the given room will be ignored; setting a
	 * single room is intended to be used only on public pages.
	 *
	 * @param OCA.SpreedMe.Models.Room room the room to sync.
	 */
	OCA.Talk.Signaling.Base.prototype.setRoom = function(room) {
		this.room = room;
		return this.syncRooms();
	};

	OCA.Talk.Signaling.Base.prototype.syncRooms = function() {
		var defer = $.Deferred();
		if (this.roomCollection && OC.getCurrentUser().uid) {
			this.roomCollection.fetch({
				success: function(roomCollection) {
					defer.resolve(roomCollection);
				},
				error: function(roomCollection, response) {
					defer.reject(roomCollection, response);
				}
			});
		} else if (this.room) {
			this.room.fetch({
				success: function(room) {
					defer.resolve(room);
				},
				error: function(room, response) {
					defer.reject(room, response);
				}
			});
		} else {
			defer.resolve([]);
		}
		return defer;
	};

	OCA.Talk.Signaling.Base.prototype.joinRoom = function(token, password) {
		$.ajax({
			url: OC.linkToOCS('apps/spreed/api/v1/room', 2) + token + '/participants/active',
			type: 'POST',
			beforeSend: function (request) {
				request.setRequestHeader('Accept', 'application/json');
			},
			data: {
				password: password
			},
			success: function (result) {
				console.log("Joined", result);
				this.currentRoomToken = token;
				this._trigger('joinRoom', [token]);
				this._runPendingChatRequests();
				if (this.currentCallToken === token) {
					// We were in this call before, join again.
					this.joinCall(token, this.currentCallFlags);
				} else {
					this.currentCallToken = null;
					this.currentCallFlags = null;
				}
				this._joinRoomSuccess(token, result.ocs.data.sessionId);
			}.bind(this),
			error: function (result) {
				if (result.status === 404 || result.status === 503) {
					// Room not found or maintenance mode
					OC.redirect(OC.generateUrl('apps/spreed'));
				}

				if (result.status === 403) {
					// This should not happen anymore since we ask for the password before
					// even trying to join the call, but let's keep it for now.
					OC.dialogs.prompt(
						t('spreed', 'Please enter the password for this call'),
						t('spreed','Password required'),
						function (result, password) {
							if (result && password !== '') {
								this.joinRoom(token, password);
							}
						}.bind(this),
						true,
						t('spreed','Password'),
						true
					).then(function() {
						var $dialog = $('.oc-dialog:visible');
						$dialog.find('.ui-icon').remove();

						var $buttons = $dialog.find('button');
						$buttons.eq(0).text(t('core', 'Cancel'));
						$buttons.eq(1).text(t('core', 'Submit'));
					});
				}
			}.bind(this)
		});
	};

	OCA.Talk.Signaling.Base.prototype._leaveRoomSuccess = function(/* token */) {
		// Override in subclasses if necessary.
	};

	OCA.Talk.Signaling.Base.prototype.leaveRoom = function(token) {
		this.leaveCurrentCall();

		this._trigger('leaveRoom', [token]);
		this._doLeaveRoom(token);

		$.ajax({
			url: OC.linkToOCS('apps/spreed/api/v1/room', 2) + token + '/participants/active',
			method: 'DELETE',
			async: false,
			success: function () {
				this._leaveRoomSuccess(token);
				// We left the current room.
				if (token === this.currentRoomToken) {
					this.currentRoomToken = null;
				}
			}.bind(this)
		});
	};

	OCA.Talk.Signaling.Base.prototype.getSendVideoIfAvailable = function() {
		return this._sendVideoIfAvailable;
	};

	OCA.Talk.Signaling.Base.prototype.setSendVideoIfAvailable = function(sendVideoIfAvailable) {
		this._sendVideoIfAvailable = sendVideoIfAvailable;
	};

	OCA.Talk.Signaling.Base.prototype._joinCallSuccess = function(/* token */) {
		// Override in subclasses if necessary.
	};

	OCA.Talk.Signaling.Base.prototype.joinCall = function(token, flags) {
		$.ajax({
			url: OC.linkToOCS('apps/spreed/api/v1/call', 2) + token,
			type: 'POST',
			data: {
				flags: flags
			},
			beforeSend: function (request) {
				request.setRequestHeader('Accept', 'application/json');
			},
			success: function () {
				this.currentCallToken = token;
				this.currentCallFlags = flags;
				this._trigger('joinCall', [token]);
				this._joinCallSuccess(token);
			}.bind(this),
			error: function () {
				// Room not found or maintenance mode
				OC.redirect(OC.generateUrl('apps/spreed'));
			}.bind(this)
		});
	};

	OCA.Talk.Signaling.Base.prototype._leaveCallSuccess = function(/* token */) {
		// Override in subclasses if necessary.
	};

	OCA.Talk.Signaling.Base.prototype.leaveCall = function(token, keepToken) {

		if (!token) {
			return;
		}

		$.ajax({
			url: OC.linkToOCS('apps/spreed/api/v1/call', 2) + token,
			method: 'DELETE',
			async: false,
			success: function () {
				this._trigger('leaveCall', [token, keepToken]);
				this._leaveCallSuccess(token);
				// We left the current call.
				if (!keepToken && token === this.currentCallToken) {
					this.currentCallToken = null;
					this.currentCallFlags = null;
				}
			}.bind(this)
		});
	};

	OCA.Talk.Signaling.Base.prototype._runPendingChatRequests = function() {
		while (this.pendingChatRequests.length) {
			var item = this.pendingChatRequests.shift();
			this._doReceiveChatMessages.apply(this, item);
		}
	};

	OCA.Talk.Signaling.Base.prototype.receiveChatMessages = function(lastKnownMessageId) {
		var defer = $.Deferred();
		if (!this.currentRoomToken) {
			// Not in a room yet, defer loading of messages.
			this.pendingChatRequests.push([defer, lastKnownMessageId]);
			return defer;
		}

		return this._doReceiveChatMessages(defer, lastKnownMessageId);
	};

	OCA.Talk.Signaling.Base.prototype._getChatRequestData = function(lastKnownMessageId) {
		return {
			lastKnownMessageId: lastKnownMessageId,
			limit: this.chatBatchSize,
			lookIntoFuture: 1
		};
	};

	OCA.Talk.Signaling.Base.prototype._doReceiveChatMessages = function(defer, lastKnownMessageId) {
		$.ajax({
			url: OC.linkToOCS('apps/spreed/api/v1/chat', 2) + this.currentRoomToken,
			method: 'GET',
			data: this._getChatRequestData(lastKnownMessageId),
			beforeSend: function (request) {
				defer.notify(request);
				request.setRequestHeader('Accept', 'application/json');
			},
			success: function (data, status, request) {
				if (status === "notmodified") {
					defer.resolve(null, request);
				} else {
					defer.resolve(data.ocs.data, request);
				}
			}.bind(this),
			error: function (result) {
				defer.reject(result);
			}
		});
		return defer;
	};

	OCA.Talk.Signaling.Base.prototype.startReceiveMessages = function() {
		this._waitTimeUntilRetry = 1;
		this.receiveMessagesAgain = true;
		this.lastKnownMessageId = 0;

		this._receiveChatMessages();
	};

	OCA.Talk.Signaling.Base.prototype.stopReceiveMessages = function() {
		this.receiveMessagesAgain = false;
		if (this._lastChatMessagesFetch !== null) {
			this._lastChatMessagesFetch.abort();
		}
	};

	OCA.Talk.Signaling.Base.prototype._receiveChatMessages = function() {
		if (this._lastChatMessagesFetch !== null) {
			// Another request is currently in progress.
			return;
		}

		this.receiveChatMessages(this.lastKnownMessageId)
			.progress(this._messagesReceiveStart.bind(this))
			.done(this._messagesReceiveSuccess.bind(this))
			.fail(this._messagesReceiveError.bind(this));
	};

	OCA.Talk.Signaling.Base.prototype._messagesReceiveStart = function(xhr) {
		this._lastChatMessagesFetch = xhr;
	};

	OCA.Talk.Signaling.Base.prototype._messagesReceiveSuccess = function(messages, xhr) {
		var lastKnownMessageId = xhr.getResponseHeader("X-Chat-Last-Given");
		if (lastKnownMessageId !== null) {
			this.lastKnownMessageId = lastKnownMessageId;
		}

		this._lastChatMessagesFetch = null;

		this._waitTimeUntilRetry = 1;

		// Fetch more messages if PHP backend, or if the returned status is not
		// "304 Not modified" (as in that case there could be more messages that
		// need to be fetched).
		if (this.receiveMessagesAgain || xhr.status !== 304) {
			this._receiveChatMessages();
		}

		if (messages && messages.length) {
			this._trigger("chatMessagesReceived", [messages]);
		}
	};

	OCA.Talk.Signaling.Base.prototype._retryChatLoadingOnError = function() {
		return this.receiveMessagesAgain;
	};

	OCA.Talk.Signaling.Base.prototype._messagesReceiveError = function(/* result */) {
		this._lastChatMessagesFetch = null;

		if (this._retryChatLoadingOnError()) {
			_.delay(_.bind(this._receiveChatMessages, this), this._waitTimeUntilRetry * 1000);

			// Increase the wait time until retry to at most 64 seconds.
			if (this._waitTimeUntilRetry < 64) {
				this._waitTimeUntilRetry *= 2;
			}
		}
	};

	// Connection to the internal signaling server provided by the app.
	function Internal(settings) {
		OCA.Talk.Signaling.Base.prototype.constructor.apply(this, arguments);
		this.hideWarning = settings.hideWarning;
		this.spreedArrayConnection = [];

		this.pullMessagesFails = 0;
		this.pullMessagesRequest = null;

		this.isSendingMessages = false;
		this.sendInterval = window.setInterval(function(){
			this.sendPendingMessages();
		}.bind(this), 500);
	}

	Internal.prototype = new OCA.Talk.Signaling.Base();
	Internal.prototype.constructor = Internal;
	OCA.Talk.Signaling.Internal = Internal;

	OCA.Talk.Signaling.Internal.prototype.disconnect = function() {
		this.spreedArrayConnection = [];
		if (this.sendInterval) {
			window.clearInterval(this.sendInterval);
			this.sendInterval = null;
		}
		if (this.roomPoller) {
			window.clearInterval(this.roomPoller);
			this.roomPoller = null;
		}
		OCA.Talk.Signaling.Base.prototype.disconnect.apply(this, arguments);
	};

	OCA.Talk.Signaling.Internal.prototype.on = function(ev/*, handler*/) {
		OCA.Talk.Signaling.Base.prototype.on.apply(this, arguments);

		switch (ev) {
			case 'connect':
				// A connection is established if we can perform a request
				// through it.
				this._sendMessageWithCallback(ev);
				break;
		}
	};

	OCA.Talk.Signaling.Internal.prototype.forceReconnect = function(newSession, flags) {
		if (newSession) {
			console.log('Forced reconnects with a new session are not supported in the internal signaling; same session as before will be used');
		}

		if (flags !== undefined) {
			this.currentCallFlags = flags;
		}

		// FIXME Naive reconnection routine; as the same session is kept peers
		// must be explicitly ended before the reconnection is forced.
		this.leaveCall(this.currentCallToken, true);
		this.joinCall(this.currentCallToken);
	};

	OCA.Talk.Signaling.Internal.prototype._sendMessageWithCallback = function(ev) {
		var message = [{
			ev: ev
		}];

		this._sendMessages(message).done(function(result) {
			this._trigger(ev, [result.ocs.data]);
		}.bind(this)).fail(function(/*xhr, textStatus, errorThrown*/) {
			console.log('Sending signaling message with callback has failed.');
			// TODO: Add error handling
		});
	};

	OCA.Talk.Signaling.Internal.prototype._sendMessages = function(messages) {
		var defer = $.Deferred();
		$.ajax({
			url: OC.linkToOCS('apps/spreed/api/v1/signaling', 2) + this.currentRoomToken,
			type: 'POST',
			data: {messages: JSON.stringify(messages)},
			beforeSend: function (request) {
				request.setRequestHeader('Accept', 'application/json');
			},
			success: function (result) {
				defer.resolve(result);
			},
			error: function (xhr, textStatus, errorThrown) {
				defer.reject(xhr, textStatus, errorThrown);
			}
		});
		return defer;
	};

	OCA.Talk.Signaling.Internal.prototype._joinRoomSuccess = function(token, sessionId) {
		this.sessionId = sessionId;
		this._startPullingMessages();
	};

	OCA.Talk.Signaling.Internal.prototype._doLeaveRoom = function(token) {
		if (token === this.currentRoomToken && !this.roomCollection) {
			window.clearInterval(this.roomPoller);
			this.roomPoller = null;
		}
	};

	OCA.Talk.Signaling.Internal.prototype.sendCallMessage = function(data) {
		if(data.type === 'answer') {
			console.log("ANSWER", data);
		} else if(data.type === 'offer') {
			console.log("OFFER", data);
		}
		this.spreedArrayConnection.push({
			ev: "message",
			fn: JSON.stringify(data),
			sessionId: this.sessionId
		});
	};

	OCA.Talk.Signaling.Internal.prototype.setRoomCollection = function(/*rooms*/) {
		this._pollForRoomChanges();
		return OCA.Talk.Signaling.Base.prototype.setRoomCollection.apply(this, arguments);
	};

	OCA.Talk.Signaling.Internal.prototype.setRoom = function(/*room*/) {
		this._pollForRoomChanges();
		return OCA.Talk.Signaling.Base.prototype.setRoom.apply(this, arguments);
	};

	OCA.Talk.Signaling.Internal.prototype._pollForRoomChanges = function() {
		if (this.roomPoller) {
			window.clearInterval(this.roomPoller);
		}
		this.roomPoller = window.setInterval(function() {
			this.syncRooms();
		}.bind(this), 10000);
	};

	/**
	 * @private
	 */
	OCA.Talk.Signaling.Internal.prototype._startPullingMessages = function() {
		if (!this.currentRoomToken) {
			return;
		}

		// Abort ongoing request
		if (this.pullMessagesRequest !== null) {
			this.pullMessagesRequest.abort();
		}

		// Connect to the messages endpoint and pull for new messages
		this.pullMessagesRequest =
		$.ajax({
			url: OC.linkToOCS('apps/spreed/api/v1/signaling', 2) + this.currentRoomToken,
			type: 'GET',
			dataType: 'json',
			beforeSend: function (request) {
				request.setRequestHeader('Accept', 'application/json');
			},
			success: function (result) {
				this.pullMessagesFails = 0;
				$.each(result.ocs.data, function(id, message) {
					this._trigger('onBeforeReceiveMessage', [message]);
					switch(message.type) {
						case "usersInRoom":
							this._trigger('usersInRoom', [message.data]);
							this._trigger('participantListChanged');
							break;
						case "message":
							if (typeof(message.data) === 'string') {
								message.data = JSON.parse(message.data);
							}
							this._trigger('message', [message.data]);
							break;
						default:
							console.log('Unknown Signaling Message');
							break;
					}
					this._trigger('onAfterReceiveMessage', [message]);
				}.bind(this));
				this._startPullingMessages();
			}.bind(this),
			error: function (jqXHR, textStatus/*, errorThrown*/) {
				if (jqXHR.status === 0 && textStatus === 'abort') {
					// Request has been aborted. Ignore.
				} else if (jqXHR.status === 404 || jqXHR.status === 403) {
					console.log('Stop pulling messages because room does not exist or is not accessible');
					this._trigger('pullMessagesStoppedOnFail');
				} else if (this.currentRoomToken) {
					if (this.pullMessagesFails >= 3) {
						console.log('Stop pulling messages after repeated failures');

						this._trigger('pullMessagesStoppedOnFail');

						return;
					}

					this.pullMessagesFails++;
					//Retry to pull messages after 5 seconds
					window.setTimeout(function() {
						this._startPullingMessages();
					}.bind(this), 5000);
				}
			}.bind(this)
		});
	};

	/**
	 * @private
	 */
	OCA.Talk.Signaling.Internal.prototype.sendPendingMessages = function() {
		if (!this.spreedArrayConnection.length || this.isSendingMessages) {
			return;
		}

		var pendingMessagesLength = this.spreedArrayConnection.length;
		this.isSendingMessages = true;

		this._sendMessages(this.spreedArrayConnection).done(function(/*result*/) {
			this.spreedArrayConnection.splice(0, pendingMessagesLength);
			this.isSendingMessages = false;
		}.bind(this)).fail(function(/*xhr, textStatus, errorThrown*/) {
			console.log('Sending pending signaling messages has failed.');
			this.isSendingMessages = false;
		}.bind(this));
	};

	function Standalone(settings, urls) {
		OCA.Talk.Signaling.Base.prototype.constructor.apply(this, arguments);
		if (typeof(urls) === "string") {
			urls = [urls];
		}
		// We can connect to any of the servers.
		var idx = Math.floor(Math.random() * urls.length);
		// TODO(jojo): Try other server if connection fails.
		var url = urls[idx];
		// Make sure we are using websocket urls.
		if (url.indexOf("https://") === 0) {
			url = "wss://" + url.substr(8);
		} else if (url.indexOf("http://") === 0) {
			url = "ws://" + url.substr(7);
		}
		if (url[url.length - 1] === "/") {
			url = url.substr(0, url.length - 1);
		}
		this.url = url + "/spreed";
		this.initialReconnectIntervalMs = 1000;
		this.maxReconnectIntervalMs = 16000;
		this.reconnectIntervalMs = this.initialReconnectIntervalMs;
		this.joinedUsers = {};
		this.rooms = [];
		window.setInterval(function() {
			// Update the room list all 30 seconds to check for new messages and
			// mentions as well as marking them read via other devices.
			this.internalSyncRooms();
		}.bind(this), 30000);
		this.connect();
	}

	Standalone.prototype = new OCA.Talk.Signaling.Base();
	Standalone.prototype.constructor = Standalone;
	OCA.Talk.Signaling.Standalone = Standalone;

	OCA.Talk.Signaling.Standalone.prototype.reconnect = function() {
		if (this.reconnectTimer) {
			return;
		}

		// Wiggle interval a little bit to prevent all clients from connecting
		// simultaneously in case the server connection is interrupted.
		var interval = this.reconnectIntervalMs - (this.reconnectIntervalMs / 2) + (this.reconnectIntervalMs * Math.random());
		console.log("Reconnect in", interval);
		this.reconnected = true;
		this.reconnectTimer = window.setTimeout(function() {
			this.reconnectTimer = null;
			this.connect();
		}.bind(this), interval);
		this.reconnectIntervalMs = this.reconnectIntervalMs * 2;
		if (this.reconnectIntervalMs > this.maxReconnectIntervalMs) {
			this.reconnectIntervalMs = this.maxReconnectIntervalMs;
		}
		if (this.socket) {
			this.socket.close();
			this.socket = null;
		}
	};

	OCA.Talk.Signaling.Standalone.prototype.connect = function() {
		console.log("Connecting to", this.url);
		this.callbacks = {};
		this.id = 1;
		this.pendingMessages = [];
		this.connected = false;
		this._forceReconnect = false;
		this.socket = new WebSocket(this.url);
		window.signalingSocket = this.socket;
		this.socket.onopen = function(event) {
			console.log("Connected", event);
			this.reconnectIntervalMs = this.initialReconnectIntervalMs;
			this.sendHello();
		}.bind(this);
		this.socket.onerror = function(event) {
			console.log("Error", event);
			this.reconnect();
		}.bind(this);
		this.socket.onclose = function(event) {
			console.log("Close", event);
			this.reconnect();
		}.bind(this);
		this.socket.onmessage = function(event) {
			var data = event.data;
			if (typeof(data) === "string") {
				data = JSON.parse(data);
			}
			console.log("Received", data);
			var id = data.id;
			if (id && this.callbacks.hasOwnProperty(id)) {
				var cb = this.callbacks[id];
					delete this.callbacks[id];
				cb(data);
			}
			this._trigger('onBeforeReceiveMessage', [data]);
			switch (data.type) {
				case "hello":
					if (!id) {
						// Only process if not received as result of our "hello".
						this.helloResponseReceived(data);
					}
					break;
				case "room":
					if (this.currentRoomToken && data.room.roomid !== this.currentRoomToken) {
						this._trigger('roomChanged', [this.currentRoomToken, data.room.roomid]);
						this.joinedUsers = {};
						this.currentRoomToken = null;
					} else {
						// TODO(fancycode): Only fetch properties of room that was modified.
						this.internalSyncRooms();
					}
					break;
				case "event":
					this.processEvent(data);
					break;
				case "message":
					data.message.data.from = data.message.sender.sessionid;
					this._trigger("message", [data.message.data]);
					break;
				default:
					if (!id) {
						console.log("Ignore unknown event", data);
					}
					break;
			}
			this._trigger('onAfterReceiveMessage', [data]);
		}.bind(this);
	};

	OCA.Talk.Signaling.Standalone.prototype.sendBye = function() {
		if (this.connected) {
			this.doSend({
				"type": "bye",
				"bye": {}
			});
		}
		this.resumeId = null;
		this.signalingRoomJoined = null;
	};

	OCA.Talk.Signaling.Standalone.prototype.disconnect = function() {
		this.sendBye();
		if (this.socket) {
			this.socket.close();
			this.socket = null;
		}
		OCA.Talk.Signaling.Base.prototype.disconnect.apply(this, arguments);
	};

	OCA.Talk.Signaling.Standalone.prototype.forceReconnect = function(newSession, flags) {
		if (flags !== undefined) {
			this.currentCallFlags = flags;
		}

		if (!this.connected) {
			if (!newSession) {
				// Not connected, will do reconnect anyway.
				return;
			}

			this._forceReconnect = true;
			this.resumeId = null;
			this.signalingRoomJoined = null;
			return;
		}

		this._forceReconnect = false;
		if (newSession) {
			if (this.currentCallToken) {
				// Mark this session as "no longer in the call".
				this.leaveCall(this.currentCallToken, true);
			}
			this.sendBye();
		}
		if (this.socket) {
			// Trigger reconnect.
			this.socket.close();
		}
	};

	OCA.Talk.Signaling.Standalone.prototype.sendCallMessage = function(data) {
		this.doSend({
			"type": "message",
			"message": {
				"recipient": {
					"type": "session",
					"sessionid": data.to
				},
				"data": data
			}
		});
	};

	OCA.Talk.Signaling.Standalone.prototype.sendRoomMessage = function(data) {
		if (!this.currentCallToken) {
			console.warn("Not in a room, not sending room message", data);
			return;
		}

		this.doSend({
			"type": "message",
			"message": {
				"recipient": {
					"type": "room"
				},
				"data": data
			}
		});
	};

	OCA.Talk.Signaling.Standalone.prototype.doSend = function(msg, callback) {
		if (!this.connected && msg.type !== "hello" || this.socket === null) {
			// Defer sending any messages until the hello response has been
			// received and when the socket is open
			this.pendingMessages.push([msg, callback]);
			return;
		}

		if (callback) {
			var id = this.id++;
			this.callbacks[id] = callback;
			msg["id"] = ""+id;
		}
		console.log("Sending", msg);
		this.socket.send(JSON.stringify(msg));
	};

	OCA.Talk.Signaling.Standalone.prototype.sendHello = function() {
		var msg;
		if (this.resumeId) {
			console.log("Trying to resume session", this.sessionId);
			msg = {
				"type": "hello",
				"hello": {
					"version": "1.0",
					"resumeid": this.resumeId
				}
			};
		} else {
			// Already reconnected with a new session.
			this._forceReconnect = false;
			var user = OC.getCurrentUser();
			var url = OC.linkToOCS('apps/spreed/api/v1/signaling', 2) + 'backend';
			msg = {
				"type": "hello",
				"hello": {
					"version": "1.0",
					"auth": {
						"url": url,
						"params": {
							"userid": user.uid,
							"ticket": this.settings.ticket
						}
					}
				}
			};
		}
		this.doSend(msg, this.helloResponseReceived.bind(this));
	};

	OCA.Talk.Signaling.Standalone.prototype.helloResponseReceived = function(data) {
		console.log("Hello response received", data);
		if (data.type !== "hello") {
			if (this.resumeId) {
				// Resuming the session failed, reconnect as new session.
				this.resumeId = '';
				this.sendHello();
				return;
			}

			// TODO(fancycode): How should this be handled better?
			console.error("Could not connect to server", data);
			this.reconnect();
			return;
		}

		var resumedSession = !!this.resumeId;
		this.connected = true;
		if (this._forceReconnect && resumedSession) {
			console.log("Perform pending forced reconnect");
			this.forceReconnect(true);
			return;
		}
		this.sessionId = data.hello.sessionid;
		this.resumeId = data.hello.resumeid;
		this.features = {};
		var i;
		if (data.hello.server && data.hello.server.features) {
			var features = data.hello.server.features;
			for (i = 0; i < features.length; i++) {
				this.features[features[i]] = true;
			}
		}

		var messages = this.pendingMessages;
		this.pendingMessages = [];
		for (i = 0; i < messages.length; i++) {
			var msg = messages[i][0];
			var callback = messages[i][1];
			this.doSend(msg, callback);
		}

		this._trigger("connect");
		if (this.reconnected) {
			// The list of rooms might have changed while we were not connected,
			// so perform resync once; force it to ensure that the resync is not
			// waiting to retry a pending one failed due to a lack of
			// connection.
			this._forceInternalSyncRooms();
			// Load any chat messages that might have been missed.
			this._receiveChatMessages();
		}
		if (!resumedSession && this.currentRoomToken) {
			this.joinRoom(this.currentRoomToken);
		}
	};

	OCA.Talk.Signaling.Standalone.prototype.setRoom = function(/* room */) {
		OCA.Talk.Signaling.Base.prototype.setRoom.apply(this, arguments);
		return this.internalSyncRooms();
	};

	OCA.Talk.Signaling.Standalone.prototype.joinRoom = function(token /*, password */) {
		if (!this.sessionId) {
			// If we would join without a connection to the signaling server here,
			// the room would be re-joined again in the "helloResponseReceived"
			// callback, leading to two entries for anonymous participants.
			console.log("Not connected to signaling server yet, defer joining room", token);
			this.currentRoomToken = token;
			return;
		}

		return OCA.Talk.Signaling.Base.prototype.joinRoom.apply(this, arguments);
	};

	OCA.Talk.Signaling.Standalone.prototype._joinRoomSuccess = function(token, nextcloudSessionId) {
		if (!this.sessionId) {
			console.log("No hello response received yet, not joining room", token);
			return;
		}

		console.log("Join room", token);
		this.doSend({
			"type": "room",
			"room": {
				"roomid": token,
				// Pass the Nextcloud session id to the signaling server. The
				// session id will be passed through to Nextcloud to check if
				// the (Nextcloud) user is allowed to join the room.
				"sessionid": nextcloudSessionId,
			}
		}, function(data) {
			this.joinResponseReceived(data, token);
		}.bind(this));
	};

	OCA.Talk.Signaling.Standalone.prototype.joinCall = function(token, flags) {
		if (this.signalingRoomJoined !== token) {
			console.log("Not joined room yet, not joining call", token);
			this.pendingJoinCall = {
				token: token,
				flags: flags
			};
			return;
		}

		OCA.Talk.Signaling.Base.prototype.joinCall.apply(this, arguments);
	};

	OCA.Talk.Signaling.Standalone.prototype._joinCallSuccess = function(/* token */) {
		// Update room list to fetch modified properties.
		this.internalSyncRooms();
	};

	OCA.Talk.Signaling.Standalone.prototype._leaveCallSuccess = function(/* token */) {
		// Update room list to fetch modified properties.
		this.internalSyncRooms();
	};

	OCA.Talk.Signaling.Standalone.prototype.joinResponseReceived = function(data, token) {
		console.log("Joined", data, token);
		this.signalingRoomJoined = token;
		if (this.pendingJoinCall && token === this.pendingJoinCall.token) {
			this.joinCall(this.pendingJoinCall.token, this.pendingJoinCall.flags);
			this.pendingJoinCall = null;
		}
		if (this.roomCollection) {
			// The list of rooms is not fetched from the server. Update ping
			// of joined room so it gets sorted to the top.
			this.roomCollection.forEach(function(room) {
				if (room.get('token') === token) {
					room.set('lastPing', (new Date()).getTime() / 1000);
				}
			});
			this.roomCollection.sort();
		}
	};

	OCA.Talk.Signaling.Standalone.prototype._doLeaveRoom = function(token) {
		console.log("Leave room", token);
		this.doSend({
			"type": "room",
			"room": {
				"roomid": ""
			}
		}, function(data) {
			console.log("Left", data);
			this.signalingRoomJoined = null;
			// Any users we previously had in the room also "left" for us.
			var leftUsers = _.keys(this.joinedUsers);
			if (leftUsers.length) {
				this._trigger("usersLeft", [leftUsers]);
			}
			this.joinedUsers = {};
		}.bind(this));
	};

	OCA.Talk.Signaling.Standalone.prototype.processEvent = function(data) {
		switch (data.event.target) {
			case "room":
				this.processRoomEvent(data);
				break;
			case "roomlist":
				this.processRoomListEvent(data);
				break;
			case "participants":
				this.processRoomParticipantsEvent(data);
				break;
			default:
				console.log("Unsupported event target", data);
				break;
		}
	};

	OCA.Talk.Signaling.Standalone.prototype.processRoomEvent = function(data) {
		var i;
		switch (data.event.type) {
			case "join":
				var joinedUsers = data.event.join || [];
				if (joinedUsers.length) {
					console.log("Users joined", joinedUsers);
					var leftUsers = {};
					if (this.reconnected) {
						this.reconnected = false;
						// The browser reconnected, some of the previous sessions
						// may now no longer exist.
						leftUsers = _.extend({}, this.joinedUsers);
					}
					for (i = 0; i < joinedUsers.length; i++) {
						this.joinedUsers[joinedUsers[i].sessionid] = true;
						delete leftUsers[joinedUsers[i].sessionid];
					}
					leftUsers = _.keys(leftUsers);
					if (leftUsers.length) {
						this._trigger("usersLeft", [leftUsers]);
					}
					this._trigger("usersJoined", [joinedUsers]);
					this._trigger('participantListChanged');
				}
				break;
			case "leave":
				var leftSessionIds = data.event.leave || [];
				if (leftSessionIds.length) {
					console.log("Users left", leftSessionIds);
					for (i = 0; i < leftSessionIds.length; i++) {
						delete this.joinedUsers[leftSessionIds[i]];
					}
					this._trigger("usersLeft", [leftSessionIds]);
					this._trigger('participantListChanged');
				}
				break;
			case "message":
				this.processRoomMessageEvent(data.event.message.data);
				break;
			default:
				console.log("Unknown room event", data);
				break;
		}
	};

	OCA.Talk.Signaling.Standalone.prototype.processRoomMessageEvent = function(data) {
		switch (data.type) {
			case "chat":
				this._receiveChatMessages();
				break;
			default:
				console.log("Unknown room message event", data);
		}
	};

	OCA.Talk.Signaling.Standalone.prototype.setRoomCollection = function(/* rooms */) {
		OCA.Talk.Signaling.Base.prototype.setRoomCollection.apply(this, arguments);
		// Retrieve initial list of rooms for this user.
		return this.internalSyncRooms();
	};

	OCA.Talk.Signaling.Standalone.prototype.syncRooms = function() {
		if (this._pendingSyncRooms) {
			// A sync request is already in progress, don't start another one.
			return this._pendingSyncRooms;
		}

		// Never manually sync rooms, will be done based on notifications
		// from the signaling server.
		var defer = $.Deferred();
		defer.resolve(this.rooms);
		return defer;
	};

	OCA.Talk.Signaling.Standalone.prototype.internalSyncRooms = function() {
		if (this._pendingSyncRooms) {
			// A sync request is already in progress, don't start another one.
			return this._pendingSyncRooms;
		}

		this._pendingSyncRooms = $.Deferred();
		this._waitTimeUntilSyncRetry = 1;
		this._internalSyncRoomsWithRetry();
		return this._pendingSyncRooms;
	};

	/**
	 * Forces the synchronization of rooms.
	 *
	 * The rooms are synchronized immediately, even if the synchronization
	 * failed before and there is a scheduled retry for later (which is
	 * cancelled).
	 *
	 * Use sparingly, only when it is very likely that synchronizing again will
	 * succeed despite having failed earlier (for example, after the Internet
	 * connection has been restored).
	 */
	OCA.Talk.Signaling.Standalone.prototype._forceInternalSyncRooms = function() {
		if (!this._pendingSyncRooms) {
			return this.internalSyncRooms();
		}

		if (this._delayedInternalSyncRoomsWithRetry) {
			clearTimeout(this._delayedInternalSyncRoomsWithRetry);
			this._waitTimeUntilSyncRetry = 1;
			this._internalSyncRoomsWithRetry();
		} else {
			// A synchronization is being performed right now, so there is
			// nothing to do except for waiting.
		}

		return this._pendingSyncRooms;
	};

	OCA.Talk.Signaling.Standalone.prototype._internalSyncRoomsWithRetry = function() {
		this._delayedInternalSyncRoomsWithRetry = null;

		OCA.Talk.Signaling.Base.prototype.syncRooms.apply(this, arguments).then(function(rooms) {
			// Remove _pendingSyncRooms before resolving it to make possible to
			// sync again from handlers if needed.
			var pendingSyncRooms = this._pendingSyncRooms;
			this._pendingSyncRooms = null;
			this.rooms = rooms;
			pendingSyncRooms.resolve(rooms);
		}.bind(this)).fail(function() {
			this._delayedInternalSyncRoomsWithRetry = setTimeout(this._internalSyncRoomsWithRetry.bind(this), this._waitTimeUntilSyncRetry * 1000);

			// Increase the wait time until retry to at most 8 seconds.
			if (this._waitTimeUntilSyncRetry < 8) {
				this._waitTimeUntilSyncRetry *= 2;
			}
		}.bind(this));
	};

	OCA.Talk.Signaling.Standalone.prototype.processRoomListEvent = function(data) {
		console.log("Room list event", data);
		this.internalSyncRooms();
	};

	OCA.Talk.Signaling.Standalone.prototype.processRoomParticipantsEvent = function(data) {
		switch (data.event.type) {
			case "update":
				this._trigger("usersChanged", [data.event.update.users || []]);
				this._trigger('participantListChanged');
				this.internalSyncRooms();
				break;
			default:
				console.log("Unknown room participant event", data);
				break;
		}
	};

	OCA.Talk.Signaling.Standalone.prototype._getChatRequestData = function(/* lastKnownMessageId */) {
		var data = OCA.Talk.Signaling.Base.prototype._getChatRequestData.apply(this, arguments);
		// Don't keep connection open and wait for more messages, will be done
		// through another event on the WebSocket.
		data.timeout = 0;
		return data;
	};

	OCA.Talk.Signaling.Standalone.prototype._retryChatLoadingOnError = function() {
		// We don't regularly poll for changes, so need to always retry loading
		// of chat messages in case of errors.
		return true;
	};

	OCA.Talk.Signaling.Standalone.prototype.startReceiveMessages = function() {
		OCA.Talk.Signaling.Base.prototype.startReceiveMessages.apply(this, arguments);
		// We will be notified when to load new messages.
		this.receiveMessagesAgain = false;
	};

	OCA.Talk.Signaling.Standalone.prototype.requestOffer = function(sessionid, roomType) {
		if (!this.hasFeature("mcu")) {
			console.warn("Can't request an offer without a MCU.");
			return;
		}

		if (typeof(sessionid) !== "string") {
			// Got a user object.
			sessionid = sessionid.sessionId || sessionid.sessionid;
		}
		console.log("Request offer from", sessionid);
		this.doSend({
			"type": "message",
			"message": {
				"recipient": {
					"type": "session",
					"sessionid": sessionid
				},
				"data": {
					"type": "requestoffer",
					"roomType": roomType
				}
			}
		});
	};

	OCA.Talk.Signaling.Standalone.prototype.sendOffer = function(sessionid, roomType) {
		// TODO(jojo): This should go away and "requestOffer" should be used
		// instead by peers that want an offer by the MCU. See the calling
		// location for further details.
		if (!this.hasFeature("mcu")) {
			console.warn("Can't send an offer without a MCU.");
			return;
		}

		if (typeof(sessionid) !== "string") {
			// Got a user object.
			sessionid = sessionid.sessionId || sessionid.sessionid;
		}
		console.log("Send offer to", sessionid);
		this.doSend({
			"type": "message",
			"message": {
				"recipient": {
					"type": "session",
					"sessionid": sessionid
				},
				"data": {
					"type": "sendoffer",
					"roomType": roomType
				}
			}
		});
	};

})(OCA, OC, $);


// TODO(fancycode): Should load through AMD if possible.
/* global OC, OCA */

(function(OCA, OC, $) {
	'use strict';

	OCA.Talk = OCA.Talk || {};

	var roomsChannel = Backbone.Radio.channel('rooms');


	function Connection(app) {
		this.app = app;

		// Todo this should not be here
		var selectParticipants = $('#select-participants');
		selectParticipants.keyup(function () {
			selectParticipants.tooltip('hide');
			selectParticipants.removeClass('error');
		});

		this.app.signaling.on('roomChanged', function() {
			this.leaveCurrentRoom();
		}.bind(this));

		this.app.signaling.on('pullMessagesStoppedOnFail', function() {
			this.leaveCurrentRoom();
		}.bind(this));
	}

	OCA.Talk.Connection = Connection;
	OCA.Talk.Connection.prototype = {
		/** @property {OCA.Talk.Application} app */
		app: null,

		_createCallSuccessHandle: function(ocsResponse) {
			var token = ocsResponse.ocs.data.token;
			this.joinRoom(token);
		},
		createOneToOneVideoCall: function(recipientUserId) {
			console.log("Creating one-to-one video call", recipientUserId);
			$.ajax({
				url: OC.linkToOCS('apps/spreed/api/v1', 2) + 'room',
				type: 'POST',
				data: {
					invite: recipientUserId,
					roomType: 1
				},
				beforeSend: function (request) {
					request.setRequestHeader('Accept', 'application/json');
				},
				success: _.bind(this._createCallSuccessHandle, this)
			});
		},
		createGroupVideoCall: function(groupId, roomName) {
			console.log("Creating group video call", groupId);
			$.ajax({
				url: OC.linkToOCS('apps/spreed/api/v1', 2) + 'room',
				type: 'POST',
				data: {
					invite: groupId,
					roomType: 2,
					roomName: roomName
				},
				beforeSend: function (request) {
					request.setRequestHeader('Accept', 'application/json');
				},
				success: _.bind(this._createCallSuccessHandle, this)
			});
		},
		createPublicVideoCall: function(roomName) {
			console.log("Creating a new public room.");
			$.ajax({
				url: OC.linkToOCS('apps/spreed/api/v1', 2) + 'room',
				type: 'POST',
				data: {
					roomType: 3,
					roomName: roomName
				},
				beforeSend: function (request) {
					request.setRequestHeader('Accept', 'application/json');
				},
				success: _.bind(this._createCallSuccessHandle, this)
			});
		},
		joinRoom: function(token) {
			if (this.app.signaling.currentRoomToken === token) {
				return;
			}

			this.app.signaling.leaveCurrentRoom();
			this.app.token = token;
			this.app.signaling.joinRoom(token);

			roomsChannel.trigger('joinRoom', token);

			$('#video-fullscreen').removeClass('hidden');
		},
		leaveCurrentRoom: function() {
			$('#video-fullscreen').addClass('hidden');
			this.app.signaling.leaveCurrentRoom();

			$(this.app.mainCallElementSelector).removeClass('incall');

			roomsChannel.trigger('leaveCurrentRoom');
		},
		joinCall: function(token) {
			if (this.app.signaling.currentCallToken === token) {
				return;
			}

			roomsChannel.trigger('joinCall', token);

			var self = this;
			this.app.callbackAfterMedia = function(configuration) {
				var flags = OCA.SpreedMe.app.FLAG_IN_CALL;
				if (configuration) {
					if (configuration.audio) {
						flags |= OCA.SpreedMe.app.FLAG_WITH_AUDIO;
					}
					if (configuration.video && self.app.signaling.getSendVideoIfAvailable()) {
						flags |= OCA.SpreedMe.app.FLAG_WITH_VIDEO;
					}
				}
				self.app.signaling.joinCall(token, flags);
				self.app.signaling.syncRooms();
			};

			this.app.setupWebRTC();
		},
		leaveCurrentCall: function() {
			roomsChannel.trigger('leaveCurrentCall');

			this.app.signaling.leaveCurrentCall();
			this.app.signaling.syncRooms();
			$(this.app.mainCallElementSelector).removeClass('incall');
		},
	};

})(OCA, OC, $);


/* global Marionette, Backbone, _, $ */

/**
 *
 * @copyright Copyright (c) 2018, Daniel Calviño Sánchez (danxuliu@gmail.com)
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
 *
 */

(function(OC, OCA, Marionette, Backbone, _, $) {
	'use strict';

	OCA.Talk = OCA.Talk || {};

	var roomChannel = Backbone.Radio.channel('rooms');
	var localMediaChannel = Backbone.Radio.channel('localMedia');

	OCA.Talk.Embedded = Marionette.Application.extend({
		OWNER: 1,
		MODERATOR: 2,
		USER: 3,
		GUEST: 4,
		USERSELFJOINED: 5,

		/* Must stay in sync with values in "lib/Room.php". */
		FLAG_DISCONNECTED: 0,
		FLAG_IN_CALL: 1,
		FLAG_WITH_AUDIO: 2,
		FLAG_WITH_VIDEO: 4,

		/** @property {OCA.SpreedMe.Models.Room} activeRoom  */
		activeRoom: null,

		/** @property {String} token  */
		token: null,

		/** @property {OCA.Talk.Connection} connection  */
		connection: null,

		/** @property {OCA.Talk.Signaling.base} signaling  */
		signaling: null,

		/** property {String} selector */
		mainCallElementSelector: '#call-container',

		_registerPageEvents: function() {
			// Initialize button tooltips
			$('[data-toggle="tooltip"]').tooltip({trigger: 'hover'}).click(function() {
				$(this).tooltip('hide');
			});
		},

		initialize: function() {
			if (!OC.getCurrentUser().uid) {
				this.initGuestName();
			}

			this._messageCollection = new OCA.SpreedMe.Models.ChatMessageCollection(null, {token: null});
			this._chatView = new OCA.SpreedMe.Views.ChatView({
				collection: this._messageCollection,
				model: this.activeRoom,
				id: 'chatView',
				guestNameModel: this._localStorageModel
			});

			this._messageCollection.listenTo(roomChannel, 'leaveCurrentRoom', function() {
				this.stopReceivingMessages();
			});

			this._localVideoView = new OCA.Talk.Views.LocalVideoView({
				app: this,
				webrtc: OCA.SpreedMe.webrtc,
				sharedScreens: OCA.SpreedMe.sharedScreens,
			});

			this._mediaControlsView = this._localVideoView._mediaControlsView;
		},
		onStart: function() {
			this.signaling = OCA.Talk.Signaling.createConnection();
			this.connection = new OCA.Talk.Connection(this);

			this.signaling.on('joinRoom', function(token) {
				if (this.token !== token) {
					return;
				}

				this.inRoom = true;
				if (this.pendingNickChange) {
					this.setGuestName(this.pendingNickChange);
					delete this.pendingNickChange;
				}
			}.bind(this));

			this.signaling.on('joinCall', function() {
				// Do not perform the initial adjustments when joining a call
				// again due to a forced reconnection.
				if (this._reconnectCallToken === this.activeRoom.get('token')) {
					delete this._reconnectCallToken;

					return;
				}

				delete this._reconnectCallToken;

				if (this.activeRoom.get('type') === this.ROOM_TYPE_ONE_TO_ONE) {
					this._mediaControlsView.setAudioEnabled(true);
					this.setVideoEnabled(false);

					return;
				}

				this._mediaControlsView.setAudioEnabled(false);
				this.setVideoEnabled(false);

				var participants = this.activeRoom.get('participants');
				var numberOfParticipantsAndGuests = (participants? Object.keys(participants).length: 0) +
						this.activeRoom.get('numGuests');
				if (this.signaling.isNoMcuWarningEnabled() && numberOfParticipantsAndGuests >= 5) {
					var warning = t('spreed', 'Calls with more than 4 participants without an external signaling server can experience connectivity issues and cause high load on participating devices.');
					OC.Notification.showTemporary(warning, { timeout: 30, type: 'warning' });
				}
			}.bind(this));

			this.signaling.on('leaveCall', function (token, reconnect) {
				if (reconnect) {
					this._reconnectCallToken = token;
				}
			}.bind(this));

			$(window).unload(function () {
				this.connection.leaveCurrentRoom();
				this.signaling.disconnect();
			}.bind(this));

			this._registerPageEvents();
		},

		setupWebRTC: function() {
			if (!OCA.SpreedMe.webrtc) {
				OCA.SpreedMe.initWebRTC(this);
				this._mediaControlsView.setWebRtc(OCA.SpreedMe.webrtc);
			}

			if (!OCA.SpreedMe.webrtc.capabilities.supportRTCPeerConnection) {
				localMediaChannel.trigger('webRtcNotSupported');
			} else {
				localMediaChannel.trigger('waitingForPermissions');
			}

			var participants = this.activeRoom.get('participants');
			var numberOfParticipantsAndGuests = (participants? Object.keys(participants).length: 0) +
					this.activeRoom.get('numGuests');
			if (numberOfParticipantsAndGuests >= 5) {
				this.signaling.setSendVideoIfAvailable(false);
				this.setVideoEnabled(false);
			} else {
				this.signaling.setSendVideoIfAvailable(true);
			}

			OCA.SpreedMe.webrtc.startMedia(this.token);
		},
		startLocalMedia: function(configuration) {
			if (this.callbackAfterMedia) {
				this.callbackAfterMedia(configuration);
				this.callbackAfterMedia = null;
			}

			this.initAudioVideoSettings(configuration);

			localMediaChannel.trigger('startLocalMedia');
		},
		startWithoutLocalMedia: function(configuration) {
			if (this.callbackAfterMedia) {
				this.callbackAfterMedia(null);
				this.callbackAfterMedia = null;
			}

			this.initAudioVideoSettings(configuration);

			if (OCA.SpreedMe.webrtc.capabilities.supportRTCPeerConnection) {
				localMediaChannel.trigger('startWithoutLocalMedia');
			}
		},
		initAudioVideoSettings: function(configuration) {
			if (configuration.audio !== false) {
				this._mediaControlsView.setAudioAvailable(true);
				this._mediaControlsView.setAudioEnabled(this._mediaControlsView.audioEnabled);
			} else {
				this._mediaControlsView.setAudioEnabled(false);
				this._mediaControlsView.setAudioAvailable(false);
			}

			if (configuration.video !== false) {
				this._mediaControlsView.setVideoAvailable(true);
				this.setVideoEnabled(this._mediaControlsView.videoEnabled);
			} else {
				this.setVideoEnabled(false);
				this._mediaControlsView.setVideoAvailable(false);
			}
		},
		setVideoEnabled: function(videoEnabled) {
			if (!this._mediaControlsView.setVideoEnabled(videoEnabled)) {
				return;
			}

			this._localVideoView.setVideoEnabled(videoEnabled);
		},
		// Called from webrtc.js
		disableScreensharingButton: function() {
			this._mediaControlsView.disableScreensharingButton();
		},
		setGuestName: function(name) {
			$.ajax({
				url: OC.linkToOCS('apps/spreed/api/v1/guest', 2) + this.token + '/name',
				type: 'POST',
				data: {
					displayName: name
				},
				beforeSend: function (request) {
					request.setRequestHeader('Accept', 'application/json');
				},
				success: function() {
					this._onChangeGuestName(name);
				}.bind(this)
			});
		},
		initGuestName: function() {
			this._localStorageModel = new OCA.SpreedMe.Models.LocalStorageModel({ nick: '' });
			this._localStorageModel.on('change:nick', function(model, newDisplayName) {
				if (!this.token || !this.inRoom) {
					this.pendingNickChange = newDisplayName;
					return;
				}

				this.setGuestName(newDisplayName);
			}.bind(this));

			this._localStorageModel.fetch();
		},
		_onChangeGuestName: function(newDisplayName) {
			this._localVideoView.setAvatar(undefined, newDisplayName);

			if (OCA.SpreedMe.webrtc) {
				console.log('_onChangeGuestName.webrtc');
				OCA.SpreedMe.webrtc.sendDirectlyToAll('status', 'nickChanged', newDisplayName);
			}
		},
	});

})(OC, OCA, Marionette, Backbone, _, $);


/**
 *
 * @copyright Copyright (c) 2018, Daniel Calviño Sánchez (danxuliu@gmail.com)
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
 *
 */

(function(OC, OCA) {

	'use strict';

	OCA.Talk = OCA.Talk || {};

	var roomsChannel = Backbone.Radio.channel('rooms');

	OCA.Talk.RoomForFileModel = function() {
	};
	OCA.Talk.RoomForFileModel.prototype = {

		join: function(currentFileId) {
			if (this._currentFileId === currentFileId) {
				return;
			}

			this.leave();

			this._currentFileId = currentFileId;

			var self = this;

			$.ajax({
				url: OC.linkToOCS('apps/spreed/api/v1', 2) + 'file/' + currentFileId,
				type: 'GET',
				beforeSend: function(request) {
					request.setRequestHeader('Accept', 'application/json');
				},
				success: function(ocsResponse) {
					if (self._currentFileId !== currentFileId) {
						// Leave, or join with a different id, was called while
						// waiting for the response; as it is not the latest one
						// just ignore it.
						return;
					}

					OCA.Talk.FilesPlugin.joinRoom(ocsResponse.ocs.data.token);
				},
				error: function() {
					if (self._currentFileId !== currentFileId) {
						// Leave, or join with a different id, was called while
						// waiting for the response; as it is not the latest one
						// just ignore it.
						return;
					}

					OC.Notification.showTemporary(t('spreed', 'Error while getting the room ID'), {type: 'error'});

					OCA.Talk.FilesPlugin.leaveCurrentRoom();
				}
			});
		},

		leave: function() {
			if (this._currentFileId === undefined) {
				return;
			}

			delete this._currentFileId;

			OCA.Talk.FilesPlugin.leaveCurrentRoom();
		}
	};

	OCA.Talk.TalkCallDetailFileInfoView = OCA.Files.DetailFileInfoView.extend({

		className: 'talkCallInfoView',

		initialize: function(options) {
			this._roomForFileModel = options.roomForFileModel;
			this._fileList = options.fileList;

			this._boundHideCallUi = this._hideCallUi.bind(this);

			this.listenTo(roomsChannel, 'joinedRoom', this.setActiveRoom);
			this.listenTo(roomsChannel, 'leaveCurrentRoom', this.setActiveRoom);
		},

		/**
		 * Sets the file info to be displayed in the view
		 *
		 * @param {OCA.Files.FileInfo} fileInfo file info to set
		 */
		setFileInfo: function(fileInfo) {
			if (!this._appStarted) {
				this.model = fileInfo;

				return;
			}

			if (this.model === fileInfo) {
				return;
			}

			this.model = fileInfo;

			this.render();
		},

		setActiveRoom: function(activeRoom) {
			// Ignore reconnections to the same room.
			if (this._activeRoom === activeRoom) {
				return;
			}

			this.stopListening(this._activeRoom, 'change:participantFlags', this._updateCallContainer);
			// Signaling uses its own event system, so Backbone methods can not
			// be used.
			OCA.SpreedMe.app.signaling.off('leaveCall', this._boundHideCallUi);

			this._activeRoom = activeRoom;

			if (activeRoom) {
				this.listenTo(activeRoom, 'change:participantFlags', this._updateCallContainer);
				// Signaling uses its own event system, so Backbone methods can
				// not be used.
				OCA.SpreedMe.app.signaling.on('leaveCall', this._boundHideCallUi);

				if (this._emptyContentView) {
					this._emptyContentView.setActiveRoom(activeRoom);
				}
			}
		},

		render: function() {
			// Detach the LocalVideoView before emptying its ancestor to prevent
			// internal listeners in MediaControlsView from becoming unusable.
			OCA.SpreedMe.app._localVideoView.$el.detach();

			this.$el.empty();
			this._$callContainerWrapper = null;

			if (!this.model || this.model.get('type') === 'dir') {
				return;
			}

			this._$callContainerWrapper = $('<div id="call-container-wrapper" class="hidden"></div>');

			this.$el.append(this._$callContainerWrapper);
			$('#call-container-wrapper').append('<div id="call-container"></div>');
			$('#call-container-wrapper').append('<div id="emptycontent"><div id="emptycontent-icon" class="icon-loading"></div><h2></h2><p class="emptycontent-additional"></p></div>');
			$('#call-container').append('<div id="videos"></div>');
			$('#call-container').append('<div id="screens"></div>');

			if (this._emptyContentView) {
				this._emptyContentView.destroy();
			}
			this._emptyContentView = new OCA.SpreedMe.Views.EmptyContentView({
				el: '#call-container-wrapper > #emptycontent',
			});

			OCA.SpreedMe.app._localVideoView.render();
			OCA.SpreedMe.app._mediaControlsView.hideScreensharingButton();
			$('#videos').append(OCA.SpreedMe.app._localVideoView.$el);
		},

		_updateCallContainer: function() {
			var flags = this._activeRoom.get('participantFlags') || 0;
			var inCall = flags & OCA.SpreedMe.app.FLAG_IN_CALL !== 0;
			if (inCall) {
				this._showCallUi();
			} else {
				this._hideCallUi();
			}
		},

		_showCallUi: function() {
			if (!this._$callContainerWrapper || !this._$callContainerWrapper.hasClass('hidden')) {
				return;
			}

			this._fileList.getRegisteredDetailViews().forEach(function(detailView) {
				if (!(detailView instanceof OCA.Talk.TalkCallDetailFileInfoView)) {
					detailView.$el.addClass('hidden-by-call');
				}
			});

			this._$callContainerWrapper.removeClass('hidden');

			// The icon to close the sidebar overlaps the video, so use its
			// white version with a shadow instead of the black one.
			// TODO Change it only when there is a call in progress; while
			// waiting for other participants it should be kept black. However,
			// this would need to hook in "updateParticipantsUI" which is where
			// the "incall" class is set.
			$('#app-sidebar .icon-close').addClass('force-icon-white-in-call icon-shadow');
		},

		_hideCallUi: function() {
			// The _$callContainerWrapper could be undefined when changing to a
			// different file, so the detail views have to be unhidden in any
			// case.
			this._fileList.getRegisteredDetailViews().forEach(function(detailView) {
				if (!(detailView instanceof OCA.Talk.TalkCallDetailFileInfoView)) {
					detailView.$el.removeClass('hidden-by-call');
				}
			});

			// Restore the icon to close the sidebar.
			$('#app-sidebar .icon-close').removeClass('force-icon-white-in-call icon-shadow');

			if (!this._$callContainerWrapper || this._$callContainerWrapper.hasClass('hidden')) {
				return;
			}

			this._$callContainerWrapper.addClass('hidden');
		},

		setAppStarted: function() {
			this._appStarted = true;

			// Set again the file info now that the app has started.
			if (OCA.Talk.FilesPlugin.isTalkSidebarSupportedForFile(this.model)) {
				var fileInfo = this.model;
				this.model = null;
				this.setFileInfo(fileInfo);
			}
		},

	});

	/**
	 * Tab view for Talk chat in the details view of the Files app.
	 *
	 * This view shows the chat for the Talk room associated with the file. The
	 * tab is shown only for those files in which the Talk sidebar is supported,
	 * otherwise it is hidden.
	 */
	OCA.Talk.TalkChatDetailTabView = OCA.Files.DetailTabView.extend({

		id: 'talkChatTabView',

		/**
		 * Higher priority than other tabs.
		 */
		order: -10,

		initialize: function(options) {
			this._roomForFileModel = options.roomForFileModel;
			this._fileList = options.fileList;

			this.listenTo(roomsChannel, 'joinedRoom', this.setActiveRoom);
			this.listenTo(roomsChannel, 'leaveCurrentRoom', this.setActiveRoom);

			this.$el.append('<div class="ui-not-ready-placeholder icon-loading"></div>');
		},

		/**
		 * Returns a CSS class to force scroll bars in the chat view instead of
		 * in the whole sidebar.
		 */
		getTabsContainerExtraClasses: function() {
			return 'with-inner-scroll-bars force-minimum-height';
		},

		getLabel: function() {
			return t('spreed', 'Chat');
		},

		getIcon: function() {
			return 'icon-talk';
		},

		/**
		 * Returns whether the Talk tab can be displayed for the file.
		 *
		 * The tab is shown for all files except folders.
		 *
		 * @param OCA.Files.FileInfoModel fileInfo
		 * @return True if the tab can be displayed, false otherwise.
		 */
		canDisplay: function(fileInfo) {
			if (fileInfo && fileInfo.get('type') !== 'dir') {
				return true;
			}

			// If the Talk tab can not be displayed then the current room is
			// left; this must be done here because "setFileInfo" will not get
			// called with the new file if the tab can not be displayed.
			if (this._appStarted) {
				this._roomForFileModel.leave();
			} else {
				this.model = null;
			}

			return false;
		},

		/**
		 * Sets the FileInfoModel for the currently selected file.
		 *
		 * Rooms are associated to the id of the file, so the chat can not be
		 * loaded until the file info is set and the token for the room is got.
		 *
		 * @param OCA.Files.FileInfoModel fileInfo
		 */
		setFileInfo: function(fileInfo) {
			if (!this._appStarted) {
				this.model = fileInfo;

				return;
			}

			this.$el.prepend('<div class="ui-not-ready-placeholder icon-loading"></div>');

			OCA.Talk.FilesPlugin.isTalkSidebarSupportedForFile(fileInfo).then(function(supported) {
				if (supported) {
					this._setFileInfoWhenTalkSidebarIsSupportedForFile(fileInfo);
				} else {
					this._setFileInfoWhenTalkSidebarIsNotSupportedForFile();
				}
			}.bind(this));
		},

		_setFileInfoWhenTalkSidebarIsNotSupportedForFile: function() {
			this.model = null;

			this._roomForFileModel.leave();

			this._renderFileNotSharedUi();
		},

		_setFileInfoWhenTalkSidebarIsSupportedForFile: function(fileInfo) {
			if (this.model === fileInfo) {
				this.$el.find('.ui-not-ready-placeholder').remove();

				// If the tab was hidden and it is being shown again at this
				// point the tab has not been made visible yet, so the
				// operations need to be delayed. However, the scroll position
				// is saved before the tab is made visible to avoid it being
				// reset.
				// Note that the system tags may finish to load once the chat
				// view was already loaded; in that case the input for tags will
				// be shown, "compressing" slightly the chat view and thus
				// causing it to "lose" the last visible element (as the scroll
				// position is kept so the elements at the bottom are hidden).
				// Unfortunately there does not seem to be anything that can be
				// done to prevent that.
				var lastKnownScrollPosition = OCA.SpreedMe.app._chatView.getLastKnownScrollPosition();
				setTimeout(function() {
					OCA.SpreedMe.app._chatView.restoreScrollPosition(lastKnownScrollPosition);

					// Load the pending elements that may have been added while
					// the tab was hidden.
					OCA.SpreedMe.app._chatView.reloadMessageList();

					OCA.SpreedMe.app._chatView.focusChatInput();
				}, 0);

				return;
			}

			// Discard the call button until joining to the new room.
			if (this._callButton) {
				this._callButton.$el.remove();
				delete this._callButton;
			}

			this.model = fileInfo;

			if (!fileInfo || fileInfo.get('id') === undefined) {
				// This should never happen, except during the initial setup of
				// the Files app (and not even in that case due to having to
				// wait for the signaling settings to be fetched before
				// registering the tab).
				// Nevertheless, disconnect from the previous room just in case.
				OCA.Talk.FilesPlugin.leaveCurrentRoom();

				return;
			}

			// Keep the placeholder visible until the messages for the new room
			// have been received to prevent showing the messages of the
			// previous room.
			// The message collection is updated by the signaling, so there are
			// no "sync" events to listen to. Moreover, this relies on the fact
			// that the rooms are never empty (as there will be always at least
			// a system message for the creation of the room) and thus at least
			// one model will be always added, triggering the "update" event.
			OCA.SpreedMe.app._messageCollection.once('update', function() {
				this.$el.find('.ui-not-ready-placeholder').remove();
			}, this);

			this._roomForFileModel.join(this.model.get('id'));

			this.$el.find('.file-not-shared').remove();

			// If the details view is rendered again after the chat view has
			// been appended to this tab the chat view would stop working due to
			// the element being removed instead of detached, which would make
			// the references to its elements invalid (apparently even if
			// rendered again; "delegateEvents()" should probably need to be
			// called too in that case). However, the details view would only be
			// rendered again if new tabs were added, so in general this should
			// be safe.
			OCA.SpreedMe.app._chatView.$el.appendTo(this.$el);
			OCA.SpreedMe.app._chatView.setTooltipContainer($('#app-sidebar'));
			OCA.SpreedMe.app._chatView.focusChatInput();

			// At this point the tab has not been made visible yet, so the
			// reload needs to be delayed.
			setTimeout(function() {
				OCA.SpreedMe.app._chatView.reloadMessageList();
			}, 0);
		},

		_renderFileNotSharedUi: function() {
			this.$el.empty();

			var $fileNotSharedMessage = $(
				'<div class="emptycontent file-not-shared">' +
				'    <div class="icon icon-talk"></div>' +
				'    <h2>' + t('spreed', 'Start a conversation') + '</h2>' +
				'    <p>' + t('spreed', 'Share this file with others to discuss') + '</p>' +
				'    <button class="primary">' + t('spreed', 'Share') + '</button>' +
				'</div>');

			$fileNotSharedMessage.find('button').click(function() {
				// FileList.showDetailsView() is not used to prevent a
				// reload of the preview, which would cause flickering (although
				// the preview may be reloaded anyway if the share tab is opened
				// for the first time...).
				this._fileList._detailsView.selectTab('shareTabView');
			}.bind(this));

			this.$el.append($fileNotSharedMessage);
		},

		setActiveRoom: function(activeRoom) {
			// Ignore reconnections to the same room.
			if (this._activeRoom === activeRoom) {
				return;
			}

			this._activeRoom = activeRoom;

			if (!activeRoom) {
				if (this._callButton) {
					this._callButton.$el.remove();
					delete this._callButton;
				}

				return;
			}

			this._callButton = new OCA.SpreedMe.Views.CallButton({
				model: activeRoom,
				connection: OCA.SpreedMe.app.connection,
			});
			// Force initial rendering; changes in the room state will
			// automatically render the button again from now on.
			this._callButton.render();
			this._callButton.$el.insertBefore(OCA.SpreedMe.app._chatView.$el);
		},

		setAppStarted: function() {
			this._appStarted = true;

			this.$el.find('.ui-not-ready-placeholder').remove();

			// Set again the file info now that the app has started.
			if (this.model !== null) {
				var fileInfo = this.model;
				this.model = null;
				this.setFileInfo(fileInfo);
			}
		},

	});

	/**
	 * @namespace
	 */
	OCA.Talk.FilesPlugin = {
		ignoreLists: [
			'files_trashbin',
			'files.public'
		],

		attach: function(fileList) {
			// core sharing is disabled/not loaded
			if (!OC.Share) {
				return;
			}

			var self = this;
			if (this.ignoreLists.indexOf(fileList.id) >= 0) {
				return;
			}

			var roomForFileModel = new OCA.Talk.RoomForFileModel();
			var talkCallDetailFileInfoView = new OCA.Talk.TalkCallDetailFileInfoView({ roomForFileModel: roomForFileModel, fileList: fileList });
			var talkChatDetailTabView = new OCA.Talk.TalkChatDetailTabView({ roomForFileModel: roomForFileModel, fileList: fileList });

			OCA.SpreedMe.app.on('start', function() {
				self.setupSignalingEventHandlers();

				// While the app is being started the view just shows a
				// placeholder UI that is replaced by the actual UI once
				// started.
				talkCallDetailFileInfoView.setAppStarted();
				talkChatDetailTabView.setAppStarted();
			}.bind(this));

			fileList.registerDetailView(talkCallDetailFileInfoView);
			fileList.registerTabView(talkChatDetailTabView);

			// Unlike in the regular Talk app when Talk is embedded the
			// signaling settings are not initially included in the HTML, so
			// they need to be explicitly loaded before starting the app.
			OCA.Talk.Signaling.loadSettings().then(function() {
				OCA.SpreedMe.app.start();
			});
		},

		/**
		 * Returns whether the Talk sidebar is supported for the file or not.
		 *
		 * In some cases it is not possible to know if the Talk sidebar is
		 * supported for the file or not just from the data in the FileInfo (for
		 * example, for files in a folder shared by the current user). Due to
		 * that a Promise is always returned; the Promise will be resolved as
		 * soon as possible (in some cases, immediately) with either true or
		 * false, depending on whether the Talk sidebar is supported for the
		 * file or not.
		 *
		 * The Talk sidebar is supported for a file if the file is shared with
		 * the current user or by the current user to another user (as a user,
		 * group...), or if the file is a descendant of a folder that meets
		 * those conditions.
		 *
		 * @param {OCA.Files.FileInfo}
		 * @return {Promise}
		 */
		isTalkSidebarSupportedForFile: function(fileInfo) {
			var deferred = $.Deferred();

			if (!fileInfo) {
				deferred.resolve(false);

				return deferred.promise();
			}

			if (fileInfo.get('type') === 'dir') {
				deferred.resolve(false);

				return deferred.promise();
			}

			if (fileInfo.get('shareOwnerId')) {
				// Shared with me
				// TODO How to check that it is not a remote share? At least for
				// local shares "shareTypes" is not defined when shared with me.
				deferred.resolve(true);

				return deferred.promise();
			}

			if (!fileInfo.get('shareTypes')) {
				OCA.Talk.FilesPlugin._isRoomForFileAccessible(fileInfo.id, deferred);

				return deferred.promise();
			}

			var shareTypes = fileInfo.get('shareTypes').filter(function(shareType) {
				// shareType could be an integer or a string depending on
				// whether the Sharing tab was opened or not.
				shareType = parseInt(shareType);
				return shareType === OC.Share.SHARE_TYPE_USER ||
						shareType === OC.Share.SHARE_TYPE_GROUP ||
						shareType === OC.Share.SHARE_TYPE_CIRCLE ||
						shareType === OC.Share.SHARE_TYPE_ROOM;
			});

			if (shareTypes.length === 0) {
				OCA.Talk.FilesPlugin._isRoomForFileAccessible(fileInfo.id, deferred);

				return deferred.promise();
			}

			deferred.resolve(true);

			return deferred.promise();
		},

		/**
		 * Resolves the Deferred with whether the room for the given file ID is
		 * accessible or not.
		 *
		 * When it is not possible to know whether the Talk sidebar is supported
		 * for a file or not only from the data in the FileInfo it is necessary
		 * to query the server.
		 *
		 * @param {string} fileId
		 * @param {Deferred} deferred
		 */
		_isRoomForFileAccessible: function(fileId, deferred) {
			$.ajax({
				url: OC.linkToOCS('apps/spreed/api/v1', 2) + 'file/' + fileId,
				type: 'GET',
				beforeSend: function(request) {
					request.setRequestHeader('Accept', 'application/json');
				},
				success: function() {
					deferred.resolve(true);
				},
				error: function() {
					deferred.resolve(false);
				}
			});
		},

		setupSignalingEventHandlers: function() {
			OCA.SpreedMe.app.signaling.on('joinRoom', function(joinedRoomToken) {
				if (OCA.SpreedMe.app.token !== joinedRoomToken) {
					return;
				}

				OCA.SpreedMe.app.signaling.syncRooms().then(function() {
					roomsChannel.trigger('joinedRoom', OCA.SpreedMe.app.activeRoom);

					OCA.SpreedMe.app._messageCollection.setRoomToken(OCA.SpreedMe.app.activeRoom.get('token'));
					OCA.SpreedMe.app._messageCollection.receiveMessages();
				});
			});

			// Chromium seems to drop a stream when the element it is attached
			// to is detached or reparented. The sidebar in the Files app is
			// open and closed using a jQuery animation, which reparents the
			// whole sidebar and then restores it at the end of the animation,
			// so closing the sidebar breaks an ongoing call in Chromium. To
			// prevent that, during a call the functions to open and close the
			// sidebar are replaced with custom versions that do not use an
			// animation.
			var showAppSidebarOriginal = OC.Apps.showAppSidebar;
			var hideAppSidebarOriginal = OC.Apps.hideAppSidebar;

			var showAppSidebarDuringCall = function($el) {
				var $appSidebar = $el || $('#app-sidebar');
				$appSidebar.removeClass('disappear');
				$('#app-content').trigger(new $.Event('appresized'));
			};

			var hideAppSidebarDuringCall = function($el) {
				var $appSidebar = $el || $('#app-sidebar');
				$appSidebar.addClass('disappear');
				$('#app-content').trigger(new $.Event('appresized'));
			};

			OCA.SpreedMe.app.signaling.on('joinCall', function() {
				OC.Apps.showAppSidebar = showAppSidebarDuringCall;
				OC.Apps.hideAppSidebar = hideAppSidebarDuringCall;
			});

			OCA.SpreedMe.app.signaling.on('leaveCall', function() {
				OC.Apps.showAppSidebar = showAppSidebarOriginal;
				OC.Apps.hideAppSidebar = hideAppSidebarOriginal;
			});

		},

		joinRoom: function(token) {
			OCA.SpreedMe.app.activeRoom = new OCA.SpreedMe.Models.Room({token: token});
			OCA.SpreedMe.app.signaling.setRoom(OCA.SpreedMe.app.activeRoom);

			OCA.SpreedMe.app.token = token;
			OCA.SpreedMe.app.signaling.joinRoom(token);
		},

		leaveCurrentRoom: function() {
			OCA.SpreedMe.app.signaling.leaveCurrentRoom();

			roomsChannel.trigger('leaveCurrentRoom');

			OCA.SpreedMe.app.token = null;
			OCA.SpreedMe.app.activeRoom = null;
		}

	};

	OCA.SpreedMe.app = new OCA.Talk.Embedded();

	OC.Plugins.register('OCA.Files.FileList', OCA.Talk.FilesPlugin);

})(OC, OCA);


