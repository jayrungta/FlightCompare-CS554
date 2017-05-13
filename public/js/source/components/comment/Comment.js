const Comment = React.createClass({
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
});
