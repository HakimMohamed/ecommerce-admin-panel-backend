import { NextFunction, Request, Response } from 'express';
import bannerService from '../services/Banner.service';

export async function getBannerSettings(
  req: Request<any>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { text, color } = await bannerService.getBannerSettings();

    res.status(200).json({
      message: 'Image uploaded successfully',
      data: {
        text,
        color,
      },
      success: true,
    });
  } catch (error: any) {
    next(error);
  }
}

export async function updateBannerSettings(
  req: Request<any>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    await bannerService.updateBannerSettings(req.body.text, req.body.color);

    res.status(200).json({
      message: 'Image uploaded successfully',
      data: '',
      success: true,
    });
  } catch (error: any) {
    next(error);
  }
}
