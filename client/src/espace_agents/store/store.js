import {configureStore} from '@reduxjs/toolkit';

import authReducer from '../features/auth/authSlice';
import  demandeReducer  from '../features/demandes/demandeSlice';

export const store = configureStore({
    reducer:{
        auth : authReducer , 
        demandes : demandeReducer,
    },
})