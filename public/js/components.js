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
        // var element;

        // $.ajax({
        //     type: "POST",
        //     url: "/login/namecheck",
        //     data: { username: this.state.user.username },
        //     success: (bool) => {
        //                             element = $("#username")[0];

        //         if(!bool){
        //              element.setCustomValidity('This username already exists.');
        //             //  return;
        //         }
        //         else{
        //             element.setCustomValidity('');
        //             //  return;
        //         }
        //     },
        //     error: (xhr, status, err) => {
        //         console.error(status, err.toString());
        //     }
        // });

        // if(this.state.user.password != this.state.user.confirmpassword){
        //      element = $("#confirmpassword")[0];
        //     element.setCustomValidity('Passwords dont match.');
        //     // return;
        // }

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

var SearchForm = React.createClass({
    displayName: 'SearchForm',
    componentDidMount: function componentDidMount() {
        ReactDOM.unmountComponentAtNode(document.getElementById('content'));
    },
    render: function render() {
        return React.createElement(
            'p',
            null,
            'Search flight form coming soon!'
        );
    }
});
ReactDOM.render(React.createElement(SearchForm, null), document.getElementById('search'));