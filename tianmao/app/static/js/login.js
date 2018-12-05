var login = (function(){
	return{
		init:function(){
			this.$mima =document.querySelector('#banner-wrap .banner .dl1 .mima');
			this.$dengluma =document.querySelector('#banner-wrap .banner .dl1 .dengluma');
			this.$phone =document.querySelector('#banner-wrap .banner .dl1 .phone');
			this.$erweima =document.querySelector('#banner-wrap .banner .dl .biao .erweima');
			this.$dl1 =document.querySelector('#banner-wrap .banner .dl1');
			this.$dl =document.querySelector('#banner-wrap .banner .dl');
			this.event();
			console.log(this.$dengluma);
			console.log(this.$dl1);
		},
		event: function(){
			const _this = this;
			this.$mima.onclick = function(){
				_this.$dl1.style.display = 'none';
				_this.$dl.style.display = 'block';
			}
			this.$erweima.onclick = function(){
				_this.$dl1.style.display = 'block';
				_this.$dl.style.display = 'none';
			}
			this.$dengluma.onmouseenter = function(){
				_this.$phone.style.display = 'block';
				_this.$dengluma.style.left = '20px';
			}
			this.$dengluma.onmouseout = function(){
				_this.$phone.style.display = 'none';
				_this.$dengluma.style.left = '100px';
			}
			
			
		}
	}
}())
login.init();
