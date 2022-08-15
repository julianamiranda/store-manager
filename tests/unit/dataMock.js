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

module.exports = {
  allProductsResponse,
  rightProductBody,
  productCreateResponse,
  productUpdateBody,
  productUpdated,
  productSearch,
};
