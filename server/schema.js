const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

var Collection = mongoose.model("Collection", Schema);
module.exports = Collection;
