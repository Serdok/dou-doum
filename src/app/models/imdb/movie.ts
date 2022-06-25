import {Status} from "./status";
import {Genre} from "./genre";
import {ProductionCompanies} from "./production-companies";
import {ProductionCountries} from "./production-countries";
import {SpokenLanguages} from "./spoken-languages";

export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: object | null;
  budget: number;
  genres: Genre[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompanies[];
  production_countries: ProductionCountries[];
  release_date: string;             // Date
  revenue: number;
  runtime: number | null;
  spoken_languages: SpokenLanguages[];
  status: Status;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
