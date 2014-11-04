define([],function() {
	var Utils = {
		/**
		 * 1°的值
		 * @example 30*Utils.DEGREE
		 */
		DEGREE:Math.PI/180,
		isFunction: function(v) {
			return typeof v === 'function';
		},
		isArray: function(v) {
			return toString.apply(v) === "[object Array]";
		},
		isBoolean: function(obj) {
			return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
		},
		isUndefined: function(obj) {
			return obj ===
				void 0;
		},
		isNull: function(obj) {
			return obj === null;
		},
		has: function(obj, key) {
			return hasOwnProperty.call(obj, key);
		},
		now: Date.now ||
			function() {
				return new Date().getTime();
			},
		isElement: function(obj) {
			return !!(obj && obj.nodeType === 1);
		},
		getObjectType:function(obj){
			return Object.prototype.toString.call(obj).slice(8,-1);
		}
	}
	return Utils;
});