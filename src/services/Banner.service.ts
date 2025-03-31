import SecondaryDB from '../config/database.secondary';
import { IBannerSettings } from '../types/banner';

const db = SecondaryDB.getInstance();
const BannerSetting = db.getCollection('BannerSettings');

class BannerService {
  constructor() {}
  async getBannerSettings(): Promise<IBannerSettings> {
    return BannerSetting.findOne({}) as any;
  }
  async updateBannerSettings(text: string, color: string): Promise<IBannerSettings> {
    const updateObject: any = {};

    if (text) updateObject['text'] = text;
    if (color) updateObject['color'] = color;

    return (await BannerSetting.updateMany({}, { $set: updateObject })) as any;
  }
}

export default new BannerService();
