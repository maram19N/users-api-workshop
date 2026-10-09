function validatePassword(password) {
  const passwordRegrex = /^[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegrex.test(password);
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

module.exports = { validatePassword, validateEmail };       