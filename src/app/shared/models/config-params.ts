export interface ConfigParams {
  page?: number;
  limit?: number;
  search?: string;
  field?: Field;
}

export interface Field {
  type: string;
  value: any;
}