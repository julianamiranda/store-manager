const { expect } = require('chai');
const { describe } = require('mocha');
const sinon = require('sinon');

const productsService = require('../../../services/productsService');
const productsModel = require('../../../models/productsModel');
const data = require('../dataMock');

describe('Service - Products', () => {
  describe('#getAll', () => {
    describe('quando existem produtos cadastrados', () => {
      before(() => sinon.stub(productsModel, 'getAll').resolves(data.allProductsResponse));
      after(() => productsModel.getAll.restore());

      it('retorna um array', async () => {
        const result = await productsService.getAll();
        expect(result).to.be.an('array');
      });
      it('o array não está vazio', async () => {
        const result = await productsService.getAll();
        expect(result).to.not.be.empty;
      });
    });

    describe('quando não existem produtos cadastrados', () => {
      before(() => sinon.stub(productsModel, 'getAll').resolves(null));
      after(() => productsModel.getAll.restore());

      it('retorna null', async () => {
        const result = await productsService.getAll();
        expect(result).to.be.null;
      });
    });
  });

  describe('#getById', () => {
    describe('quando existe o produto com o id solicitado', () => {
      const product = data.allProductsResponse[0];
      before(() => sinon.stub(productsModel, 'getById').resolves(product));
      after(() => productsModel.getById.restore());

      it('retorna um objeto', async () => {
        const result = await productsService.getById(1);
        expect(result).to.be.an('object');
      });
      it('o objeto não está vazio', async () => {
        const result = await productsService.getById(1);
        expect(result).to.not.be.empty;
      });
      it('objeto tem as propriedades: "id", "name"', async () => {
        const result = await productsService.getById(1);
        expect(result).to.include.all.keys('id', 'name');
      });
    });

    describe('quando não existem produtos cadastrados', () => {
      before(() => sinon.stub(productsModel, 'getById').resolves(null));
      after(() => productsModel.getById.restore());

      it('retorna null', async () => {
        const result = await productsService.getById(21);
        expect(result).to.be.null;
      });
    });
  });
});