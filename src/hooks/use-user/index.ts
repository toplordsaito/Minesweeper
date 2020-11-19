import { useEffect, useState } from "react";;
import AsyncStorage from "@react-native-community/async-storage";
interface Output {
  user: {
    id: number;
    elorank: number;
    facebookId: string;
    name: string;
    avatar: string;
  };
}

const useCurrentUser = (): Output => {
  const [user, setUser] = useState();
  useEffect( () => {
    const getUser = async () =>{
      let userFromDevice:any = await AsyncStorage.getItem("user");
      userFromDevice = JSON.parse(user);
      setUser((prevState:any) => {
        return { ...prevState, ...userFromDevice };
      });
    }
   getUser()
  }, [user]);

  return { user };
};

export default useCurrentUser;
