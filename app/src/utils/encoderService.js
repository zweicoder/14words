const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://zweicoder.me/14words';

export function fetchEncoded(address, mode) {
  return postJson(`${baseUrl}/encode`, { query: address, mode})
    .then((res)=> {
      if (res.error) {
        throw res.error
      }
      return res.result
    })
}

export function fetchDecoded(sentence, mode) {
  return postJson(`${baseUrl}/decode`, { query: sentence, mode })
    .then((res)=> {
      if (res.error) {
        throw res.error
      }
      return res.result
    })
}

function postJson(url, json) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(json)
  })
    .then((res)=> {
      if (!res.ok) {
        console.error(res);
      }
      return res.json()
    })
}