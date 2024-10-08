import { useQuery } from "@tanstack/react-query";
import { api } from "../services/axios";
import { getIdUser } from "../utils/getIdUser";

export interface User{
  id: string;
  name: string;
  fullName: string;
  password: string;
  email: string;
  position: string;
  cpf: string;
  photoUrl: string;
}


export function fetchUserData(){
  const request = useQuery<User>({
    queryKey: ["user"],
    queryFn: async () => {
      const idUser = await getIdUser();
      const response = await api.get(`/accounts/${idUser}`);
      return response.data;
    }
  });

  return request;
}