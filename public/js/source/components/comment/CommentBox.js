const CommentBox = React.createClass({
    getInitialState() {
        return { data: [] };
    },

    loadCommentsFromServer() {
        $.ajax({
            url: `/posts/${this.props.flightNo}`,
            dataType: 'json',
            cache: false,
            success: (data) => { this.setState({ data }); },
            error: (xhr, status, err) => {
                console.error(status, err.toString());
            }
        });
    },

    handleCommentSubmit(comment) {
        comment.flightId = this.props.flightNo;
        $.ajax({
            url: "/posts",
            dataType: 'html',
            type: 'POST',
            data: comment,
            success: () => { this.loadCommentsFromServer(); },
            error: (xhr, status, err) => {
                console.error(status, err.toString());
            }
        });
    },

    componentDidMount() {
        this.loadCommentsFromServer();
    },

    render() {
        return (
            <div className="commentBox">
                <p>What our users say about this flight:</p>
                <CommentList comments={this.state.data} />
                <CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)} />
            </div>
        );
    }
});
