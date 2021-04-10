import { AlertifyStatusEnum } from "../types/types";

export const log = (log: string, payload?: any) => {
    if (payload instanceof Array) {
        console.log(log, ...payload);
    } else {
        payload && console.log(log, payload ?? "");
    }
}