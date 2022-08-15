const { expect } = require('chai');

const productsModel = {
  getAll: () => {}
};

describe('When search for all products on database', () => {
  it('It should return an array', () => {
    const result = productsModel.getAll();

    expect(result).to.be.an('array');
  });

  it('The array returned can not be empty', () => {
    const result = productsModel.getAll();

    expect(result).to.be.empty();
  });

  it('It should return an array of objects', () => {
    const result = productsModel.getAll();

    expect(result).to.be.an('object');
  });

  it('It should return an array of objects', () => {
    const result = productsModel.getAll();

    expect(result).to.be.an('object');
  });

  it('The objects from array must have "id" and "name" keys', () => {
    const result = productsModel.getAll();
    const item = result[0];

    expect(item).to.include.all.keys('id', 'name');
  })
});
