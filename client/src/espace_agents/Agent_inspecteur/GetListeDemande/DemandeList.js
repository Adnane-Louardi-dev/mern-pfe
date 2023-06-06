import axios from "axios";

const getDemandes = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(
    "/espaceAgent/Inspection/getDemandes",
    config
  );
  console.log(response.data)
  return response.data;
};

export default getDemandes;
