const BaseError = require('../errors/base.error');
const fileService=require('../services/file.service');
class FileController{

    async fileUpload(req,res,next){
        try {
            if(!req.file){
                next(BaseError.BadRequest("File not uploaded"));
            }
           const {filename,path,size}=req.file;
           const {id}=req.user;
           const file=await fileService.fileUpload(filename,path,size,id);
           return res.json(file); 
        } catch (error) {
            next(error);
            console.log(error);
        }
    }
    async getMyFile(req,res,next){
        try {
           const {id}=req.user;
           const file=await fileService.getMyFile(id);
           return res.json(file); 
        } catch (error) {
            next(error);
        }
    }

    async downloadFile(req,res,next){
        try {
            const {id}=req.params;
            const file=await fileService.downloadFile(id);
            if(!file){
                next(BaseError.NotFound("File not found"));
            }
            res.download(file.filePath,file.fileName);
        } catch (error) {
            next(error);
        }
    }

    async deleteFile(req,res,next){
        try {
            const {id}=req.params;
            const file=await fileService.deleteFile(id);
            return res.json({success:true,message:"File deleted"});
        } catch (error) {
            next(error);
        }
    }

}
module.exports = new FileController();