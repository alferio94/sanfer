import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Name is required']
    },
    email:{
        type:String,
        required:[true, 'Email is required'],
        unique: true
    },
    password:{
        type:String,
        required:[true, 'Password is required']
    },
});

adminSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform: function(doc, ret, options){
        delete ret._id;
        delete ret.password;
    }
})

export const AdminModel = mongoose.model('Admin', adminSchema);