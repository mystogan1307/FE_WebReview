import requestHelper from "../helpers/request.helper";
import { appConfig } from "../configs/app.config";

export default class CommentApi {
  static getCommentsByProductId(params) {
    return requestHelper.get(
      `${appConfig.apiUrl}/comment/product/${params.productId}`,
      params
    );
  }

  static AddComment(comment) {
    return requestHelper.post(`${appConfig.apiUrl}/comment`, comment);
  }

  static SentimentAnalysis(content) {
    return requestHelper.post(`${appConfig.apiAnalysis}/api/analysis`, {
      comments: [content],
    });
  }
}
