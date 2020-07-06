

update();

//========= Mobile Navigation =============================================================

var mobileNavToggleElement = document.querySelector(".mobile-nav-toggle");
var mobileNavElement = document.querySelector(".mobile-nav");
var mobileNavCloseElement = document.querySelector(".mobile-nav-close");

function openNav() {
    mobileNavToggleElement.style.opacity = "0";
    mobileNavToggleElement.style.visibility = "hidden";
    mobileNavElement.style.opacity = "1";
    mobileNavElement.style.visibility = "visible";
    mobileNavCloseElement.style.display = "block";
};

function closeNav() {
    mobileNavToggleElement.style.opacity = "1";
    mobileNavToggleElement.style.visibility = "visible";
    mobileNavElement.style.opacity = "0";
    mobileNavElement.style.visibility = "hidden";
    mobileNavCloseElement.style.display = "none";
    
};

//=========================================================================================

//================== Modal Box ============================================================

var modal = document.getElementById('modal-cart');

function openModal() {
    modal.style.display = "block";
};

function closeModal() {
    modal.style.display = "none";
};

window.onclick = function(event) {
    if (event.target.id == 'modal-cart') {
      modal.style.display = "none";
    }
};


//=======================================================================================


//============ Add Items to the Cart ====================================================

var menuItemsContainer = document.getElementsByClassName('menu-list')[0];
var addCartItemsBtns = menuItemsContainer.getElementsByClassName('add-to-cart');

var itemDisplayedElement;

for (var i = 0; i < addCartItemsBtns.length; i++) {
    var addCartItemBtn = addCartItemsBtns[i];
    addCartItemBtn.addEventListener('click', function(event) {
        var addCartItemBtnClicked = event.target;

        if (event.target.className === 'btn btn-outline-primary add-to-cart') {
            itemDisplayedElement = addCartItemBtnClicked.parentElement.parentElement;
        } else if (event.target.className === 'fas fa-cart-plus') {
            itemDisplayedElement = addCartItemBtnClicked.parentElement.parentElement.parentElement;
        }

        var itemDisplayedElementLeft = itemDisplayedElement.children[0];
        var itemDisplayedElementRight = itemDisplayedElement.children[1];

        var itemDisplayedNameElement = itemDisplayedElementLeft.children[0];
        var itemDisplayedRateElement = itemDisplayedElementRight.children[0];

        var itemDisplayedName = itemDisplayedNameElement.innerText;
        var itemDisplayedRate = parseFloat(itemDisplayedRateElement.innerText.replace('$', ''));

        addItemToCart(itemDisplayedName, itemDisplayedRate);
        


    });
}

//=======================================================================================

//================== Adding Items to cart UI =============================================

function addItemToCart(name, rate) {

    var html, newHtml;

    html = `<div class="item" id="item-0">
                <div class="left">
                    <i class="far fa-times-circle item-delete--btn" onclick="remove(event)"></i>
                    <span class="item-description">${name}</span>
                    <sup class="item-rate">@ $${rate}</sup>    
                </div>
                <div class="right">
                    <div class="item-quantity"><i class="fas fa-plus-circle increment-btn" onclick="quantityIncrement(event)"></i><span class="quantity">${1} pcs</span><i class="fas fa-minus-circle decrement-btn"onclick="quantityDecrement(event)"></i></div>
                    <div class="item-amount">$${rate}</div>
                </div>
            </div>`

    document.querySelector('.items-list').insertAdjacentHTML('beforeend', html);
    updateCartNumber();
    updateCartSubTotal();
    


}



//==========================================================================================


//============== Remove items from cart==================================================

function remove(event) {

    event.target.parentElement.parentElement.remove();

    updateCartNumber();
    updateCartSubTotal();

};


//======================================================================================

//================ Update Navigation Cart Number ======================================

function updateCartNumber() {
    var cartItemContainer = document.getElementsByClassName('items-list')[0];
    var cartItems = cartItemContainer.getElementsByClassName('item');
    var cartItemNumber = document.getElementsByClassName('cart-item-number');
    console.log(cartItemNumber);

    for (var i = 0; i < cartItemNumber.length; i++) {
        cartItemNumber[i].innerText = "[ " + cartItems.length + " ]";
    }
    
}

