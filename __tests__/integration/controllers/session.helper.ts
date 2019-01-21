import app from '~test/_utils/requestPublic'

export const handleInvalidRequestData = (url: string) =>
  (done: any) => {
    return app()
      .post(url)
      .expect(400, { message: 'Invalid or missing request data.' })
      .end(done)
  }
