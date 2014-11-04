define(["Class"],function(Class) {
	var Graphics=Class.extend({
		setList:[],
		className:"Graphics",
		fillRect:function(x,y,width,height){
			this.setList.push(function(_ctx){
				_ctx.fillRect(x,y,width,height);
			});
		},
		rect:function(x,y,width,height){
			this.setList.push(function(_ctx){
				_ctx.rect(x,y,width,height);
			});
		},
		strokeRect:function(x,y,width,height){
			this.setList.push(function(_ctx){
				_ctx.strokeRect(x,y,width,height);
			});
		},
		fillStyle:function(value){
			this.setList.push(function(_ctx){
				_ctx.fillStyle=value;
			});
		},
		stroke:function(color){
			this.setList.push(function(ctx){
				if(color){
					ctx.strokeStyle=color;
				}
				ctx.stroke();
				//ctx.restore();
			});
		},
		beginPath:function(){
			this.setList.push(function(ctx){
				ctx.beginPath();
			});
		},
		clip:function(){
			this.setList.push(function(ctx){
				ctx.clip();
			});
		},
		/**
		 * 二次贝塞尔曲线
		 * cpx 	贝塞尔控制点的 x 坐标
		 * cpy 	贝塞尔控制点的 y 坐标
		 * x 	结束点的 x 坐标
		 * y 	结束点的 y 坐标
		 */
		quadraticCurveTo:function(cpx,cpy,x,y){
			this.setList.push(function(ctx){
				ctx.quadraticCurveTo(cpx,cpy,x,y);
			});
		},
		/**
		 * 三次贝塞尔曲线
		 */
		bezierCurveTo:function(cp1x,cp1y,cp2x,cp2y,x,y){
			this.setList.push(function(ctx){
				ctx.bezierCurveTo(cp1x,cp1y,cp2x,cp2y,x,y);
			});
		},
		arc:function(x,y,r,sAngle,eAngle,counterclockwise){
			this.setList.push(function(ctx){
				ctx.arc(x,y,r,sAngle,eAngle,counterclockwise);
			});
		},
		arcTo:function(x1,y1,x2,y2,r){
			this.setList.push(function(ctx){
				ctx.arc(x,y,r,sAngle,eAngle,counterclockwise);
			});
		},
		closePath:function(){
			this.setList.push(function(ctx){
				ctx.closePath();
			});
		},
		lineTo:function(x,y){
			this.setList.push(function(ctx){
				ctx.lineTo(x,y);
			});
		},
		moveTo:function(x,y){
			this.setList.push(function(ctx){
				ctx.moveTo(x,y);
			});
		},
		strokeStyle:function(lineWidth,color,alpha){
			lineWidth=lineWidth||1;
			color=color||"#000000";
			alpha=alpha||1.0;
			this.setList.push(function(ctx){
				ctx.save();
				ctx.lineWidth = lineWidth;
				ctx.strokeStyle = color;
			});
		},
		_render:function(ctx){
			ctx.save();
			var i,length=this.setList.length;
			for(i=0;i<length;i++){
				this.setList[i].call(this,ctx);
			}
			ctx.restore();
		},
		drawCircle:function(x,y,radius){
			this.setList.push(function(ctx){
				ctx.moveTo(x+radius,y);
				ctx.beginPath();
				ctx.arc(x,y,radius,0,2*Math.PI,false);
				ctx.closePath();
				ctx.fill();
			});
		},
		shadow:function(offsetX,offsetY,color,blur){
			offsetX=offsetX||5;
			offsetY=offsetY||4;
			color=color||'rgba(0, 0, 0, 0.5)';
			blur=blur||10;
			this.setList.push(function(ctx){
				ctx.shadowOffsetX = offsetX; // 阴影Y轴偏移
				ctx.shadowOffsetY = offsetY; // 阴影X轴偏移
				ctx.shadowBlur = blur; // 模糊尺寸
				ctx.shadowColor = color; // 颜色
			});
		},
		drawElipse:function(x,y,width,height){
			var a=0.5*width;
			var b=0.5*height;
			var step = (a > b) ? 1 / a : 1 / b;
			this.setList.push(function(ctx){
			   ctx.beginPath();
			   ctx.moveTo(x + a, y); //从椭圆的左端点开始绘制
			   for (var i = 0; i < 2 * Math.PI; i += step)
			   {
			      //参数方程为x = a * cos(i), y = b * sin(i)，
			      //参数为i，表示度数（弧度）
			      ctx.lineTo(x + a * Math.cos(i), y + b * Math.sin(i));
			   }
			   ctx.closePath();
			   ctx.fill();
			   //ctx.stroke();
			});
		},
		drawRect:function(x,y,width,height){
			this.setList.push(function(_ctx){
				_ctx.fillRect(x,y,width,height);
			});
		},
		beginFill:function(color,alpha){
			alpha=alpha||1;
			this.setList.push(function(ctx){
				ctx.save();
				ctx.globalAlpha=alpha;
				ctx.fillStyle=color;
			});
		},
		endFill:function(){
			this.setList.push(function(ctx){
				ctx.restore();
			});
		}
	});
	return Graphics;
});