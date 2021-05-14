var carts=document.querySelectorAll('.buttonred1');

var  data =  [ 
  {
  name:'Corn soup',
  price:'2',
  tag:'Corn',
  incart: 0
},
{
 name:'Tomato soup',
 price:'3',
 tag:'Tomato',
 incart: 0
},
{
 name:'Lauki soup',
 price:'2',
 tag:'Lauki',
 incart: 0
},
{
 name:'Mushroom soup',
 price:'3',
 tag:'Mushroom',
 incart: 0
},
{
 name:'Bread roll',
 price:'5',
 tag:'Bread',
 incart: 0
},
{
 name:'Paneer tikka',
 price:'5',
 tag:'Paneer',
 incart: 0
},
{
 name:'Potato tikki',
 price:'6',
 tag:'Potato',
 incart: 0
},
{
 name:'Veg cutlet',
 price:'5',
 tag:'cutlet',
 incart: 0
},
{
 name:'Veg momo',
 price:'5',
 tag:'momo',
 incart: 0
},
{
 name:'Veg seekh kabab',
 price:'9',
 tag:'kabab',
 incart: 0
},
{
 name:'Chicken pakora',
 price:'4',
 tag:'pakora',
 incart: 0
},
{
 name:'Sweet corn vada',
 price:'6',
 tag:'vada',
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
  productnumbers = parseInt(productnumbers);
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

 let cartcost=localStorage.getItem('totalcost');
 
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


