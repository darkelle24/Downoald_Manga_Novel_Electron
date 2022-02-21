import { UrlOneChapter } from "models/siteModels"

export enum StatusEnum {
  NOSTART = "NOSTART",
  START = "START",
  ERROR = "ERROR",
  FINISH = "FINISH"
}

export type UrlOneChapterAngular = UrlOneChapter & {
  pourcentage: number,
  status: StatusEnum
}
