export const validateRegisterInput = (
  username,
  email,
  password,
  confirmPasword
) => {
  const errors = {}
  if (username.trim() === '') {
    errors.username = 'Username must not be empty'
  }
  if (email.trim() === '') {
    errors.email = 'Username must not be empty'
  } else {
    const regex =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
    if (!email.match(regex))
      errors.email = 'Email must be a valid email address!'
  }

  if (password.trim === '') {
    error.password = 'Password must not be empty'
  } else if (password !== confirmPasword) {
    errors.confirmPasword = 'Passwords must match!'
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  }
}

export const validateLoginInput = (username, passowrd) => {
  const errors = {}
  if (username.trim() === '') {
    errors.username = 'Username must not be empty'
  }
  if (passowrd.trim() === '') {
    errors.username = 'Password must not be empty'
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  }
}
