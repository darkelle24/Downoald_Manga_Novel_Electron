import { Page } from 'puppeteer-core';
import { MangaInfo, SiteManga, UrlOneChapter } from '../../models/siteModels';

export default class manganato extends SiteManga {
  domaine = ['https://manganato.com/', 'https://readmanganato.com/']
  name = 'manganato'

  getAllImageFromUrl(pageOneChapter: Page): void {

  }

  async getAllUrlSingleChapter(pageAllChapter: Page): Promise<UrlOneChapter[]> {
    let toReturn: UrlOneChapter[] = []

    const urlZone = await pageAllChapter.$(".row-content-chapter")
    if (urlZone) {
      for (const url of (await urlZone.$$(".a-h"))) {
        let urlOneChapter: UrlOneChapter = { url: '', chapterNumber: 0 }

        let info = await url.$(".chapter-name")
        if (info) {
          let name = await info.evaluate(el => el.textContent)

          if (name) {
            let nameNumber = name.split(':')
            if (nameNumber.length > 1) {
              urlOneChapter.name = nameNumber[1].trim()
            }
            const temp = nameNumber[0].split(' ')
            urlOneChapter.chapterNumber = Number(temp[temp.length - 1])
          }

          const url = await info.evaluate(el => el.getAttribute('href'))
          if (url) {
            urlOneChapter.url = url
          }
        }

        info = await url.$(".chapter-time")
        if (info) {
          const date = await info.evaluate(el => el.getAttribute('title'))
          if (date) {
            urlOneChapter.date = new Date(date)
          }
        }

        toReturn.push(urlOneChapter)
      }
    }
    return toReturn
  }

  async getInfoManga(pageAllChapter: Page): Promise<MangaInfo> {
    let toReturn: any = { alternativeName: [], authors: [], genre: [] }

    // iconUrl
    const imageUrl = await pageAllChapter.$(".info-image .img-loading")
    let info = await imageUrl?.evaluate(el => el.getAttribute('src'))
    toReturn.iconUrl = info

    const infoZone = await pageAllChapter.$(".story-info-right")
    if (infoZone) {
      toReturn.name = await (await infoZone.$("h1"))?.evaluate(el => el.textContent)

      const allInfo = await (await infoZone.$("tbody").then(async (result: any) => {
        return await result.$$("tr")
      }))

      // Alternative Name
      for (const alternative of (await allInfo[0].$$(".table-value h2"))) {
        const array = await alternative.evaluate((el: { textContent: string; }) => {
          let name: string[] = el.textContent.split(";")
          return name.map((name: string) => name.trim())
        })
        toReturn.alternativeName = toReturn.alternativeName.concat(array)
      }

      // Author
      for (const alternative of (await allInfo[1].$$(".table-value a"))) {
        const array = await alternative.evaluate((el: { textContent: string; }) => {
          return el.textContent.trim()
        })
        toReturn.authors.push(array)
      }

      // Status
      let status = await allInfo[2].$(".table-value")
      status = await status.evaluate((el: { textContent: string; }) => {
        return el.textContent.trim()
      })
      toReturn.status = status

      // Genre
      for (const alternative of (await allInfo[3].$$(".table-value a"))) {
        const array = await alternative.evaluate((el: { textContent: string; }) => {
          return el.textContent.trim()
        })
        toReturn.genre.push(array)
      }

    }
    return toReturn
  }
}
