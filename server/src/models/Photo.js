import mongoose from 'mongoose'
const schema=new mongoose.Schema({
 imageUrl:{type:String,required:true},publicId:{type:String,required:true},
 guestName:{type:String,trim:true,maxlength:60,default:'A cherished guest'},
 message:{type:String,trim:true,maxlength:240,default:''},
 approved:{type:Boolean,default:true}
},{timestamps:true})
schema.index({createdAt:-1});schema.index({guestName:'text'})
export default mongoose.model('Photo',schema)
