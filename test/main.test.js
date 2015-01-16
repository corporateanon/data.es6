import chai from 'chai';
import spies from 'chai-spies';
import HedgehogsDataSource from './data-sources/HedgehogsDataSource';
import Hedgehog from './data-sources/Hedgehog';

var { expect } = chai;
chai.use(spies);



function createDataSource() {
  var ds = new HedgehogsDataSource();

  var items = [
    { id: 1, name: 'one'   },
    { id: 2, name: 'two'   },
    { id: 3, name: 'three' },
    { id: 4, name: 'four'  },
  ];

  ds.api.list = function(params) {
    if(params.ids) {
      return Promise.resolve(items.filter( (item)=> params.ids.indexOf(item.id) !== -1 ));
    } else {
      return Promise.resolve(items);
    }
  };

  ds.api.item = function(params) {
    return Promise.resolve(items.filter( (item)=> item.id === params.id )[0]);
  };
  return ds;
}

describe('HedgehogsDataSource', () => {

  beforeEach(() => HedgehogsDataSource.cache.clear());



  it('should call some API methods', (done) => {
    var ds = createDataSource();

    ds.getList().then((items) => {
      expect(items).to.have.deep.property('[0].name', 'one');
      done();
    }).catch(done);
  });

  it('should call the same methods with same params once', (done) => {
    var ds = createDataSource();

    ds.api.list = chai.spy(ds.api.list);

    ds.getList()
      .then(() => ds.getList())
      .then(() => ds.getList({
        foo: 'bar'
      }))
      .then(() => ds.getList({
        foo: 'bar'
      }))
      .then((items) => {
        expect(ds.api.list).to.be.called.exactly(2);
        done();
      })
      .catch(done);
  });


  it('should call item() API method', (done) => {
    var ds = createDataSource();

    ds.get({
      id: 2
    }).then((item) => {
      expect(item).to.have.property('name', 'two');
      done();
    }).catch(done);
  });

  it('should load batch items', (done) => {
    var ds = createDataSource();
    ds.api.list = chai.spy(ds.api.list);
    ds.batchLoader
      .load([1, 2])
      .then((items) => {
        expect(items).to.eql({
          '1': {
            id: 1,
            name: 'one'
          },
          '2': {
            id: 2,
            name: 'two'
          }
        });
      })
      .then(() => {
        return ds.batchLoader.load([1, 2]);
      })
      .then(() => {
        return ds.batchLoader
          .load([1, 2, 3])
          .then((items) => {
            expect(ds.api.list).to.be.called.exactly(2);
            expect(ds.api.list).to.be.called.with({ids:[1,2]});
            expect(ds.api.list).to.be.called.with({ids:[3]});

            expect(items).to.eql({
              '1': {
                id: 1,
                name: 'one',
              },
              '2': {
                id: 2,
                name: 'two',
              },
              '3': {
                id: 3,
                name: 'three',
              }
            });

            done();
          });
      })
      .catch(done);
  });


});
