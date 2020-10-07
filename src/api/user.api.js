import requestHelper from "../helpers/request.helper";
import { appConfig } from "../configs/app.config";

export default class UserApi{
    static getUser(params){
        return requestHelper.get(`${appConfig.apiUrl}/user`, params);
    }

    static updateUser(user){
        return requestHelper.put(`${appConfig.apiUrl}/user/${user.id}`, user);
    }

}
