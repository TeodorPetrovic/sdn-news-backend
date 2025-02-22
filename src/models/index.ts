import { Post } from './Post';
import { Tag } from './Tag';
import { Category } from './Category';
import { Comment } from './Comment';
import { User } from './User';
import { PostTag } from './PostTag';

// Existing associations...
Post.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
Category.hasMany(Post, { foreignKey: 'categoryId', as: 'posts' });
Post.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Post, { foreignKey: 'userId', as: 'posts' });
Post.hasMany(Comment, { foreignKey: 'postId', as: 'comments' });
Comment.belongsTo(Post, { foreignKey: 'postId', as: 'post' });
Comment.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Comment, { foreignKey: 'userId', as: 'comments' });

// Many-to-many between Post and Tag using the explicit join model PostTag
Post.belongsToMany(Tag, {
  through: PostTag,
  as: 'tags',
  foreignKey: 'postId',
});
Tag.belongsToMany(Post, {
  through: PostTag,
  as: 'posts',
  foreignKey: 'tagId',
});

export { Post, Tag, Category, Comment, User, PostTag };