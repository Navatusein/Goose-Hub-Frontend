import {IEpisode, IPreview} from "@/entities/common";

export interface IAnime extends IPreview {
  time: string;
  trailerUrl: string;
  screenshotUrls: string[];
  screenshotPath: string[];
  animeType: AnimeTypeEnum;
  studio: string;
  contentPath?: string;
  contentUrl?: string;
  episodes?: IEpisode[];
}

export enum AnimeTypeEnum {
  special = 1,
  film = 2,
  ova = 3,
  ona = 4,
  tv = 5
}