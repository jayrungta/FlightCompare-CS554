import React, { Component } from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import $ from 'jquery';

class CommentBox extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
    }

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
    }

    handleCommentSubmit(comment) {
        let newComment = {
            userId: 0, // TODO
            flightId: this.props.flightNo,
            text: comment.text,
            timestamp: comment.time
        }
        $.ajax({
            url: "/posts",
            dataType: 'json',
            type: 'POST',
            data: newComment,
            success: (data) => { loadCommentsFromServer(); },
            error: (xhr, status, err) => {
                console.error(status, err.toString());
            }
        });
    }

    componentDidMount() {
        this.loadCommentsFromServer();
    }

    render() {
        return (
            <div className="commentBox">
                <p>Comments</p>
                <CommentList comments={this.props.data} />
                <CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)} />
            </div>
        );
    }
}

export default CommentBox;
