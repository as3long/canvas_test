define(["com/as3long/display/Stage","Class"],function(Stage,Class) {
	var Global=Class.extend({
		stage:null,
		registRoot:function(ctx){
			this.stage=Stage.create(ctx);
			this.stage._tick();
			//console.log("注册root");
		},
		registRootById:function(id){
			var dom=document.getElementById(id);
			var ctx=dom.getContext("2d");
			this.registRoot(ctx);
			//console.log("注册registRootById");
		},
		createLinearGradient:function(x0,y0,x1,y1){
			return this.stage._ctx.createLinearGradient(x0,y0,x1,y1);
		},
		createRadialGradient:function(x0,y0,r0,x1,y1,r1){
			return this.stage._ctx.createRadialGradient(x0,y0,r0,x1,y1,r1);
		},
	});
	return Global.create();
});