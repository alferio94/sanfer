import mongoose from "mongoose";

const MenuItemSchema = new mongoose.Schema({
  label:{
    type:String,
    required:[true, 'Label is required']
  },
  icon:{
    type:String,
    required:[true, 'Icon is required']
  },
  path:{
    type:String,
    required:[true, 'Path is required']
  },
});

MenuItemSchema.set('toJSON',{
  virtuals:true,
  versionKey:false,
  transform: function(doc, ret, options){
      delete ret._id;
  }
})
export const MenuItemModel = mongoose.model("MenuItem", MenuItemSchema);