// get demande en attent de commission

import axios from "axios"

const commission = async (token)=>{
    const config = {
        headers:{
            Authorization : `Bearer ${token}`,
        },
    }
    const response = await axios.get("/espaceAgent/Admin/Commission",config)
    return response.data
}


const inspection = async (token)=>{
    const config = {
        headers:{
            Authorization : `Bearer ${token}`,
        },
    }
    const response = await axios.get("/espaceAgent/Admin/Inspection",config)
    return response.data
}

const demandeService = {
    commission,
    inspection,
}




export default demandeService