import {configureStore} from '@reduxjs/toolkit';

import authReducer from '../features/auth/authSlice';
import  demandeReducer  from '../features/demandes/demandeSlice';
import listReducer from '../features/list_Inspecteur_Instructeur/listSlice'
export const store = configureStore({
    reducer:{
        auth : authReducer , 
        demandes : demandeReducer,
        lists : listReducer ,
    },
})

