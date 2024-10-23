import { ApiResource } from "../utils/types";

export interface Pagination {
  "first"?: string;
  "previous"?: string;
  "next"?: string;
  "last"?: string;
}

export interface PagedCollection<T> extends ApiResource {
  "@context"?: string;
  "@type"?: string;
  "firstPage"?: string;
  "itemsPerPage"?: number;
  "lastPage"?: string;
  "member"?: T[];
  "nextPage"?: string;
  "search"?: object;
  "totalItems"?: number;
  "view"?: Pagination;
}
