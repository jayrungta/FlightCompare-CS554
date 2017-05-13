const CommentList = React.createClass({
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
});
