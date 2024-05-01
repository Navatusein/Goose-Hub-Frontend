import {IPreview} from "@/entities/common";

export interface IMovie extends IPreview{
  time: string;
  trailerUrl: string;
  screenshotUrls: string[];
  screenshotPath: string[];
  contentPath?: string;
  contentUrl?: string;
}