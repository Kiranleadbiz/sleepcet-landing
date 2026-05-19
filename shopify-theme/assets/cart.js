var ScCart = (function () {
  var drawer = document.getElementById('cart-drawer');
  var overlay = document.getElementById('cart-drawer-overlay');
  var itemsEl = document.getElementById('cart-items');
  var emptyEl = document.getElementById('cart-empty');
  var footerEl = document.getElementById('cart-footer');
  var countBadge = document.getElementById('cart-count-badge');
  var subtotalEl = document.getElementById('cart-subtotal-price');

  function open() { drawer.classList.add('open'); overlay.classList.add('open'); document.body.style.overflow = 'hidden'; refresh(); }
  function close() { drawer.classList.remove('open'); overlay.classList.remove('open'); document.body.style.overflow = ''; }

  function moneyFormat(cents) {
    return (cents / 100).toLocaleString('en-US', { style: 'currency', currency: window.Shopify ? window.Shopify.currency.active : 'USD' });
  }

  function refresh() {
    fetch('/cart.js').then(function (r) { return r.json(); }).then(function (cart) {
      var count = cart.item_count;
      if (countBadge) { countBadge.textContent = count; countBadge.style.display = count > 0 ? 'flex' : 'none'; }
      if (count === 0) {
        if (itemsEl) itemsEl.innerHTML = '';
        if (emptyEl) emptyEl.style.display = 'flex';
        if (footerEl) footerEl.style.display = 'none';
      } else {
        if (emptyEl) emptyEl.style.display = 'none';
        if (footerEl) footerEl.style.display = 'block';
        if (subtotalEl) subtotalEl.textContent = moneyFormat(cart.total_price);
        if (itemsEl) {
          itemsEl.innerHTML = cart.items.map(function (item) {
            return '<div class="sc-cart-item" data-key="' + item.key + '">' +
              '<img src="' + item.image + '" alt="' + item.title + '" width="72" height="72">' +
              '<div class="sc-cart-item-info">' +
                '<p class="sc-cart-item-title">' + item.product_title + '</p>' +
                (item.variant_title && item.variant_title !== 'Default Title' ? '<p class="sc-cart-item-variant">' + item.variant_title + '</p>' : '') +
                '<p class="sc-cart-item-price">' + moneyFormat(item.final_price) + '</p>' +
                '<div class="sc-cart-item-qty">' +
                  '<button class="sc-qty-btn" data-key="' + item.key + '" data-delta="-1">−</button>' +
                  '<span>' + item.quantity + '</span>' +
                  '<button class="sc-qty-btn" data-key="' + item.key + '" data-delta="1">+</button>' +
                '</div>' +
              '</div>' +
              '<button class="sc-cart-remove" data-key="' + item.key + '" aria-label="Remove">×</button>' +
            '</div>';
          }).join('');
          itemsEl.querySelectorAll('.sc-qty-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
              var key = btn.dataset.key;
              var delta = parseInt(btn.dataset.delta);
              var item = cart.items.find(function (i) { return i.key === key; });
              if (!item) return;
              var newQty = item.quantity + delta;
              changeQty(key, Math.max(0, newQty));
            });
          });
          itemsEl.querySelectorAll('.sc-cart-remove').forEach(function (btn) {
            btn.addEventListener('click', function () { changeQty(btn.dataset.key, 0); });
          });
        }
      }
    });
  }

  function changeQty(key, qty) {
    fetch('/cart/change.js', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: key, quantity: qty }) })
      .then(function (r) { return r.json(); }).then(function () { refresh(); });
  }

  document.getElementById('cart-toggle-btn') && document.getElementById('cart-toggle-btn').addEventListener('click', open);
  document.getElementById('cart-close-btn') && document.getElementById('cart-close-btn').addEventListener('click', close);
  overlay && overlay.addEventListener('click', close);
  document.addEventListener('cart:refresh', refresh);

  refresh();
  return { open: open, close: close, refresh: refresh };
})();
