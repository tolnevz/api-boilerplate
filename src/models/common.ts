export interface PageServerResponse<T> {
  total: number;
  count: number;
  offset: number;
  limit: number;
  items: T;
}

export interface ServerError {
  ok: boolean;
  status: number;
  statusText: string;
  errorCode: string;
  errorMessage: string;
}

export interface ImageDetails {
  url: string;
  width: number;
  height: number;
}

export interface Translations {
  [property: string]: string;
}
export interface Message {
  type: string;
  text: string;
}

export type Payload = { [key: string]: number | string | Date | object | null };
