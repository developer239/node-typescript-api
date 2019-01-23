import request from 'supertest'
import app from '~/index'

const publicApp = () => request(app.listen())

export default () => ({
  post: (url: string, data?: any) =>
    publicApp()
      .post(url)
      .send(data),
  patch: (url: string, data: any) =>
    publicApp()
      .patch(url)
      .send(data),
  get: (url: string) =>
    publicApp()
      .get(url)
})
