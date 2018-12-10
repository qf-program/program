var big = (function () {

  return {
    init() {
      // 获取最大的盒子
      this.$box = document.querySelector("#banner-wrap .banner .banner-l .box");

      // 获取展示图片的盒子
      this.$showImage = this.$box.querySelector('.show-image');
      // 获取放大图片的盒子
      this.$showBigImage = this.$box.querySelector('.show-big-image');
      // console.log(this.$showBigImage)
      // 获取小图片的盒子
      this.$ulbox = this.$box.querySelector('.img-box');
      // 获取每一张图片的li集合
      this.$liAll = this.$ulbox.children;
      // 获取移动的小黑块(放大镜)
      this.$filter = this.$showImage.querySelector('.filter');
      this.$banner = document.querySelector("#banner-wrap .banner");
      // this.$xiemaAll = $('.xiema').children;
      this.$xiema = document.querySelector('.xiema');
      this.$xiemaAll = document.querySelectorAll('.xiema li');
      this.$btn1 = document.querySelector('.btn1');
      console.log(this.$btn1)
      this.$btn2 = document.querySelector('.btn2');
      this.$inp = document.querySelector('.inp');
      // console.log(this.$btn1, this.$inp, this.$btn2);
      // console.log(this.$xiemaAll[0]);
      // console.log(this.$xiemaAll.length);

      // 给每一li添加索引， 方便获取
      for (var i = 0; i < this.$liAll.length; i++) {
        this.$liAll[i].index = i;
      }

      this.event();

    },
    event: function () {
      var _this = this;
      var t = this.$inp.value || 1; // 给数量赋值
      // 利用事件委托，给每一个li添加点击事件
      this.$ulbox.onclick = function (ev) {
        ev = ev || window.event;
        var target = ev.target || ev.srcElement;
        // 点击时，真正触发的为图片。
        if (target.nodeName === 'IMG') {
          // 获取li的索引 =》target.parentNode.index
          // 点击触发更换图片
          _this.showImage(target.parentNode.index)
        }
      }
      //鞋码的点击事件
      this.$xiema.onclick = function (e) {
        // const _this = this;
        // console.log(_this.$xiemaAll.length);
        e = e || window.event;
        var target = e.target || e.srcElement;
        if (target.nodeName === 'LI') {
          // console.log(target);
          for (var i = 0; i < _this.$xiemaAll.length; i++) {
            _this.$xiemaAll[i].className = '';
          }
          target.className = 'active';

          // 商品数量的点击事件
        }

      }

      this.$btn1.onclick = function () {
        console.log(this.$btn1);
        console.log(1);
        t = _this.$inp.value || 1;
        ++t;
        _this.$inp.value = `${t}`;
      }
      // 商品数量的点击事件


      this.$btn2.onclick = function () {
        t = _this.$inp.value || 1;
        --t;
        if (t < 1) {
          t = 1;
        }
        _this.$inp.value = `${t}`;
      }
      // 这里用onmouseenter： 子元素不触发事件
      this.$showImage.onmouseenter = function () {
        // 放大镜显示
        _this.$filter.style.display = 'block';
        // 展示大图片显示
        _this.$showBigImage.style.display = 'block';
      }
      this.$showImage.onmouseleave = function () {

        _this.$filter.style.display = 'none';
        _this.$showBigImage.style.display = 'none';
      }
      this.$showImage.onmousemove = function (ev) {
        ev = ev || window.event;
        // 计算小方块定点坐标
        var x = ev.pageX - _this.$banner.offsetLeft - _this.$filter.offsetWidth / 2;
        var y = ev.pageY - _this.$banner.offsetTop - _this.$filter.offsetHeight / 2;

        // 获取小方块移动的最大坐标
        var maxL = 420 - _this.$filter.offsetWidth,
          maxT = 420 - _this.$filter.offsetHeight;
        // console.log(this);
        if (x >= maxL) {
          x = maxL
        } else if (x <= 0) {
          x = 0;
        }
        if (y >= maxT) {
          y = maxT;
        } else if (y <= 0) {
          y = 0;
        }
        _this.$filter.style.left = x + 'px';
        _this.$filter.style.top = y + 'px';

        // 移动大图片的位置， 放大三倍
        var img = _this.$showBigImage.querySelector('img');
        img.style.left = -1.4 * x + 'px';
        img.style.top = -1.4 * y + 'px';
      }
    },
    showImage: function (index) {
      // console.log(index);
      // for(var i = 0; i < this.$liAll.length; i++) {
      //   this.$liAll[i].className = ''
      // }
      // this.$liAll[index].className = 'active';
      // 修改对应的图片地址
      var src = this.$liAll[index].querySelector('img').getAttribute('src');
      this.$showImage.querySelector('img').src = src.replace('small', 'big');
      this.$showBigImage.querySelector('img').src = src.replace('small', 'largest');
      console.log(src);
    }
  }
}())
big.init();