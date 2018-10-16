const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  unitType: { type: String, required: true }
});

module.exports = mongoose.model("Product", ProductSchema);
