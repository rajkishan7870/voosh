const mongoose = require("mongoose");

const interactionSchema = new mongoose.Schema(
  {
    title: { type: "string", required: true },
    card: {type: "string"},
    description: {type: "string"},
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
  },
  { timestamps: true }
);
const InteractionModel = mongoose.model("Interaction", interactionSchema);

module.exports =  InteractionModel