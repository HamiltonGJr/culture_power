import mongoose from 'mongoose'
import 'dotenv/config'

mongoose.connect(process.env.URI as string).then((value) => {
  console.log(`DB connected: Version ${value.version}`)
})

export { mongoose }
