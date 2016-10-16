function updateTotals() {
  console.log('yo!');
  var total = $('#basket td.total').toArray()
    .map(function(td) {
      return parseFloat($(td).text().replace('$', ''));
  }).reduce(function(a, b) {
    return a + b;
  }, 0);

  var base_total = `$${(total * 0.2).toFixed(2)}`
  var ship_total = `$${((total * 0.2) + 10).toFixed(2)}`

  $('tfoot .total').text(base_total);
  $('#order-summary .total-price').text(base_total);
  $('#order-summary .total-shipping').text(ship_total);
}

function updateDiscount(tr, qty) {
  if (qty > 10) {
    tr.find('td.discount').text('30%');
  } else {
    tr.find('td.discount').text('20%');
  }
}

function numInputListener() {
  $('input.form-control.order-number').on('click', function(event) {
    target = $(event.target);
    tr     = target.parent().parent();
    price  = parseFloat(tr.data('product-price'));
    qty    = target.val();
    $(tr).find('td.total')
      .text(`$${(qty * price * 0.2).toFixed(2)}`);
    updateDiscount(tr, qty);
    updateTotals();
  });
}

function deleteListener() {
  $('td.delete a').on('click', function(event) {
    event.preventDefault();
    target = $(event.target);
    tr     = target.parent().parent().parent();
    tr.remove();
    updateTotals();
  });
}

$(document).ready(function() {
  numInputListener();
  deleteListener();
});
