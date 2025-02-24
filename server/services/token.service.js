const BaseError = require('../errors/base.error');
const Token=require('../models/token.model');
const jwt=require('jsonwebtoken');
class TokenService{

    generateTokens(payload){
        const accessToken=jwt.sign(payload,process.env.JWT_ACCESS || 'at',{expiresIn:'15m'});
        const refreshToken=jwt.sign(payload,process.env.JWT_REFRESH || "rt",{expiresIn:'30d'});
        return {accessToken,refreshToken};
    }

    async saveToken(userId,refreshToken){
        const existUser=await Token.findOne({user:userId});
        if(existUser){
            existUser.refreshToken=refreshToken
            return existUser.save();
        }
        const token=await Token.create({user:userId,refreshToken});
        return token;
    }

    async findToken(refreshToken){
        return await Token.findOne({refreshToken});
    }

    async removeToken(refreshToken){
        return await Token.findOneAndDelete({refreshToken});
    }

    validateAccessToken(token){
        try {
          return jwt.verify(token,process.env.JWT_ACCESS || 'at');  
        } catch (error) {
           if(error.name === "TokenExpiredError"){
            throw BaseError.BadRequest("Token has expired");
           }
           throw BaseError.BadRequest("Invalid token");
        }
        
    }
    validateRefreshToken(token){
        try {
          return jwt.verify(token,process.env.JWT_REFRESH || 'rt'); 
           
        } catch (error) {
            if(error.name === "TokenExpiredError"){
                throw BaseError.BadRequest("Token has expired");
            }
            throw BaseError.BadRequest("Invalid token");
        }
        
    }
}
module.exports=new TokenService();