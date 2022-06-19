import axios from "axios";
import {EntitiesType} from "../state/app-reducer";

const instance = axios.create({
  withCredentials: true
})

// api
export const getStatusAPI = {
  async getRequest(links: EntitiesType) {
    return links.map(link => instance.get(`https://api.allorigins.win/get?url=${link}`)
    )
  }
}