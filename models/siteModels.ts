import { Browser, Page } from "puppeteer-core"

export default abstract class SiteManga {
  urlAllChapter: string
  urlSingleChapter: string[] = []
  pageAllChapter: Page | undefined = undefined
  pageOneChapter: Page[] = []
  abstract domaine: string
  abstract name: string

  constructor(urlAllChapter: string) {
    this.urlAllChapter = urlAllChapter
  }

  async run(puppeteerBrowser: Browser) {
    this.pageAllChapter = await puppeteerBrowser.newPage()
    await this.pageAllChapter.goto(this.urlAllChapter);
  }

  abstract getAllUrlSingleChapter(pageAllChapter: Page): void

  abstract getAllImageFromUrl(pageAllChapter: Page): void

  abstract getInfoManga(pageAllChapter: Page): void
}
