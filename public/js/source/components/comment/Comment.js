const Comment = React.createClass({
  formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var y = date.getFullYear();
    var dt = m + "/" + d + "/" + y;
    return dt+ "   " +strTime;
  },
  render() {
    let comment = this.props.comment;
    console.log(comment);
    return (
      <div className="panel panel-default comment">
        <p className="commentText">
          {comment.text}
          <br/>
          by {comment.user.name} <small>on {this.formatAMPM(new Date(comment.timestamp))}</small>
        </p>
      </div>
    );
  }
});
