import requestHelper from "../helpers/request.helper";
import { appConfig } from "../configs/app.config";

export default class LabelApi{
    static getLabel(params){
        return requestHelper.get(`${appConfig.apiUrl}/label`, params);
    }

    static addLabel(newLabel){
        return requestHelper.post(`${appConfig.apiUrl}/label`, newLabel);
    }

    static updateLabel(label){
        return requestHelper.put(`${appConfig.apiUrl}/label/${label.id}`, label);
    }

    static deleteLabel(id){
        return requestHelper.put(`${appConfig.apiUrl}/label/delete/${id}`);
    }
}
