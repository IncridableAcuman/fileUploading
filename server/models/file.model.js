const {Schema,model}=require('mongoose');

const fileSchema=new Schema({
    fileName:{
        type:String,
        required:true
    },
    filePath:{
        type:String,
        required:true
    },
    size:{
        type:Number,
        required:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    access:{
        type:String,
        enum:["public",'private'],
        default:"public"
    },
    downloads:{
        type:Number,
        default:0
    }

},{timestamps:true});

const File=model('File',fileSchema);
module.exports=File;