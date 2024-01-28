import app from '@/app';
import { BaseActions } from '@/modules/base/store/action-types';
import { Actions } from '@/store/actions';
import { Dispatch, MiddlewareAPI } from 'redux';

export const baseMiddleware =
  (_: MiddlewareAPI) =>
    (next: Dispatch<Actions>) =>
      (action: Actions) => {
        if (action.type === BaseActions.IMAGE_UPLOADED) {
          app.renderable = true;
        }

        next(action);
      };

