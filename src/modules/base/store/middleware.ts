import app from '@/app';
import { BaseActions } from '@/modules/base/store/action-types';
import { RootState } from '@/store';
import { Actions } from '@/store/actions';
import { Dispatch, MiddlewareAPI } from 'redux';

export const baseMiddleware =
  (api: MiddlewareAPI<Dispatch, RootState>) =>
    (next: Dispatch<Actions>) =>
      (action: Actions) => {
        if (action.type === BaseActions.IMAGE_UPLOADED) {
          app.renderable = true;
        }

        if (action.type === BaseActions.DECREASE_LUPA_SCALE) {
          const lupaScale = api.getState().base.lupaScale;

          if (lupaScale - 1 < 1) return;
        }

        if (action.type === BaseActions.INCREASE_LUPA_SCALE) {
          const lupaScale = api.getState().base.lupaScale;

          if (lupaScale + 1 > 10) return;
        }

        next(action);

      };

