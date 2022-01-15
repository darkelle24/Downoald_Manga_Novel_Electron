import SiteManga from './../../models/siteModels';
import { existsSync, readdirSync } from 'fs';
import { join } from 'path';

export async function loadAllSite(siteFolderPath: string): Promise<SiteManga[]> {
  if (existsSync(siteFolderPath)) {
    return Promise.all(readdirSync(siteFolderPath).map(file => {
      return import(join(siteFolderPath, file)).then((result: any) => {
        return new result.default()
      })
    }))
  } else {
    return []
  }
}
