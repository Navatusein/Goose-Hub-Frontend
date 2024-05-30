import {IEpisode, IPreview} from "@/entities/common";

export interface IAnime extends IPreview {
  time: string;
  trailerUrl: string;
  screenshotUrls: string[];
  screenshotPath: string[];
  animeType: AnimeTypeEnum;
  contentPath?: string;
  contentUrl?: string;
  episodesCount?: string;
  nextEpisodeDate?: string;
  episodes?: IEpisode[];
  studio: string;
}

export enum AnimeTypeEnum {
  special = 1,
  film = 2,
  ova = 3,
  ona = 4,
  tv = 5
}