// get demande en attent de commission

import axios from "axios"

const instructionLi = async (token)=>{
    const config = {
        headers:{
            Authorization : `Bearer ${token}`,
        },
    }
    const response = await axios.get("/espaceAgent/Admin/Commission/listInstructeurs",config)
    return response.data
}

const inspectionLi = async (token)=>{
    const config = {
        headers:{
            Authorization : `Bearer ${token}`,
        },
    }
    const response = await axios.get("/espaceAgent/Admin/inspection/listInspecteurs",config)
    return response.data
}



const listService = {
    instructionLi , 
    inspectionLi
    
}




export default listService