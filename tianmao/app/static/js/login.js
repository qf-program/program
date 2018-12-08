var login = (function(){
	return{
		init:function(){
			this.$mima =document.querySelector('#banner-wrap .banner .dl1 .mima');
			this.$dengluma =document.querySelector('#banner-wrap .banner .dl1 .dengluma');
			this.$phone =document.querySelector('#banner-wrap .banner .dl1 .phone');
			this.$erweima =document.querySelector('#banner-wrap .banner .dl .biao .erweima');
			this.$dl1 =document.querySelector('#banner-wrap .banner .dl1');
			this.$dl =document.querySelector('#banner-wrap .banner .dl');
			this.$btn = document.querySelector('#banner-wrap .banner .dl .biao #denglu');
			this.$user = document.querySelector('#banner-wrap .banner .dl .biao #username');
			this.$pass = document.querySelector('#banner-wrap .banner .dl .biao #password');
			this.$form =  document.querySelector('#banner-wrap .banner .dl .biao');
			console.log(this.$btn,this.$user,this.$pass);
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
			this.$btn.onclick = function(){
				sendAjax('php/login.php', {
					method: 'GET',
					data:{
						username: _this.$user.value,
						password: _this.$pass.value
					}
				})
				.then(data =>{
					data = JSON.parse(data)
					console.log(data)
					if(data.code == 0){

						window.location = "shouye.html";
					}else{
						alert('登录失败');
					}

				})
				.catch(data =>{
					console.log(222);
					
				})
			}
			
		}
	}
}())
login.init();
