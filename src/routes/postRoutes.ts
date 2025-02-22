import { Router, Application } from 'express';
import { PostController } from '../controllers/postController';

const router = Router();
const postController = new PostController();

router.post('/', postController.createPost.bind(postController));
router.get('/', postController.getPosts.bind(postController));
router.put('/:id', postController.updatePost.bind(postController));
router.delete('/:id', postController.deletePost.bind(postController));

export default function setPostRoutes(app: Application): void {
  app.use('/api/posts', router);
}