import {createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import listService from './listService'

const initialState = {
    list:[],
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:''

}

// get list des instructeurs 
export const listInstructeurs = createAsyncThunk('espaceAgent/Admin/Commission/listInstructeurs',
async(_,thunkAPI)=>{
    try {
        const token = thunkAPI.getState().auth.Agentuser.token
        return await listService.instructionLi(token)
        
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toSting()
        return thunkAPI.rejectWithValue(message)
    }
})

// get list des inspecteurs 
export const listInspecteurs = createAsyncThunk('espaceAgent/Admin/inspection/listInspecteurs',
async(_,thunkAPI)=>{
    try {
        const token = thunkAPI.getState().auth.Agentuser.token
        return await listService.inspectionLi(token)
        
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toSting()
        return thunkAPI.rejectWithValue(message)
    }
})



export const listSlice = createSlice({
    name:'lists',
    initialState,
    reducers: {
        resetList:(state)=> {
           state.list=[],
           state.isError=false,
           state.isSuccess=false,
           state.isLoading=false,
           state.message=''
       
       }
    }, 
    extraReducers:(builder)=>{
       builder
       .addCase(listInstructeurs.pending,(state)=>{
           state.isLoading=true
       })
       .addCase(listInstructeurs.fulfilled, (state,action)=>{
           state.isLoading = false 
           state.isSuccess = true 
           state.list = action.payload
       })
       .addCase(listInstructeurs.rejected,(state,action)=>{
        state.isLoading = false 
        state.isError = true 
        state.message = action.payload 
       
    })
    .addCase(listInspecteurs.pending,(state)=>{
        state.isLoading=true
    })
    .addCase(listInspecteurs.fulfilled, (state,action)=>{
        state.isLoading = false 
        state.isSuccess = true 
        state.list = action.payload
    })
    .addCase(listInspecteurs.rejected,(state,action)=>{
     state.isLoading = false 
     state.isError = true 
     state.message = action.payload 
    
 })
    
      
    }
})


export const {resetList} = listSlice.actions
export default listSlice.reducer