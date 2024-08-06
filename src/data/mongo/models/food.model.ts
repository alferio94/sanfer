import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Name is required']
    },
    details:{
        type:String,
        default:''
    },
    photo:{
        type:String,
        default:''
    },
    location:{
        type:String,
        default:''
    },
    phone:{
        type:String,
        default:''
    },
    map:{
        type:String,
        default:''
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Event"
      },
    

});

foodSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform: function(doc, ret, options){
        delete ret._id;
    }
})

export const FoodModel = mongoose.model('Food', foodSchema);