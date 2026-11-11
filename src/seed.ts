
import mongoose from 'mongoose'

import seedAdmin from './app/modules/user/user.seed'
import config from './app/config'

const seed = async () => {
  try {
    await mongoose.connect(config.database_url as string)

    await seedAdmin()

    console.log('Seeding completed!')
    process.exit(0)
  } catch (error) {
    console.error('Seeding failed:', error)
    process.exit(1)
  }
}

seed()
