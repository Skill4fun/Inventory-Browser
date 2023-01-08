import express from 'express';
import cors from 'cors';
import {
  helloController,
  adminController,
  articleController,
  registerController,
  loginController,
  userController,
  emailVerificationController,
  productController,
  listItemsController,
  quoteRequestsController,
} from '../controllers';
import authorization from '../middlewares/authorization';
import checkPermission from '../middlewares/checkPermission';
import checkIsAdmin from '../middlewares/checkIsAdmin';

const router = express.Router();

router.use(cors());
router.use(express.json());

router.get('/hello', helloController.get);
router.get('/admin', authorization, checkIsAdmin, adminController.get);
router.get('/articles', articleController.get);
router.get('/products/:brand?', productController.get);
router.get('/list/:userId', authorization, checkPermission, listItemsController.get);
router.get('/quote-requests', authorization, quoteRequestsController.get);
router.get('/email-verification/:userId', emailVerificationController.get);

router.get('/articles', articleController.post);
router.post('/login', loginController.post);
router.post('/register', registerController.post);
router.post('/list/', authorization, listItemsController.post);
router.post('/list/:userId', authorization, checkPermission, listItemsController.post);

router.patch('/users', authorization, userController.patch);
router.patch('/email-verification/:userId', emailVerificationController.patch);
router.patch('/list', authorization, listItemsController.patch);
router.patch('/list/:userId', authorization, checkPermission, listItemsController.patch);

router.delete('/list/', authorization, listItemsController.deleteAllPending);
router.delete('/list/:listItemId', authorization, listItemsController.delete);

export default router;
