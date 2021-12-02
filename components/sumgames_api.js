const BASE_URL = "http://10.250.2.160:8000/"
const sumgames_api = async (url,method="GET",data=null) => {
  try {
    let user_token = "4c580293ddbb0e2edb15dd1c7bacf8ddddcd8f10";
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
    } else {
      const response = await fetch(BASE_URL+url, {
        credentials: 'include',
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Token ${user_token}`
        },
        body: JSON.stringify(data)
      })
      const json = await response.json();
      return json;
    }
    
  } catch (error) {
    console.error(error);
    return ["error"];
  }
}


export default sumgames_api;