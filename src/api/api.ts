import Axios from "axios";

export const instance = Axios.create({
    headers: {
      "Content-Type": "application/json",
    },
})