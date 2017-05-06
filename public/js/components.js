'use strict';

var LoginForm = React.createClass({
    displayName: 'LoginForm',
    getInitialState: function getInitialState() {
        return {
            errors: "",
            errorFlag: false,
            user: {
                email: '',
                username: '',
                password: '',
                firstname: '',
                lastname: '',
                confirmpassword: ''
            },
            loggedIn: false
        };
    },
    componentDidMount: function componentDidMount() {
        var _this = this;

        $.ajax({
            type: "GET",
            url: "/login/check",
            success: function success(loggedIn) {
                if (loggedIn) {
                    _this.setState({
                        errors: {},
                        user: {
                            email: '',
                            username: '',
                            password: '',
                            firstname: '',
                            lastname: '',
                            confirmpassword: ''
                        },
                        loggedIn: true
                    });
                } else {
                    _this.setState({
                        errors: {},
                        user: {
                            email: '',
                            username: '',
                            password: '',
                            firstname: '',
                            lastname: '',
                            confirmpassword: ''
                        },
                        loggedIn: false
                    });
                }
            },
            error: function error(xhr, status, err) {
                console.error(status, err.toString());
            }
        });
    },
    onRegister: function onRegister(event) {
        var _this2 = this;

        event.preventDefault();
        this.setState({ errors: "", errorFlag: false });
        var newUser = { firstName: this.state.user.firstname, lastName: this.state.user.lastname, username: this.state.user.username, password: this.state.user.password, email: this.state.user.email };
        // console.log(newUser);

        $.ajax({
            type: "POST",
            url: "/login/register",
            data: { user: newUser },
            success: function success(userId) {
                // console.log(userId);
                _this2.setState({
                    errors: {},
                    user: {
                        email: '',
                        username: '',
                        password: '',
                        firstname: '',
                        lastname: '',
                        confirmpassword: ''
                    }
                });
                $(".signin_form").css('opacity', '100');
                $(".signup_form").css('opacity', '0');

                $("#card").flip(false);
            },
            error: function error(xhr, status, err) {
                console.error(status, err.toString());
            }
        });
    },
    onLogin: function onLogin(event) {
        var _this3 = this;

        event.preventDefault();
        $.ajax({
            type: "POST",
            url: "/login",
            data: { username: this.state.user.username, password: this.state.user.password },
            success: function success(user) {
                // console.log(user);
                _this3.setState({
                    errors: {},
                    user: {
                        email: '',
                        username: '',
                        password: '',
                        firstname: '',
                        lastname: '',
                        confirmpassword: ''
                    },
                    loggedIn: true
                });
            },
            error: function error(xhr, status, err) {
                console.error(status, err.toString());
            }
        });
    },
    onChange: function onChange(event) {
        var field = event.target.name;
        var user = this.state.user;
        user[field] = event.target.value;

        this.setState({
            user: user
        });
        var element;
        if (field == "username") {
            $.ajax({
                type: "POST",
                url: "/login/namecheck",
                data: { username: this.state.user.username },
                success: function success(bool) {
                    element = $("#username")[0];
                    if (!bool) {
                        element.setCustomValidity('This username already exists.');
                    } else {
                        element.setCustomValidity('');
                    }
                },
                error: function error(xhr, status, err) {
                    console.error(status, err.toString());
                }
            });
        } else if (field == "confirmpassword" || field == "password") {
            element = $("#confirmpassword")[0];

            if (this.state.user.password != this.state.user.confirmpassword) {
                element.setCustomValidity('Passwords dont match.');
            } else {
                element.setCustomValidity('');
            }
        }
    },
    render: function render() {
        if (this.state.loggedIn) {
            console.log("logged in");
            window.location = "/";
        } else {
            return React.createElement(
                'div',
                { className: 'loginForm' },
                React.createElement('div', { className: 'login-screen' }),
                React.createElement(
                    'div',
                    { className: 'login-center' },
                    React.createElement(
                        'div',
                        { className: 'container min-height' },
                        React.createElement(
                            'div',
                            { className: 'row' },
                            React.createElement(
                                'div',
                                { className: 'col-xs-4 col-md-offset-8' },
                                React.createElement(
                                    'h2',
                                    { className: 'titleText' },
                                    'Flight Compare'
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'login', id: 'card' },
                                    React.createElement(
                                        'div',
                                        { className: 'front signin_form' },
                                        React.createElement(
                                            'p',
                                            null,
                                            'Login To Your Account'
                                        ),
                                        React.createElement(
                                            'form',
                                            { onSubmit: this.onLogin, className: 'login-form' },
                                            React.createElement(
                                                'div',
                                                { className: 'form-group' },
                                                React.createElement(
                                                    'div',
                                                    { className: 'input-group' },
                                                    React.createElement('input', { type: 'text', className: 'form-control', placeholder: 'Type your username', name: 'username', onChange: this.onChange, value: this.state.user.username, required: 'true' }),
                                                    React.createElement(
                                                        'span',
                                                        { className: 'input-group-addon' },
                                                        React.createElement('i', { className: 'glyphicon glyphicon-user' })
                                                    )
                                                )
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'form-group' },
                                                React.createElement(
                                                    'div',
                                                    { className: 'input-group' },
                                                    React.createElement('input', { type: 'password', className: 'form-control', placeholder: 'Type your password', name: 'password', onChange: this.onChange, value: this.state.user.password, required: 'true' }),
                                                    React.createElement(
                                                        'span',
                                                        { className: 'input-group-addon' },
                                                        React.createElement('i', { className: 'glyphicon glyphicon-lock' })
                                                    )
                                                )
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'form-group sign-btn' },
                                                React.createElement('input', { type: 'submit', className: 'btn', value: 'Log in' }),
                                                React.createElement(
                                                    'p',
                                                    null,
                                                    React.createElement(
                                                        'strong',
                                                        null,
                                                        'New to Flight Compare?'
                                                    ),
                                                    React.createElement('br', null),
                                                    React.createElement(
                                                        'a',
                                                        { href: '#', id: 'flip-btn', className: 'signup signup_link' },
                                                        'Sign up for a new account'
                                                    )
                                                )
                                            )
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'back signup_form', style: { opacity: 0 } },
                                        React.createElement(
                                            'p',
                                            null,
                                            'Sign Up for Your New Account'
                                        ),
                                        React.createElement(
                                            'form',
                                            { form: true, action: '/login', onSubmit: this.onRegister, className: 'login-form' },
                                            React.createElement(
                                                'div',
                                                { className: 'form-group' },
                                                React.createElement(
                                                    'div',
                                                    { className: 'input-group' },
                                                    React.createElement('input', { type: 'text', className: 'form-control', placeholder: 'First Name', name: 'firstname', onChange: this.onChange, value: this.state.user.firstname, required: 'true' }),
                                                    React.createElement(
                                                        'span',
                                                        { className: 'input-group-addon' },
                                                        React.createElement('i', { className: 'glyphicon glyphicon-user' })
                                                    )
                                                )
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'form-group' },
                                                React.createElement(
                                                    'div',
                                                    { className: 'input-group' },
                                                    React.createElement('input', { type: 'text', className: 'form-control', placeholder: 'Last Name', name: 'lastname', onChange: this.onChange, value: this.state.user.lastname, required: 'true' }),
                                                    React.createElement(
                                                        'span',
                                                        { className: 'input-group-addon' },
                                                        React.createElement('i', { className: 'glyphicon glyphicon-user' })
                                                    )
                                                )
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'form-group' },
                                                React.createElement(
                                                    'div',
                                                    { className: 'input-group' },
                                                    React.createElement('input', { type: 'text', className: 'form-control', placeholder: 'Username', name: 'username', id: 'username', onChange: this.onChange, value: this.state.user.username, required: 'true' }),
                                                    React.createElement(
                                                        'span',
                                                        { className: 'input-group-addon' },
                                                        React.createElement('i', { className: 'glyphicon glyphicon-user' })
                                                    )
                                                )
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'form-group' },
                                                React.createElement(
                                                    'div',
                                                    { className: 'input-group' },
                                                    React.createElement('input', { type: 'email', className: 'form-control', placeholder: 'Email', name: 'email', onChange: this.onChange, value: this.state.user.email, required: 'true' }),
                                                    React.createElement(
                                                        'span',
                                                        { className: 'input-group-addon' },
                                                        React.createElement('i', { className: 'glyphicon glyphicon-envelope' })
                                                    )
                                                )
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'form-group' },
                                                React.createElement(
                                                    'div',
                                                    { className: 'input-group' },
                                                    React.createElement('input', { type: 'password', className: 'form-control', placeholder: 'Password', name: 'password', onChange: this.onChange, value: this.state.user.password, required: 'true' }),
                                                    React.createElement(
                                                        'span',
                                                        { className: 'input-group-addon' },
                                                        React.createElement('i', { className: 'glyphicon glyphicon-lock' })
                                                    )
                                                )
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'form-group' },
                                                React.createElement(
                                                    'div',
                                                    { className: 'input-group' },
                                                    React.createElement('input', { type: 'password', className: 'form-control', placeholder: 'Confirm Password', name: 'confirmpassword', id: 'confirmpassword', onChange: this.onChange, value: this.state.user.confirmpassword, required: 'true' }),
                                                    React.createElement(
                                                        'span',
                                                        { className: 'input-group-addon' },
                                                        React.createElement('i', { className: 'glyphicon glyphicon-lock' })
                                                    )
                                                )
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'form-group sign-btn' },
                                                React.createElement('input', { type: 'submit', className: 'btn', value: 'Sign up' }),
                                                React.createElement('br', null),
                                                React.createElement('br', null),
                                                React.createElement(
                                                    'p',
                                                    null,
                                                    'Already have an account? ',
                                                    React.createElement(
                                                        'a',
                                                        { href: '#', id: 'unflip-btn', className: 'signup' },
                                                        'Log in'
                                                    )
                                                )
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }
});
// ReactDOM.unmountComponentAtNode(document.getElementById('search'));
ReactDOM.render(React.createElement(LoginForm, null), document.getElementById('content'));
'use strict';

var SearchResults = React.createClass({
    displayName: 'SearchResults',
    getInitialState: function getInitialState() {
        return {
            results: []
        };
    },
    componentWillMount: function componentWillMount() {},
    componentDidMount: function componentDidMount() {},
    componentWillReceiveProps: function componentWillReceiveProps(newProps) {
        this.setState({ results: newProps.results });
    },
    formatAMPM: function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    },
    formatDuration: function formatDuration(duration) {
        var hours = Math.trunc(duration / 60);
        var minutes = duration % 60;
        if (minutes == 0) {
            return hours + "h";
        } else {
            return hours + "h " + minutes + "m";
        }
    },
    render: function render() {
        var _this = this;

        var resultList = this.state.results;
        var results = resultList.map(function (result) {
            return React.createElement(
                'div',
                { className: 'panel panel-primary' },
                React.createElement(
                    'div',
                    { className: 'panel-heading' },
                    React.createElement(
                        'div',
                        { className: 'row' },
                        React.createElement(
                            'div',
                            { className: 'airline col-xs-6' },
                            React.createElement(
                                'p',
                                null,
                                result.airlineName,
                                '     (',
                                result.origin,
                                '-',
                                result.destination,
                                ')'
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'panel-body' },
                    React.createElement(
                        'div',
                        { className: 'row' },
                        React.createElement(
                            'div',
                            { className: 'price col-xs-4' },
                            React.createElement(
                                'p',
                                { style: { "font-weight": "bold" } },
                                '$',
                                result.price.substring(3).toLocaleString('USD', {
                                    style: 'currency',
                                    currency: "USD",
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'time col-xs-4' },
                            React.createElement(
                                'p',
                                null,
                                _this.formatAMPM(new Date(result.departureTime)),
                                ' - ',
                                _this.formatAMPM(new Date(result.arrivalTime))
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'price col-xs-4' },
                            React.createElement(
                                'p',
                                null,
                                _this.formatDuration(result.duration)
                            )
                        )
                    )
                )
            );
        });
        // if (!results) {
        //     results = " ";
        // }
        return React.createElement(
            'div',
            { className: 'searchResults col-xs-12 ' },
            React.createElement('fieldset', null),
            React.createElement(
                'legend',
                null,
                'Results'
            ),
            results
        );
    }
});
'use strict';

var SearchForm = React.createClass({
    displayName: 'SearchForm',
    getInitialState: function getInitialState() {
        return {
            errors: "",
            errorFlag: false,
            query: {
                origin: '',
                destination: '',
                ddate: '',
                adultCount: "1",
                maxPrice: ''
            },
            results: []
        };
    },
    componentWillMount: function componentWillMount() {},
    componentDidMount: function componentDidMount() {
        var _this = this;

        ReactDOM.unmountComponentAtNode(document.getElementById('content'));
        var setMaxPrice = function setMaxPrice(value) {
            _this.state.query.maxPrice = value;
        };

        $('#maxPrice').bootstrapSlider({
            formatter: function formatter(value) {
                setMaxPrice(value);
                $('#maxPriceDisp').text("$" + value);
                return 'Max Price: $' + value;
            }
        });
    },
    onSearch: function onSearch(event) {
        var _this2 = this;

        event.preventDefault();
        this.setState({ errors: "", errorFlag: false });
        var date = void 0;
        if (this.state.ddate) date = this.state.ddate;else date = $("#ddate").val();
        var newQuery = { origin: this.state.query.origin, destination: this.state.query.destination, date: date, adultCount: this.state.query.adultCount, maxPrice: this.state.query.maxPrice };
        $.ajax({
            type: "POST",
            url: "/search",
            data: { query: newQuery },
            success: function success(results) {
                console.log(results);
                _this2.setState({ results: results });
            },
            error: function error(xhr, status, err) {
                console.error(status, err.toString());
            }
        });
    },
    onChange: function onChange(event) {
        var field = event.target.name;
        var query = this.state.query;
        query[field] = event.target.value;

        this.setState({
            query: query
        });
    },
    render: function render() {
        return (
            // <p>Search flight form coming soon!</p>
            React.createElement(
                'div',
                { className: 'searchContainer ' },
                React.createElement(
                    'div',
                    { className: 'panel panel-default' },
                    React.createElement(
                        'div',
                        { className: 'panel-body' },
                        React.createElement(
                            'form',
                            { onSubmit: this.onSearch, className: 'form-horizontal col-xs-12 searchForm' },
                            React.createElement('fieldset', null),
                            React.createElement(
                                'legend',
                                null,
                                'Search Flights'
                            ),
                            React.createElement(
                                'div',
                                { className: 'row' },
                                React.createElement(
                                    'div',
                                    { className: 'form-group inputDiv col-md-4', style: { "margin-left": "10px" } },
                                    React.createElement(
                                        'label',
                                        { className: 'control-label', 'for': 'origin' },
                                        'Origin'
                                    ),
                                    React.createElement('input', { id: 'origin', name: 'origin', type: 'text', placeholder: 'Where are you flying from?', className: 'form-control input-md', required: '', onChange: this.onChange, value: this.state.query.origin })
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'form-group inputDiv col-md-4', style: { "margin-left": "10px" } },
                                    React.createElement(
                                        'label',
                                        { className: 'control-label', 'for': 'destination' },
                                        'Destination'
                                    ),
                                    React.createElement('input', { id: 'destination', name: 'destination', type: 'text', placeholder: 'Where are you flying to?', className: 'form-control input-md', required: '', onChange: this.onChange, value: this.state.query.destination })
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'row' },
                                React.createElement(
                                    'div',
                                    { className: 'form-group inputDiv col-md-4 ', style: { "margin-left": "10px" } },
                                    React.createElement(
                                        'label',
                                        { className: 'control-label', 'for': 'ddate' },
                                        'Departure Date'
                                    ),
                                    React.createElement('input', { id: 'ddate', name: 'ddate', type: 'date', placeholder: 'Select departure date', className: 'form-control input-md', required: '', onChange: this.onChange, value: this.state.query.ddate })
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'form-group inputDiv col-md-2', style: { "margin-left": "10px" } },
                                    React.createElement(
                                        'label',
                                        { className: 'control-label', 'for': 'adultCount' },
                                        'No. of Adults'
                                    ),
                                    React.createElement(
                                        'select',
                                        { id: 'adultCount', name: 'adultCount', className: 'form-control', onChange: this.onChange, value: this.state.query.adultCount },
                                        React.createElement(
                                            'option',
                                            { value: '1' },
                                            '1'
                                        ),
                                        React.createElement(
                                            'option',
                                            { value: '2' },
                                            '2'
                                        ),
                                        React.createElement(
                                            'option',
                                            { value: '3' },
                                            '3'
                                        ),
                                        React.createElement(
                                            'option',
                                            { value: '4' },
                                            '4'
                                        ),
                                        React.createElement(
                                            'option',
                                            { value: '5' },
                                            '5'
                                        ),
                                        React.createElement(
                                            'option',
                                            { value: '6' },
                                            '6'
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'row' },
                                React.createElement(
                                    'div',
                                    { className: 'form-group inputDiv col-md-4 ', style: { "margin-left": "20px" } },
                                    React.createElement(
                                        'label',
                                        { className: 'control-label', 'for': 'maxPrice' },
                                        'Max Price'
                                    ),
                                    React.createElement('input', { id: 'maxPrice', name: 'maxPrice', 'data-slider-id': 'maxPrice', type: 'text', 'data-slider-min': '0', 'data-slider-max': '1000', 'data-slider-step': '1', 'data-slider-value': '0', className: 'form-control input-md', onChange: this.onChange, value: this.state.query.origin }),
                                    React.createElement('help', { className: 'maxPriceDisp', id: 'maxPriceDisp', name: 'maxPriceDisp' })
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'row' },
                                React.createElement(
                                    'div',
                                    { className: 'form-group inputDiv col-md-4', style: { "margin-left": "10px" } },
                                    React.createElement('input', { className: 'btn btn-default', type: 'submit', value: 'Search' })
                                )
                            )
                        )
                    )
                ),
                React.createElement(SearchResults, { results: this.state.results })
            )
        );
    }
});
ReactDOM.render(React.createElement(SearchForm, null), document.getElementById('search'));
"use strict";
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
"use strict";
"use strict";
"use strict";