import axios from "axios"


const AfecterRapport = async (data, token)=>{
    
    console.log(data)
  const config = {
      headers:{
          Authorization : `Bearer ${token}`,
      },
  }
  const response = await axios.post("/espaceAgent/Inspection/EnregistrerRapport",data,config)
  return response.data
}



const RapportService = {
    AfecterRapport
}


export default RapportService