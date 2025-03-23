export interface RegisterDto {
  email: string;
}
export interface CompleteRegisterationDto {
  email: string;
  firstName: string;
  lastName: string;
  otp: string;
  password: string;
}
export interface RequestEmailOTPDto {
  email: string;
}

export interface VerifyOtpDto {
  email: string;
  otp: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RefreshTokenDto {
  refreshToken: string;
}

export interface LogoutDto {
  refreshToken: string;
}
