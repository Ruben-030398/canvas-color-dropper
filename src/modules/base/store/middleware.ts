import app from '@/app';
import { BaseActionTypes } from '@/modules/base/store/action-types';
import { RootState } from '@/store';
import { Actions } from '@/store/actions';
import { MiddlewareAPI, Dispatch } from 'redux';

export const baseMiddleware =
  (api: MiddlewareAPI<Dispatch, RootState>) =>
  (next: Dispatch<Actions>) =>
  (action: Actions) => {
    console.log(api, 'api');
    
    if (action.type === BaseActionTypes.IMAGE_UPLOADED) {
      app.renderable = true
    }

    next(action);
};