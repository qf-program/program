// var big = (function () {

//   return {
//     init() {
//       // 获取最大的盒子
//       this.$box = document.querySelector("#banner-wrap .banner .banner-l .box");

//       // 获取展示图片的盒子
//       this.$showImage = this.$box.querySelector('.show-image');
//       // 获取放大图片的盒子
//       this.$showBigImage = this.$box.querySelector('.show-big-image');
//       // console.log(this.$showBigImage)
//       // 获取小图片的盒子
//       this.$ulbox = this.$box.querySelector('.img-box');
//       // 获取每一张图片的li集合
//       this.$liAll = this.$ulbox.children;
//       // 获取移动的小黑块(放大镜)
//       this.$filter = this.$showImage.querySelector('.filter');
//       this.$banner = document.querySelector("#banner-wrap .banner");
//       // this.$xiemaAll = $('.xiema').children;
//       this.$xiema = document.querySelector('.xiema');
//       this.$xiemaAll = document.querySelectorAll('.xiema li');
//       this.$btn1 = document.querySelector('.btn1');
//       // console.log(this.$btn1)
//       this.$btn2 = document.querySelector('.btn2');
//       this.$inp = document.querySelector('.inp');
//       // console.log(this.$btn1, this.$inp, this.$btn2);
//       // console.log(this.$xiemaAll[0]);
//       // console.log(this.$xiemaAll.length);

//       // 给每一li添加索引， 方便获取
//       for (var i = 0; i < this.$liAll.length; i++) {
//         this.$liAll[i].index = i;
//       }

//       this.event();

//     },
//     event: function () {
//       var _this = this;
//       var t = this.$inp.value || 1; // 给数量赋值
//       // 利用事件委托，给每一个li添加点击事件
//       this.$ulbox.onclick = function (ev) {
//         ev = ev || window.event;
//         var target = ev.target || ev.srcElement;
//         // 点击时，真正触发的为图片。
//         if (target.nodeName === 'IMG') {
//           // 获取li的索引 =》target.parentNode.index
//           // 点击触发更换图片
//           _this.showImage(target.parentNode.index)
//         }
//       }
//       //鞋码的点击事件
//       this.$xiema.onclick = function (e) {
//         // const _this = this;
//         // console.log(_this.$xiemaAll.length);
//         e = e || window.event;
//         var target = e.target || e.srcElement;
//         if (target.nodeName === 'LI') {
//           // console.log(target);
//           for (var i = 0; i < _this.$xiemaAll.length; i++) {
//             _this.$xiemaAll[i].className = '';
//           }
//           target.className = 'active';

//           // 商品数量的点击事件
//         }

//       }

//       this.$btn1.onclick = function () {
//         console.log(this.$btn1);
//         console.log(1);
//         t = _this.$inp.value || 1;
//         ++t;
//         _this.$inp.value = `${t}`;
//       }
//       // 商品数量的点击事件


//       this.$btn2.onclick = function () {
//         t = _this.$inp.value || 1;
//         --t;
//         if (t < 1) {
//           t = 1;
//         }
//         _this.$inp.value = `${t}`;
//       }
//       // 这里用onmouseenter： 子元素不触发事件
//       this.$showImage.onmouseenter = function () {
//         // 放大镜显示
//         _this.$filter.style.display = 'block';
//         // 展示大图片显示
//         _this.$showBigImage.style.display = 'block';
//       }
//       this.$showImage.onmouseleave = function () {

//         _this.$filter.style.display = 'none';
//         _this.$showBigImage.style.display = 'none';
//       }
//       this.$showImage.onmousemove = function (ev) {
//         ev = ev || window.event;
//         // 计算小方块定点坐标
//         var x = ev.pageX - _this.$banner.offsetLeft - _this.$filter.offsetWidth / 2;
//         var y = ev.pageY - _this.$banner.offsetTop - _this.$filter.offsetHeight / 2;

//         // 获取小方块移动的最大坐标
//         var maxL = 420 - _this.$filter.offsetWidth,
//           maxT = 420 - _this.$filter.offsetHeight;
//         // console.log(this);
//         if (x >= maxL) {
//           x = maxL
//         } else if (x <= 0) {
//           x = 0;
//         }
//         if (y >= maxT) {
//           y = maxT;
//         } else if (y <= 0) {
//           y = 0;
//         }
//         _this.$filter.style.left = x + 'px';
//         _this.$filter.style.top = y + 'px';

