import {configureStore} from '@reduxjs/toolkit';
import appConfigReducer from './slice/appconfigSlice';

export default configureStore({
    reducer:{
        appConfigReducer,
        
    }
})