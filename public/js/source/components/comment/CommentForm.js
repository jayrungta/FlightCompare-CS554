import React, { Component } from 'react';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  handleTextChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const text = this.state.text.trim();
    const time = new Date();
    if (!text) {
      return;
    }
    this.props.onCommentSubmit({ text: text, time: time });
    this.setState({ text: '' });
  }

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
        <input className="btn btn-default" type="submit" value="Comment" />
      </form>
    )
  }
}

export default CommentForm;