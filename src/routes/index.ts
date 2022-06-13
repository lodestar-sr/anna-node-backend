import { Router } from 'express';

import { authController } from '../controllers/AuthController';
import { postController } from '../controllers/PostController';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router = Router();

router.post('/auth/signin', authController.login);
router.post('/auth/signup', authController.register);
router.post('/auth/refresh', authController.refresh);
router.get('/auth/me', authenticate, authController.fetchMe);

router.get('/post', authenticate, postController.list);
router.get('/post/:id', authenticate, postController.getPostById);
router.post('/post', authenticate, authorize, postController.create);
router.put('/post/:id', authenticate, authorize, postController.update);
router.delete('/post/:id', authenticate, authorize, postController.remove);

export default router;
