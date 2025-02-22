import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';

export class PostTag extends Model {}

PostTag.init(
  {
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Posts', key: 'id' },
      primaryKey: true,
    },
    tagId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Tags', key: 'id' },
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: 'PostTag',
    timestamps: false,
  }
);