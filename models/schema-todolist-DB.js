import mongoose from "mongoose";

//Mongoose Item Schema to define the model
const itemSchema = {
  name: {
    type: String,
    required: true,
  },
};

//Mongoose model
const Item = mongoose.model("Item", itemSchema);

export default Item;
