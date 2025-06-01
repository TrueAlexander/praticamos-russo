import mongoose from "mongoose"

const connect = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO as string)
    console.log("Connected to DB successfully")
  } catch (error) {
    console.error("Connection to DB failed!", error)
    throw new Error("Connection to DB failed!")
  }
}

export default connect