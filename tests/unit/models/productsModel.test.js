const { expect } = require('chai');
const { describe } = require('mocha');
const sinon = require('sinon');

const connection = require('../../../models/connection');
const products = require('../../../models/productsModel');
const data = require('../dataMock');

describe('#getAll', () => {
  describe('quando existem produtos cadastrados', () => {
    before(() => sinon.stub(connection, 'execute').resolves([data.allProductsResponse]));
    after(() => connection.execute.restore());

    it('retorna um array', async () => {
      const result = await products.getAll();
      expect(result).to.be.an('array');
    });
    it('o array não está vazio', async () => {
      const result = await products.getAll();
      expect(result).to.not.be.empty;
    });

  });
  describe('quando não existem produtos cadastrados', () => {
    before(() => sinon.stub(connection, 'execute').resolves([[]]));
    after(() => connection.execute.restore());

    it('retorna um array', async () => {
      const result = await products.getAll();
      expect(result).to.be.null;
    });
  });
});