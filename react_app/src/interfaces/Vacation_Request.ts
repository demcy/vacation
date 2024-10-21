import { ApiResource } from "../utils/types";

export interface Vacation_Request extends ApiResource {
  start_date?: string;
  days_number?: number;
  end_date?: string;
  comment?: string;
}
