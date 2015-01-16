export default class ArrayResource {
  constructor({items}) {
    this.items = items;
  }

  list(params={}) {
    if(params.ids) {
      return Promise.resolve(this.items.filter( (item)=> params.ids.indexOf(item.id) !== -1 ));
    } else {
      return Promise.resolve(this.items);
    }
  }

  item(params={}) {
    return Promise.resolve(this.items.filter( (item)=> item.id === params.id )[0]);
  }
}
