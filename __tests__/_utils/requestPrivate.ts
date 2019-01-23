import request from 'supertest'
import app from '~/index'
import crypto from '~/services/crypto'

const publicApp = () => request(app.listen())

export default () => ({
  post: async (url: string, data?: any) => {
    const accessToken = await crypto.generateAccessToken(1)

    return publicApp()
      .post(url)
      .set({ 'Authorization': `jwt ${accessToken}` })
      .send(data)
  },
  patch: async (url: string, data?: any) => {
    const accessToken = await crypto.generateAccessToken(1)

    return publicApp()
      .patch(url)
      .set({ 'Authorization': `jwt ${accessToken}` })
      .send(data)
  },
  get: async (url: string) => {
    const accessToken = await crypto.generateAccessToken(1)

    return publicApp()
      .get(url)
      .set({ 'Authorization': `jwt ${accessToken}` })
  },
})
