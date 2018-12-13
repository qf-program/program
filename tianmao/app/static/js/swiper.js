var mySwiper = new Swiper('.swiper-container', {
      loop: true, // 循环模式选项
      autoplay: true,
      // 如果需要分页器
      pagination: {
            el: '.swiper-pagination',
            //    clickable: 'true',
            //   type : 'custom',
      },

      // 如果需要前进后退按钮
      navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
      },

})

$(function () {
      var obj = {
            shopInfo: $("#shop"),
      }
      new ShopInfo(obj);
})

class ShopInfo {
      constructor(obj) {
            this.shopInfo = obj.shopInfo;
            this.showShops();
      };

      showShops() {
            var _this = this;
            //加载数据
            $.getJSON("json/tianmao.json", function (res) {
                  //展示商品
                  _this.showShopsInfo(res);
                  _this.shopsInfo(res);
            })
      };
      //把商品显示在页面上
      showShopsInfo(res) {
            var str = "";
            for (var i = 0; i < res.length; i++) {
                  str += `
                  <li>
                  <a href="#" class="details">
                  <div>
                  <i style="display:none" class="bid">${res[i].bid}</i>
                  <img src="images/${res[i].src}">
                  <p>${res[i].describe}</p>
                  <span>￥${res[i].price}</span>
                  </div>
                  </a>	
                  </li>
                  `;
            }

            this.shopInfo.html(str);

      };
      shopsInfo(res) {
            this.shopInfo.find(".details").click(function () {
                  var bid = $(this).find(".bid").html();
                  $(".details").attr("href", "detail.html?bid=" + bid);
            })
      }

}
