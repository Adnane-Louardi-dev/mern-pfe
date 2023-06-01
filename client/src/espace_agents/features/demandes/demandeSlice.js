import {createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import demandeService from './demandeService'

const initialState = {
    demande:[],
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:''

}

// get demande en attent de commission 
export const demandeCom = createAsyncThunk('espaceAgent/Admin/Commission',
async(_,thunkAPI)=>{
    try {
        const token = thunkAPI.getState().auth.Agentuser.token
        return await demandeService.commission(token)
        
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toSting()
        return thunkAPI.rejectWithValue(message)
    }
})

//get demande en attent d'inspection  demandeInp
export const demandeInsp = createAsyncThunk('espaceAgent/Admin/Inspection',
async(_,thunkAPI)=>{
    try {
        const token = thunkAPI.getState().auth.Agentuser.token
        return await demandeService.inspection(token)
        
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toSting()
        return thunkAPI.rejectWithValue(message)
    }
})


export const demandeSlice = createSlice({
     name:'demande',
     initialState,
     reducers: {
        resetDemandes:(state)=> {
            state.demande=[],
            state.isError=false,
            state.isSuccess=false,
            state.isLoading=false,
            state.message=''
        
        }
     }, 
     extraReducers:(builder)=>{
        builder
        .addCase(demandeCom.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(demandeCom.fulfilled, (state,action)=>{
            state.isLoading = false 
            state.isSuccess = true 
            state.demande = action.payload
        })
        .addCase(demandeCom.rejected,(state,action)=>{
            state.isLoading = false 
            state.isError = true 
            state.message = action.payload 
           
        })
        .addCase(demandeInsp.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(demandeInsp.fulfilled, (state,action)=>{
            state.isLoading = false 
            state.isSuccess = true 
            state.demande = action.payload
        })
        .addCase(demandeInsp.rejected,(state,action)=>{
            state.isLoading = false 
            state.isError = true 
            state.message = action.payload 
           
        })
       
     }
})

export const {resetDemandes} = demandeSlice.actions
export default demandeSlice.reducer