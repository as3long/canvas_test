define(["com/as3long/display/DisplayObject","com/as3long/utils/Utils"],function(DisplayObject,Utils) {
	var Bitmap = DisplayObject.extend({
		source:null,
		className:"Bitmap",
		centerPoint:{x:0,y:0},
		init:function(source){
			if(source){
				this.source=source;
				this.width=source.width;
				this.height=source.height;
				console.log(Utils.getObjectType(this.source));
			}
			this.callSuper();
		},
		_render:function(ctx){
			ctx.save();
			ctx.translate(this.x,this.y);
			ctx.rotate(this.rotation*Utils.DEGREE);
			ctx.drawImage(this.source,-this.centerPoint.x,-this.centerPoint.y);
			ctx.restore();
		}
	});
	return Bitmap;
})