const CommentForm = React.createClass({
  getInitialState() {
    return { text: '' };
  },

  handleTextChange(e) {
    this.setState({ text: e.target.value });
  },

  handleSubmit(e) {
    e.preventDefault();
    let text = this.state.text.trim();
    if (!text) {
      return;
    }

    $.ajax({
      url: "/login/current",
      dataType: 'json',
      cache: false,
      success: (user) => {
        let newComment = {
          userId: user._id,
          text: text,
          timestamp: (new Date()).toJSON()
        }
        this.props.onCommentSubmit(newComment);
        this.setState({ text: '' });
      },
      error: (xhr, status, err) => {
        console.error(status, err.toString());
      }
    });

  },

  render() {
    return (
      <form className="form-horizontal col-xs-12 commentForm" onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-group">
          <label className="control-label" htmlFor="newCommentText">Add new comment</label>
          <textarea
            id="newCommentText"
            name="newCommentText"
            placeholder="Say something..."
            className="form-control input-md"
            required="true"
            value={this.state.text}
            onChange={this.handleTextChange.bind(this)}
          ></textarea>
        </div>
        <div className="form-group">
          <input className="btn btn-default" type="submit" value="Comment" />
        </div>
      </form>
    )
  }
});
