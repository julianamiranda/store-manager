const { expect } = require('chai');
const { describe } = require('mocha');
const sinon = require('sinon');

const productsService = require('../../../services/productsService');
const productsController = require('../../../controllers/productsContoller');
const data = require('../dataMock');

describe('Controller - Products', () => {
  describe('#getAll', () => {
    describe('quando existem produtos cadastrados', () => {
      const response = {};
      const request = {};
      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productsService, 'getAll').resolves(data.allProductsResponse)
      });
      after(() => productsService.getAll.restore());

      it('o status retornado é 200', async () => {
        await productsController.getAll(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
      });
      it('retorna um array com os dados', async () => {
        await productsController.getAll(request, response);
        expect(response.json.calledWith(data.allProductsResponse)).to.be.equal(true);
      });
    });

    describe('quando não existem produtos cadastrados', () => {
      const response = {};
      const request = {};
      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productsService, 'getAll').resolves(null)
      });
      after(() => productsService.getAll.restore());

      it('o status retornado 404', async () => {
        await productsController.getAll(request, response);
        expect(response.status.calledWith(404)).to.be.equal(true);
      });
      it('retorna uma mensagem', async () => {
        await productsController.getAll(request, response);
        expect(response.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
      });
    });
  });
});