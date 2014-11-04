require.config({
	baseUrl: "js",
});
require(['Class',"Global","com/as3long/display/Sprite","com/as3long/manager/AssetManager","com/as3long/display/Bitmap","./Clock","com/as3long/motion/GTween","com/as3long/motion/easing/Back"], function (Class,Global,Sprite,AssetManager,Bitmap,Clock,GTween,Back){
	var main = Sprite.extend({
		sprite: null,
		sprite2: null,
		className: "main",
		bookBitmap: null,
		clock:null,
		init: function() {
			//console.log(111);
			Global.registRootById("hello");
			this.callSuper();
			Global.stage.addChild(this);
			
			this.clock=Clock.create();
			this.clock.x=0;
			this.addChild(this.clock);
			//this.addChild(Clock.create());
			GTween.staticInit(this);
			GTween.create(this.clock,1,{x:50},{ease:Back.easeInOut});
			//this.addEventListener(AEvent.ENTER_FRAME, this.enterFrameHandler);
		},
		enterFrameHandler: function(event) {
			//this.sprite.x++;
			//this.sprite2.y++;
//			if (this.bookBitmap) {
//				this.bookBitmap.rotation = this.bookBitmap.rotation > 359 ? this.bookBitmap.rotation - 359 : this.bookBitmap.rotation + 1;
//			}
			//console.log(A.value);
		}
	});
	var m=main.create();
});