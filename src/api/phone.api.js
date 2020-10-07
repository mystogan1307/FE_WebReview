import requestHelper from "../helpers/request.helper";
import { uploadFile } from "../helpers/upload.file.helper";
import { appConfig } from "../configs/app.config";

export default class ProductApi{
    static getProducts(params){
        return requestHelper.get(`${appConfig.apiUrl}/product`, params);
    }

    static getProductById(id){
        return requestHelper.get(`${appConfig.apiUrl}/product/${id}`);
    }

    static addPhone(phone){
        return requestHelper.post(`${appConfig.apiUrl}/product`, phone);
    }

    static uploadFile(file){
        return uploadFile(file);
    }

    static updateProductById(id, phone){
        return requestHelper.put(`${appConfig.apiUrl}/product/${id}`, phone)
    }

    static deleteProductById(id){
        return requestHelper.delete(`${appConfig.apiUrl}/product/delete/${id}`);
    }
}
