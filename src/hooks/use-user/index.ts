import { useEffect, useState } from "react";;
import AsyncStorage from "@react-native-community/async-storage";
interface User {
    id: number;
    elorank: number;
    facebookId: string;
    name: string;
    avatar: string;
}
interface Output {
  user: User
}

const useCurrentUser = (): Output => {
  const [user, setUser] = useState({});
  const getUser = async () =>{
    let userFromDevice:User = JSON.parse(await AsyncStorage.getItem("user"));
    setUser((prevState:any) => {
        return { ...prevState, ...userFromDevice };
      });
    setUser(userFromDevice);
  }
  useEffect( () => {
    return async () => {
        await getUser()
      }
  }, []);

  return { user };
};

export default useCurrentUser;
