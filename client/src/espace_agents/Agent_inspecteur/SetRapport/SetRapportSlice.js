import {createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import RapportService from './SetRapportService'



const initialState = {
    demande:[],
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:''

}


// put date de commission et instructeurs 
export const AffRap = createAsyncThunk('/espaceAgent/Inspection/EnregistrerRapport',
async(data,thunkAPI)=>{
    
    try {
        console.log(data)
        const token = thunkAPI.getState().auth.Agentuser.token
        return await RapportService.AfecterRapport( data,  token)
        
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toSting()
        return thunkAPI.rejectWithValue(message)
    }
})



export const desinger_dateSlice = createSlice({
    name:'AffecterRap',
    initialState,
    reducers: {
        reset_desinger_date:(state)=> {
           state.demande=[],
           state.isError=false,
           state.isSuccess=false,
           state.isLoading=false,
           state.message=''
       
       }
    }, extraReducers:(builder)=>{
        builder
        .addCase(AffRap.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(AffRap.fulfilled, (state,action)=>{
            state.isLoading = false ,
            state.isSuccess = true 
            
        })
        .addCase(AffRap.rejected,(state,action)=>{
            state.isLoading = false ,
            state.isError = true ,
            state.message = action.payload 
           
        })
       
       
     }
})

export const {reset_desinger_date} = desinger_dateSlice.actions
export default desinger_dateSlice.reducer