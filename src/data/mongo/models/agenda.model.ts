import mongoose from "mongoose";

const agendaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  details: {
    type: String,
  },
  extraData: {
    type: String,
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Event"
  },
  groups: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
    },
  ],
});

agendaSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret, options) {
    delete ret._id;
    delete ret.password;
    ret.startDate = new Date(ret.startDate.getTime() - (6 * 3600000));
    ret.endDate = new Date(ret.endDate.getTime() - (6 * 3600000));
    return ret
  },
});

export const AgendaModel = mongoose.model("Agenda", agendaSchema);
