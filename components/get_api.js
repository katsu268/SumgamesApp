const BASE_URL = 'http://127.0.0.1:8000/'
let url = BASE_URL+'api/gameitem/'

const sumgames_api = async (method,url,user) => {
    try {
        const response = await fetch(url, {
            method: method, // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            //body: JSON.stringify(data) // 本文のデータ型は "Content-Type" ヘッダーと一致する必要があります
          })
          console.log(response.json());
    } catch (error) {
      console.error(error);
    } finally {
      console.log('done')
    }
    return json.data
}

sumgames_api("GET",url,'a')