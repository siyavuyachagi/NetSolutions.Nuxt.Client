export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string | string[] | any;
}
