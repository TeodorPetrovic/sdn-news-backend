import { Router, Application } from 'express';
import { UserController } from '../controllers/userController';

const router = Router();
const userController = new UserController();

router.post('/', userController.createUser.bind(userController));
router.get('/', userController.getUsers.bind(userController));
router.get('/:id', userController.getUser.bind(userController));
router.put('/:id', userController.updateUser.bind(userController));
router.delete('/:id', userController.deleteUser.bind(userController));

export default function setUserRoutes(app: Application): void {
  app.use('/api/users', router);
}