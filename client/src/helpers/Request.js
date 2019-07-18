// const url = "http://localhost:3000/api/flights/"

class Request{


  get(url) {
    return fetch(url)
    .then((res) => res.json());
  }



}


export default Request;
