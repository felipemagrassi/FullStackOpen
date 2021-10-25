const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
  },
  passwordHash: {
    type: String,
    required: true,
    minlength: 5,
  },
  favoriteGenre: {
    type: String,
    required: true,
  },
});

schema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.passwordHash;
  },
});

module.exports = mongoose.model("User", schema);
