const authService=require('../services/auth.service');
class AuthController{

    async signUp(req,res,next){
        try {
            const {name,email,password}=req.body;
            const user=await authService.signUp(name,email,password);
            res.cookie('refreshToken',user.refreshToken,{httpOnly:true,maxAge:30*24*60*60*1000});
            return res.json(user);
        } catch (error) {
            next(error);
        }
    }
    async signIn(req,res,next){
        try {
            const {email,password}=req.body;
            const user=await authService.signIn(email,password);
            res.cookie('refreshToken',user.refreshToken,{httpOnly:true,maxAge:30*24*60*60*1000});
            return res.json(user);
        } catch (error) {
            next(error);
        }
    }
    async logOut(req,res,next){
        try {
           const {refreshToken}=req.cookies;
           const user=await authService.logOut(refreshToken);
           res.clearCookie('refreshToken'); 
           return res.json({success:true,message:"User logout successfully"});
        } catch (error) {
            next(error);
        }
    }
    async refresh(req,res,next){
        try {
            const {refreshToken}=req.cookies;
            const user=await authService.refresh(refreshToken);
            res.cookie('refreshToken',user.refreshToken,{httpOnly:true,maxAge:30*24*60*60*1000});
            return res.json(user); 
        } catch (error) {
            next(error);
        }
    }
    async forgotPassword(req,res,next){
        try {
          const {email}=req.body;
          await authService.forgotPassword(email);
          return res.json({message:"Reset password link sent to your email"});  
        } catch (error) {
            next(error);
        }
    }
    async resetPassword(req,res,next){
        try {
           const {password,token}=req.body;
           await authService.resetPassword(password,token);
           return res.json({message:"Password reset successfully"});
        } catch (error) {
            next(error);
            console.log(error);
        }
    }
    async getOneUser(req,res,next){
        try {
            const {id}=req.params;
            const user=await authService.getOneUser(id);
            return res.json(user);
        } catch (error) {
            next(error);
        }
    }
    async getAllUsers(req,res,next){
        try {
            const users=await authService.getOneUser(id);
            return res.json(users);
        } catch (error) {
            next(error);
        }
    }

}
module.exports=new AuthController();