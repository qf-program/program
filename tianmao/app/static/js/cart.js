$(function () {
    var obj = {
        carts: $(".cart-center"),
        checkAll: $("#checkAll"),
        totalCount: $("#totalCount"),
        totalPrice: $("#totalPrice"),
        delCartGoods: $("#delCartGoods"),
        deslectionBtn: $("#deslection"),
    }
    new ShowCartGoodsInfo(obj);
})

class ShowCartGoodsInfo {
    constructor(obj) {
        this.carts = obj.carts;
        this.checkAll = obj.checkAll;
        this.totalCount = obj.totalCount;
        this.totalPrice = obj.totalPrice;
        this.delCartGoods = obj.delCartGoods;
        this.deslectionBtn = obj.deslectionBtn;
        this.getCartGoods();
        this.getGoods();
    };
    getCartGoods() {
        if (localStorage.getItem("shops")) {
            var cartGoods = localStorage.getItem("shops");
            console.log(cartGoods)
            var cartGoodsArr = JSON.parse(cartGoods);
            this.cartGoodsInfo = cartGoodsArr;
        } else {
            this.cartGoodsInfo = null;
        }

    };
    getGoods() {
        var _this = this;
        $.getJSON("json/tianmao.json", function (res) {
            //保存商品数据。
            _this.goods = res;
            _this.showCartGoodsInfo(res);

        })
    };
    showCartGoodsInfo(res) {//res接收服务器传递过来的所有商品数据
        //判断是否有购物车商品数据。
        if (this.cartGoodsInfo) {
            //购物车商品存在 
            //str用来保存将要面页面显示的html结构，用于展示购物车商品信息
            var str = "";
            for (var i = 0; i < res.length; i++) {
                for (var j = 0; j < this.cartGoodsInfo.length; j++) {
                    //根据购物车信息中商品的编号bid从所有商品数据中获取需要的商品数据。
                    if (res[i].bid == this.cartGoodsInfo[j].bid) {
                        str += `
                    <div class="item2">
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
                                    <input class="goodBid" type="hidden" value="${this.cartGoodsInfo[j].bid}"/>
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
                                    <input class="del" type="button" value="-"/>
                                    <input type="text" class="goodCount" value="${this.cartGoodsInfo[j].count}">
                                    <input class="add" type="button" value="+"/>

                                </li>
                                <li>
                                    <em class="goodTotalPrice">${Number(this.cartGoodsInfo[j].count) * Number(res[i].price)}</em>
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
        new SelectCart(this);
    }
}

class SelectCart {
    constructor(obj) {
        this.goods = obj.goods;
        this.checkAll = obj.checkAll;
        this.carts = obj.carts;
        this.deslectionBtn = obj.deslectionBtn;
        this.totalCount = obj.totalCount;
        this.totalPrice = obj.totalPrice;
        this.delCartGoods = obj.delCartGoods;
        this.selectAll();//实现选择所有功能
        this.selectOne();//单个选择功能。
        this.deselection();//取消选择
        this.updateCart(1, ".add");//购物车添加一条商品信息
        this.updateCart(-1, ".del");//购物车删除一条商品信息
        this.deletCartGoodsInfo();//删除所有选中商品
        //创建对象， 实现购物车计算功能
        this.computeCart = new ComputeCart(this.goods);//购物车计算功能实现
    };
    //选择所有。
    selectAll() {
        //选择所有的表示单个商品的复选框
        var checkOne = this.carts.find(".checkOne");
        //保存当前对象
        var _this = this;
        //全选按钮的单击事件，实现选择所有功能。
        this.checkAll.click(function () {
            //当单击全选按钮，则表示单个商品的复选框全部选中或取消选中
            checkOne.prop("checked", $(this).prop("checked"));
            //全部选中后，此时的全选按钮应为禁用状态。
            $(this).prop("disabled", true);
            //只要点击了全选按钮就可以点击取消选择按钮
            _this.deslectionBtn.prop("checked", false).prop("disabled", false);
            var goodsCount = _this.carts.find(".goodCount");
            //查找到保存商品编号bid的隐藏域。
            var goodBid = _this.carts.find(".goodBid");
            //用于计算选中商品的总条数
            var totalCount = 0;
            //用于计算选中商品的总金额。
            var totalPrice = 0;
            //遍历所有查找到的显示商品条数的元素标签，目的是为了计算商品的总条数和总金额
            for (var i = 0; i < goodsCount.length; i++) {
                //保存当前商品编号
                _this.computeCart.setBid(goodBid.eq(i).val());
                //保存当前商品条数
                _this.computeCart.setGoodCount();
                //保存当前商品单价
                _this.computeCart.setGoodPrice();
                //计算所有商品总条数
                totalCount += _this.computeCart.count;
                //计算所有商品总价。
                totalPrice += _this.computeCart.count * _this.computeCart.price;
            }
            //在页面中显示商品总条数
            _this.totalCount.html(totalCount);
            //在页面中显示商品总价。
            _this.totalPrice.html(totalPrice);
        });
    };
    //选择单个。
    selectOne() {
        //选择所有的表示单个商品的复选框
        var checkOne = this.carts.find(".checkOne");
        //保存当前对象
        var _this = this;
        //点击单个商品的复选框
        checkOne.click(function () {
            //判断是否有没被选中的商品，true表示所有的都被选中了，false表示最少有一个没被选中
            var flag = true;
            //判断是否有商品是被选中的，false表示所有的都没有被选中，true表示最少有一个是选中的。
            var hasChecked = false;
            for (var i = 0; i < checkOne.length; i++) {
                if (!checkOne.eq(i).prop("checked")) {
                    flag = false;//最少有一个没被选中
                } else {
                    hasChecked = true;//最少有一个是选中的
                }
            }
            if (!flag) {//如果有一个没被选中
                //全选按钮可以点击了，状态设置为未选中状态。
                _this.checkAll.prop("checked", false).prop("disabled", false);
            } else {//所有的都被选中了
                //全选按钮禁止点击，状态设置为选中状态。
                _this.checkAll.prop("checked", true).prop("disabled", true);
            }
            if (hasChecked) {//只要有一个被选中，就可以点击取消选择按钮
                //取消选择按钮可以点击了，状态设置为未选中状态。
                _this.deslectionBtn.prop("checked", false).prop("disabled", false);
            } else {//所有商品都未选中，取消选择按钮则无法点击
                //取消选择按钮禁止点击，状态设置为选中状态。
                _this.deslectionBtn.prop("checked", true).prop("disabled", true);
            }
            //计算功能实现
            //查找到显示商品条数的元素标签
            var goodsCount = _this.carts.find(".goodCount");
            //查找到保存商品编号bid的隐藏域。
            var goodBid = _this.carts.find(".goodBid");
            //用于计算选中商品的总条数
            var totalCount = 0;
            //用于计算选中商品的总金额。
            var totalPrice = 0;
            for (var i = 0; i < checkOne.length; i++) {
                if (checkOne.eq(i).prop("checked")) {
                    //保存当前商品编号
                    _this.computeCart.setBid(goodBid.eq(i).val());
                    //保存当前商品条数
                    _this.computeCart.setGoodCount();
                    //保存当前商品单价
                    _this.computeCart.setGoodPrice();
                    //console.log(_this.computeCart.count);
                    //计算选中的商品总条数
                    totalCount += _this.computeCart.count;
                    //计算选中的商品总价。
                    totalPrice += _this.computeCart.count * _this.computeCart.price;
                }
            }
            //在页面显示所有选中商品条数
            _this.totalCount.html(totalCount);
            //在页面显示所有选中商品总价
            _this.totalPrice.html(totalPrice);
        })
    };

    deselection() {
        var _this = this;
        //选择所有的表示单个商品的复选框
        var checkOne = this.carts.find(".checkOne");
        //点击取消选择按钮
        this.deslectionBtn.click(function () {
            //全选按钮可以点击了，状态设置为未选中状态。
            _this.checkAll.prop("checked", false).prop("disabled", false);
            //所有的表示单个商品的复选框，都为未选中状态。
            checkOne.prop("checked", false);
            //消选择按钮此时为禁止状态，不能被再次点击。
            $(this).prop("disabled", true);
            //没有商品被选中，商品总条数当然为0啊
            _this.totalCount.html(0);
            //没有商品被选中，商品总价也必须为0啊，不用付钱了
            _this.totalPrice.html(0);
        });
    };

    updateCart(num, className) {
        //初始化单个商品的复选框为null
        var checkOne = null;
        var _this = this;
        //为删除或增加商品的按钮添加click事件
        this.carts.delegate(className, "click", function () {
            //console.log(1,num);
            //获取当前商品编号
            var bid = $(this).parent().parent().find(".goodBid").val();
            //保存当前商品编号
            _this.computeCart.setBid(bid);
            //保存当前商品条数
            _this.computeCart.setGoodCount();
            //保存当前商品单价
            _this.computeCart.setGoodPrice();
            //当前商品条数加1
            _this.computeCart.updateCount(num);

            //当前商品条数小于0时，删除当前商品信息，删除购物车保存的当前商品信息。
            if (_this.computeCart.count < 0) {
                //删除当前商品信息
                $(this).parent().parent().remove();
                //删除购物车保存的当前商品信息。
                _this.computeCart.delCartGood();
                /*
                 * 因为当商品条数小于0后，该条商品在页面被删除了，但是原来被选中的该条商品数据仍存留在
                 * 内存中没被销毁,以下三个方法重新执行，是为了重新初始化当前页面数据。
                 */
                _this.selectOne();
                _this.updateCart(0, ".add");
                _this.updateCart(0, ".del");
            } else {
                //显示当前商品数据
                $(this).parent().parent().find(".goodCount").html(_this.computeCart.count);
                //计算当前商品总价
                $(this).parent().parent().find(".goodTotalPrice").html(_this.computeCart.count * _this.computeCart.price);
            }
            checkOne = _this.carts.find(".checkOne");
            //计算所选商品总条数和总价格
            var totalCount = 0;//总条数
            var totalPrice = 0;//总价格

            for (var i = 0; i < checkOne.length; i++) {
                //找到所有被选中的商品
                if (checkOne.eq(i).prop("checked")) {
                    //把选中的商品条数累加
                    totalCount += Number(_this.carts.find(".goodCount").eq(i).html());
                    //把选中的商品价格累加
                    totalPrice += Number(_this.carts.find(".goodTotalPrice").eq(i).html());
                }
            }
            _this.totalCount.html(totalCount);//显示总条数
            _this.totalPrice.html(totalPrice);//显示总价格
            //更新localstorage数据
            _this.computeCart.setLocalstorage();
            //更新当前数据
            //_this.computeCart.getCart();

        });
    };
    deletCartGoodsInfo() {
        var _this = this;
        var checkOne = this.carts.find(".checkOne");
        //点击删除所选商品
        this.delCartGoods.click(function () {
            //遍历所有选中商品
            //alert(11)
            for (var i = 0; i < checkOne.length; i++) {
                if (checkOne.eq(i).prop("checked")) {
                    //设置选中商品的编号
                    _this.computeCart.setBid(checkOne.eq(i).parent().parent().find(".goodBid").val());
                    //删除已显示的选中商品。
                    checkOne.eq(i).parent().parent().remove();
                    //删除选中的购物车商品。
                    _this.computeCart.delCartGood();
                }
            }
            _this.totalCount.html(0);//总条数置为0
            _this.totalPrice.html(0);//总价格置为0
            _this.selectOne();
            _this.updateCart(0, ".add");
            _this.updateCart(0, ".del");
        });
    }
}
class ComputeCart {
    constructor(goods) {
        this.goods = goods;//所有商品
        this.bid = "";//商品编号 
        this.cartArr = null;//保存购物车信息
        this.count = 0;//购物车的单个商品数量
        this.price = 0;//购物车的单个商品单价
        this.getCart();//获取购物车商品信息。
    };
    //获取购物车商品信息
    getCart() {
        if (localStorage.getItem("shops")) {
            var cartStr = localStorage.getItem("shops");
            //将购物车中的商品信息暂时保存下来。
            this.cartArr = JSON.parse(cartStr);
        } else {
            this.cartArr = null;
        }
    };
    //设置当前商品编号，表示要操作的是当前商品。
    setBid(bid) {
        //将当前商品的编号保存下来。
        this.bid = bid;
    }
    //根据当前商品编号设置商品条数
    setGoodCount() {
        if (this.cartArr) {//如果购物车商品信息存在 ，则可以计算当前商品的条数了。
            for (var i = 0; i < this.cartArr.length; i++) {
                if (this.cartArr[i].bid == this.bid) {
                    //保存当前商品的条数
                    this.count = Number(this.cartArr[i].count);
                }
            }
        }
    };
    //根据当前商品编号设置商品单价
    setGoodPrice() {
        //从所有商品数据中找到对应编号的商品单价
        for (var i = 0; i < this.goods.length; i++) {
            if (this.goods[i].bid == this.bid) {
                //保存当前商品的单价
                this.price = this.goods[i].price;
            }
        }
    };
    //根据num更新当前商品个数
    updateCount(num) {
        //在原来商品个数的基础上更新num个当前商品。
        this.count += num;
    };
    //根据现有的商品个数更新购物车中的商品信息。
    setLocalstorage() {
        var storageStr = localStorage.getItem("shops");
        var storageArr = JSON.parse(storageStr);
        for (var i = 0; i < storageArr.length; i++) {
            if (storageArr[i].bid == this.bid) {
                //因为该商品个数更新了，所有购物车里的该商品个数也要随之更新。
                storageArr[i].count = this.count;
            };
        }
        var storageJson = JSON.stringify(storageArr);
        //更新购物车中的商品信息。
        localStorage.setItem("shops", storageJson);
    };
    //删除购物车中该条商品信息。
    delCartGood() {
        var storageStr = localStorage.getItem("shops");
        var storageArr = JSON.parse(storageStr);
        for (var i = 0; i < storageArr.length; i++) {
            if (storageArr[i].bid == this.bid) {
                //删除整条该商品信息
                storageArr.splice(i, 1);
                //该条商品信息已经删除，无需再循环了。
                break;
            };
        }
        var storageJson = JSON.stringify(storageArr);
        //该条商品信息删除后，购物车中的商品信息也需要更新的。
        localStorage.setItem("shops", storageJson);
    }
}