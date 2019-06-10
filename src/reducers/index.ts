import { combineReducers } from 'redux';
import form, { FormState } from './formReducer/formReducer';


/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
    readonly form: FormState;
}

const rootReducer = combineReducers<IRootState>({
    form
});

export default rootReducer;
