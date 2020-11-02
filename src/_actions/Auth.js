
// export const setRequestConfig = (method='GET', body = {}, contentType='application/json') => {
//    return  {
//       method: 'POST', // *GET, POST, PUT, DELETE, etc.
//       mode: 'cors', // no-cors, *cors, same-origin
//       cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//       credentials: 'same-origin', // include, *same-origin, omit
//       headers: {
//         'Content-Type': 'application/json'
//         // 'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       redirect: 'follow', // manual, *follow, error
//       referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//       //body: JSON.stringify(payload) // body data type must match "Content-Type" header
//     }
// }

export const loginSME = payload => dispatch => {
  const url = `https://shopover.herokuapp.com/api/collections`;

  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  } ).then(response => {
    if (response.ok) {
      return response.json();
    }

    console.log('Response was not successful', response)
  }).then(data => {
    console.log('Data her', data)

  }).catch(e => {
    console.log('Error')
  })
}