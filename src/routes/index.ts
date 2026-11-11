import { Router } from 'express'
import { userRoute } from '../app/modules/user/user.routes'

const router = Router()
const moduleRoutes = [
   {
    path: '/users',
    route: userRoute,
  },
  
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
