"use strict";function _classCallCheck(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}function _defineProperties(n,e){for(var o=0;o<e.length;o++){var i=e[o];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(n,i.key,i)}}function _createClass(n,e,o){return e&&_defineProperties(n.prototype,e),o&&_defineProperties(n,o),n}var mySwiper=new Swiper(".swiper-container",{loop:!0,autoplay:!0,pagination:{el:".swiper-pagination"},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}});$(function(){var n={shopInfo:$("#shop")};new ShopInfo(n)});var ShopInfo=function(){function e(n){_classCallCheck(this,e),this.shopInfo=n.shopInfo,this.showShops()}return _createClass(e,[{key:"showShops",value:function(){var e=this;$.getJSON("json/tianmao.json",function(n){e.showShopsInfo(n),e.shopsInfo(n)})}},{key:"showShopsInfo",value:function(n){for(var e="",o=0;o<n.length;o++)e+='\n                  <li>\n                  <a href="#" class="details">\n                  <div>\n                  <i style="display:none" class="bid">'.concat(n[o].bid,'</i>\n                  <img src="images/').concat(n[o].src,'">\n                  <p>').concat(n[o].describe,"</p>\n                  <span>￥").concat(n[o].price,"</span>\n                  </div>\n                  </a>\t\n                  </li>\n                  ");this.shopInfo.html(e)}},{key:"shopsInfo",value:function(n){this.shopInfo.find(".details").click(function(){var n=$(this).find(".bid").html();$(".details").attr("href","detail.html?bid="+n)})}}]),e}();