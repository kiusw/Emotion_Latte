const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mariadb_id: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    online: {
        type: Boolean,
        default: false
    },
    socketId: {
        type: String,
        default: null
    },
    room: {
        type: mongoose.Schema.ObjectId,
        ref: "Room",
        default: null
    }
});

module.exports = mongoose.model("User", userSchema);