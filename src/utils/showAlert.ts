import alertify from "alertifyjs";
import { AlertifyStatusEnum } from '../types/types';
alertify.set('notifier', 'position', 'bottom-left');

export const showAlert = (status: AlertifyStatusEnum, text: string) => {	
	alertify[status](text)
}

export const alert = (payload: string) => {
    showAlert(AlertifyStatusEnum.success,  payload);
}