//         // 移动大图片的位置， 放大三倍
//         var img = _this.$showBigImage.querySelector('img');
//         img.style.left = -1.4 * x + 'px';
//         img.style.top = -1.4 * y + 'px';
//       }
//     },
//     showImage: function (index) {
//       // console.log(index);
//       // for(var i = 0; i < this.$liAll.length; i++) {
//       //   this.$liAll[i].className = ''
//       // }
//       // this.$liAll[index].className = 'active';
//       // 修改对应的图片地址
//       var src = this.$liAll[index].querySelector('img').getAttribute('src');
//       this.$showImage.querySelector('img').src = src;
//       this.$showBigImage.querySelector('img').src = src;
//       console.log(src);
//     }
//   }
// }())
// big.init();
// var uname = location.search.split("=")[1];

(function ($) {
  //扩展方法获取url参数  
  $.getUrlParam = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象  
    var r = window.location.search.substr(1).match(reg); //匹配目标参数  
    if (r != null) return unescape(r[2]);
    return null; //返回参数值  
  }
})(jQuery);

// var uname = $.getUrlParam("uname");
$(function () {
  var obj = {
    banners: $(".banner-l"),
    // uname: uname,
    bid: $.getUrlParam("bid"),
    cartShopsNum: $("#cartShopsNum")
  }
  new showDetailsInfo(obj);
})

class showDetailsInfo {
  constructor(obj) {
    this.banners = obj.banners;
    // this.uname = obj.uname;
    this.bid = obj.bid;
    this.cartShopsNum = obj.cartShopsNum;
    this.getDetailsphones();
  };

  getDetailsphones() {
    var _this = this;
    $.getJSON("json/tianmao.json", function (res) {
      _this.showDetailsInfo(res);
      _this.addCart();
    })
  };

  showDetailsInfo(res) {
    var bid = this.bid;
    var str = "";
    for (var i = 0; i < res.length; i++) {
      if (res[i].bid == this.bid) {
        str += `
        <i style="display:none" class="bid">${res[i].bid}</i>
        <div class="box">
        <div class="show-image">
            <img src="images/${res[i].src}" alt="" style="width: 420px; height: 420px; border: 1px solid #eee;">
            <span class="filter"></span>
        </div>
        <div class="show-big-image">
            <img src="images/${res[i].src}" alt="" id="big-image">
        </div>
        <ul class="img-box">
            <li><img src="images/${res[i].src}" alt=""></li>
            <li><img src="images/${res[i].src1}" alt=""></li>
            <li><img src="images/${res[i].src2}" alt=""></li>
            <li><img src="images/${res[i].src3}" alt=""></li>
        </ul>
        <p><span>分享</span>
            <span><i class="iconfont icon-shoucangxuanzhong"></i>收藏商品&nbsp;（128593人气）</span>
            <span>举报</span>
        </p>
       </div>

       <div class="xinxi">
          <h2>CONVERSE匡威官方 Chuck Taylor All Star '70 162063C</h2>
          <h3>此款鞋尺码偏大 买偏小半码</h3>
          <div class="price"></div>
          <h4><span>运费</span> <b>江苏无锡&nbsp;至&nbsp;深圳<i class="iconfont icon-diquxialajiantou"></i>快递：10.00</b></h4>
          <ul class="pingjia">
              <li>累计评价<span>6312</span></li>丨
              <li>送天猫积分<span>269</span></li>
          </ul>
          <ul class="title">
              <li>鞋码</li>
              <li>颜色分类</li>
              <li>数量</li>
          </ul>
          <ul class="xiema">
              <li>39</li>
              <li>39.5</li>
              <li>40</li>
              <li>40.5</li>
              <li>41</li>
              <li>41.5</li>
              <li>42</li>
              <li>42.5</li>
              <li>43</li>
              <li>44</li>
              <li>45</li>
          </ul>
          <div class="color">黄色/162063C</div>
          <div class="count">
              <input type="text" class="inp" value="1">
              <button class="btn1"><i class="iconfont icon-sanjiao2"></i></button>
              <button class="btn2"><i class="iconfont icon-sanjiao1"></i></button>
          </div>
          <button class="buy">立即购买</button>
          <button class="car"><i class="iconfont icon-gouwuche"></i> 加入购物车</button>
          <p>服务承诺 <b>正品保证</b>
              <b>极速退款</b>
              <b>七天无理由退换</b>
              <b>支付方式 <i class="iconfont icon-diquxialajiantou"></i></b>
          </p>
      </div>
       `;
      }
    }
    $(".banner-l").html(str);

    var index = 0;
    var arr = new Array();
    var newArr = new Array();

    $(".banner-l .box .img-box li").click(function () {
      index = $(this).index();

      for (var i = 0; i < res.length; i++) {
        newArr.push(res[i].src, res[i].src1, res[i].src2, res[i].src3);
        arr.push(newArr.splice(0, 4));
      }
      $(".banner-l .box .img-box li").eq(index).addClass("active").siblings().removeClass("active");

      if (bid == 101) {
        $(".show-image img").attr('src', "images/" + arr[0][index]);
      } else if (bid == 102) {
        $(".show-image img").attr('src', "images/" + arr[1][index]);
      } else if (bid == 103) {
        $(".show-image img").attr('src', "images/" + arr[2][index]);
      } else if (bid == 104) {
        $(".show-image img").attr('src', "images/" + arr[3][index]);
      } else if (bid == 105) {
        $(".show-image img").attr('src', "images/" + arr[4][index]);
      } else if (bid == 106) {
        $(".show-image img").attr('src', "images/" + arr[5][index]);
      }
      $(".show-image").mouseenter(function () {
        $(".filter").css('display', 'block');
        $(".show-big-image").css('display', 'block');
        if (bid == 101) {
          $("#big-image").attr('src', "images/" + arr[0][index]);
        } else if (bid == 102) {
          $("#big-image").attr('src', "images/" + arr[1][index]);
        } else if (bid == 103) {
          $("#big-image").attr('src', "images/" + arr[2][index]);
        } else if (bid == 104) {
          $("#big-image").attr('src', "images/" + arr[3][index]);
        } else if (bid == 105) {
          $("#big-image").attr('src', "images/" + arr[4][index]);
        } else if (bid == 106) {
          $("#big-image").attr('src', "images/" + arr[5][index]);
        }
      })

      //鼠标移出隐藏
      $(".show-image").mouseleave(function () {
        $(".filter").css('display', 'none');
        $(".show-big-image").css('display', 'none');
      })

      $(".show-image").mousemove(function (e) {
        var e = e || event;
        var l = e.pageX - $(".show-image").offset().left - $(".filter").width() / 2;
        var t = e.pageY - $(".show-image").offset().top - $(".filter").height() / 2;

        var left = $(".show-image").width() - $(".filter").width();
        var top = $(".show-image").height() - $(".filter").height();

        if (l < 0) {
          l = 0;
        } else if (l > left) {
          l = left;
        }
        if (t < 0) {
          t = 0;
        } else if (t > top) {
          t = top;
        }
        $(".filter").css({
          left: l,
          top: t
        })
        //比例
        var maxingL = l * $("#big-image").width() / $(".show-image").width();
        var maxingT = t * $("#big-image").height() / $(".show-image").height();

        $("#big-image").css({
          left: -maxingL,
          top: -maxingT
        })
      })
    });

  };

