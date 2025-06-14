import mongoose from "mongoose";
import {Schema,Model} from "mongoose";
mongoose.connect("mongodb+srv://Brain:E4p8dlTxElUN1see@cluster0.kgnmt.mongodb.net/Second-Brain");



const userSchema = new Schema({
    username : {
        type : String,
        unique : true
    },
    password : String,
    // userid : Number,   
})
 
const contentSchema = new Schema({
    title : String,
    link : String,
    tags : [{type : mongoose.Types.ObjectId,ref : 'Tag'}] ,
    type : String,
    userId : {type : mongoose.Types.ObjectId, ref : 'user', required : true}
    

})

const LinkSchema = new Schema({
    hash : String,
    userId : {type: mongoose.Types.ObjectId, ref : 'User', required : true, unique: true},

})

export const userModel = new Model("user",userSchema);
export const contentModel = new Model("content",contentSchema);
export const LinkModel = new Model("Links", LinkSchema);







