define(["com/as3long/events/AEvent","com/as3long/display/DisplayObjectContainer"],function(AEvent,DisplayObjectContainer) {
	(function() {
	    var lastTime = 0;
	    var vendors = ['webkit', 'moz'];
	    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
	        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // Webkit中此取消方法的名字变了
	                                      window[vendors[x] + 'CancelRequestAnimationFrame'];
	    }
	
	    if (!window.requestAnimationFrame) {
	        window.requestAnimationFrame = function(callback, element) {
	            var currTime = new Date().getTime();
	            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
	            var id = window.setTimeout(function() {
	                callback(currTime + timeToCall);
	            }, timeToCall);
	            lastTime = currTime + timeToCall;
	            return id;
	        };
	    }
	    if (!window.cancelAnimationFrame) {
	        window.cancelAnimationFrame = function(id) {
	            clearTimeout(id);
	        };
	    }
	}());
	var Stage=DisplayObjectContainer.extend({
		stageWidth:0,
		stageHeight:0,
		className:"Stage",
		_ctx:null,
		init:function(ctx){
			this.callSuper();
			this._ctx=ctx;
		},
		_tick:function(){
			//this._ctx.save();
			this.dispatchEvent(AEvent.create(AEvent.ENTER_FRAME));
			this._render(this._ctx);
			this.dispatchEvent(AEvent.create(AEvent.EXIT_FRAME));
			//this._ctx.restore();
			var self=this;
			requestAnimationFrame(function(){
				self._tick.call(self);
			});
		},
		_render:function(ctx){
			ctx.clearRect(0,0,500,500);
			this.callSuper(ctx);
		},
	});
	return Stage;
});