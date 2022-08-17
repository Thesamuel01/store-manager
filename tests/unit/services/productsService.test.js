const { expect } = require('chai');
const { describe } = require('mocha');
const sinon = require('sinon');

const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');
const { ALL_PRODUCTS_MOCK, PRODUCT_BY_ID_MOCK } = require('../../mocks/products');

const allProducts = [...ALL_PRODUCTS_MOCK];
const product = { ...PRODUCT_BY_ID_MOCK };

describe('TEST CASE PRODUCT SERVICE - When search for all products', () => {
  before(() => {
    sinon.stub(productsModel, 'getAll').resolves(allProducts);
  });

  after(() => {
    productsModel.getAll.restore();
  });

  it('It should return an array', async () => {
    const result = await productsService.getAll();

    expect(result).to.be.an('array');
  });

  it('The array returned can not be empty', async () => {
    const result = await productsService.getAll();

    expect(result).to.be.not.empty;
  });

  it('It should return an array of objects', async () => {
    const result = await productsService.getAll();
    const item = result[0];

    expect(item).to.be.an('object');
  });

  it('The objects from array must has "id" and "name" keys', async () => {
    const result = await productsService.getAll();
    const item = result[0];

    expect(item).to.all.keys('id', 'name');
  })
});

describe('TEST CASE PRODUCT SERVICE - When search for a specific product', () => {
  const ID = 1;

  before(() => {
    sinon.stub(productsModel, 'getById').resolves(product);
  });

  after(() => {
    productsModel.getById.restore();
  });

  it('It should return an object', async () => {
    const result = await productsService.getById(ID);

    expect(result).to.be.an('object');
  });

  it('The object returned must have "id" and "name" keys', async () => {
    const result = await productsService.getById(ID);

    expect(result).to.all.keys('id', 'name');
  });

  it('The product id must be equal to id pass by parameter', async () => {
    const result = await productsService.getById(ID);
    const { id } = result;

    expect(id).to.be.equal(ID);
  })
});

describe('TEST CASE PRODUCT SERVICE - When a product is created', () => {
  const productCreated = { id: 4, name: 'ProdutoX' };

  before(() => {
    sinon.stub(productsModel, 'create').resolves(productCreated);
  });

  after(() => {
    productsModel.create.restore();
  });

  it('It should return an object', async () => {
    const result = await productsService.create('ProdutoX');

    expect(result).to.be.an('object');
  });

  it('The object returned must have "id" and "name" keys', async () => {
    const result = await productsService.create('ProdutoX');

    expect(result).to.all.keys('id', 'name');
  });

  it('The object returned should have infos about the product created', async () => {
    const { id, name } = await productsService.create('ProdutoX');

    expect(id).to.be.equal(productCreated.id);
    expect(name).to.be.equal(productCreated.name);
  });
});