import { Request, Response } from 'express';
import { Post } from '../models/Post';
import { Tag } from '../models/Tag';

export class PostController {
  public async createPost(req: Request, res: Response): Promise<Response> {
    try {
      const { title, content, categoryId, userId, tagNames } = req.body;
      const newPost = await Post.create({ title, content, categoryId, userId });
      
      // If tagNames provided as an array, find or create each Tag, then associate  
      if (tagNames && Array.isArray(tagNames)) {
        const tags = await Promise.all(
          tagNames.map(async (name: string) => {
            const [tag] = await Tag.findOrCreate({ where: { name } });
            return tag;
          })
        );
        await newPost.setTags(tags);
        await newPost.reload({ include: [{ association: 'tags' }] });
      }
      
      return res.status(201).json(newPost);
    } catch (error: any) {
      return res.status(500).json({ message: 'Error creating post', error: error.message });
    }
  }

  public async getPosts(req: Request, res: Response): Promise<Response> {
    try {
      const { categoryId } = req.query;
      const filter = categoryId ? { where: { categoryId: Number(categoryId) } } : {};
      const posts = await Post.findAll(filter);
      return res.status(200).json(posts);
    } catch (error: any) {
      return res.status(500).json({ message: 'Error fetching posts', error: error.message });
    }
  }

  public async updatePost(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      const { title, content, categoryId, userId, tagNames } = req.body;
      const post = await Post.findByPk(id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      post.title = title;
      post.content = content;
      post.categoryId = categoryId;
      post.userId = userId;
      await post.save();

      // Update the tag associations if tagNames provided
      if (tagNames && Array.isArray(tagNames)) {
        const tags = await Promise.all(
          tagNames.map(async (name: string) => {
            const [tag] = await Tag.findOrCreate({ where: { name } });
            return tag;
          })
        );
        await post.setTags(tags);
        await post.reload({ include: [{ association: 'tags' }] });
      }

      return res.status(200).json(post);
    } catch (error: any) {
      return res.status(500).json({ message: 'Error updating post', error: error.message });
    }
  }

  public async deletePost(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      const deleted = await Post.destroy({ where: { id } });
      return deleted
        ? res.status(204).send()
        : res.status(404).json({ message: 'Post not found' });
    } catch (error: any) {
      return res.status(500).json({ message: 'Error deleting post', error: error.message });
    }
  }
}