const { expect } = require('chai');
const { describe } = require('mocha');
const sinon = require('sinon');

const salesModel = require('../../../models/salesModel');
const salesService = require('../../../services/salesService');
const data = require('../dataMock');

describe('Service - Sales', () => {
  describe('#getAll', () => {
    describe('quando existem vendas cadastrados', () => {
      before(() => sinon.stub(salesModel, 'getAll').resolves(data.allSalesResponse));
      after(() => salesModel.getAll.restore());

      it('retorna um array com todas as vendas', async () => {
        const result = await salesService.getAll();
        expect(result).to.be.an('array');
      });
      it('o array não está vazio', async () => {
        const result = await salesService.getAll();
        expect(result).to.not.be.empty;
      });
    });

    describe('quando não existem vendas cadastrados', () => {
      before(() => sinon.stub(salesModel, 'getAll').resolves(null));
      after(() => salesModel.getAll.restore());

      it('retorna null', async () => {
        const result = await salesService.getAll();
        expect(result).to.be.null;
      });
    });
  });

  describe('#getById', () => {
    describe('quando existe o produto com o id solicitado', () => {
      const sales = data.byIdSalesResponse;
      before(() => sinon.stub(salesModel, 'getById').resolves(sales));
      after(() => salesModel.getById.restore());

      it('retorna um array', async () => {
        const result = await salesService.getById(1);
        expect(result).to.be.an('array');
      });
      it('o array não está vazio', async () => {
        const result = await salesService.getById(1);
        expect(result).to.not.be.empty;
      });
      it('que possui objetos com as propriedades: "date", "productId", "quantity"', async () => {
        const result = await salesService.getById(1);
        expect(result[0]).to.include.all.keys('date', 'productId', 'quantity');
      });
    });

    describe('quando não existe uma venda com o id solicitado', () => {
      before(() => sinon.stub(salesModel, 'getById').resolves(null));
      after(() => salesModel.getById.restore());

      it('retorna null', async () => {
        const result = await salesService.getById(21);
        expect(result).to.be.null;
      });
    });
  });

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