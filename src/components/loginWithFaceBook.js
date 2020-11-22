import * as Facebook from "expo-facebook";
export const logInWithFaceBook = async() => {
    Facebook.initializeAsync("1003067720174444");
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile"],
      });
  
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`
        ).then((response) => {
          return response.json();
        });
        return response;
      } else {
        alert(`Facebook Login Error: Cancelled`);
        return null;
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
      return null;
    }
  }