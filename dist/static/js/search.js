"use strict";var search={init:function(){this.$ul=document.querySelector("#goods-wrap ul"),this.event(),this.getData()},event:function(){},getData:function(){var a=this;sendAjax("/static/json/kuangwei.json").then(function(t){t=JSON.parse(t),console.log(t),a.data=t.data,a.insertData(a.data)})},insertData:function(t){console.log(this.data.length);for(var a=0;a<9;a++)for(var n=0;n<this.data.length;n++){var e=document.createElement("li");e.innerHTML='<a href="detail1.html">\n           <img src="'.concat(this.data[n].src,'" alt="" class="tupian">\n           <p class="price">').concat(this.data[n].price,'</p>\n           <span class="miaoshu">').concat(this.data[n].describe,"</span>\n           </a>"),this.$ul.appendChild(e)}}};