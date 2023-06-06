import axios from "axios"

const Date_inst = async (data, token)=>{
    
      console.log(data)
    const config = {
        headers:{
            Authorization : `Bearer ${token}`,
        },
    }
    const response = await axios.put("/espaceAgent/Admin/Setcommission",data,config)
    return response.data
}

const Date_insp = async (data, token)=>{
    
    console.log(data)
  const config = {
      headers:{
          Authorization : `Bearer ${token}`,
      },
  }
  const response = await axios.put("/espaceAgent/Admin/Setinspection",data,config)
  return response.data
}



const designer_dateService = {
    Date_inst , 
    Date_insp
}


export default designer_dateService