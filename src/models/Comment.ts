import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';

export class Comment extends Model {
  public id!: number;
  public content!: string;
  public postId!: number;
  public userId!: number; // Foreign key for the user relation
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: DataTypes.STRING,
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Posts', // Table name for Post model
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // Table name for User model
        key: 'id'
      }
    },
  },
  {
    sequelize,
    modelName: 'Comment',
  }
);