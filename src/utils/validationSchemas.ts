// src/utils/validationSchemas.ts

import { body, param, query } from 'express-validator';

export const loginSchema = [
  body('email')
    .exists({ checkFalsy: true })
    .withMessage('Email is required.')
    .isEmail()
    .withMessage('Email must be a valid email address.')
    .isLength({ max: 256 })
    .withMessage('Email must be at most 256 characters long.'),

  body('password').exists({ checkFalsy: true }).withMessage('Password is required.'),
];
export const requestEmailOTPSchema = [
  body('email')
    .exists({ checkFalsy: true })
    .withMessage('Email is required.')
    .isEmail()
    .withMessage('Email must be a valid email address.')
    .isLength({ max: 256 })
    .withMessage('Email must be at most 256 characters long.'),
];
export const verifyOtpSchema = [
  body('email')
    .exists({ checkFalsy: true })
    .withMessage('Email is required.')
    .isEmail()
    .withMessage('Email must be a valid email address.')
    .isLength({ max: 256 })
    .withMessage('Email must be at most 256 characters long.'),

  body('otp')
    .exists({ checkFalsy: true })
    .withMessage('Otp is required.')
    .isLength({ min: 4, max: 4 })
    .withMessage('Otp must be exactly 4 characters long.'),
];
