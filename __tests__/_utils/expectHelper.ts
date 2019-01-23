export const expectInvalidData = (response: any) => {
  expect(response.body).toEqual({ message: 'Invalid or missing request data.' })
  expect(response.status).toEqual(400)
}

export const expectDefault = (response: any, body: any, status: number) => {
    expect(response.body).toEqual(body)
    expect(response.status).toEqual(status)
  }
