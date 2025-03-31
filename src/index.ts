import { NextFunction, Request, Response } from 'express';
import express from 'express';
import { setupMiddlewares } from './middlewares/index';
import dotenv from 'dotenv';
import loadConfig from './config/configLoader';
import connectDB from './config/database';

import fs from 'fs';
import path from 'path';

const tempDir = path.join(__dirname, '../temp');

dotenv.config();

loadConfig();

const app = express();

const PORT = process.env.PORT || 3000;

setupMiddlewares(app);

app.get('/ping', (req: Request, res: Response, next: NextFunction) => {
  res.send('pong');
});

function clearTempFolder() {
  if (!fs.existsSync(tempDir)) return;

  fs.readdir(tempDir, (err, files) => {
    if (err) {
      console.error('Failed to read temp folder:', err);
      return;
    }

    for (const file of files) {
      fs.unlink(path.join(tempDir, file), err => {
        if (err) console.error(`Error deleting ${file}:`, err);
      });
    }

    console.log('✅ Temp folder cleared at startup.');
  });
}

clearTempFolder();

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
