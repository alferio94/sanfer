import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  campus: {
    type: String,
    default: "",
  },
  campusPhone: {
    type: String,
    default: "",
  },
  campusMap: {
    type: String,
    default: "",
  },
  dressCode: {
    type: String,
    default: "",
  },
  tips: {
    type: String,
    default: "",
  },
  extra: {
    type: String,
    default: "",
  },
  banner: {
    type: String,
    default: "",
  },
  campusImage: {
    type: String,
    default: "",
  },
  dressCodeImage: {
    type: String,
    default: "",
  },
  groups: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
    },
  ],
  menuItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MenuItem",
    },
  ],
});

eventSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret, options) {
    delete ret._id;
  },
});


export const EventModel = mongoose.model("Event", eventSchema);
