import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';
import { Tag } from './Tag';

export class Post extends Model {
  public id!: number;
  public title!: string;
  public content!: string;
  public categoryId!: number;
  public userId!: number;

  // Declare association methods to satisfy TypeScript
  public setTags!: (newTags: Tag[] | number[]) => Promise<void>;
  public getTags!: () => Promise<Tag[]>;
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Categories', key: 'id' },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Users', key: 'id' },
    },
  },
  {
    sequelize,
    modelName: 'Post',
  }
);