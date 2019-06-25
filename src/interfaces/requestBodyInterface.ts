export interface RequestBodyInterface {
  requestType: string;
  successType: string;
  errorType: string;
  route: string;
  payload?: { [key: string]: any };
  options?: {
    method: string;
    body: string;
  };
}
