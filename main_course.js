var carts=document.querySelectorAll('.buttonred2');

var  data =  [ 
{
  name:'Batata',
  price:'8',
  tag:'Batata',
  incart: 0
},
{
 name:'Frankie',
 price:'10',
 tag:'Frankie',
 incart: 0
},
{
 name:'Pav bhaji',
 price:'9',
 tag:'Pav bhaji',
 incart: 0
},
{
 name:'Vada pav',
 price:'10',
 tag:'Vada pav',
 incart: 0
},
{
  name:'Fried rice',
  price:'15',
  tag:'Fried rice',
  incart: 0
},
{
  name:'Fried panner',
  price:'10',
  tag:'Fried panner',
  incart: 0
},
{
  name:'Chole bhature',
  price:'12',
  tag:'Chole bhature',
  incart: 0
},
{
  name:'Achari panner',
  price:'14',
  tag:'Achari panner',
  incart: 0
},

];

for( let i=0;i<carts.length;i++)
{
    
    carts[i].addEventListener('click',() => { 
       cartnumbers(data[i]);
       totalcost(data[i])
       alert("added to cart!");
    })
}


function onloadnumbers(){
  let productnumbers =localStorage.getItem('cartNumbers');
  if(productnumbers){ 
      document.querySelector('.topnav a span').textContent = productnumbers;
  }
}

function cartnumbers(cart){
  var productnumbers= localStorage.getItem('cartNumbers');
  productnumbers = parseInt(productnumbers);
  if(productnumbers){
    
    localStorage.setItem('cartNumbers', productnumbers + 1);
    document.querySelector('.topnav a span').textContent = productnumbers + 1;
  }
  else{
    localStorage.setItem('cartNumbers', 1);
    document.querySelector('.topnav a span').textContent = 1;
  }
  
  setitems(cart);
  
}

function setitems(cart){
  
  let cartitems=localStorage.getItem('productsincart');
  cartitems= JSON.parse(cartitems);
    
  if(cartitems!= null){

    if(cartitems[cart.name]== undefined)
    {
      cartitems={
        ...cartitems,
        [cart.tag]:cart
      }
    }
    cartitems[cart.tag].incart +=1;  
  }
  else
 {
  cart.incart = 1; 
   
  cartitems ={
    [cart.tag]: cart
  }

 }
  
 
  localStorage.setItem('productsincart',JSON.stringify(cartitems) );

}

function totalcost(product){

 var cartcost=localStorage.getItem('totalcost');
 
 console.log("my cart cost is ", cartcost);
 product.price= parseInt(product.price) 
 if(cartcost != null){
   ;
  cartcost = parseInt(cartcost);
  localStorage.setItem('totalcost', cartcost + product.price );

 }
 else{
   
   localStorage.setItem('totalcost',  product.price);
 }

}

function displaycart(){
  let cartitems =localStorage.getItem('productsincart');
  cartitems=JSON.parse(cartitems);
  

  let table= document.querySelector('.products');
  if(cartitems && table) {
    table.innerHTML='';
    Object.values(cartitems).map(item => {
      table.innerHTML += `   
      <div class="product">
       <span class="product-title">${item.name}</span>  
       <span class="product-price">$${item.price}</span> 
       <span class="product-incart">${item.incart}</span>   
       <span class="product-total">$${item.incart*item.price}.00</span>   
        </div>
        </div>  `; 
    })
    var x=localStorage.getItem('totalcost');
    table.innerHTML += `   
      <div class="totalcart">
       <h4 class="basket">
        Basket Total
        </h4>
        <h4 class="total">
        $${x},00
        </h4>
        </div>
          `;
  } 
}
displaycart();
onloadnumbers();