  addCart() {
    var _this = this;
    this.banners.find(".car").click(function () {

      var bid = $(this).parent().parent().find(".bid").html();
      //点击时，要保存当前商品的编号，商品的数量，每点击一次添加1条商品。
      var obj = [{
        "bid": bid,
        "count": 1
      }];

      var objStr = JSON.stringify(obj);
      if (!localStorage.getItem("shops")) {
        //当localStorage里面没有任何购物车信息，需要添加何购物车信息
        localStorage.setItem("shops", objStr);
      } else {
        //当localStorage里面已经存在购物车信息，要判断当前点击的bid的这个商品在信息里是否存在 
        //如果有，在原来商品数量上加1，如果没有，重新在原来localStorage基础上追加1个商品
        var cartshops = localStorage.getItem("shops");
        var cartshopsJson = JSON.parse(cartshops);
        //一个控制器，用户判断原来的购物车信息中是否存在当前的这个bid商品
        var flag = false; //false表示购物车信息中是没有当前的这个bid商品
        for (var i = 0; i < cartshopsJson.length; i++) {
          if (cartshopsJson[i].bid == bid) {
            cartshopsJson[i].count++;
            flag = true; //true表示购物车信息中已经存在当前的这个bid商品
          }
        }
        if (!flag) { //购物车信息中是没有当前的这个bid商品
          //追加一条
          var newBidInfo = {
            "bid": bid,
            "count": 1
          };
          cartshopsJson.push(newBidInfo);
        }
        //添加到localStorage中
        var cartshopsJsonToStr = JSON.stringify(cartshopsJson);
        localStorage.setItem("shops", cartshopsJsonToStr);

      }
      localStorage.getItem("shops");
      //点击添加购物车时计算购物车商品总条数
      _this.getCartCount();

    })
  };

  //计算购物车商品总条数
  getCartCount() {
    //购物车信息存在，就可以来计算条数了
    if (localStorage.getItem("shops")) {

      var cartshops = localStorage.getItem("shops");
      var cartshopsJson = JSON.parse(cartshops);
      var sum = 0;
      for (var i = 0; i < cartshopsJson.length; i++) {
        sum += cartshopsJson[i].count;
      }
      this.cartShopsNum.html(sum);
    } else {
      return
    }
  }


}

