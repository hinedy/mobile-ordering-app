import {menuArray} from './data.js'

const modalContainer = document.getElementById('modal-container')
const customerName = document.getElementById('customer-name')
const orderDertails = document.getElementById('order-dertails')
const checkoutEl = document.getElementById('checkout')
const formEl = document.getElementById('form-el')


document.addEventListener('click', function(e){
     
    // Match only add-btn with id="0"/"1" ....
    if(/\d/.test(e.target.id)){
        handleAddBtn(e.target.id)
    }
    if (e.target.dataset.remove){
        handleRemoveBtn(e.target.dataset.remove)
       
    }if (e.target.id == 'purchase-btn'){
        handlePurchaseBtn(e.target.id)
    }if (e.target === modalContainer){
        modalContainer.style.display = 'none'
    }

})

formEl.addEventListener('submit',function(e){
    e.preventDefault()
    renderOrderDetails()
    formEl.reset()
})


let orderArr = []


function renderOrderDetails(){
   
    modalContainer.style.display = 'none'
    checkoutEl.style.display = 'none'
    orderDertails.innerHTML = `
    Thanks, ${customerName.value}! Your order is on its way!
    `
    orderDertails.style.display = "block"
    orderArr = []
} 

function handlePurchaseBtn(btnId){
    if(orderArr.length){
       modalContainer.style.display = 'flex'
    } 
}

function handleRemoveBtn(itemId){
    const index = orderArr.indexOf(orderArr.filter(function(item){
        return item.id == itemId
    })[0])
    
    if (index > -1) {
        orderArr.splice(index, 1);
    }
    renderCheckout()
}

function handleAddBtn(itemId){
    const targetItemObj = menuArray.filter(function(item){
        return item.id == itemId
    })[0]
    orderArr.push(targetItemObj)
    renderCheckout()
    updateTotalPrice()
}

function updateTotalPrice(){
    return orderArr.reduce((a, b)=> a + b.price, 0 )
}

function getOrdersHtml(){
    let ordersHtml = ''
    orderArr.forEach(item => {
        ordersHtml += `
        <div class="checkout-item">
            <span class="item-added">
                <h4>${item.name}</h4>
                <button class="remove-btn" data-remove="${item.id}">remove</button>
            </span>
            <h5>$${item.price}</h5>
        </div>
      `
    })
    return ordersHtml
}

function renderCheckout(){
    checkoutEl.innerHTML = `
            <h4>Your order</h4>
            <div>${getOrdersHtml()}</div>
            <hr>
            <div class="total">
                <h4>Total Price</h4>
                <h5>$${updateTotalPrice()}</h5>
            </div>
            <button class="purchase-btn" id="purchase-btn" >Complete order</button>
        `
    orderDertails.style.display = "none"
    checkoutEl.style.display = 'block'
}

function getMenuHtml(){
    let menuHtml = ``
    menuArray.forEach(item => {
        menuHtml += `
       <div class="menu-item">
            <span class="item-graphic">${item.emoji}</span>
            <span class="item-details">
                <h4>${item.name}</h4>
                <p>${item.ingredients.join(',')}</p>
                <h5>$${item.price}</h5>
            </span>
            <button class="add-btn" id="${item.id}">+</button>
        </div>
        `
    })
    return menuHtml
}

function renderMenu(){
    document.getElementById('menu').innerHTML = getMenuHtml()
}
renderMenu()
renderCheckout()
