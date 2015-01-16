import t from 'tcomb';

export default t.struct({
  id: t.Num,
  text: t.Str,
  authorId: t.Num,
}, 'Comment');
