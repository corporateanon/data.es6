import DataSource from 'DataSource';
import Cache from 'Cache';
import ArrayResource from 'test/ArrayResource';
import Model from './models/User';


var cache = new Cache();

export default class AuthorsDataSource extends DataSource {

  get model() {
    return Model;
  }

  static get cache() {
    return cache;
  }

  createApiResource() {
    return new ArrayResource({items: [
      { id: 100, name: 'author one hundred' },
      { id: 200, name: 'author two hundred' },
    ]});
  }
}
