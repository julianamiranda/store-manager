const { expect } = require('chai');
const { describe } = require('mocha');
const sinon = require('sinon');

const connection = require('../../../models/connection');
const salesModel = require('../../../models/salesModel');
const data = require('../dataMock');

describe('Model - Sales', () => {
  describe('#getAll', () => {
    describe('quando existem vendas cadastrados', () => {
      before(() => sinon.stub(connection, 'execute').resolves([data.allSalesResponse]));
      after(() => connection.execute.restore());

      it('retorna um array com todas as vendas', async () => {
        const result = await salesModel.getAll();
        expect(result).to.be.an('array');
      });
      it('o array não está vazio', async () => {
        const result = await salesModel.getAll();
        expect(result).to.not.be.empty;
      });
    });

    describe('quando não existem vendas cadastrados', () => {
      before(() => sinon.stub(connection, 'execute').resolves([[]]));
      after(() => connection.execute.restore());

      it('retorna null', async () => {
        const result = await salesModel.getAll();
        expect(result).to.be.null;
      });
    });
  });

  describe('#getById', () => {
    describe('quando existe o produto com o id solicitado', () => {
      const sales = data.byIdSalesResponse;
      before(() => sinon.stub(connection, 'execute').resolves([[sales]]));
      after(() => connection.execute.restore());

      it('retorna um array', async () => {
        const result = await salesModel.getById(1);
        expect(result).to.be.an('array');
      });
      it('o array não está vazio', async () => {
        const result = await salesModel.getById(1);
        expect(result).to.not.be.empty;
      });
      it('que possui objetos com as propriedades: "date", "productId", "quantity"', async () => {
        const result = await salesModel.getById(1);
        expect(result[0]).to.include.all.keys('date', 'productId', 'quantity');
      });
    });

    describe('quando não existe uma venda com o id solicitado', () => {
      before(() => sinon.stub(connection, 'execute').resolves([[]]));
      after(() => connection.execute.restore());

      it('retorna null', async () => {
        const result = await salesModel.getById(21);
        expect(result).to.be.null;
      });
    });
  });

  describe('#createSalesId', () => {
    describe('quando o id para uma venda é criado com sucesso', () => {
      before(() => sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]));
      after(() => connection.execute.restore());

      it('retorna o numero do id da venda cadastrada', async () => {
        const result = await salesModel.createSalesId();
        expect(result).to.be.a('number');
      });
      it('o valor retornado não é nulo', async () => {
        const result = await salesModel.createSalesId();
        expect(result).to.not.null;
      });
    });
  });

  describe('#create', () => {
    describe('quando um venda é cadastrada com sucesso', () => {
      const salesId = 3;
      const salesInfo = data.rightSaleBody[0];
      const createdSale = data.saleCreateResponse;
      before(() => sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]));
      after(() => connection.execute.restore());

      it('retorna o número de linhas alteradas no BD', async () => {
        const result = await salesModel.create();
        expect(result).to.be.a('number');
      });
      it('o valor retornado não é nulo', async () => {
        const result = await salesModel.create();
        expect(result).to.not.null;
      });
    });
  });
});