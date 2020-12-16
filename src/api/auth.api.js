import requestHelper from "../helpers/request.helper";
import { uploadAvatar } from "../helpers/upload.file.helper";
import { appConfig } from "../configs/app.config";
import { toast } from "react-toastify";

export default class Auth{
    static Login(email, password){
        return requestHelper.post(`${appConfig.apiUrl}/login`, {email, password});
    }

    static CheckLogin(){
        return requestHelper.get(`${appConfig.apiUrl}/profile`);
    }

    static updateProfile(profile){
        return requestHelper.put(`${appConfig.apiUrl}/profile`, profile).then(res=> 
            toast.success("Cập nhật thông tin thành công", {
                position: toast.POSITION.TOP_RIGHT
            })
            );
    }

    static updateAvatar(avatar){
        return uploadAvatar(avatar);
    }

    static updatePassword(params){
        return requestHelper.put(`${appConfig.apiUrl}/password`, params);
    }

    static register(user){
        return requestHelper.post(`${appConfig.apiUrl}/register`, user);
    }
}
