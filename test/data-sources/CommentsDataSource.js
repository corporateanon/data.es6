import DataSource from 'DataSource';
import Cache from 'Cache';
import ArrayResource from 'test/ArrayResource';
import Model from './models/Comment';


var cache = new Cache();

export default class CommentsDataSource extends DataSource {

  get model() {
    return Model;
  }

  static get cache() {
    return cache;
  }

  createApiResource() {
    return new ArrayResource({items: [
      { id: 1, authorId: 100, text: 'comment one'   },
      { id: 2, authorId: 100, text: 'comment two'   },
      { id: 3, authorId: 200, text: 'comment three' },
      { id: 4, authorId: 200, text: 'comment four'  },
      { id: 5, authorId: 100, text: 'comment five'  },
      { id: 6, authorId: 100, text: 'comment six'   },
      { id: 7, authorId: 200, text: 'comment seven' },
      { id: 8, authorId: 200, text: 'comment eight' },
    ]});
  }
}
