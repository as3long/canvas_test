// 所有模块都通过 define 来定义
define(["Class","com/as3long/utils/Utils"],function(Class,Utils) {
	var EventDispatcher = Class.extend({
		_classObjectId:null,
		dict:{},
		className:"EventDispatcher",
		_createObjectId: function(size) {
			var result = '';
			var allChar = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
			size = size || 1;
			while (size--) {
				result += allChar.charAt(this.rand(0, allChar.length - 1));
			}
			return result;
		},
		rand: function(min, max) {
			return Math.floor(Math.random() * (max - min + 1) + min);
		},
		init: function() {
			this._classObjectId = this._createObjectId(16);
		},
		addEventListener: function(type, listener,context) {
			context=context||this;
			if (!Utils.isFunction(listener)) {
				throw new Error("指定的 listener 不是一个函数");
			}
			if (!this.dict[type]) {
				this.dict[type] = [];
			}
			this.dict[type].push({"func":listener,"context":context,"type":type});
		},
		dispatchEvent: function(event) {
			var type = event.type;
			if (!this.dict[type]) {
				return;
			}
			event.target = this;
			var len = this.dict[type].length;
			for (var i = 0; i < len; i++) {
				var obj=this.dict[type][i];
				obj.func.call(obj.context,event);
			}
		},
		hasEventListener: function(type) {
			if (!this.dict[type]) {
				return false;
			} else {
				return true;
			}
		},
		removeEventListener: function(type, listener) {
			if (!this.dict[type]) {
				return;
			}
			var len = this.dict[type].length;
			for (var i = 0; i < len; i++) {
				if (listener == this.dict[type][i]) {
					this.dict.splice(i, 1);
					break;
				}
			}
		},
		removeAllEventListener: function(type) {
			if (!this.dict[type]) {
				return;
			}
			this.dict[type].length = 0;
		}
	});
	return EventDispatcher;
});