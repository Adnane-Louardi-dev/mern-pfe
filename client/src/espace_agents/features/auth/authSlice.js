import {createSlice , createAsyncThunk} from "@reduxjs/toolkit"
import authService from "./authService"
//get user from localStorage

const Agentuser = JSON.parse(localStorage.getItem('Agentuser'))

const initialState = {
    Agentuser:null ,
    isError:false,
    isSuccess: false ,
    isLoading : false , 
    message : ''
}

// Register user 
export const registerAgent = createAsyncThunk('/espaceAgent/Admin/register',
async(user,thunkAPI)=>{
    try {
        const token = thunkAPI.getState().auth.Agentuser.token
        return await authService.register(user , token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toSting()
        return thunkAPI.rejectWithValue(message)
    }

})

// login user 
export const loginAgent = createAsyncThunk('/espaceAgent/login',
async(user,thunkAPI)=>{
    try {
        
        return await authService.login(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toSting()
        return thunkAPI.rejectWithValue(message)
    }

})



export const logout =createAsyncThunk('Admin/logout' , async()=>{
    await authService.logout()
})

export const authSlice = createSlice({
    name:'auth',
    initialState , 
    reducers: {
        reset : (stat)=>{
            stat.isLoading = false  
            stat.isError = false
            stat.isSuccess = false 
            stat.message = ''
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(registerAgent.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(registerAgent.fulfilled, (state,action)=>{
            state.isLoading = false 
            state.isSuccess = true 
        })
        .addCase(registerAgent.rejected,(state,action)=>{
            state.isLoading = false 
            state.isSuccess = false 
            state.isError = true 
            state.message = action.payload 
            state.Agentuser = null
        })
        .addCase(loginAgent.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(loginAgent.fulfilled, (state,action)=>{
            state.isLoading = false 
            state.isSuccess = true 
            state.Agentuser = action.payload
        })
        .addCase(loginAgent.rejected,(state,action)=>{
            state.isLoading = false 
            state.isSuccess = false 
            state.isError = true 
            state.message = action.payload 
            state.Agentuser = null
        })
        .addCase(logout.fulfilled, (state)=>{
           
            state.Agentuser = null
        })
        
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer