import DataSource from 'DataSource';
import Cache from 'Cache';

import ApiResource from 'http.es6/ApiResource';

import Hedgehog from './models/Hedgehog';



var cache = new Cache();

export default class HedgehogsDataSource extends DataSource {
  //get()
  //getList()

  get model() {
    return Hedgehog;
  }

  static get cache() {
    return cache;
  }

  createApiResource(options) {
    return new ApiResource({
      list: 'GET /hedgehogs',
      item: 'GET /hedgehogs/:id',
      create: 'POST /hedgehogs',
      update: 'PUT /hedgehogs/:id?foo=bar&:hell',
      remove: 'DELETE /hedgehogs/:id',

      difference: 'GET /hedgehogs/diff/:idLeft/:idRight',
      restart: 'POST /hedgehogs/restart/:id',
    }, options);
  }
}
