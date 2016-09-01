const baseUrl = 'https://zweicoder.me/14words';

export function fetchEncoded(address) {
  return postJson(`${baseUrl}/encode`, { query: address })
    .then((res)=> {
      return res.result
    })
}

export function fetchDecoded(sentence) {
  return postJson(`${baseUrl}/decode`, { query: sentence })
    .then((res)=> {
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
        return null;
      }
      return res.json()
    })
}