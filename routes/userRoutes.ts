import { Router } from 'express';
import { validate } from '../validations/validate';
import userController from '../controllers/userController';
import { userSchema } from '../validations/userValidation';


const router = Router();

router.get('/', userController.getAllUsers);

router.post('/', validate(userSchema), userController.addNewUser);

export default router;
