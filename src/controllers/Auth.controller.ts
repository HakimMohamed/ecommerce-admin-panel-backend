import { NextFunction, Request, Response } from 'express';
import { LoginDto, LogoutDto, VerifyOtpDto } from '../dtos/auth.dto';
import {
  AuthDataResponse,
  GetUserResponse,
  LogOutResponse,
  VerifyOtpResponse,
} from '../types/auth';
import AuthService from '../services/Auth.service';
import bcrypt from 'bcryptjs';

export async function getUser(
  req: Request,
  res: Response<GetUserResponse>,
  next: NextFunction
): Promise<void> {
  const userId = req.user?.userId!;

  try {
    const existingUser = await AuthService.getUserById(userId);

    res.status(200).send({
      message: `User fetched successfully.`,
      data: existingUser,
      success: true,
    });
  } catch (error: any) {
    next(error);
  }
}

export async function verifyOtp(
  req: Request<{}, {}, VerifyOtpDto>,
  res: Response<VerifyOtpResponse>,
  next: NextFunction
): Promise<void> {
  const { email, otp } = req.body;
  try {
    const user = await AuthService.getUserByEmail(email);

    if (!user) {
      res.status(404).send({
        message: `No user found with email ${email}.`,
        data: null,
        success: true,
      });
      return;
    }

    const otpDoc = await AuthService.getUserOtpByDate({ email });

    if (!otpDoc || (otpDoc && otpDoc.trials >= 3)) {
      res.status(410).send({
        message: 'OTP expired.',
        success: false,
        data: null,
      });
      return;
    }

    const isMatch = await bcrypt.compare(otp, otpDoc.otp);

    if (!isMatch) {
      await AuthService.increaseOtpAttempts(otpDoc._id.toString());
      res.status(403).send({
        message: 'Invalid OTP.',
        success: false,
        data: null,
      });
      return;
    }

    const { refreshToken, accessToken } = AuthService.generateTokens(user._id.toString(), email);

    await Promise.all([AuthService.verifyUserOtp(otpDoc._id)]);

    res.status(200).send({
      message: 'Email verified successfully.',
      data: {
        refreshToken,
        accessToken,
        user,
      },
      success: true,
    });
  } catch (error: any) {
    next(error);
  }
}

export async function login(
  req: Request<{}, {}, LoginDto>,
  res: Response<AuthDataResponse>,
  next: NextFunction
): Promise<void> {
  const { email, password } = req.body;

  try {
    const user = await AuthService.getUserByEmail(email);
    if (!user) {
      res.status(401).send({
        message: 'Either email or password is incorrect.',
        data: null,
        success: false,
      });
      return;
    }

    const isPasswordValid = await AuthService.validateUser(user, password);
    if (!isPasswordValid) {
      res.status(401).send({
        message: 'Either email or password is incorrect.',
        data: null,
        success: false,
      });
      return;
    }

    await AuthService.sendOtp(email);

    res.status(200).send({
      message: `Otp sent to ${email}.`,
      data: null,
      success: true,
    });
  } catch (error: any) {
    if (error.message === 'Blocked For 10 minutes due to multiple failed attempts.') {
      res.status(403).send({
        message: error.message,
        success: false,
        data: null,
      });
      return;
    }
    next(error);
  }
}

export async function logout(
  req: Request<{}, {}, LogoutDto>,
  res: Response<LogOutResponse>,
  next: NextFunction
) {
  try {
    res.status(200).send({
      message: 'Logout successful',
      data: null,
      success: true,
    });
  } catch (error) {
    next(error);
  }
}
