const connectedAccount = {
  last4: '',
  token: '',
  userId: '',
  provider: '',
  cardNumber: '',
  cardNickname: '',
  fullNameOnCard: '',
}

const user = {
  fullName: '',
  phone: '',
  address: '',
  isSubscriptionActive: false,
  dateLastSubscriptionCheck: null,
}

const templates = {
  user,
  connectedAccount,
}

export default templates;