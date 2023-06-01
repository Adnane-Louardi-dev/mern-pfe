import axios from 'axios'

// register agent 
const register= async (userData)=>{
   
    const response = await axios.post('/espaceAgent/Admin/register',userData);

    if(response.data) {
        localStorage.setItem('Agentuser',JSON.stringify(response.data))
    }
    return response.data ; 
}
// login 
const login= async (userData)=>{
    const response = await axios.post('/espaceAgent/login',userData);

    if(response.data) {
        localStorage.setItem('Agentuser',JSON.stringify(response.data))
    }
    return response.data ; 
}


// logout 

const logout = ()=>{
    localStorage.removeItem('Agentuser')
}

const authService = {
    register , 
    logout , 
    login
}

export default authService 