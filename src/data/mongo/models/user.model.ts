import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
    isActive:{
        type:Boolean,
        default:true
    },
    groups:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Group',
    }],
    creationDate:{
        type:Date,
        default: Date.now()
    }
});

userSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform: function(doc, ret, options){
        delete ret._id;
        delete ret.password;
    }
})

export const UserModel = mongoose.model('User', userSchema);