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

  describe('#getById', () => {
    describe('quando existe o produto com o id solicitado', () => {
      const response = {};
      const request = {};
      before(() => {
        request.params = 1;
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productsService, 'getById').resolves(data.allProductsResponse[0])
      });
      after(() => productsService.getById.restore());

      it('o status retornado é 200', async () => {
        await productsController.getById(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
      });
      it('retorna um objeto com os dados', async () => {
        await productsController.getById(request, response);
        expect(response.json.calledWith(data.allProductsResponse[0])).to.be.equal(true);
      });
    });

    describe('quando não existe um produto com o id solicitado', () => {
      const response = {};
      const request = {};
      before(() => {
        request.params = 21;
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productsService, 'getById').resolves(null)
      });
      after(() => productsService.getById.restore());

      it('o status retornado 404', async () => {
        await productsController.getById(request, response);
        expect(response.status.calledWith(404)).to.be.equal(true);
      });
      it('retorna uma mensagem', async () => {
        await productsController.getById(request, response);
        expect(response.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
      });
    });
  });

  describe('#create', () => {
    describe('quando um produto é cadastrado com sucesso', () => {
      const response = {};
      const request = {};
      before(() => {
        request.body = data.rightProductBody;
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productsService, 'create').resolves(data.productCreateResponse)
      });
      after(() => productsService.create.restore());

      it('o status retornado é 201', async () => {
        await productsController.create(request, response);
        expect(response.status.calledWith(201)).to.be.equal(true);
      });
      it('retorna um objeto com os dados cadastrados', async () => {
        await productsController.create(request, response);
        expect(response.json.calledWith(data.productCreateResponse)).to.be.equal(true);
      });
    });
  });
});