//======================================================================================

//============= Add and Subtract Item quantity==========================================

function quantityIncrement(event) {

    var itemQty = parseInt(event.target.parentElement.children[1].textContent.replace('pcs', ''));
    itemQty += 1;
    event.target.parentElement.children[1].textContent = itemQty + ' pcs';

    updateCartSubTotal();
};
function quantityDecrement(event) {

    var itemQty = parseInt(event.target.parentElement.children[1].textContent.replace('pcs', ''));
    itemQty > 1 ? itemQty -= 1 : itemQty = 1;
    event.target.parentElement.children[1].textContent = itemQty + ' pcs';

    updateCartSubTotal();
};


//====================================================================================

//=========== Coupon Discount =========================================================

function updateCoupon() {

    document.getElementsByClassName('cart-coupon-discount-amount')[0].innerText = '$0';
    var couponIDElement = document.getElementsByClassName('input-coupon')[0];
    var couponID = [];
    couponIDElement.value = '';
    
    couponIDElement.addEventListener('keypress', function(event) {

        if (event.keyCode === 13) {
            couponID = couponIDElement.value;
            
            if (couponID.length === 6) {
                var couponAmount = Math.floor(Math.random() * 15) + 5;
                document.getElementsByClassName('cart-coupon-discount-amount')[0].innerText = '$' + couponAmount;
            }

            couponIDElement.value = '';
            
        }
        updateCartGrandTotal();
    });

    
};



//====================================================================================


//================= Update Cart SubTotal ==============================================
function updateCartSubTotal() {
    var cartItemContainer = document.getElementsByClassName('items-list')[0];
    var cartItems = cartItemContainer.getElementsByClassName('item');
    // var cartItemNumber = document.getElementsByClassName('cart-item-number');

    var cartSubTotal = 0;

    for (var i = 0; i < cartItems.length; i++) {
        var cartItem = cartItems[i];
        var cartItemQuantityElement = cartItem.getElementsByClassName('quantity')[0];
        var cartItemAmountElement = cartItem.getElementsByClassName('item-amount')[0];
        var cartItemRateElement = cartItem.getElementsByClassName('item-rate')[0];

        // Calculation of each item totals
        var cartItemQuantity = parseInt(cartItemQuantityElement.innerText.replace('pcs', ''));
        var cartItemRate = parseFloat(cartItemRateElement.innerText.split(' ')[1].replace('$', ''));

        var cartItemAmount = cartItemQuantity * cartItemRate;
        
        cartItemAmountElement.innerText = '$' + cartItemAmount;

        // Calculation of allItems Subtotal
        cartSubTotal += cartItemAmount;
    }
    document.getElementsByClassName('cart-subtotal-amount')[0].innerText = '$' + cartSubTotal;

    updateCartGrandTotal();
};

//==================================================================================


//================ Update Cart Item Grand Total =====================================
function updateCartGrandTotal() {
    var subTotalElement = document.getElementsByClassName('cart-subtotal-amount')[0];
    var deliveryChargeElement = document.getElementsByClassName('cart-delivery-charge-amount')[0];
    var couponDiscountElement = document.getElementsByClassName('cart-coupon-discount-amount')[0];

    var grandTotal = 0;

    var subTotal = parseFloat(subTotalElement.innerText.replace('$', ''));
    var deliveryCharge = parseFloat(deliveryChargeElement.innerText.replace('$', ''));
    var couponDiscount = parseFloat(couponDiscountElement.innerText.replace('$', ''));

    grandTotal = subTotal + deliveryCharge - couponDiscount;

    document.getElementsByClassName('cart-grand-total-amount')[0].innerText = '$' + grandTotal;
};

//====================================================================================


//============= All Update function ===============================================
function update() {
    updateCartNumber();
    updateCartSubTotal();
    updateCoupon()
    updateCartGrandTotal()

};

//======================================================================================




















