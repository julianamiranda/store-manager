const { expect } = require('chai');
const { describe } = require('mocha');
const sinon = require('sinon');

const salesService = require('../../../services/salesService');
const salesController = require('../../../controllers/salesController');
const data = require('../dataMock');

describe('Controller - Sales', () => {
  describe('#getAll', () => {
    describe('quando existem vendas cadastrados', () => {
      const response = {};
      const request = {};
      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(salesService, 'getAll').resolves(data.allSalesResponse)
      });
      after(() => salesService.getAll.restore());

      it('o status retornado é 200', async () => {
        await salesController.getAll(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
      });
      it('retorna um array com os dados', async () => {
        await salesController.getAll(request, response);
        expect(response.json.calledWith(data.allSalesResponse)).to.be.equal(true);
      });
    });

    describe('quando não existem vendas cadastrados', () => {
      const response = {};
      const request = {};
      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(salesService, 'getAll').resolves(null)
      });
      after(() => salesService.getAll.restore());

      it('o status retornado 404', async () => {
        await salesController.getAll(request, response);
        expect(response.status.calledWith(404)).to.be.equal(true);
      });
      it('retorna uma mensagem', async () => {
        await salesController.getAll(request, response);
        expect(response.json.calledWith({ message: 'Sale not found' })).to.be.equal(true);
      });
    });
  });

  describe('#getById', () => {
    describe('quando existe o vendas com o id solicitado', () => {
      const response = {};
      const request = {};
      before(() => {
        request.params = 1;
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(salesService, 'getById').resolves(data.byIdSalesResponse)
      });
      after(() => salesService.getById.restore());

      it('o status retornado é 200', async () => {
        await salesController.getById(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
      });
      it('retorna um array com os dados', async () => {
        await salesController.getById(request, response);
        expect(response.json.calledWith(data.byIdSalesResponse)).to.be.equal(true);
      });
    });

    describe('quando não existem vendas com o id solicitado', () => {
      const response = {};
      const request = {};
      before(() => {
        request.params = 21;
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(salesService, 'getById').resolves(null)
      });
      after(() => salesService.getById.restore());

      it('o status retornado 404', async () => {
        await salesController.getById(request, response);
        expect(response.status.calledWith(404)).to.be.equal(true);
      });
      it('retorna uma mensagem', async () => {
        await salesController.getById(request, response);
        expect(response.json.calledWith({ message: 'Sale not found' })).to.be.equal(true);
      });
    });
  });

  describe('#create', () => {
    describe('quando a venda é cadastrada com sucesso', () => {
      const response = {};
      const request = {};
      before(() => {
        request.body = data.rightSaleBody;
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(salesService, 'create').resolves(data.saleCreateResponse)
      });
      after(() => salesService.create.restore());
      it('o status retornado é 201', async () => {
        const result = await salesController.create(request, response);
        expect(response.status.calledWith(201)).to.be.equal(true);
      });
      it('retorna um objeto com os dados cadastrados', async () => {
        await salesController.create(request, response);
        expect(response.json.calledWith(data.saleCreateResponse)).to.be.equal(true);
      });
    });
    describe('quando a venda não pode ser cadastrada com sucesso', () => {
      describe('um ou mais produtos vendidos não existem no BD', () => {
        const response = {};
        const request = {};
        before(() => {
          request.body = data.nonexistentProductIdBody;
          response.status = sinon.stub().returns(response);
          response.json = sinon.stub().returns();
          sinon.stub(salesService, 'exists').resolves(null)
        });
        after(() => salesService.exists.restore());

        it('o status retornado 404', async () => {
          await salesController.create(request, response);
          expect(response.status.calledWith(404)).to.be.equal(true);
        });
        it('retorna uma mensagem', async () => {
          await salesController.create(request, response);
          expect(response.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
        });
      });
    });
  });
});
