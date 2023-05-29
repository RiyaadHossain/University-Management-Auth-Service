import mongoose from 'mongoose'
import config from './config'
import app from './app'

mongoose
  .connect(config.MONGODB_URL as string)
  .then(() => console.log('Database connceted successfully 💯'))
  .catch(err => console.log(err))

app.listen(config.PORT, () => {
  console.log(`Application is listening ✅`)
})
