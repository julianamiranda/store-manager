const allProductsResponse =
  [
    { id: 1, name: 'Martelo de Thor' },
    { id: 2, name: 'Traje de encolhimento' },
    { id: 3, name: 'Escudo do Capitão América' },
  ];

const rightProductBody = { name: 'Produto1' };

const productCreateResponse = { id: 4, name: 'Produto1' };

const productUpdateBody = { name: 'Machado do Thor Stormbreaker' };

const productUpdated = { id: 1, name: 'Machado do Thor Stormbreaker' };

const productSearch = [{ id: 1, name: 'Martelo de Thor' }];

const rightSaleBody = [
  { productId: 1, quantity: 1 },
  { productId: 2, quantity: 5 },
];

const nonexistentProductIdBody = [
  { productId: 1, quantity: 1 },
  { productId: 99999, quantity: 5 },
];

const saleCreateResponse = {
  id: 3,
  itemsSold: [
    { productId: 1, quantity: 1 },
    { productId: 2, quantity: 5 },
  ]
}

module.exports = {
  allProductsResponse,
  rightProductBody,
  productCreateResponse,
  productUpdateBody,
  productUpdated,
  productSearch,
  rightSaleBody,
  nonexistentProductIdBody,
  saleCreateResponse,
};
