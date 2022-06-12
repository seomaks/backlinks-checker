import axios from "axios";
import {linksType} from "../state/app-reducer";

const instance = axios.create({
  withCredentials: true
})

// api
export const getStatusAPI = {
  async getRequest(links: linksType) {
    return links.map(link => instance.get(`https://api.allorigins.win/get?url=${link}`)
      .then(res => res
      )
    )
  }
}