import { Page } from 'puppeteer-core';
import SiteManga from '../../models/siteModels';

export default class manganato extends SiteManga {
  domaine = 'https://manganato.com/'
  name = 'manganato'

  getAllUrlSingleChapter(pageAllChapter: Page): void {

  }

  getAllImageFromUrl(pageAllChapter: Page): void {

  }

  getInfoManga(pageAllChapter: Page): void {

  }
}
