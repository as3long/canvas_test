define(["com/as3long/display/DisplayObjectContainer","com/as3long/display/Graphics","com/as3long/utils/Utils"],function(DisplayObjectContainer,Graphics,Utils) {
	var Sprite=DisplayObjectContainer.extend({
		className:"Sprite",
		graphics:null,
		init:function(){
			this.graphics=Graphics.create();
			this.callSuper();
		}
	});
	return Sprite;
});