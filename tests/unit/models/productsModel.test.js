const { expect } = require('chai');
const { describe } = require('mocha');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModel');

describe('When search for all products on database', () => {
  before(() => {
    const executeResult = [[{ id: 1, name: 'Martelo do Thor' }], []];

    sinon.stub(connection, 'execute').resolves(executeResult);
  });

  after(() => {
    connection.execute.restore();
  });

  it('It should return an array', async () => {
    const result = await productsModel.getAll();

    expect(result).to.be.an('array');
  });

  it('The array returned can not be empty', async () => {
    const result = await productsModel.getAll();

    expect(result).to.be.not.empty;
  });

  it('It should return an array of objects', async () => {
    const result = await productsModel.getAll();
    const item = result[0];

    expect(item).to.be.an('object');
  });

  it('The objects from array must has "id" and "name" keys', async () => {
    const result = await productsModel.getAll();
    const item = result[0];

    expect(item).to.all.keys('id', 'name');
  })
});

describe('When search for a specific product on database', () => {
  const ID = 1;

  before(() => {
    const executeResult = [[{ id: 1, name: 'Martelo do Thor' }], []];

    sinon.stub(connection, 'execute').resolves(executeResult);
  });

  after(() => {
    connection.execute.restore();
  });

  it('It should return an object', async () => {
    const result = await productsModel.getById(ID);

    expect(result).to.be.an('object');
  });

  it('The object returned must have "id" and "name" keys', async () => {
    const result = await productsModel.getById(ID);

    expect(result).to.all.keys('id', 'name');
  });

  it('The product id must be equal to id pass by parameters', async () => {
    const result = await productsModel.getById(ID);
    const { id } = result;

    expect(id).to.be.equal(ID);
  })
});
