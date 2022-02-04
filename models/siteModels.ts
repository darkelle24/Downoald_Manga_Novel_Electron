import { Browser, Page } from "puppeteer-core"

export type MangaInfo = {
  iconUrl: string,
  name: string,
  alternativeName: string[],
  status: string,
  genre: string[],
  authors: string[]
}

export type UrlOneChapter = {
  url: string,
  chapterNumber: number,
  name?: string
  date?: Date
}

export abstract class SiteManga {
  urlAllChapter: string
  urlSingleChapter: string[] = []
  pageAllChapter: Page | undefined = undefined
  pageOneChapter: Page[] = []
  abstract domaine: string[]
  abstract name: string

  constructor(urlAllChapter: string) {
    this.urlAllChapter = urlAllChapter
  }

  async run(puppeteerBrowser: Browser) {
    this.pageAllChapter = await puppeteerBrowser.newPage()
    await this.pageAllChapter.goto(this.urlAllChapter);
  }

  abstract getAllUrlSingleChapter(pageAllChapter: Page): Promise<UrlOneChapter[]>

  abstract getAllImageFromUrl(pageAllChapter: Page): void

  abstract getInfoManga(pageAllChapter: Page): Promise<MangaInfo>
}
