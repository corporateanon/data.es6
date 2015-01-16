import DataSource from 'DataSource';
import DataLink from 'DataLink';
import Cache from 'Cache';
import ArrayResource from 'test/ArrayResource';
import Model from './models/Post';
import AuthorsDataSource from './AuthorsDataSource';


var cache = new Cache();

export default class PostsDataSource extends DataSource {

  get model() {
    return Model;
  }

  static get cache() {
    return cache;
  }

  createLinks() {
    return [
      new DataLink({
        kind: DataLink.single,
        foreignKey: 'authorId',
        resolveTo: 'author',
        dataSource: new AuthorsDataSource(),
      })
    ];
  }

  createApiResource() {
    return new ArrayResource({items: [
      { id: 1, authorId: 100, commentIds: [1, 2], text: 'post one'   },
      { id: 2, authorId: 100, commentIds: [3, 4], text: 'post two'   },
      { id: 3, authorId: 200, commentIds: [5, 6], text: 'post three' },
      { id: 4, authorId: 200, commentIds: [7, 8], text: 'post four'  },
    ]});
  }
}
