const multer=require('multer');
const path=require('path');
const BaseError=require('../errors/base.error');
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/")
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now() + "-" + file.originalname);
    }
});
const fileFilter=(req,file,cb)=>{
    const allowedTypes=/jpeg|jpg|png|pdf|docx/;
    const extname=allowedTypes.test(path.extname(file.originalname).toLowerCase());
    if(extname){
        return cb(null,true);
    }else{
        return cb(BaseError.BadRequest("Only images and documents are allowed"),false);
    }
};
const upload=multer({
    storage,
    limits:{fileSize:10 * 1024 * 1024},
    fileFilter
});
module.exports = upload;