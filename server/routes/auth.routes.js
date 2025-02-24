const {Router}=require('express');
const authController = require('../controllers/auth.controller');

const router=Router();

router.post('/signup',authController.signUp);
router.post('/signin',authController.signIn);
router.post('/logout',authController.logOut);
router.get('/refresh',authController.refresh);
router.post('/forgot-password',authController.forgotPassword);
router.put('/reset-password',authController.resetPassword);
router.get("/one-user/:id",authController.getOneUser);
router.get('/all-users',authController.getAllUsers);

module.exports=router;