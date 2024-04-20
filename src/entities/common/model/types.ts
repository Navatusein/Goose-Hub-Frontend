import { AnimeTypeEnum } from "@/entities/anime/model/types";

export interface IPreview {
  id?: string;
  franchiseId?: string;
  dataType: DataTypeEnum;
  contentType: ContentTypeEnum;
  posterPath?: string;
  posterUrl?: string;
  bannerPath?: string;
  bannerUrl?: string;
  name: string;
  description: string;
  genres: string[];
  release?: Date;
  ageRestriction: string;
  country: string;
  status: StatusEnum;
  directedBy: string[];
  studio: string;
}

export interface IQuery {
  page: number;
  pageSize: number;
  genres: string[];
  query?: string;
  yearStart?: number;
  yearEnd?: number;
  contentType?: ContentTypeEnum;
  status?: StatusEnum[];
  animeTypes?: AnimeTypeEnum[];
  sort: SortParamEnum;
}

export interface IEpisode {
  id?: string;
  index: number;
  name?: string;
  content?: IContent[];
}

export interface IContent {
  quality: ContentQuality;
  path: string;
  url: string;
}

export interface IPagination {
  page: number;
  pageSize: number;
  totalCount: number;
  returnedCount: number;
  data: IPreview[];
}

export enum DataTypeEnum {
  movie = 1,
  serial = 2,
  anime = 3
}

export enum ContentTypeEnum {
  movie = 1,
  serial = 2,
  cartoon = 3,
  anime = 4
}

export enum StatusEnum {
  completed = 1,
  announcement = 2,
  ongoing = 3,
  paused = 4
}

export enum SortParamEnum {
  none
}

export enum ContentQuality {
  sd, 
  hd, 
  fullHD
}