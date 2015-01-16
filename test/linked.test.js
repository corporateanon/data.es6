import chai from 'chai';
import spies from 'chai-spies';

import PostsDataSource from './data-sources/PostsDataSource';
import AuthorsDataSource from './data-sources/AuthorsDataSource';
import CommentsDataSource from './data-sources/CommentsDataSource';

var { expect } = chai;
chai.use(spies);



function createDataSource() {
  return {
    dsPosts: new PostsDataSource(),
    dsAuthors: new AuthorsDataSource(),
    dsComments: new CommentsDataSource(),
  };
}

describe('Linked DataSource', () => {

  beforeEach(() => {
    PostsDataSource.cache.clear();
    AuthorsDataSource.cache.clear();
    CommentsDataSource.cache.clear();
  });



  it('should be', (done) => {
    var {dsPosts} = createDataSource();
    dsPosts.getList({}, {
      
    }).then((items)=>{
      console.log(items);
      done();
    }).catch(done);
  });


});
