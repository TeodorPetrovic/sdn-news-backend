import { Request, Response } from 'express';
import { Category } from '../models/Category';

export class CategoryController {
  public async createCategory(req: Request, res: Response): Promise<Response> {
    try {
      const { name } = req.body;
      const newCategory = await Category.create({ name });
      return res.status(201).json(newCategory);
    } catch (error: any) {
      return res.status(500).json({ message: 'Error creating category', error: error.message });
    }
  }

  public async getCategories(req: Request, res: Response): Promise<Response> {
    try {
      const categories = await Category.findAll();
      return res.status(200).json(categories);
    } catch (error: any) {
      return res.status(500).json({ message: 'Error fetching categories', error: error.message });
    }
  }

  public async updateCategory(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      const { name } = req.body;
      const category = await Category.findByPk(id);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      category.name = name;
      await category.save();
      return res.status(200).json(category);
    } catch (error: any) {
      return res.status(500).json({ message: 'Error updating category', error: error.message });
    }
  }

  public async deleteCategory(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      const deleted = await Category.destroy({ where: { id } });
      return deleted
        ? res.status(204).send()
        : res.status(404).json({ message: 'Category not found' });
    } catch (error: any) {
      return res.status(500).json({ message: 'Error deleting category', error: error.message });
    }
  }
}