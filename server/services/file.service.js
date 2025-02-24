const BaseError=require('../errors/base.error');
const File = require('../models/file.model');
const FileDTO=require('../dtos/file.dto');
const fs=require('fs');
class FileService{

    async fileUpload(fileName,filePath,size,id){
        const file=await File.create({fileName,filePath,size,owner:id});
        const fileDto=new FileDTO(file);
        return fileDto;
    }

    async getMyFile(id){
        const file=await File.find({owner:id});
        if(!file.length){
            throw BaseError.NotFound("Files not found");
        }
        return file;
    }

    async downloadFile(id){
        const file=await File.findById(id);
        if(!file){
            throw BaseError.NotFound("File not found");
        }
        return file;
    }

    async deleteFile(id){
        const file=await File.findById(id);
        if(!file){
            throw BaseError.NotFound("File not found");
        }
        fs.unlinkSync(file.filePath);

        await File.findByIdAndDelete(id);

        return {message:"File deleted"};
    }

}
module.exports = new FileService();