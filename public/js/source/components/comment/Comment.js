const Comment = React.createClass({
  timeRender(date) {
    let commentDate = new Date(date);
    let today = new Date();

    if (commentDate.getFullYear() == today.getFullYear() && commentDate.getMonth() == today.getMonth()
      && commentDate.getDate() == today.getDate()) {
      let hours = commentDate.getHours();
      let minutes = commentDate.getMinutes();
      let ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes;
      return hours + ':' + minutes + ' ' + ampm;
    }

    return commentDate.toLocaleDateString('en-US');
  },

  render() {
    let comment = this.props.comment;

    return (
      <div className="comment">
        <p className="commentText">
          {comment.text}
        </p>
        <p className="commentTime text-right">
          <small>{this.timeRender(comment.timestamp)}</small>
        </p>
        <p className="commentAuthor text-right">
          - {comment.user.name}
        </p>
      </div>
    );
  }
});
