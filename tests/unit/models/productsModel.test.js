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

  it('The objects from array must have "id" and "name" keys', async () => {
    const result = await productsModel.getAll();
    const item = result[0];

    expect(item).to.include.all.keys('id', 'name');
  })
});
