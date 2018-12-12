window.onload = function () {
    var obj = {
        uname: location.search.split("=")[1],
        carts: $(".cart-center"),
        checkAll: $("#checkAll"),
        totalCount: $("#totalCount"),
        totalPrice: $("#totalPrice"),
        delCartshops: $("#delCartshops"),
        deslectionBtn: $("#deslection"),
    }
    new ShowCartshopsInfo(obj);
}

class ShowCartshopsInfo {
    constructor(obj) {
        this.uname = obj.uname;
        this.carts = obj.carts;
        this.checkAll = obj.checkAll;
        this.totalCount = obj.totalCount;
        this.totalPrice = obj.totalPrice;
        this.delCartshops = obj.delCartshops;
        this.deslectionBtn = obj.deslectionBtn;
        this.getCartshops();
        this.getshops();
    };
    getCartshops() {
        if (localStorage.getItem(this.uname + "shops")) {
            var cartshops = localStorage.getItem(this.uname + "shops");
            var cartshopsArr = JSON.parse(cartshops);
            this.cartshopsInfo = cartshopsArr;
        } else {
            this.cartshopsInfo = null;
        }

    };
    getshops() {
        var _this = this;
        $.getJSON("json/tianmao.json", function (res) {
            //保存商品数据。
            _this.shops = res;
            _this.showCartshopsInfo(res);

        })
    };
    showCartshopsInfo(res) {//res接收服务器传递过来的所有商品数据
        //判断是否有购物车商品数据。
        if (this.cartshopsInfo) {
            //购物车商品存在 
            //str用来保存将要面页面显示的html结构，用于展示购物车商品信息
            var str = "";
            for (var i = 0; i < res.length; i++) {
                for (var j = 0; j < this.cartshopsInfo.length; j++) {
                    //根据购物车信息中商品的编号bid从所有商品数据中获取需要的商品数据。
                    if (res[i].bid == this.cartshopsInfo[j].bid) {
                        str += `
                    <div class="item">
                        <ul>
                            <li><input type="checkbox" id="checkAll">&emsp;全选</li>
                            <li>商品信息</li>
                            <li></li>
                            <li>单价</li>
                            <li>数量</li>
                            <li>金额</li>
                            <li>操作</li>
                        </ul>
                    </div>
                    <div class="item2">
                        <input type="checkbox">&ensp;
                        <span>天猫超市</span>
                        店铺:&ensp;
                        <a href="#">天猫超市</a>
                        <div class="jinglingtu"></div>
                    </div>
                    <div class="goods">
                        <div class="goods-top">
                            <span>超值换购活动</span>&emsp;
                            满100
                        </div>
                        <div class="goods-bottom">
                            <ul>
                                <li>
                                    <input type="checkbox" class="checkOne">
                                    <input class="goodBid" type="hidden" value="${this.cartshopsInfo[j].bid}"/>
                                </li>
                                <li>
                                    <div class="left"><img src="images/${res[i].src}" alt=""></div>
                                    <div class="right">
                                        <a href="#">${res[i].describe}</a>
                                    </div>
                                </li>
                                <li>颜色分类： 纯酒红</li>
                                <li class="goodPrice">${res[i].price}</li>
                                <li>
                                    <a href="#">-</a>
                                    <input type="text" class="goodCount" value="${this.cartshopsInfo[j].count}">
                                    <a href="#">+</a>

                                </li>
                                <li>
                                    <em class="goodTotalPrice">${Number(this.cartshopsInfo[j].count) * Number(res[i].price)}</em>
                                    <div style="color:#444">(0.42kg)</div>
                                </li>
                                <li>
                                    <a href="#">移入收藏夹</a>
                                    <br>
                                    <a href="#">删除</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                        `;
                    }
                }
            }
            this.carts.html(str);
        }
        // new SelectCart(this);
    }
}