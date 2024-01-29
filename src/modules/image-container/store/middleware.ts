import { BaseActions } from '@/modules/base/store/action-types';
import { RootState } from '@/store';
import { Actions } from '@/store/actions';
import { MiddlewareAPI, Dispatch } from 'redux';
import { setImageInfo } from './actions';

export const imageUploadedMiddleware =
  (api: MiddlewareAPI<Dispatch, RootState>) =>
  (next: Dispatch<Actions>) =>
  (action: Actions) => {    
    if (action.type === BaseActions.IMAGE_UPLOADED) {
      console.log(URL.createObjectURL(action.payload.file),'URL.createObjectURL(action.payload.file),');
      
      api.dispatch(setImageInfo({
        src: URL.createObjectURL(action.payload.file),
        name: action.payload.file.name
      }))
    }

    next(action);
};