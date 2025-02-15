//const { body, validationResult } = require('express-validator');
import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

const ValidationRules = () => {
    return [
        // username must be an email
        body('email').isEmail().normalizeEmail(),
        // password must be at least 6 chars long
        body('psswd').isLength({ min: 6 }),
        // username must be an email
        body('firstName').isLength({ max: 25 }).trim().escape(),
        body('lastName').isLength({ max: 25 }).trim().escape(),
    ]
} 

const Validator = (request: Request, response: Response, next: NextFunction) => {
    const errors = validationResult(request)
    if (errors.isEmpty()) {
      return next()
    }
    const extractedErrors: any = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
  
    return response.status(422).json({
      errors: extractedErrors,
    })
}
  
export { ValidationRules, Validator }