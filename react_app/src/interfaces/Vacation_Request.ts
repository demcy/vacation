import { ApiResource } from "../utils/types";

export interface Book extends ApiResource {
  book?: string;
  condition?: any;
  title?: string;
  author?: string;
  rating?: number;
}
