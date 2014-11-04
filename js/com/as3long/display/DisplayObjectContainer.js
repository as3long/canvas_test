define(["com/as3long/display/DisplayObject","com/as3long/utils/Utils"],function(DisplayObject,Utils) {
	var DisplayObjectContainer = DisplayObject.extend({
		_displayList:null,
		className:"DisplayObjectContainer",
		parent:null,
		_localX:0,
		_localY:0,
		centerPoint:{x:0,y:0},
		init:function(){
			this.callSuper();
			this._displayList=[];
		},
		addChild:function(child){
			child.parent=this;
			this._displayList.push(child);
		},
		removeChild:function(child){
			var self=this;
			for(var i=this._displayList.length-1;i>=0;i--){
				if(this._displayList[i]._classObjectId==child._classObjectId){
					self._displayList.splice(i,1);
					break;
				}
			}
		},
		addChildAt:function(child,index){
			this._displayList.splice(index,0,child);
		},
		removeChildAt:function(index){
			this._displayList.splice(index,1);
		},
		getChildAt:function(index){
			return this._displayList[i];
		},
		getChildIndex:function(child){
			for(var i=this._displayList.length-1;i>=0;i--){
				if(this._displayList[i]._classObjectId==child._classObjectId){
					index=i;
					break;
				}
			}
			return index;
		},
		getChildByName:function(name){
			for(var i=this._displayList.length-1;i>=0;i--){
				if(this._displayList[i].name==name){
					index=i;
					break;
				}
			}
			return this._displayList[index];
		},
		swapChildrenAt:function(index1,index2){
			var child1=this.getChildAt(index1);
			var child2=this.getChildAt(index2);
			this._displayList.splice(index1,1,child2);
			this._displayList.splice(index2,1,child1);
		},
		dispatchEvent:function(event){
			this.callSuper(event);
			var i=0,length=this._displayList.length;
			for(var i=0;i<length;i++){
				this._displayList[i].dispatchEvent(event);
			}
		},
		_render:function(ctx){
			ctx.scale(this.scaleX,this.scaleY);
			ctx.translate(this.x,this.y);
			ctx.rotate(this.rotation*Utils.DEGREE);
			if(this.graphics){
				this.graphics._render(ctx);
			}
			for(var i=0;i<this._displayList.length;i++){
				ctx.save();
				this._displayList[i]._render(ctx);
				ctx.restore();
			}
		}
	});
	return DisplayObjectContainer;
});