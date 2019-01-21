export const signUp = {
  type: 'Object',
  required: true,
  properties: {
    email: { type: 'string', required: true, format: 'email', maxLength: 80 },
    password: { type: 'string', required: true, minLength: 5, maxLength: 80 },
  },
}

export default {
  signUp,
}
