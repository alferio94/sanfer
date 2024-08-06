import mongoose from "mongoose";

const userGroupSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Name is required'],
        unique:true
    },
    specialty:{
        type:String,
        required:[true, 'Specialty is required']
    },
    color:{
        type:String,
        default:''
    },
    icon:{
        type:String,
        default:''
    },
});

userGroupSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform: function(doc, ret, options){
        delete ret._id;
    }
})

export const GroupModel = mongoose.model('Group', userGroupSchema);