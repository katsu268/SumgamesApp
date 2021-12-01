//アカウント認証用
import * as SecureStore from 'expo-secure-store';

const save = async (key, value) => {
  await SecureStore.setItemAsync(key, value);
}

const getValue = async (key) => {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    return result;
  } else {
    return undefined;
  }
}

const BASE_URL = "http://172.20.10.2:8000/"
const sumgames_api = async (url,method="GET",data=null) => {
  let user_token = getValue("token");
  console.log(user_token);
  //認証トークンがセキュアストアに入っていたとき
  if (user_token !== undefined){
    try {
      if (method === "GET") {
        const response = await fetch(BASE_URL+url, {
          credentials: 'include',
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Token ${user_token}`
          }
        });
        const json = await response.json();
        return json;
      } else if (method === "POST") {
        const response = await fetch(BASE_URL+url, {
          credentials: 'include',
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Token ${user_token}`
          },
          body: JSON.stringify(data)
        });
        const json = await response.json();
        return json;
      }
    } catch (error) {
      console.error(error);
      return ["error"];
    }
  }else{
    //認証トークンがセキュアストアになかった時：ログイン処理
    try {
      const response = await fetch(BASE_URL+url, {
        credentials: 'include',
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const json = await response.json();
      return json;
    } catch (error) {
      console.log("error");
    }
  }
}


export {sumgames_api, save, getValue};