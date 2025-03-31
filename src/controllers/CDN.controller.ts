import { NextFunction, Request, Response } from 'express';
import S3Uploader from '../services/CDN.service';

export async function uploadImage(
  req: Request<any>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    const uploader = S3Uploader.getInstance();
    const imageUrl = await uploader.uploadImage(req.file.path, req.file.mimetype);

    res.status(200).json({
      message: 'Image uploaded successfully',
      data: imageUrl,
      success: true,
    });
  } catch (error: any) {
    next(error);
  }
}
