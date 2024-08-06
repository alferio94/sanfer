import mongoose from "mongoose";

const speakerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  specialty: {
    type: String,
    default: "",
  },
  presentation: {
    type: String,
    default: "",
  },
  extra: {
    type: String,
    default: "",
  },
  speakerPhoto: {
    type: String,
    default: "",
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  },
});

speakerSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret, options) {
    delete ret._id;
  },
});

export const SpeakerModel = mongoose.model("Speaker", speakerSchema);
