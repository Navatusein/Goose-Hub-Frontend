import {IEpisode, IPreview} from "@/entities/common";

export interface ISerial extends IPreview{
  time: string;
  trailerUrl: string;
  screenshotUrls: string[];
  screenshotPath: string[];
  episodesCount?: string;
  nextEpisodeDate?: string;
  seasons: ISeason[];
}

export interface ISeason {
  id?: string;
  name?: string;
  index: number;
  episodes: IEpisode[];
}