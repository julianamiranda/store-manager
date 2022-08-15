const { expect } = require('chai');
const { describe } = require('mocha');
const sinon = require('sinon');

const connection = require('../../../models/connection');
const salesModel = require('../../../models/salesModel');
const data = require('../dataMock');

describe('Model - Sales', () => {
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