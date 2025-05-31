import mongoose from "mongoose"

const { Schema } = mongoose

const questionSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
      unique: true,
    },
    correct_answer: {
      type: String,
      required: true,
    },
    answers: {
      type: Array,
      default: [],
    },
    incorrect_answers: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
)

//If the Question collection does not exist create a new one.
export default mongoose.models.Question || mongoose.model("Question", questionSchema)