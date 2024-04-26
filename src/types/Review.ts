import { ReviewSource } from "../enums/ReviewSource";

export interface Review {
  source: ReviewSource;
  rating: number;
  comment: string;
}
