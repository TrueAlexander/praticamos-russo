import mongoose, { Schema, Document, Model } from "mongoose"

export interface ISyllableExercise extends Document {
  syllable: string
  audioUrl: string
  options: string[]
  correctOption: string
  variation?: "cv" | "vc" | "cvc"
  createdAt?: Date
  updatedAt?: Date
}

const syllableExerciseSchema = new Schema(
  {
    syllable: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
    audioUrl: {
      type: String,
      required: true,
    },
    options: {
      type: [String],
      required: true,
      validate: {
        validator: function (val: string[]) {
          return val.length === 4
        },
        message: "Exactly 4 options are required."
      },
    },
    correctOption: {
      type: String,
      required: true,
      validate: {
        validator: function (this: any, val: string) {
          return this.options.includes(val)
        },
        message: "correctOption must be one of the options.",
      },
    },
    variation: {
      type: String,
      enum: ["cv" , "vc" , "cvc"],
      default: "cv",
    },
  },
  { timestamps: true }
)

export default mongoose.models.SyllableExercise as Model<ISyllableExercise> ||
  mongoose.model<ISyllableExercise>("SyllableExercise", syllableExerciseSchema)
