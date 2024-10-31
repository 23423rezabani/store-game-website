//javascript code

// const { response } = require("express")

let headerContainer = document.querySelector('.header-container')
let headeritems = document.querySelector('.header-li')

window.addEventListener('scroll',()=>{

if(document.documentElement.scrollTop >0){
  headerContainer.classList.add('purple')
}else{
  headerContainer.classList.remove('purple')
}

})

let Formlogin = document.querySelector('.form-login')
let btnregistery = document.querySelector('.btn-registery')
let btnsubmit = document.querySelector('button')
let inputfirstname = document.querySelector('.first-name')
let inputlastname = document.querySelector('.last-name')
let inputemail = document.querySelector('.email')
let inputnumber = document.querySelector('.number')
let inputpassword = document.querySelector('.password')

// console.log(btnregistery);

// btnregistery.addEventListener('click',(event)=>{
// //  event.preventDefault() 
 
// window.location.href = 'login.html';  

// })
// const btnlogin = () =>{
//   window.location.href = 'login.html';
// }

// btnsubmit.addEventListener('click',(event)=>{
//   event.preventDefault()
  
// })


// const btnsign = ()=>{
//   window.location.href = 'sign.hbs';

// }


// btnsubmit.addEventListener('click',(event)=>{
//   inputemail.value = ''
//   inputpassword.value = ''
// })


// if(inputemail.length<8 && inputpassword<6 ){
//   let newpelem = document.createElement('p')
//   newpelem.innerHTML = 'کاراکتر یوزر نیم باید بیشتر از 8 و کاراکتر پسور بیشتر از 6 باشد'
//   Formlogin.append(newpelem)

// }else{
//   console.log('ورود موفق');
// }  




// const uir = 'http://localhost:3000'

// fetch(uir)
//   .then((response) => {
//     if (response.status !== 200) {
//       throw new Error('Failed to fetch products');
//     }
    
//     return response.json()
//   })
//   .then((products) => {
//     displayproducts(products);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// function displayproducts(products) {
//   console.log(products)
//   const ulelem = document.getElementById('productlist');
//   products.forEach((pro) => {
//     const li = document.createElement('li');
//      li.innerHTML = `
//       <img>${pro.image}</img>
//       <h1>${pro.name}</h1>
//       <p>price: ${pro.price}</p>
//     `;
//     console.log()
//      ulelem.appendChild(li);
//    });
//  }


// const productForm = document.getElementById('productForm')



// productForm.addEventListener('submit',async(event)=>{

//   event.preventDefault();
   
//   const product = {
//     image:"{{productsgame.image}}",
//     name:"{{productsgame.name}}",
//     price:"{{productsgame.pice}}",
//     description: "{{productsgame.description}}"
//   }

//  const response = await fetch('/add-to-bascket',{
//     method:'POST',
     
//    headers:{
//     'Content-Type':'application/json'
//    },
//    body:JSON.stringify(product)
//   })
//    if(response.ok){
//     alert('product added to bascket')
//    }else{
//     alert('product not added')
//    }

// })

// const btnbasket = document.getElementById('showBasketBtn');

// btnbasket.addEventListener('click',()=>{
//   const basketContainer = document.getElementById('basketContainer')
//   basketContainer.style.display = 'none';
// })
// document.addEventListener('DOMContentLoaded', () => {
//   const productForm = document.getElementById('productForm');
//   if (!productForm) {
//     console.error("productForm is null");
//     return;
//   }

//   productForm.addEventListener('submit', async (event) => {  // 'submit' event listener instead of 'click'
//     event.preventDefault();

//     const product = {
//       id: document.querySelector('input[name="id"]').value, // گرفتن ID از فرم
//       image: document.querySelector('input[name="image"]').value,
//       name: document.querySelector('input[name="name"]').value,
//       price: document.querySelector('input[name="price"]').value,
//       description: document.querySelector('input[name="description"]').value
//     };

//     const response = await fetch('/add-to-bascket', {  // Corrected URL endpoint
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(product)
//     });

//     if (response.ok) {
//       alert('Product added to basket');
//       updateBasketUI(product);
//     } else {
//       alert('Product not added');
//     }
//   });

//   function updateBasketUI(product) {
//     const basketList = document.getElementById('basketList');
//     const listItem = document.createElement('li');

//     listItem.innerHTML = `
//       <img src="${product.image}" alt="${product.name}" width="50">   
//       <p>Name: ${product.name}</p> 
//       <p>Price: ${product.price}</p> 
//       <p>descreaption: ${product.description}</p>
//     `;

//     basketList.appendChild(listItem);
//   }

  const showBasketBtn = document.getElementById('showBasketBtn');
  const basketContainer = document.getElementById('basketContainer');

  showBasketBtn.addEventListener('click', () => {
    if(basketContainer.style.display === 'none'){

      basketContainer.style.display = 'block';
    }else{
      basketContainer.style.display = 'none';
    }

   
  });


  const basketList = document.getElementById('basketList')


  basketList.addEventListener('click',(event)=>{
    if(event.target.classList.contains('deleteproductbasket')){
      const listItem = event.target.parentNode;
      console.log(listItem)
      listItem.remove();
    }
  })

  window.addEventListener('scroll',()=>{
    const display = document.getElementById('support-icon')
    if(display.scrollTop>300){
      display.classList.remove('hidden')
    }else{
      display.classList.add('hidden')
    }
  })

