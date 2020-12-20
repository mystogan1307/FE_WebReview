import React, { Component } from 'react';
import { FormattedDate } from "react-intl";

import { appConfig } from "../../configs/app.config";
import Classify from "./classify"

class Comment extends Component {
    render() {
        const { user, comment} = this.props;
        return (
            <div className={`${this.props.className} mb-4`}>
                <div className="d-flex flex-rơw">
                    <img alt="" className="img-avatar mr-2" style={{borderRadius: "50%", height: "50px", width: "50px"}} src={user.avatar ? `${appConfig.apiAvatar}/${user.avatar}` : `${appConfig.defaultAvatar}`} />
                    <div className="">
                        <div>
                            <b>{user.username}</b>
                        </div>
                        <span><FormattedDate value={comment.createdAt} /></span>
                    </div>
                    <div className="ml-auto">
                        <Classify>{comment.analysis}</Classify>
                    </div>
                </div>
                <div>
                    {comment.content}
                </div>

            </div>
        );
    }
}

export default Comment;