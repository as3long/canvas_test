// 所有模块都通过 define 来定义
define(["com/as3long/events/EventDispatcher","com/as3long/events/AEvent"],function(EventDispatcher,AEvent) {
	var AssetManager = EventDispatcher.extend({
		images: {},
		/**
		 * 注释
		 * @constructor 注释
		 * @param {string} url 地址
		 * @return {void} 
		 */
		loadImage: function(url) {
			var self = this;
			var onloadHandler = function() {
				var event = AEvent.create(url);
				event.data = self.images[url];
				self.dispatchEvent(event);
			};
			if (!self.images[url]) {
				self.images[url] = new Image();
				self.images[url].onload = onloadHandler;
				self.images[url].src = url;
			} else {
				onloadHandler();
			}
		},
		getImage: function(url) {
			return this.images[url];
		},
		test: function() {
			console.log("测试通过");
		}
	});
	return AssetManager.create();
});