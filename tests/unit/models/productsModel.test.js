const { expect } = require('chai');
const { describe } = require('mocha');
const sinon = require('sinon');

const connection = require('../../../models/connection');
const products = require('../../../models/productsModel');
const data = require('../dataMock');

describe('Model - Products', () => {
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

      it('retorna null', async () => {
        const result = await products.getAll();
        expect(result).to.be.null;
      });
    });
  });

  describe('#getById', () => {
    describe('quando existe o produto com o id solicitado', () => {
      const product = data.allProductsResponse[0];
      before(() => sinon.stub(connection, 'execute').resolves([[product]]));
      after(() => connection.execute.restore());

      it('retorna um objeto', async () => {
        const result = await products.getById(1);
        expect(result).to.be.an('object');
      });
      it('o objeto não está vazio', async () => {
        const result = await products.getById(1);
        expect(result).to.not.be.empty;
      });
      it('objeto tem as propriedades: "id", "name"', async () => {
        const result = await products.getById(1);
        expect(result).to.include.all.keys('id', 'name');
      });
    });

    describe('quando não existe um produto com o id solicitado', () => {
      before(() => sinon.stub(connection, 'execute').resolves([[]]));
      after(() => connection.execute.restore());

      it('retorna null', async () => {
        const result = await products.getById(21);
        expect(result).to.be.null;
      });
    });
  });

  describe('#create', () => {
    describe('quando um produto é cadastrado com sucesso', () => {
      const product = data.productCreateResponse;
      const body = data.rightProductBody;
      before(() => sinon.stub(connection, 'execute').resolves([product]));
      after(() => connection.execute.restore());

      it('retorna um objeto', async () => {
        const result = await products.create(body);
        expect(result).to.be.an('object');
      });
      it('o objeto não está vazio', async () => {
        const result = await products.create(body);
        expect(result).to.not.be.empty;
      });
      it('objeto tem as propriedades: "id", "name"', async () => {
        const result = await products.create(body);
        expect(result).to.include.all.keys('id', 'name');
      });
    });
  });

  describe('#update', () => {
    describe('quando um produto é alterado com sucesso', () => {
      const body = data.productUpdateBody.name;
      before(() => sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]));
      after(() => connection.execute.restore());

      it('retorna o numero de linhas alteradas', async () => {
        const result = await products.update(body, 1);
        expect(result).to.be.equal(1);
      });
      it('não é nulo', async () => {
        const result = await products.update(body, 1);
        expect(result).to.not.be.null;
      });
    });
  });
});