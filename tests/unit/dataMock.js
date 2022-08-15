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
};

const byIdSalesResponse = [
  {
    date: '2022-08-15T20:18:26.000Z',
    productId: 1,
    quantity: 5
  },
  {
    date: '2022-08-15T20:18:26.000Z',
    productId: 2,
    quantity: 10
  }
]

const allSalesResponse = [
  {
    saleId: 1,
    date: '2022-08-15T20:11:05.000Z',
    productId: 1,
    quantity: 5
  },
  {
    saleId: 1,
    date: '2022-08-15T20:11:05.000Z',
    productId: 2,
    quantity: 10
  },
  {
    saleId: 2,
    date: '2022-08-15T20:11:05.000Z',
    productId: 3,
    quantity: 15
  }
]

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
  allSalesResponse,
  byIdSalesResponse,
};
