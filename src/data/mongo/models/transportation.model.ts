import mongoose from "mongoose";

const transportationSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Name is required']
    },
    details:{
        type:String,
        default:''
    },
    type:{
        type:String,
        default: ''
    },
    map:{
        type:String,
        default:''
    },
    date:{
        type:Date
    },
    extra:{
        type:String
    },
    event:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Event"
      },
    

});

transportationSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform: function(doc, ret, options){
        delete ret._id;
    }
})

export const TransportationModel = mongoose.model('Transportation', transportationSchema);