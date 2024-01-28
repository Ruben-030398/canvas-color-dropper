import app from '@/app';
import { BaseActions } from '@/modules/base/store/action-types';
import { Actions } from '@/store/actions';
import { Dispatch, MiddlewareAPI } from 'redux';

export const baseMiddleware =
  (api: MiddlewareAPI) =>
    (next: Dispatch<Actions>) =>
      (action: Actions) => {
        console.log(api, 'api');

        if (action.type === BaseActions.IMAGE_UPLOADED) {
          app.renderable = true;
        }

        next(action);
      };

