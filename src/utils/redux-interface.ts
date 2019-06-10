import { IPage } from '../models/page.model';
import { IResponse } from '../models/response';

export interface IAction {
  type: string;
}

export interface IActionFor<T> extends IAction {
  payload: T;
}

export interface IActionForResponseEntityList<T> extends IAction {
  payload: {
    data: T[];
  };
}

export interface IActionForResponseEntity<T> extends IAction {
  payload: {
    data: T;
    response: any;
  };
}

export interface IActionForPage<T> extends IAction {
  payload: {
    data: IPage<T>;
    response?: IResponse;
  };
}
