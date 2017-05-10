import React, { Component } from 'react';

class Comment extends Component {
  render() {
    let comment = this.props.comment;
    return (
      <div className="comment">
        <p className="commentText">
          {comment.text}
        </p>
        <p className="commentTime">
          {comment.time}
        </p>
        <p className="commentAuthor">
          {comment.author}
        </p>
      </div>
    );
  }
}

export default Comment;