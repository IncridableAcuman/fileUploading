const nodemailer=require('nodemailer');
class MailService{
    constructor(){
        this.transporter=nodemailer.createTransport({
            host:process.env.SMTP_HOST,
            port:process.env.SMTP_PORT,
            secure:false,
            auth:{
                user:process.env.SMTP_USER,
                pass:process.env.SMTP_SECRET
            }
        });
    }
    async sendMail(email){
        await this.transporter.sendMail({
            from:process.env.SMTP_USER,
            to:email,
            subject:"Your registration is successful",
            text:"Welcome to our platform"
        });
    }

    async sendForgotPassword(email,link){
        await this.transporter.sendMail({
            from:process.env.SMTP_USER,
            to:email,
            subject:"Reset Password",
            text:`To reset your password,fallow this link: ${link}`
        });
    }
}
module.exports=new MailService();