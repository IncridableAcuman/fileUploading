const {Router}=require('express');
const fileController = require('../controllers/file.controller');
const userAuthMiddleware=require('../middlewares/userAuth.middleware');
const upload=require('../configs/multer');
const authMiddleware = require('../middlewares/auth.middleware');
const router=Router();

router.post('/upload',authMiddleware,upload.single('file'),fileController.fileUpload);
router.get('/my-file',userAuthMiddleware,fileController.getMyFile);
router.get('/download/:id',userAuthMiddleware,fileController.downloadFile);
router.delete('/delete/:id',userAuthMiddleware,fileController.deleteFile);


module.exports = router;