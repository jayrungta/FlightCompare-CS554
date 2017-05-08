import React, { Component } from 'react';
import Comment from '../../components/Comment';

class CommentList extends Component {
    render() {
        const commentNodes = this.props.comments.map((comment) => {
            return (
                <Comment comment={comment} />
            );
        })
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
}

export default CommentList;