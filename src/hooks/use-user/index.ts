import { useEffect, useState } from "react";;
import AsyncStorage from "@react-native-community/async-storage";
interface User {
    id: number;
    elorank: number;
    facebookId: string;
    name: string;
    avatar: string;
    win: number;
    lose: number;
}

const useCurrentUser = (): User => {
  const [user, setUser] = useState<User|any>({id: 0,
    elorank: 0,
    facebookId: "string",
    name: "string",
    avatar: "string",
    win: 0,
    lose: 0});
  const getUser = async () =>{
    console.log('----------------------set------------')
    let userFromDevice:User = JSON.parse(await AsyncStorage.getItem("user"));
    console.log("show : "+ JSON.stringify(userFromDevice))
    setUser((prevState:User) => {
        return { ...prevState, ...userFromDevice };
      });
  }
  useEffect( () => {
    getUser()
  }, []);
  
  return user;
};

export default useCurrentUser;
