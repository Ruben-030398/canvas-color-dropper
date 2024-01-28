import { BaseActions } from '@/modules/base/store/action-types';
import { RootState } from '@/store';
import { Actions } from '@/store/actions';
import { MiddlewareAPI, Dispatch } from 'redux';
import { setImageInfo } from './actions';

export const imageUploadedMiddleware =
  (api: MiddlewareAPI<Dispatch, RootState>) =>
  (next: Dispatch<Actions>) =>
  (action: Actions) => {
    console.log(api, 'api');
    
    if (action.type === BaseActions.IMAGE_UPLOADED) {
      console.log(action.payload.file);

      api.dispatch(setImageInfo({
        src: URL.createObjectURL(action.payload.file),
        name: action.payload.file.name
      }))
    }

    next(action);
};