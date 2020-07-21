let CartShop = (function() {
	"use strict"
	class Shop{
		constructor(basket, count){
			this.cart = [];
			this.cartCount = 0;
			this.d = document;
			this.getById = 'getElementById';
			this.getByClass = 'getElementsByClassName';
			this.items = Shop.init();
		}
		static init(){
			let items = [
				{
					"imgsrc" : "img/flower3.jpg",
					"price" : "$60",
					"desc" : "Beautiful colored flower",
					"name" : "colored flower"
				},
				{
					"imgsrc" : "img/my.jpg",
					"price" : "$40",
					"desc" : "beautifle rosy flower",
					"name" : "tulip flower"
				},
				{
					"imgsrc" : "img/flower_20.jpg",
					"price" : "$65",
					"desc" : "beautifle rosy flower",
					"name" : "sun flower"
				},
				{
					"imgsrc" : "img/43.jpg",
					"price" : "$45",
					"desc" : "beautifle rosy flower",
					"name" : "rose flower"
				},
				{
					"imgsrc" : "img/flower_photo218.jpg",
					"price" : "$70",
					"desc" : "beautifle rosy flower",
					"name" : "red flower"
				},
				{
					"imgsrc" : "img/red-flowers.jpg",
					"price" : "$68",
					"desc" : "cute rosy flower",
					"name" : "reddish Rose 1"
				},
				{
					"imgsrc" : "img/Rose29.jpg",
					"price" : "$70",
					"desc" : "A nice rosy flower",
					"name" : "reddish Rose 2"
				},
				{
					"imgsrc" : "img/flower_9.jpg",
					"price" : "$55",
					"desc" : "Amazing rosy flower",
					"name" : "reddish Rose 3"
				}
			]
			return items;
		}
		itemTemplate(el, idx, arr){
			return `
			 <div class="add-to-cart-items">
					<table width="100%">
						<tr>
							<td align="left" width="5%">
								<div class="add-to-cart-img-cov" align="left"> 
									<img src="${el['imgsrc']}" id='el-name-img'> 
								</div>
							</td>
							<td align="left" width='60%'>
								<div align="" class="el-name-cov">
									<div class='el-name'> ${el['name']} </div> 
									${el['desc']} 
								</div>							
								<div align='left' style='display:none;' id="el-price-xs">
									${el['price']}
								</div>
							</td> 
							<td align="left" width='30%'>
								<div align='left'>
									<div align='left' style=''>
										<div align='left' style='display:;' id="el-price-xl">
											${el['price']}
										</div>
									</div>
									<div align='right' style='display: inline-block; position : absolute; right : 10px;' class='cancel-cov'>
										<img src="icons/cancell.png" class="cancel" data-name="${el['name']}" 
											onclick="Shop.removeFromCart(this,'delete');">
									</div>
								</div>
							</td>
						</tr>
					</table>
				</div>`;
		}
		refreshCount(condition){
			if (condition == 'add') {
				this.cartCount +=1; 
			}
			else if(condition == 'remove' && this.Cartcount !== 0){
				this.cartCount -=1;
			}
		}
		showItem(item, attr, act){
			if (attr == 'class') {
				this.d[this.getByClass](item)[0].style.display = act;
			}
			else if(attr == 'id'){
				this.d[this.getById](item).style.display = act;
			}
		}
		getCartCount(){
			return this.cartCount;
		}
		addToCart(e){
			let data = {
				"imgsrc" : e.dataset.image,
				"price" : e.dataset.price,
				"desc" : e.dataset.desc,
				"name" : e.dataset.name
			};
			[].push.call(this.cart,data);
		 this.refreshCount('add');
		 this.d[this.getById]('notif').textContent = this.cartCount;
			e.setAttribute('onclick', 'Shop.removeFromCart(this);')
			e.setAttribute('class', 'remove');
			e.setAttribute('title', 'Remove From Cart');
		}
		removeFromCart(e, act){
			if (!act ) {
				e.setAttribute('onclick', 'Shop.addToCart(this);');
				this.refreshCount('remove');
				this.d[this.getById]('notif').textContent = this.cartCount;
				e.setAttribute('class', 'add');
				this.cart.forEach(function(el, idx, arr){
				 	if (el['name'] == e.dataset.name) {
				 		this.cart.splice(idx, 1);
				 	}
				},this);
			}
			else{
				this.refreshCount('remove');
				let remove = this.d[this.getByClass]('remove');
				this.d[this.getById]('notif').textContent = this.cartCount;

				this.cart.forEach(function(el, idx, arr){
					if(el['name'] == e.dataset.name) {
						this.cart.splice(idx, 1);
					}
		 		},this);
				[].slice.call(remove).forEach(function(el,idx,arr){
					if(e.dataset.name == el.dataset.name) {
						el.setAttribute('onclick', 'Shop.addToCart(this);');
				 		el.setAttribute('class', 'add');
				 	}
				});
				
				this.showCart();
			}
			// console.log(this.cart);
		}
			
		show(act){
			let cartItems = this.cart;
			let currentPage = this.currentPage ;
			let lastItemIdx = this.lastItemIdx;
			let rem =  (cartItems.length - (lastItemIdx + 1)) < 1 ? 0 : (cartItems.length - (lastItemIdx + 1)) ;
			let returnValue = rem > 3 ? rem - 3 : rem;
			// console.log('return ' + returnValue); 
			let a , loadbtn;
			a = a < 0 ? 0 : a;
			loadbtn = (rem) < 4 ? `<div class="loadbtn" onclick="Shop.show('less')"> Show Less </div>` : `<div class="loadbtn" onclick="Shop.show('next')"> Show More </div>` ;
			// console.log('length = '  + cartItems.length);
			// console.log('currentPage = '  + currentPage);
			// console.log('currentPage'  + currentPage);
			// console.log('lastItemIdx = '  + lastItemIdx);
			// console.log('rem = ' + rem);
			if(act == 'next'){
				let cart = cartItems.filter((el, idx, arr) => {return idx > lastItemIdx && (idx < (lastItemIdx + 4 ))});
				// console.log(cart);
				this.d[this.getByClass]('show-cart-items-cont-body')[0].innerHTML = "";
				cart.forEach((el) => {
					this.d[this.getByClass]('show-cart-items-cont-body')[0].innerHTML += this.itemTemplate(el);
				},this);
				this.d[this.getByClass]('show-cart-items-cont-body')[0].innerHTML += loadbtn;
					// console.log(a + 'a');
				this.lastItemIdx += 3;
				// console.log(Shop.lastItemIdx);
			}
			else if(act == 'less'){
				// console.log('act = less ');
				// console.log('itemidx = ' + Shop.lastItemIdx);
				if (this.lastItemIdx > 5) {
				let cart = cartItems.filter((el, idx, arr) => {
					return idx > this.lastItemIdx - 6 && idx > 2 && idx < this.lastItemIdx && (idx < (this.lastItemIdx - 2 ));
				},this);
				// console.log(cart);
				this.d[this.getByClass]('show-cart-items-cont-body')[0].innerHTML = "";
				cart.forEach((el) => {
				this.d[this.getByClass]('show-cart-items-cont-body')[0].innerHTML += this.itemTemplate(el);
				},this);
				this.d[this.getByClass]('show-cart-items-cont-body')[0].innerHTML += loadbtn;

				this.lastItemIdx = (((this.lastItemIdx - 3) < 1) ? 0 : this.lastItemIdx - 3);
				// console.log('last = ' + this.lastItemIdx);
			}
			else if(this.lastItemIdx == 5){
				this.showCart();
			}
			}
		}
		showCart(act){
			let cartItems = this.cart;
			// console.log(cartItems.length);
			if(!cartItems.length){
				this.showItem('show-cart','class', 'block');
				this.d[this.getByClass]('show-cart-items-cont-body')[0].innerHTML = `<div class="empty"> Empty cart </div>`;
			}				
				else{
				this.d[this.getByClass]('show-cart-items-cont-body')[0].innerHTML = ``;
				let loadbtn = (cartItems.length) < 4 ? `` : `<div class="loadbtn" onclick="Shop.show('next')"> Show More </div>`;
				cartItems.forEach((el, idx) => {
					if (idx < 3) {
						this.d[this.getByClass]('show-cart-items-cont-body')[0].innerHTML += this.itemTemplate(el);
							
					}
				},this);

				this.d[this.getByClass]('show-cart-items-cont-body')[0].innerHTML += loadbtn;
				this.showItem('show-cart','class', 'block');
				this.currentPage = 1;
				this.lastItemIdx = 2;
			}
		}
		sellCont(){
			this.showItem('sell-cont','class', 'block');
		}
		sell(e){
			let err = this.d[this.getById]('err');
			if(!e['flower-name'].value || !e['Description'].value || !e['image-url'].value || !e['flower-price'].value){
				err.style.display = 'block';
				err.innerHTML = "Inputs Cant Be Empty !";
				return false;
			}
			err.style.innerHTML = "";
			err.style.display = "none";
			let item = {
				"imgsrc" : e['image-url'].value,
				"price" : e['flower-price'].value,
				"desc" : e['Description'].value,
				"name" : e['flower-name'].value 
			};
			this.items.push(item);
			console.log(this.items);
			this.d[this.getById]('cart-container').innerHTML ="";
			display();
			this.showItem('sell-cont','class', 'none')
		}
		display(){
			let shopItems = this.items;
			// console.log(this);
			let shopItem = [...shopItems].reverse();
			shopItem.forEach( el => {
				this.d[this.getById]('cart-container').innerHTML +=`
				<div id="cart-details" class="cart-details">
					<div class="img-thumb" style="background-image: url(${el['imgsrc']}); ">
						<span id="add" class="add" title="ADD ITEM" data-image="${el['imgsrc']}" 
							data-price="${el['price']}" data-desc="${el['desc']}" data-name="${el['name']}" 
								onclick="Shop.addToCart(this)">
							<img src="icons/shopping-cart-add.svg" width="25px">
						</span>
					</div> 
					<div class="cart-item-name-cont">
						<span class="cart-item-name">
							${el['name']}
						</span>
					</div><br>
					<span class="cart-item-desc">
						${el['desc']}
					</span><br>
					<div class="price-cont">
						<span class="price"> Price </span> <span class="price-tag"> ${el['price']} </span>
					</div>
				</div>`;
			},this)
		};
	}
	return Shop;
}());
let Shop = new CartShop();
	 window.onload = function(){
	 	Shop.display();
}