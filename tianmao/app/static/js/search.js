

window.onload=function(){
    var search = (function() {
	

        return {
            init() {
                this.$ul = document.querySelector("ul");
                this.event();
                this.getData();
            },
            event() {
                var _this = this;
            
            },
            getData(){
                sendAjax('json/kuangwei.json').then(res =>{
                    res = JSON.parse(res);
                    console.log(res);
                    this.data = res.data;
                    this.insertData(this.data);
                } )
            },
            insertData(data) {
                console.log(this.data.length);
                for(let i = 0; i < this.data.length; i++){
                var $li = document.createElement('li');
               
               $li.innerHTML = `<a href="#">
               <img src="${this.data[i].src}" alt="" class="tupian">
               <p class="price">${this.data[i].price}</p>
               <span class="miaoshu">${this.data[i].describe}</span>
           </a>`
               
               
               
               
                // var $a = document.createElement('a');
                // $a.href = '#';
                // $li.appendChild($a);
                // var $img = document.createElement('img');
                // $img.className = 'tupian';
                // $a.appendChild($img);
                // $img.src = 'images/' + this.data[i].src;
                // var $p = document.createElement('p');
                // $p.className = 'price';
                // $p.innerHTML = this.data[i].price;
                this.$ul.appendChild($li);
    
                }
            }
        }
    }());
  }

var search = (function() {
	

	return {
		init() {
            this.$ul = document.querySelector("#goods-wrap ul");
            this.event();
            this.getData();
		},
		event() {
			var _this = this;
		
        },
        getData(){
            sendAjax('json/kuangwei.json').then(res =>{
                res = JSON.parse(res);
                console.log(res);
                this.data = res.data;
                this.insertData(this.data);
            } )
        },
		insertData(data) {
            console.log(this.data.length);
         for(var j = 0; j<9; j++){
            for(let i = 0; i < this.data.length; i++){
            var $li = document.createElement('li');
           
        //    $li.innerHTML = `<a href="#">
        //    <img src="${this.data[i].src}" alt="" class="tupian">
        //    <p class="price">${this.data[i].price}</p>
        //    <span class="miaoshu">${this.data[i].describe}</span>
        //    </a>`      
            var $a = document.createElement('a');
            $a.href = '#';
            var $img = document.createElement('img');
            $img.className = 'tupian';
            $a.appendChild($img);
            $img.src =  this.data[i].src;
            var $p = document.createElement('p');
            $p.className = 'price';
            $p.innerHTML = this.data[i].price;
            $a.appendChild($p);
            var $span = document.createElement('span');
            $span.innerHTML = this.data[i].describe;
            $span.className = 'miaoshu';
            $a.appendChild($span);
            $li.appendChild($a);
            this.$ul.appendChild($li);
            }
        }
		}
	}
}());

