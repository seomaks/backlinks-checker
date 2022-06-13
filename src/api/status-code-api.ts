import axios from "axios";
import {LinksType} from "../state/app-reducer";

const instance = axios.create({
  withCredentials: true
})

// api
export const getStatusAPI = {
  async getRequest(links: LinksType) {
    return links.map(link => instance.get(`https://api.allorigins.win/get?url=${link}`)
    )
  }
}