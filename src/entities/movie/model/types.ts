import {IContent, IPreview} from "@/entities/common";

export interface IMovie extends IPreview{
  time: string;
  trailerUrl: string;
  screenshotUrls: string[];
  screenshotPath: string[];
  content: IContent[];
}