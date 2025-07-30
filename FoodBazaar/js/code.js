$(()=>
{
    

    //Ad Slider 
    $('.carousel').flickity({
        //option 
        cellAlign:'left',
        contain: true,
        freeScroll:false,
        autoPlay:1500,
        pageDots: false
    })
    //Category Slider 
    $('.category-flick .carousel').flickity({
        //option 
        cellAlign:'left',
        contain: true,
        freeScroll:true
    })
    $('.category-flick .carousel').each(function() {
        if ($(this).find('div.carousel-cell').length >= 1) {
          $(this).find('button.flickity-prev-next-button.previous, button.flickity-prev-next-button.next, ol.flickity-page-dots').hide();
        }
      });
    $('.cat-prev').on('click',function()
    {
        $('.category-flick .carousel').flickity('previous')
    })
    $('.cat-next').on('click',function()
    {
        $('.category-flick .carousel').flickity('next')
    })
    //Brand Slider 
    $('.brand-flick .carousel').flickity({
        //option 
        cellAlign:'left',
        contain: true,
        freeScroll:true
    })
    $('.brand-flick .carousel').each(function() {
        if ($(this).find('div.carousel-cell').length >= 1) {
          $(this).find('button.flickity-prev-next-button.previous, button.flickity-prev-next-button.next, ol.flickity-page-dots').hide();
        }
      });
    $('.brand-prev').on('click',function()
    {
        $('.brand-flick .carousel').flickity('previous')
    })
    $('.brand-next').on('click',function()
    {
        $('.brand-flick .carousel').flickity('next')
    })
    //Pupular Slider
    $('.pop-flick .carousel').flickity({
        //option 
        cellAlign:'left',
        contain: true,
        freeScroll:true
    })
    $('.pop-flick .carousel').each(function() {
        if ($(this).find('div.carousel-cell').length >= 1) {
          $(this).find('button.flickity-prev-next-button.previous, button.flickity-prev-next-button.next, ol.flickity-page-dots').hide();
        }
      });
    $('.pop-prev').on('click',function()
    {
        $('.pop-flick .carousel').flickity('previous')
    })
    $('.pop-next').on('click',function()
    {
        $('.pop-flick .carousel').flickity('next')
    })
     //New Arrieved Slider
     $('.arv-flick .carousel').flickity({
        //option 
        cellAlign:'left',
        contain: true,
        freeScroll:true
    })
    $('.arv-flick .carousel').each(function() {
        if ($(this).find('div.carousel-cell').length >= 1) {
          $(this).find('button.flickity-prev-next-button.previous, button.flickity-prev-next-button.next, ol.flickity-page-dots').hide();
        }
      });
    $('.arv-prev').on('click',function()
    {
        $('.arv-flick .carousel').flickity('previous')
    })
    $('.arv-next').on('click',function()
    {
        $('.arv-flick .carousel').flickity('next')
    })
    
    // Back To Top Button

    $(window).scroll(()=>
    {
        if($(this).scrollTop())
        {
            $('.backtotop ').fadeIn()
        }
        else
        {
            $('.backtotop ').fadeOut()
        }
    })
    $('.backtotop').click(()=>
    {
        $('html, body').animate(
            {
                scrollTop:0
            },1000
        )
    })
})

// Shopping Cart Logic
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartUI() {
    // Find the cart offcanvas body
    const cartBody = document.querySelector('#offcanvasCart .offcanvas-body .order-md-last');
    if (!cartBody) return;
    // Clear previous cart items
    let cartList = '<h4 class="d-flex justify-content-center align-items-center mb-3">'
        + '<span class="text-warning">Your Cart</span>'
        + `<span class="badge bg-warning rounded-pill ms-3">${cart.reduce((a, c) => a + c.qty, 0)}</span>`
        + '</h4>';
    cartList += '<ul class="list-group mb-3">';
    let total = 0;
    cart.forEach((item, idx) => {
        total += item.price * item.qty;
        cartList += `<li class="list-group-item d-flex justify-content-between lh-sm align-items-center">
            <div class="d-flex align-items-center">
                <img src="${item.image}" alt="" style="width:40px;height:40px;object-fit:cover;margin-right:10px;">
                <div>
                    <h6 class="my-0">${item.name}</h6>
                    <small class="text-body-secondary">Qty: <input type='number' min='1' value='${item.qty}' data-idx='${idx}' class='cart-qty-input' style='width:50px;'></small>
                </div>
            </div>
            <span class="text-body-secondary">₹${item.price * item.qty}</span>
            <button class="btn btn-sm btn-danger ms-2 remove-cart-item" data-idx="${idx}"><i class="fa fa-trash"></i></button>
        </li>`;
    });
    cartList += `<li class="list-group-item d-flex justify-content-between lh-sm">
        <span>Total (₹)</span>
        <strong>₹${total}</strong>
    </li>`;
    cartList += '</ul>';
    cartList += '<button type="submit" class="btn btn-warning btn-lg w-100">Continue to Checkout</button>';
    cartBody.innerHTML = cartList;

    // Update cart total in header
    const cartTotal = document.querySelector('.cart-total');
    if (cartTotal) cartTotal.textContent = `₹${total}`;

    // Add event listeners for remove and qty change
    document.querySelectorAll('.remove-cart-item').forEach(btn => {
        btn.addEventListener('click', function() {
            const idx = this.getAttribute('data-idx');
            cart.splice(idx, 1);
            saveCart();
            updateCartUI();
        });
    });
    document.querySelectorAll('.cart-qty-input').forEach(input => {
        input.addEventListener('change', function() {
            const idx = this.getAttribute('data-idx');
            let val = parseInt(this.value);
            if (isNaN(val) || val < 1) val = 1;
            cart[idx].qty = val;
            saveCart();
            updateCartUI();
        });
    });
}

// Add to Cart button handler
$(document).on('click', '.add-to-cart-btn', function(e) {
    e.preventDefault();
    const name = $(this).data('name');
    const price = parseInt($(this).data('price'));
    const image = $(this).data('image');
    // Check if already in cart
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ name, price, image, qty: 1 });
    }
    saveCart();
    updateCartUI();
    // Optionally open cart offcanvas
    if (window.bootstrap) {
        const cartOffcanvas = document.getElementById('offcanvasCart');
        if (cartOffcanvas) {
            const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(cartOffcanvas);
            bsOffcanvas.show();
        }
    }
});

// On page load, update cart UI
updateCartUI();