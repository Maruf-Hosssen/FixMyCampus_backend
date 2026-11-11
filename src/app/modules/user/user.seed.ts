
import { User } from './user.model'
import { USER_ROLE } from './user.constant'

const seedAdmin = async () => {
  const adminData = {
    name: 'Maruf Hossen',
    email: 'admin@gmail.com',
    password: '000000',
    role: USER_ROLE.ADMIN,
  }

  const existingAdmin = await User.findOne({
    email: adminData.email,
  })

  if (existingAdmin) {
    console.log('Admin already exists!')
    return
  }

  await User.create(adminData)

  console.log('Admin created successfully!')
}

export default seedAdmin
