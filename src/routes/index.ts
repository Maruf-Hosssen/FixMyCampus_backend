import { Router } from 'express'
import { userRoute } from '../app/modules/user/user.routes'
import { AuthRoutes } from '../app/modules/auth/auth.routes'

const router = Router()
const moduleRoutes = [
   {
    path: '/users',
    route: userRoute,
  },
  {
    path:'/users',
    route:AuthRoutes
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
