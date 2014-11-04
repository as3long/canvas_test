define(["com/as3long/events/EventDispatcher"],function(EventDispatcher) {
	var DisplayObject = EventDispatcher.extend({
		name:"",
		className:"DisplayObject",
		alpha:1,
		height:0,
		width:0,
		rotation:0,
		visible:true,
		x:0,
		y:0,
		_mouseX:0,
		_mouseY:0,
		scaleX:1,
		scaleY:1,
		getMouseX:function(){
			return this._mouseX;
		},
		getMouseY:function(){
			return this._mouseY;
		},
		toString:function(){
			return JSON.stringify({x:this.x,y:this.y,width:this.width,height:this.height});
		}
	});
	return DisplayObject;
});