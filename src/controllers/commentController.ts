import { Request, Response } from 'express';
import { Comment } from '../models/Comment';
import { Post } from '../models/Post';
import { User } from '../models/User';

export class CommentController {
  public async createComment(req: Request, res: Response): Promise<void> {
    const { postId, userId } = req.params;
    const { content } = req.body;

    try {
      const post = await Post.findByPk(postId);
      const user = await User.findByPk(userId);

      if (!post || !user) {
        res.status(404).send('Post or User not found');
        return;
      }

      const comment = await Comment.create({ content, postId, userId });
      res.status(201).json(comment);
    } catch (error: unknown) {
      res.status(500).send((error as Error).message);
    }
  }

  public async getCommentsByPost(req: Request, res: Response): Promise<void> {
    const { postId } = req.params;

    try {
      const comments = await Comment.findAll({ where: { postId } });
      res.status(200).json(comments);
    } catch (error: unknown) {
      res.status(500).send((error as Error).message);
    }
  }

  public async getCommentsByUser(req: Request, res: Response): Promise<void> {
    const { userId } = req.params;

    try {
      const comments = await Comment.findAll({ where: { userId } });
      res.status(200).json(comments);
    } catch (error: unknown) {
      res.status(500).send((error as Error).message);
    }
  }

  public async updateComment(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const { content } = req.body;
      const comment = await Comment.findByPk(id);
      if (!comment) {
        res.status(404).send('Comment not found');
        return;
      }
      comment.content = content;
      await comment.save();
      res.status(200).json(comment);
    } catch (error: unknown) {
      res.status(500).send((error as Error).message);
    }
  }

  public async deleteComment(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const deleted = await Comment.destroy({ where: { id } });
      deleted
        ? res.status(204).send()
        : res.status(404).send('Comment not found');
    } catch (error: unknown) {
      res.status(500).send((error as Error).message);
    }
  }
}