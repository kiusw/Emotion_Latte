const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    room: { type: String, required: true },
    members: [{
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      userName: { type: String }
    }],
    activeMembers: [{
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      userName: { type: String }
    }],
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  }
);

module.exports = mongoose.model("Room", roomSchema);
