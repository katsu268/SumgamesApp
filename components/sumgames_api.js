const BASE_URL = "http://10.250.1.221:8000/"
const sumgames_api = async (url,method="GET",data=null) => {
  try {
    let user_token = "61061372e48a71e94efbf14f9a8d9e5feee951b7";
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