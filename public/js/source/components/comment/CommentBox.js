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
            //TODO get comments from this url
            url: "/where/flightNo", // but where?
            dataType: 'json',
            cache: false,
            success: (data) => { this.setState({data}); },
            error: (xhr, status, err) => {
                console.error(status, err.toString());
            }
        });
    }

    handleCommentSubmit(comment) {
        const comments = this.state.data;
        $.ajax({
            url: "/where/flightNo", // and this
            dataType: 'json',
            type: 'POST',
            data: comment,
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
