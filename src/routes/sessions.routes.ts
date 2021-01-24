import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService'

const sessionsRouter = Router();

interface User {
  user: {
    password?: string;
  },
  token: string;
}

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body

  const authenticateUser = new AuthenticateUserService();

  const { user, token }: User = await authenticateUser.execute({
    email,
    password
  })

  delete user.password

  return response.json({ user, token })
})

export default sessionsRouter

