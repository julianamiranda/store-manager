const format = (d) => ({
  saleId: d.sale_id,
  date: d.date,
  productId: d.product_id,
  quantity: d.quantity,
});

module.exports = format;