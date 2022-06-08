import axios from "axios";

const instance = axios.create({
  withCredentials: true
})

// api
export const getStatusAPI = {
  async getRequest(link: string) {
    return instance.get(`https://api.allorigins.win/get?url=${link}`)
      // .then((res) => console.log(res.status))
      // .catch((error) => console.log(error.message))
  }
}