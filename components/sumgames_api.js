const sumgames_api = async (url,method="GET",data=null) => {
  try {
    let user_token = "316d69a061b543f8bb823a89797299995496fc5a";
    if (method === "GET") {
      const response = await fetch(url, {
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
      const response = await fetch(url, {
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