//图片轮播；
var li = $("#box li");
var oli = $("#uu li");
var index = 0;

var timer = setInterval(autoPlay, 2500);

function autoPlay() {
    if (index == li.size() - 1) {
        index = 0;
    } else {
        index++;
    }
    show();
}

oli.mouseover(function () {
    clearInterval(timer);
    index = $(this).index();
    show();
});

oli.mouseout(function () {
    timer = setInterval(autoPlay, 2500);
})

function show() {
    li.eq(index).stop().fadeIn(400).siblings().fadeOut(400);
    oli.eq(index).addClass("current").siblings().removeClass("current");
}



//固定广告栏；
$(window).scroll(function () {
    // var sTop = document.documentElement.scrollTop || document.body.scrollTop;
    // console.log(sTop)
    var sTop = $("body,html").scrollTop();
    // console.log($("body,html").scrollTop());
    $("hh").css("bottom", "60");
})



//放大镜；
var box = $("#box");
var mask = $("#mask");
var big = $("#big");
var bigImg = $("#bigImg");

box.mouseover(function () {
    mask.css("display", "block")
    big.css("display", "block")
})
box.mouseout(function () {
    mask.css("display", "none")
    big.css("display", "none")
})

box.mousemove(function (e) {
    var l = e.pageX - box.offset().left - mask.width() / 2;
    var t = e.pageY - box.offset().top - mask.height() / 2;

    var left = box.width() - mask.width();
    var top = box.height() - mask.height();

    l = l < 0 ? 0 : (l > left ? left : l);
    t = t < 0 ? 0 : (t > top ? top : t);

    mask.css({
        left: l,
        top: t
    })

    var bigImgL = l * bigImg.width() / box.width();
    var bigImgT = t * bigImg.height() / box.height();

    bigImg.css({
        left: -bigImgL,
        top: -bigImgT
    })

})