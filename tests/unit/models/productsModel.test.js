const { expect } = require('chai');
const { describe } = require('mocha');
const sinon = require('sinon');

const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModel');
const mock = require('../../mocks/products');

const allProducts = [...mock.ALL_PRODUCTS_MOCK];
const product = { ...mock.PRODUCT_BY_ID_MOCK };
const newValue = { ...mock.PRODUCT_UPDATE };

describe('TEST CASE PRODUCT MODEL - When search for all products on database', () => {
  before(() => {
    const executeResult = [allProducts, []];

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

describe('TEST CASE PRODUCT MODEL - When search for a specific product on database', () => {
  const ID = 1;

  before(() => {
    sinon.stub(connection, 'execute').resolves([[product], []]);
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

describe('TEST CASE PRODUCT MODEL - When a product is insert into database', () => {
  before(() => {
    const executeResult = [{ affectedRows: 1, insertId: 4 }, undefined];

    sinon.stub(connection, 'execute').resolves(executeResult);
  });

  after(() => {
    connection.execute.restore();
  });

  it('It should return an object', async () => {
    const result = await productsModel.create('ProdutoX');

    expect(result).to.be.an('object');
  });

  it('The object returned must have "id" and "name" keys', async () => {
    const result = await productsModel.create('ProdutoX');

    expect(result).to.all.keys('id', 'name');
  });
});

describe('TEST CASE PRODUCT MODEL - When a product is updated', () => {
  describe('When product is not found', () => {
    before(() => {
      const executeResult = [{ affectedRows: 0 }, undefined];
  
      sinon.stub(connection, 'execute').resolves(executeResult);
    });
  
    after(() => {
      connection.execute.restore();
    }); 

    it('It must return null', async () => {
      const name = 'Armadura do Groot'
      const result = await productsModel.update(9, name);
  
      expect(result).to.be.null;
    });
  })

  describe('When product is updated', () => {
    before(() => {
      const executeResult = [{ affectedRows: 1 }, undefined];
  
      sinon.stub(connection, 'execute').resolves(executeResult);
    });
  
    after(() => {
      connection.execute.restore();
    });
  
    it('It must return an object', async () => {
      const result = await productsModel.update();
  
      expect(result).to.be.an('object');
    });
  
    it('The object returned must have "id" and "name" keys', async () => {
      const { name } = newValue;
      const result = await productsModel.update(1, name);
  
      expect(result).to.all.keys('id', 'name');
    });
  })
});

describe('TEST CASE PRODUCT MODEL - When a product is deleted', () => {
  describe('When product is not found', () => {
    before(() => {
      const executeResult = [{ affectedRows: 0 }, undefined];
  
      sinon.stub(connection, 'execute').resolves(executeResult);
    });
  
    after(() => {
      connection.execute.restore();
    }); 

    it('It must return false', async () => {
      const result = await productsModel.deleteProduct(9);
  
      expect(result).to.be.false;
    });
  })

  describe('When product is deleted', () => {
    before(() => {
      const executeResult = [{ affectedRows: 1 }, undefined];
  
      sinon.stub(connection, 'execute').resolves(executeResult);
    });
  
    after(() => {
      connection.execute.restore();
    });
  
    it('It must return true', async () => {
      const result = await productsModel.deleteProduct(1);
  
      expect(result).to.be.true;
    });
  })
});

describe('TEST CASE PRODUCT MODEL - When a product search by a specific name', () => {
  before(() => {
    const executeResult = [[product], undefined];

    sinon.stub(connection, 'execute').resolves(executeResult);
  });

  after(() => {
    connection.execute.restore();
  });

  it('It should return an array', async () => {
    const result = await productsModel.getByName('Martelo');

    expect(result).to.be.an('array');
  });

  it('The array returned can not be empty', async () => {
    const result = await productsModel.getByName('Martelo');

    expect(result).to.be.not.empty;
  });

  it('It should return an array of objects', async () => {
    const result = await productsModel.getByName('Martelo');
    const item = result[0];

    expect(item).to.be.an('object');
  });

  it('The objects from array must has "id" and "name" keys', async () => {
    const result = await productsModel.getByName('Martelo');
    const item = result[0];

    expect(item).to.all.keys('id', 'name');
  })
});
