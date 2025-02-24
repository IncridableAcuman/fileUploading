const {Schema,model}=require('mongoose');

const userSchema=new Schema({

    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:50,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        maxlength:1024
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    avatar:{
        type:String,
        default:""
    },

},{timestamps:true});
module.exports=model('User',userSchema);