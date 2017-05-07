/*import React, { Component } from 'react';
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
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: (data) => { this.props.actions.showComments(data); },
            error: (xhr, status, err) => {
                console.error(this.props.url, status, err.toString());
            }
        });
    }

    handleCommentSubmit(comment) {
        const comments = this.state.data;
        comment.id = Date.now();
        this.props.actions.addComment(comment);
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: comment,
            success: (data) => { this.props.actions.showComments(data); },
            error: (xhr, status, err) => {
                this.props.actions.showComments(comments)
                console.error(this.props.url, status, err.toString());
            }
        });
    }

    componentDidMount() {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer.bind(this), this.props.pollInterval);
    }

    render() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.props.data} />
                <CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)} />
            </div>
        );
    }
}

export default CommentBox*/