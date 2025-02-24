const BaseError=require('../errors/base.error');
module.exports=(er,req,res,next)=>{
    try {
        if(er instanceof BaseError){
            return res.status(er.status).json({message:er.message,errors:er.errors});
        }
    } catch (error) {
        return res.status(500).json({success:false,message:"Internal Server Error"});
    }
}