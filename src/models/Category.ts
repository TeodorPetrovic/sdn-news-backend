import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';

export class Category extends Model {
  public id!: number;
  public name!: string;
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING
  },
  {
    sequelize,
    modelName: 'Category'
  }
);