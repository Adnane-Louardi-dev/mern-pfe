import {configureStore} from '@reduxjs/toolkit';

import authReducer from '../features/auth/authSlice';
import  demandeReducer  from '../features/demandes/demandeSlice';
import listReducer from '../features/list_Inspecteur_Instructeur/listSlice'
import desinger_dateSliceReducer from '../features/designer_date/designer_dateSlice'
import ListeDemandeAttInspectionReducer from '../Agent_inspecteur/GetListeDemande/DemandeInspectionSlice'
export const store = configureStore({
    reducer:{
        auth : authReducer , 
        demandes : demandeReducer,
        lists : listReducer ,
        desinger_date : desinger_dateSliceReducer,
        ListeDemandeAttInspection:ListeDemandeAttInspectionReducer

    },
})

