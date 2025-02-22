import { Router, Application } from 'express';
import { CommentController } from '../controllers/commentController';

const router = Router();
const commentController = new CommentController();

// Create a comment related to a post and a user
router.post('/:postId/:userId', commentController.createComment.bind(commentController));

// Get all comments for a specific post
router.get('/post/:postId', commentController.getCommentsByPost.bind(commentController));

// Get all comments by a specific user
router.get('/user/:userId', commentController.getCommentsByUser.bind(commentController));

// Update a comment by its ID
router.put('/:id', commentController.updateComment.bind(commentController));

// Delete a comment by its ID
router.delete('/:id', commentController.deleteComment.bind(commentController));

export default function setCommentRoutes(app: Application): void {
    app.use('/api/comments', router);
}