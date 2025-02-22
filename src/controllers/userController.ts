import { Request, Response } from 'express';
import { User } from '../models/User';

export class UserController {
  public async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const { username, email } = req.body;
      const newUser = await User.create({ username, email });
      return res.status(201).json(newUser);
    } catch (error: any) {
      return res.status(500).json({ message: 'Error creating user', error: error.message });
    }
  }

  public async getUsers(req: Request, res: Response): Promise<Response> {
    try {
      const users = await User.findAll();
      return res.status(200).json(users);
    } catch (error: any) {
      return res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
  }

  public async getUser(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      const user = await User.findByPk(id);
      return user ? res.status(200).json(user) : res.status(404).json({ message: 'User not found' });
    } catch (error: any) {
      return res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
  }

  public async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      const { username, email } = req.body;
      const user = await User.findByPk(id);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      user.username = username;
      user.email = email;
      await user.save();
      return res.status(200).json(user);
    } catch (error: any) {
      return res.status(500).json({ message: 'Error updating user', error: error.message });
    }
  }

  public async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      const deleted = await User.destroy({ where: { id } });
      return deleted ? res.status(204).send() : res.status(404).json({ message: 'User not found' });
    } catch (error: any) {
      return res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
  }
}