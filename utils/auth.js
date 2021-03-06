const jwt = require('jsonwebtoken')

const auth = {
  decode: (req, res, next) => {
    if (!req.headers['authorization']) {
      return res.status(401).json({
        success: 0,
        message: 'No token provided'
      })
    }

    try {
      const token = req.headers.authorization.split(' ')[1] // Bearer <auth-token>
      const decoded = jwt.decode(token, SECRET_KEY)
      req.information = decoded
      return next()
    } catch (error) {
      console.log(error)
      return res.status(401).json({
        success: false,
        message: 'Invalid auth token'
      })
    }
  },
  encode: (req, res, next) => {
    const payload = {
      email: req.body.email,
      password: req.body.pass
    }
    // perform some db operations to check if the user information is
    // correct or not.
    const token = jwt.sign(payload, SECRET_KEY)
    req.token = token
    next()
  }
}

module.exports = auth
