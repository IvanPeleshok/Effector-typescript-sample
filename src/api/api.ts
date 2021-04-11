import Axios, { AxiosResponse } from "axios";

const instance = Axios.create({
  baseURL: 'https://api.github.com/users/',
  headers: {
    "Content-Type": "application/json",
  },
});

export const ReposController = {
  getRepos(name: string) {
    return instance.get<AxiosResponse<any>>(`${name}/repos`);
  }
}