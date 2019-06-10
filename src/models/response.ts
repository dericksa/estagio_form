import { IDataResponse } from './dataResponse';

export interface IResponse {
  data?: IDataResponse;
  status: number;
}
