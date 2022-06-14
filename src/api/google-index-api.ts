import axios from "axios";
import {LinksType} from "../state/app-reducer";

const API_KEY = process.env.REACT_APP_RAPID_API_KEY

const instance = axios.create({
  headers: {
    'x-rapidapi-host': 'google-search3.p.rapidapi.com',
    // @ts-ignore
    'x-rapidapi-key': API_KEY
  }
});

export const searchAPI = {
  async getRequest(links: LinksType, pageSize: number) {
    return links.map(link => instance.get(`${`https://google-search3.p.rapidapi.com/api/v1/search/q=`}${link}&num=${pageSize}`))
      .map(res => res)}
}
