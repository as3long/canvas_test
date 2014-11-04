define(["com/as3long/display/Sprite","com/as3long/utils/Utils","Global","com/as3long/motion/GTween","com/as3long/motion/easing/Back"],function(Sprite,Utils,Global,GTween,Back) {
	'use strict';
//	var Sprite = require("com/as3long/display/Sprite");
//	var Utils=require("com/as3long/utils/Utils");
//	var Global=require("Global");
//	var GTween=require("com/as3long/motion/GTween");
//	var Back=require("com/as3long/motion/easing/Back");
	var Clock=Sprite.extend({
		secondHand:null,
		minuteHand:null,
		hourHand:null,
		dial:null,
		init:function(){
			this.callSuper();
			this.initView();
			this.startTimer();
		},
		initView:function(){
			this.dial=Dial.create();
			this.secondHand=SecondHand.create();
			this.minuteHand=MinuteHand.create();
			this.hourHand=HourHand.create();
			this.addChild(this.dial);
			this.addChild(this.hourHand);
			this.addChild(this.minuteHand);
			this.addChild(this.secondHand);
			this.hourHand.x=this.hourHand.y=160;
			this.secondHand.x=this.secondHand.y=160;
			this.minuteHand.x=this.minuteHand.y=160;
		},
		setSecond:function(second){
			var self=this;
			if(this.secondHand.rotation==second/60*360-90){
				return;
			}
			second=second==0?60:second;
			GTween.create(this.secondHand,.2,{rotation:second/60*360-90},{ease:Back.easeInOut,onComplete:function(){
				if(second==60){self.secondHand.rotation=-90;}
			}});
		},
		setMinute:function(minute){
			this.minuteHand.rotation=minute/60*360-90;
		},
		setHour:function(hour){
			hour=hour%12;
			this.hourHand.rotation=hour/12*360-90;
		},
		startTimer:function(){
			var self=this;
			var time=function(){
				var date=new Date();
				var second=date.getSeconds();
				var minute=date.getMinutes()+second/60;
				var hour=date.getHours()+minute/60;
				self.setHour(hour);
				self.setMinute(minute);
				self.setSecond(second);
				setTimeout(time,1000);
			}
			time();
		}
	});
	
	var Dial=Sprite.extend({
		init:function(){
			this.callSuper();
			this.initView();
		},
		initView:function(){
			var r=132,longLine=40,shortLine=20,i=0;
			var centerPoint={x:160,y:160}
			this.graphics.beginFill("#d2d2d2");
			this.graphics.drawCircle(160,160,160);
			this.graphics.endFill();
			var grd=Global.createRadialGradient(160,160,75,160,160,155);
			grd.addColorStop(0,"#ffffff");
			grd.addColorStop(1,"#c2d2d8");
			this.graphics.fillStyle(grd);
			this.graphics.drawCircle(160,160,155);
			this.graphics.endFill();
			this.graphics.beginPath();
			for(i=0;i<12;i++){
				var sAngel =Math.sin(i*30*Utils.DEGREE);
				var cAngel =Math.cos(i*30*Utils.DEGREE);
				this.graphics.moveTo(centerPoint.x+sAngel*r,centerPoint.y-cAngel*r);
				if(i%3==0){
					this.graphics.lineTo(centerPoint.x+sAngel*(r-longLine),centerPoint.y-cAngel*(r-longLine));
				}else{
					this.graphics.lineTo(centerPoint.x+sAngel*(r-shortLine),centerPoint.y-cAngel*(r-shortLine));
				}
			}
			this.graphics.closePath();
			this.graphics.strokeStyle(2,"#030303");
			this.graphics.stroke();
		}
	});
	
	var SecondHand=Sprite.extend({
		init:function(){
			this.callSuper();
			this.initView();
		},
		initView:function(){
			this.graphics.beginFill("#bb0910");
			this.graphics.shadow(0,5,'rgba(0, 0, 0, 0.6)',4);
			this.graphics.drawRect(-17,-1,140,2);
			this.graphics.endFill();
		}
	});
	var MinuteHand=Sprite.extend({
		init:function(){
			this.callSuper();
			this.initView();
		},
		initView:function(){
			this.graphics.beginFill("#030303");
			this.graphics.shadow(0,5,'rgba(0, 0, 0, 0.6)',4);
			this.graphics.drawRect(-28,-2,155,4);
			this.graphics.endFill();
		}
	});
	
	var HourHand=Sprite.extend({
		init:function(){
			this.callSuper();
			this.initView();
		},
		initView:function(){
			this.graphics.beginFill("#030303");
			this.graphics.shadow(0,5,'rgba(0, 0, 0, 0.6)',4);
			this.graphics.drawRect(-20,-3,105,6);
			this.graphics.endFill();
		}
	});
	return Clock;
});