export const login = {
  type: 'Object',
  required: true,
  properties: {
    email: { type: 'string', required: true, format: 'email', maxLength: 80 },
    password: { type: 'string', required: true, minLength: 5, maxLength: 80 },
  },
}

export const passwordForgot = {
  type: 'Object',
  required: true,
  properties: {
    email: { type: 'string', required: true, format: 'email', maxLength: 80 },
  },
}

export const passwordReset = {
  type: 'Object',
  required: true,
  properties: {
    token: { type: 'string', required: true, maxLength: 120 },
    password: { type: 'string', required: true,  minLength: 5, maxLength: 80 },
  },
}

export const token = {
  type: 'Object',
  required: true,
  properties: {
    refreshToken: { type: 'string', required: true },
    userId: { type: 'number', required: true },
  },
}

export const jwtToken = {
  type: 'Object',
  required: true,
  properties: {
    jwtToken: { type: 'string', required: true },
  },
}

export default {
  login,
  passwordForgot,
  passwordReset,
  token,
  jwtToken,
}
