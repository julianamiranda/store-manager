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

    describe('quando não existe um produto com o id solicitado', () => {
      before(() => sinon.stub(productsModel, 'getById').resolves(null));
      after(() => productsModel.getById.restore());

      it('retorna null', async () => {
        const result = await productsService.getById(21);
        expect(result).to.be.null;
      });
    });
  });

  describe('#create', () => {
    describe('quando um produto é cadastrado com sucesso', () => {
      const product = data.productCreateResponse;
      const body = data.rightProductBody;
      before(() => sinon.stub(productsModel, 'create').resolves(product));
      after(() => productsModel.create.restore());

      it('retorna um objeto', async () => {
        const result = await productsService.create(body);
        expect(result).to.be.an('object');
      });
      it('o objeto não está vazio', async () => {
        const result = await productsService.create(body);
        expect(result).to.not.be.empty;
      });
      it('objeto tem as propriedades: "id", "name"', async () => {
        const result = await productsService.create(body);
        expect(result).to.include.all.keys('id', 'name');
      });
    });
  });

  describe('#update', () => {
    describe('quando um produto é alterado com sucesso', () => {
      const body = data.productUpdateBody.name;
      before(() => sinon.stub(productsModel, 'update').resolves(1));
      after(() => productsModel.update.restore());

      it('retorna um objeto', async () => {
        const result = await productsService.update(body, 1);
        expect(result).to.not.be.empty;
        expect(result).to.be.an('object');
      });
      it('objeto tem as propriedades: "id", "name"', async () => {
        const result = await productsService.update(body, 1);
        expect(result).to.include.all.keys('id', 'name');
      });
      it('objeto tem os dados do produto alterado', async () => {
        const result = await productsService.update(body, 1);
        expect(result).to.to.deep.include(data.productUpdated);
      });
    });
    describe('quando um produto não é alterado com sucesso', () => {
      const body = data.productUpdateBody.name;
      before(() => sinon.stub(productsModel, 'update').resolves(1));
      after(() => productsModel.update.restore());

      it('retorna null', async () => {
        const result = await productsService.update(body, 21);
        expect(result).to.be.null;
      });
    });
  });

  describe('#remove', () => {
    describe('quando um produto é excluído com sucesso', () => {
      before(() => sinon.stub(productsModel, 'remove').resolves(1));
      after(() => productsModel.remove.restore());

      it('retorna um true', async () => {
        const result = await productsService.remove(1);
        expect(result).to.be.true;
      });
    });
    describe('quando um produto não é excluído com sucesso', () => {
      before(() => sinon.stub(productsModel, 'remove').resolves(1));
      after(() => productsModel.remove.restore());

      it('retorna null', async () => {
        const result = await productsService.remove(21);
        expect(result).to.be.null;
      });
    });
  });
});