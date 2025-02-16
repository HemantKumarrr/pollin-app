import mongoose from "mongoose";

const pollSchema = new mongoose.Schema({
  question: String,
  options: [String],
  votes: { type: Map, of: Number },
});

const Poll = mongoose.model("Poll", pollSchema);

export default Poll;
