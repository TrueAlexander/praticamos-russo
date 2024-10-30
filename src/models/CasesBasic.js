import mongoose from "mongoose"

const { Schema } = mongoose

const casesBasicSchema = new Schema(
  {
    case: {
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
  }
)

//If the CasesBasic collection does not exist create a new one.
export default mongoose.models.CasesBasic || mongoose.model("CasesBasic", casesBasicSchema)