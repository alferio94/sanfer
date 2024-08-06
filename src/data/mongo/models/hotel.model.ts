import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Name is required']
    },
    photo:{
        type:String,
        default:''
    },
    address:{
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
hotelSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform: function(doc, ret, options){
        delete ret._id;
    }
  })

export const HotelModel = mongoose.model('Hotel', hotelSchema);