import axios from 'axios';
import { FAILURE, REQUEST, SUCCESS } from '../../reducers/action-type.util';
import { HttpRequestStatus } from '../../models/HttpRequestStatus';


export const ACTION_TYPES = {
    SAVE_FORM: 'form/SAVE_FORM',
    RESET: 'form/RESET'
}

const initialState = {
    saveForm: HttpRequestStatus.NOOP,
    data: 0
}

export type FormState = Readonly<typeof initialState>;


export default (state: FormState = initialState, action): FormState => {
    switch (action.type) {
        case REQUEST(ACTION_TYPES.SAVE_FORM):
            return {
                ...state,
                saveForm: HttpRequestStatus.ONGOING
            };
        case FAILURE(ACTION_TYPES.SAVE_FORM):
            return {
                ...initialState,
                saveForm: HttpRequestStatus.ERROR
            };
        case SUCCESS(ACTION_TYPES.SAVE_FORM):
            return {
                ...initialState,
                saveForm: HttpRequestStatus.SUCCESS,
                data: action.payload.data
            };
        case ACTION_TYPES.RESET:
            return {
                ...initialState
            };
        default:
            return state;
    }
};

export const fetchId = (id?: number) => ({
        type: ACTION_TYPES.SAVE_FORM,
        payload: axios.get(`http://localhost:5000/${id}`)
});

export const fetchId2 = (id?: number) => {
    return function(dispatch){
        axios.get(`http://localhost:5000/${id}`)
        .then((response) => {
            dispatch({ type: ACTION_TYPES.SAVE_FORM,
                payload: response.data})
            })
        .catch((err) => {
            dispatch({type:ACTION_TYPES.SAVE_FORM, payload:err});
        })
    }
};

export const reset = () => ({
    type: ACTION_TYPES.RESET
  });
