const LoginForm = React.createClass({
    getInitialState() {
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

    componentDidMount() {
        $.ajax({
            type: "GET",
            url: "/login/check",
            success: (loggedIn) => {
                if (loggedIn) {
                    this.setState({
                        errors: {},
                        user: {
                            email: '',
                            username: '',
                            password: '',
                            firstname: '',
                            lastname: '',
                            confirmpassword: '',
                        },
                        loggedIn: true
                    });
                }
                else {
                    this.setState({
                        errors: {},
                        user: {
                            email: '',
                            username: '',
                            password: '',
                            firstname: '',
                            lastname: '',
                            confirmpassword: '',
                        },
                        loggedIn: false
                    });
                }
            },
            error: (xhr, status, err) => {
                console.error(status, err.toString());
            }
        })
    },

    onRegister(event) {
        event.preventDefault();
        this.setState({ errors: "", errorFlag: false });
        let newUser = { firstName: this.state.user.firstname, lastName: this.state.user.lastname, username: this.state.user.username, password: this.state.user.password, email: this.state.user.email };
        // console.log(newUser);

        $.ajax({
            type: "POST",
            url: "/login/register",
            data: { user: newUser },
            success: (userId) => {
                // console.log(userId);
                this.setState({
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
            error: (xhr, status, err) => {
                console.error(status, err.toString());
            }
        });
    },
    onLogin(event) {
        event.preventDefault();
        $.ajax({
            type: "POST",
            url: "/login",
            data: { username: this.state.user.username, password: this.state.user.password },
            success: (user) => {
                // console.log(user);
                this.setState({
                    errors: {},
                    user: {
                        email: '',
                        username: '',
                        password: '',
                        firstname: '',
                        lastname: '',
                        confirmpassword: '',
                    },
                    loggedIn: true
                });
            },
            error: (xhr, status, err) => {
                console.error(status, err.toString());
            }
        });
    },
    onChange(event) {
        const field = event.target.name;
        const user = this.state.user;
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
                success: (bool) => {
                    element = $("#username")[0];
                    if (!bool) {
                        element.setCustomValidity('This username already exists.');
                    }
                    else {
                        element.setCustomValidity('');
                    }
                },
                error: (xhr, status, err) => {
                    console.error(status, err.toString());
                }
            });
        }
        else if (field == "confirmpassword" || field == "password") {
            element = $("#confirmpassword")[0];

            if (this.state.user.password != this.state.user.confirmpassword) {
                element.setCustomValidity('Passwords dont match.');
            } else {
                element.setCustomValidity('');

            }
        }
    },
    render() {
        if (this.state.loggedIn) {
            console.log("logged in");
            window.location = "/";
        }
        else {
            return (
                <div className="loginForm">
                    <div className="login-screen">
                    </div>
                    <div className="login-center">
                        <div className="container min-height">
                            <div className="row">
                                <div className="col-xs-4 col-md-offset-8">
                                    <h2 className="titleText">Flight Compare</h2>
                                    <div className="login" id="card">
                                        <div className="front signin_form">
                                            <p>Login To Your Account</p>
                                            <form onSubmit={this.onLogin} className="login-form">
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <input type="text" className="form-control" placeholder="Type your username" name="username" onChange={this.onChange} value={this.state.user.username} required="true" />
                                                        <span className="input-group-addon">
                                                            <i className="glyphicon glyphicon-user"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <input type="password" className="form-control" placeholder="Type your password" name="password" onChange={this.onChange} value={this.state.user.password} required="true" />
                                                        <span className="input-group-addon">
                                                            <i className="glyphicon glyphicon-lock"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="form-group sign-btn">
                                                    <input type="submit" className="btn" value="Log in" />
                                                    <p><strong>New to Flight Compare?</strong><br /><a href="#" id="flip-btn" className="signup signup_link">Sign up for a new account</a></p>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="back signup_form" style={{ opacity: 0 }}>
                                            <p>Sign Up for Your New Account</p>
                                            <form form action="/login" onSubmit={this.onRegister} className="login-form">
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <input type="text" className="form-control" placeholder="First Name" name="firstname" onChange={this.onChange} value={this.state.user.firstname} required="true" />
                                                        <span className="input-group-addon">
                                                            <i className="glyphicon glyphicon-user"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <input type="text" className="form-control" placeholder="Last Name" name="lastname" onChange={this.onChange} value={this.state.user.lastname} required="true" />
                                                        <span className="input-group-addon">
                                                            <i className="glyphicon glyphicon-user"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <input type="text" className="form-control" placeholder="Username" name="username" id="username" onChange={this.onChange} value={this.state.user.username} required="true" />
                                                        <span className="input-group-addon">
                                                            <i className="glyphicon glyphicon-user"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <input type="email" className="form-control" placeholder="Email" name="email" onChange={this.onChange} value={this.state.user.email} required="true" />
                                                        <span className="input-group-addon">
                                                            <i className="glyphicon glyphicon-envelope"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <input type="password" className="form-control" placeholder="Password" name="password" onChange={this.onChange} value={this.state.user.password} required="true" />
                                                        <span className="input-group-addon">
                                                            <i className="glyphicon glyphicon-lock"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <input type="password" className="form-control" placeholder="Confirm Password" name="confirmpassword" id="confirmpassword" onChange={this.onChange} value={this.state.user.confirmpassword} required="true" />
                                                        <span className="input-group-addon">
                                                            <i className="glyphicon glyphicon-lock"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="form-group sign-btn">
                                                    <input type="submit" className="btn" value="Sign up" />
                                                    <br /><br />
                                                    <p>Already have an account? <a href="#" id="unflip-btn" className="signup">Log in</a></p>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
});
// ReactDOM.unmountComponentAtNode(document.getElementById('search'));
ReactDOM.render(
    <LoginForm />, document.getElementById('content'));