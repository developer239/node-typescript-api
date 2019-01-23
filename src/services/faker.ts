const faker = {
  internet: {
    email: () => 'fake@email.com',
    password: () => 'fakepassword',
  },
  address: {
    city: () => 'fakeCity',
    streetName: () => 'fakeStreet',
  },
  lorem: {
    paragraph: () => 'Lorem ipsum dolor sit amet, omnesque delicatissimi ut qui, ex quo animal mentitum. Ex sea nostro equidem. Ex sit timeam singulis, duo ei libris admodum laboramus. Pro no dicat cotidieque. Habeo tantas tamquam cum ne, sed ne dolor tibique percipitur, utinam atomorum cum ea.Lorem ipsum dolor sit amet, omnesque delicatissimi ut qui, ex quo animal mentitum. Ex sea nostro equidem. Ex sit timeam singulis, duo ei libris admodum laboramus. Pro no dicat cotidieque. Habeo tantas tamquam cum ne, sed ne dolor tibique percipitur, utinam atomorum cum ea.',
  },
  resetPasswordToken: () => 'fakePasswordResetToken'
}

export default faker
