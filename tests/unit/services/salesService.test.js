const { expect } = require('chai');
const { describe } = require('mocha');
const sinon = require('sinon');

const salesModel = require('../../../models/salesModel');
const salesService = require('../../../services/salesService');
const data = require('../dataMock');

describe('Service - Sales', () => {
  describe('#exists', () => {
    describe('quando existe o produto com o id a ser cadastro', () => {
      it('retorna true', async () => {
        const result = await salesService.exists(data.rightSaleBody);
        expect(result).to.be.true;
      });
    });
    describe('quando não existe um produto com o id a ser cadastro', () => {
      it('retorna null', async () => {
        const result = await salesService.exists(data.nonexistentProductIdBody);
        expect(result).to.be.null;
      });
    });
  });

  describe('#create', () => {
    describe('quando um venda é cadastrada com sucesso', () => {
      const salesInfo = data.rightSaleBody;
      const createdSale = data.saleCreateResponse;
      before(() => sinon.stub(salesModel, 'createSalesId').resolves(3));
      after(() => salesModel.createSalesId.restore());

      it('retorna o um objeto com o id da venda e os produtos referentes a ela', async () => {
        const result = await salesService.create(salesInfo);
        expect(result).to.deep.include(createdSale);
      });
    });
  });
});

// comparação de igualdade entre objetos: https://medium.com/building-ibotta/testing-arrays-and-objects-with-chai-js-4b372310fe6d