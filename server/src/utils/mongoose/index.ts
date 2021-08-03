import { MONGO_URL } from '@environments'
import mongoose from 'mongoose'
import dbSeed from './../../db-seed'

export const connectMongodb = (): void => {
  mongoose.connect(
    MONGO_URL,
    { useUnifiedTopology: true, useNewUrlParser: true },
    (err) => {
      if (err) {
        console.error('Error when connect to database! ', err)
        return
      }

      console.log('- Database connected!')
      dbSeed()
    }
  )
}
