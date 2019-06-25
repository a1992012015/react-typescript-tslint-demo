import { RouterState } from 'connected-react-router';
import { Store } from 'redux';
import { PersistPartial } from 'redux-persist';

export interface SagaInterface {
  count: number;
}

export interface RequestInterface {
  [key: string]: object;
}

export interface AuthInterface {
  isSignIn: boolean;
  isLoading: boolean;
  userInfo: {
    id: number;
    idcard_back: string;
    idcard_front: string;
    phone: string;
    roles: string[];
    status: string;
    username: string;
  };
  token: {
    access_token: string;
    token_type: string;
    refresh_token: string;
    expires_in: string;
    scope: string;
    jti: string;
  };
}

export interface ReducersFull {
  auth: AuthInterface & PersistPartial;
  saga: SagaInterface & PersistPartial;
  request: RequestInterface;
  router: RouterState;
}

export interface NowStore extends Store {
  injectedReducers?: object;
}