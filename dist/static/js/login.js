"use strict";var login={init:function(){this.$mima=document.querySelector("#banner-wrap .banner .dl1 .mima"),this.$dengluma=document.querySelector("#banner-wrap .banner .dl1 .dengluma"),this.$phone=document.querySelector("#banner-wrap .banner .dl1 .phone"),this.$erweima=document.querySelector("#banner-wrap .banner .dl .biao .erweima"),this.$dl1=document.querySelector("#banner-wrap .banner .dl1"),this.$dl=document.querySelector("#banner-wrap .banner .dl"),this.$btn=document.querySelector("#banner-wrap .banner .dl .biao #denglu"),this.$user=document.querySelector("#banner-wrap .banner .dl .biao #username"),this.$pass=document.querySelector("#banner-wrap .banner .dl .biao #password"),this.$form=document.querySelector("#banner-wrap .banner .dl .biao"),console.log(this.$btn,this.$user,this.$pass),this.event(),console.log(this.$dengluma),console.log(this.$dl1)},event:function(){var e=this;this.$mima.onclick=function(){e.$dl1.style.display="none",e.$dl.style.display="block"},this.$erweima.onclick=function(){e.$dl1.style.display="block",e.$dl.style.display="none"},this.$dengluma.onmouseenter=function(){e.$phone.style.display="block",e.$dengluma.style.left="20px"},this.$dengluma.onmouseout=function(){e.$phone.style.display="none",e.$dengluma.style.left="100px"},this.$btn.onclick=function(){sendAjax("http://10.36.141.37:6524/vivo/program/tianmao/app/static/php/login.php",{method:"GET",data:{username:e.$user.value,password:e.$pass.value}}).then(function(e){e=JSON.parse(e),console.log(e),0==e.code?window.location="shouye.html":alert("登录失败")}).catch(function(e){console.log(222)})}}};login.init();