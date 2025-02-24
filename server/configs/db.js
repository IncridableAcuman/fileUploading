const mongoose=require('mongoose');
module.exports=()=>{
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("MongoDB connected successfully ");
}).catch((er)=>{
    console.log("MongoDb connection failed",er);
});
}