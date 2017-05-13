'use strict';

var LoginForm = React.createClass({
    displayName: 'LoginForm',
    getInitialState: function getInitialState() {
        return {
            error: "",
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
                        error: '',
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
                        error: '',
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
        this.setState({ error: "" });
        var newUser = { firstName: this.state.user.firstname, lastName: this.state.user.lastname, username: this.state.user.username, password: this.state.user.password, email: this.state.user.email };
        // console.log(newUser);

        $.ajax({
            type: "POST",
            url: "/login/register",
            data: { user: newUser },
            success: function success(userId) {
                // console.log(userId);
                _this2.setState({
                    error: '',
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
                    error: '',
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
                _this3.setState({ error: xhr.responseText });
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
            var p = $("#password")[0];
            var cp = $("#confirmpassword")[0];
            if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(this.state.user.password)) {
                p.setCustomValidity('Password must have minimum 8 characters, at least 1 letter and 1 number.');
            } else {
                p.setCustomValidity('');
            }
            if (this.state.user.password != this.state.user.confirmpassword) {
                cp.setCustomValidity('Passwords dont match.');
            } else {
                cp.setCustomValidity('');
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
                                            'div',
                                            { className: this.state.error == '' ? 'hidden' : 'panel panel-error show' },
                                            React.createElement(
                                                'div',
                                                { className: 'panel-body' },
                                                this.state.error
                                            )
                                        ),
                                        React.createElement(
                                            'form',
                                            { onSubmit: this.onLogin, className: 'login-form' },
                                            React.createElement(
                                                'label',
                                                { className: 'control-label', htmlFor: 'usernameLogin' },
                                                'Username:'
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'form-group' },
                                                React.createElement(
                                                    'div',
                                                    { className: 'input-group' },
                                                    React.createElement('input', { type: 'text', className: 'form-control', placeholder: 'Type your username', name: 'username', id: 'usernameLogin', onChange: this.onChange, value: this.state.user.username, required: 'true' }),
                                                    React.createElement(
                                                        'span',
                                                        { className: 'input-group-addon' },
                                                        React.createElement('i', { className: 'glyphicon glyphicon-user' })
                                                    )
                                                )
                                            ),
                                            React.createElement(
                                                'label',
                                                { className: 'control-label', htmlFor: 'passwordLogin' },
                                                'Password:'
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'form-group' },
                                                React.createElement(
                                                    'div',
                                                    { className: 'input-group' },
                                                    React.createElement('input', { type: 'password', className: 'form-control', placeholder: 'Type your password', name: 'password', id: 'passwordLogin', onChange: this.onChange, value: this.state.user.password, required: 'true' }),
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
                                                'label',
                                                { className: 'control-label', htmlFor: 'firstname' },
                                                'First Name:'
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'form-group' },
                                                React.createElement(
                                                    'div',
                                                    { className: 'input-group' },
                                                    React.createElement('input', { type: 'text', className: 'form-control', placeholder: 'First Name', name: 'firstname', id: 'firstname', onChange: this.onChange, value: this.state.user.firstname, required: 'true' }),
                                                    React.createElement(
                                                        'span',
                                                        { className: 'input-group-addon' },
                                                        React.createElement('i', { className: 'glyphicon glyphicon-user' })
                                                    )
                                                )
                                            ),
                                            React.createElement(
                                                'label',
                                                { className: 'control-label', htmlFor: 'lastname' },
                                                'Last Name:'
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'form-group' },
                                                React.createElement(
                                                    'div',
                                                    { className: 'input-group' },
                                                    React.createElement('input', { type: 'text', className: 'form-control', placeholder: 'Last Name', name: 'lastname', id: 'lastname', onChange: this.onChange, value: this.state.user.lastname, required: 'true' }),
                                                    React.createElement(
                                                        'span',
                                                        { className: 'input-group-addon' },
                                                        React.createElement('i', { className: 'glyphicon glyphicon-user' })
                                                    )
                                                )
                                            ),
                                            React.createElement(
                                                'label',
                                                { className: 'control-label', htmlFor: 'username' },
                                                'Username:'
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
                                                'label',
                                                { className: 'control-label', htmlFor: 'email' },
                                                'Email:'
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'form-group' },
                                                React.createElement(
                                                    'div',
                                                    { className: 'input-group' },
                                                    React.createElement('input', { type: 'email', className: 'form-control', placeholder: 'Email', name: 'email', id: 'email', onChange: this.onChange, value: this.state.user.email, required: 'true' }),
                                                    React.createElement(
                                                        'span',
                                                        { className: 'input-group-addon' },
                                                        React.createElement('i', { className: 'glyphicon glyphicon-envelope' })
                                                    )
                                                )
                                            ),
                                            React.createElement(
                                                'label',
                                                { className: 'control-label', htmlFor: 'password' },
                                                'Password:'
                                            ),
                                            React.createElement(
                                                'div',
                                                { className: 'form-group' },
                                                React.createElement(
                                                    'div',
                                                    { className: 'input-group' },
                                                    React.createElement('input', { type: 'password', className: 'form-control', placeholder: 'Password', name: 'password', id: 'password', onChange: this.onChange, value: this.state.user.password, required: 'true' }),
                                                    React.createElement(
                                                        'span',
                                                        { className: 'input-group-addon' },
                                                        React.createElement('i', { className: 'glyphicon glyphicon-lock' })
                                                    )
                                                )
                                            ),
                                            React.createElement(
                                                'label',
                                                { className: 'control-label', htmlFor: 'confirmpassword' },
                                                'Confirm Password:'
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

var ResultItem = React.createClass({
    displayName: 'ResultItem',
    getInitialState: function getInitialState() {
        return {
            expanded: false,
            buttonText: 'Show Details'
        };
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
    formatDATE: function formatDATE(date) {
        var year = date.getFullYear();
        var monthNum = date.getMonth();
        var day = date.getDate();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm + ',' + month[monthNum] + '-' + day + '-' + year;
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

    toggleExpanded: function toggleExpanded() {
        var bt = this.state.buttonText == 'Hide Details' ? 'Show Details' : 'Hide Details';
        var e = !this.state.expanded;
        this.setState({
            expanded: e,
            buttonText: bt
        });
    },
    doPrint: function doPrint() {
        if (this.state.expanded) {
            event.preventDefault();
            $.ajax({
                type: "POST",
                url: "/search/airlines",
                data: {
                    flight: {
                        airlineName: this.props.airlineName,
                        origin: this.props.origin,
                        destination: this.props.destination,
                        price: this.props.price,
                        departureTime: this.formatDATE(new Date(this.props.departureTime)),
                        arrivalTime: this.formatDATE(new Date(this.props.arrivalTime)),
                        duration: this.formatDuration(this.props.duration),
                        flightNo: this.props.flightNo,
                        meal: this.props.meal,
                        originName: this.props.originName,
                        destinationName: this.props.destinationName,
                        originTerminal: this.props.originTerminal,
                        destinationTerminal: this.props.destinationTerminal
                    }
                },
                success: function success(results) {
                    console.log("print success");
                    //this.pdfView();
                    setTimeout(function () {
                        var myWin = window.open("displayPDF", "_blank");
                        if (myWin == undefined) alert('Please disable your popup blocker and try again!');
                    }, 2000);
                },
                error: function error(xhr, status, err) {
                    this.setState({ error: xhr.responseText });
                    console.error(status, err.toString());
                }
            });
        }
    },
    doTrack: function doTrack() {
        alert('Track');
    },
    getExpandedDiv: function getExpandedDiv() {
        if (this.state.expanded) {
            return React.createElement(
                'div',
                null,
                React.createElement('br', null),
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'div',
                        { className: 'col-md-6' },
                        React.createElement(
                            'dl',
                            { className: 'dl-horizontal' },
                            React.createElement(
                                'dt',
                                null,
                                'Flight Number'
                            ),
                            React.createElement(
                                'dd',
                                null,
                                this.props.flightNo
                            ),
                            React.createElement(
                                'dt',
                                null,
                                'Origin'
                            ),
                            React.createElement(
                                'dd',
                                null,
                                this.props.originName
                            ),
                            React.createElement(
                                'dt',
                                null,
                                'Destination'
                            ),
                            React.createElement(
                                'dd',
                                null,
                                this.props.destinationName
                            ),
                            React.createElement(
                                'dt',
                                null,
                                'Origin Terminal'
                            ),
                            React.createElement(
                                'dd',
                                null,
                                this.props.originTerminal
                            ),
                            React.createElement(
                                'dt',
                                null,
                                'Destination Terminal'
                            ),
                            React.createElement(
                                'dd',
                                null,
                                this.props.destinationTerminal
                            ),
                            React.createElement(
                                'dt',
                                null,
                                'Meal'
                            ),
                            React.createElement(
                                'dd',
                                null,
                                this.props.meal
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-md-6' },
                        React.createElement(CommentBox, { flightNo: this.props.flightNo })
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'div',
                        { className: 'col-md-12' },
                        React.createElement(
                            'a',
                            { className: 'btn btn-default', onClick: this.doPrint },
                            'Print'
                        ),
                        '\xA0',
                        React.createElement(
                            'a',
                            { className: 'btn btn-default', href: "http://www.google.com/search?q=" + this.props.airlineName + "&btnI", target: '_blank' },
                            'Book'
                        )
                    )
                )
            );
        } else {
            return null;
        }
    },
    render: function render() {
        var expandedDiv = this.getExpandedDiv();

        return React.createElement(
            'div',
            { className: 'panel panel-default' },
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
                            this.props.airlineName,
                            ' (',
                            this.props.origin,
                            '-',
                            this.props.destination,
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
                    { className: 'listInfo row' },
                    React.createElement(
                        'div',
                        { className: 'price col-xs-4' },
                        React.createElement(
                            'p',
                            { style: { "font-weight": "bold" } },
                            '$',
                            this.props.price.slice(3)
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'time col-xs-4' },
                        React.createElement(
                            'p',
                            null,
                            this.formatAMPM(new Date(this.props.departureTime)),
                            ' - ',
                            this.formatAMPM(new Date(this.props.arrivalTime))
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'price col-xs-4' },
                        React.createElement(
                            'p',
                            null,
                            this.formatDuration(this.props.duration)
                        )
                    )
                ),
                React.createElement(
                    'a',
                    { className: '', onClick: this.toggleExpanded },
                    this.state.buttonText
                ),
                expandedDiv
            )
        );
    }
});
"use strict";

var SearchResults = React.createClass({
    displayName: "SearchResults",
    getInitialState: function getInitialState() {
        return {
            results: [],
            expanded: false,
            buttonText: 'Show Details'
        };
    },
    componentWillMount: function componentWillMount() {},
    componentDidMount: function componentDidMount() {},
    componentWillReceiveProps: function componentWillReceiveProps(newProps) {
        this.setState({ results: newProps.results });
    },
    render: function render() {
        var resultList = this.state.results;
        var results = resultList.map(function (result) {
            return React.createElement(ResultItem, {
                airlineName: result.airlineName,
                origin: result.origin,
                destination: result.destination,
                price: result.price,
                departureTime: result.departureTime,
                arrivalTime: result.arrivalTime,
                duration: result.duration,
                flightNo: result.flightNo,
                meal: result.meal,
                originName: result.originName,
                destinationName: result.destinationName,
                originTerminal: result.originTerminal,
                destinationTerminal: result.destinationTerminal
            });
        });
        return React.createElement(
            "div",
            { className: "searchResults col-xs-12 " },
            React.createElement("fieldset", null),
            React.createElement(
                "legend",
                null,
                "Results"
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
            error: "",
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

        $.ajax({
            type: "GET",
            url: "/airports",
            success: function success(results) {
                var availableTags = results;
                $("#origin").autocomplete({
                    source: availableTags,
                    delay: 0,
                    options: {
                        /* override default values here */
                        minLength: 3
                    }
                });
                $("#destination").autocomplete({
                    source: availableTags,
                    delay: 0
                });
            },
            error: function error(xhr, status, err) {
                _this.setState({ error: xhr.responseText });
                console.error(status, err.toString());
            }
        });
    },
    onSearch: function onSearch(event) {
        var _this2 = this;

        event.preventDefault();
        this.setState({ errors: "", errorFlag: false });
        var date = void 0;
        if (this.state.ddate) date = this.state.ddate;else date = $("#ddate").val();

        var og = $("#origin").val().slice(0, 3);
        var dest = $("#destination").val().slice(0, 3);
        var newQuery = { origin: og, destination: dest, date: date, adultCount: this.state.query.adultCount, maxPrice: this.state.query.maxPrice };
        $.ajax({
            type: "POST",
            url: "/search",
            data: { query: newQuery },
            success: function success(results) {
                console.log(results);
                _this2.setState({ results: results, error: '' });
            },
            error: function error(xhr, status, err) {
                _this2.setState({ error: xhr.responseText });
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
        return React.createElement(
            'div',
            { className: 'searchContainer' },
            React.createElement(
                'a',
                { href: '/logout', className: 'logout btn btn-default btn-sm' },
                React.createElement('span', { className: 'glyphicon glyphicon-log-out' }),
                ' Log out'
            ),
            React.createElement(
                'div',
                { className: 'searchPanel panel panel-default col-xs-8 ' },
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
                                    { className: 'control-label', htmlFor: 'origin' },
                                    'Origin'
                                ),
                                React.createElement('input', { id: 'origin', name: 'origin', type: 'text', placeholder: 'Where are you flying from?', className: 'form-control input-md', required: 'true' })
                            ),
                            React.createElement(
                                'div',
                                { className: 'form-group inputDiv col-md-4', style: { "margin-left": "10px" } },
                                React.createElement(
                                    'label',
                                    { className: 'control-label', htmlFor: 'destination' },
                                    'Destination'
                                ),
                                React.createElement('input', { id: 'destination', name: 'destination', type: 'text', placeholder: 'Where are you flying to?', className: 'form-control input-md', required: 'true' })
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
                                    { className: 'control-label', htmlFor: 'ddate' },
                                    'Departure Date'
                                ),
                                React.createElement('input', { id: 'ddate', name: 'ddate', type: 'date', placeholder: 'Select departure date', className: 'form-control input-md', required: 'true', onChange: this.onChange, value: this.state.query.ddate })
                            ),
                            React.createElement(
                                'div',
                                { className: 'form-group inputDiv col-md-3', style: { "margin-left": "10px" } },
                                React.createElement(
                                    'label',
                                    { className: 'control-label', htmlFor: 'adultCount' },
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
                                { className: 'form-group inputDiv col-md-4 ', style: { "margin-left": "10px" } },
                                React.createElement(
                                    'label',
                                    { className: 'control-label', htmlFor: 'maxPrice' },
                                    'Max Price'
                                ),
                                React.createElement('input', { id: 'maxPrice', name: 'maxPrice', 'data-slider-id': 'maxPrice', type: 'text', 'data-slider-min': '0', 'data-slider-max': '1000', 'data-slider-step': '1', 'data-slider-value': '0', className: 'form-control input-md', onChange: this.onChange, value: this.state.query.origin }),
                                React.createElement('br', null),
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
            React.createElement(
                'div',
                { className: this.state.error == '' ? 'hidden' : 'panel panel-error col-xs-8 show' },
                React.createElement(
                    'div',
                    { className: 'panel-body' },
                    this.state.error
                )
            ),
            React.createElement(SearchResults, { results: this.state.results })
        );
    }
});

ReactDOM.render(React.createElement(SearchForm, null), document.getElementById('search'));
'use strict';

var Comment = React.createClass({
  displayName: 'Comment',
<<<<<<< HEAD
  timeRender: function timeRender(date) {
    var commentDate = new Date(date);
    var today = new Date();

    if (commentDate.getFullYear() == today.getFullYear() && commentDate.getMonth() == today.getMonth() && commentDate.getDate() == today.getDate()) {
      var hours = commentDate.getHours();
      var minutes = commentDate.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes;
      return hours + ':' + minutes + ' ' + ampm;
    }

    return commentDate.toLocaleDateString('en-US');
  },
  render: function render() {
    var comment = this.props.comment;

    return React.createElement(
      'div',
      { className: 'comment' },
      React.createElement(
        'p',
        { className: 'commentText' },
        comment.text
      ),
      React.createElement(
        'small',
        { className: 'commentTime' },
        this.timeRender(comment.timestamp)
      ),
      React.createElement(
        'p',
        { className: 'commentAuthor' },
        comment.user.name
=======
  formatAMPM: function formatAMPM(date) {
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
    return dt + "   " + strTime;
  },
  render: function render() {
    var comment = this.props.comment;
    console.log(comment);
    return React.createElement(
      'div',
      { className: 'panel panel-default comment' },
      React.createElement(
        'p',
        { className: 'commentText' },
        comment.text,
        React.createElement('br', null),
        'by ',
        comment.user.name,
        ' ',
        React.createElement(
          'small',
          null,
          'on ',
          this.formatAMPM(new Date(comment.timestamp))
        )
>>>>>>> c7fb6492508cabf383dfe5966f605a0a64f4d35b
      )
    );
  }
});
'use strict';

var CommentBox = React.createClass({
    displayName: 'CommentBox',
    getInitialState: function getInitialState() {
        return { data: [] };
    },
    loadCommentsFromServer: function loadCommentsFromServer() {
        var _this = this;

        $.ajax({
            url: '/posts/' + this.props.flightNo,
            dataType: 'json',
            cache: false,
            success: function success(data) {
                _this.setState({ data: data });
            },
            error: function error(xhr, status, err) {
                console.error(status, err.toString());
            }
        });
    },
    handleCommentSubmit: function handleCommentSubmit(comment) {
        var _this2 = this;

        comment.flightId = this.props.flightNo;
        $.ajax({
            url: "/posts",
            dataType: 'html',
            type: 'POST',
            data: comment,
            success: function success() {
                _this2.loadCommentsFromServer();
            },
            error: function error(xhr, status, err) {
                console.error(status, err.toString());
            }
        });
    },
    componentDidMount: function componentDidMount() {
        this.loadCommentsFromServer();
    },
    render: function render() {
        return React.createElement(
            'div',
            { className: 'commentBox' },
            React.createElement(
                'p',
                null,
                'What our users say about this flight:'
            ),
            React.createElement(CommentList, { comments: this.state.data }),
            React.createElement(CommentForm, { onCommentSubmit: this.handleCommentSubmit.bind(this) })
        );
    }
});
'use strict';

var CommentForm = React.createClass({
  displayName: 'CommentForm',
  getInitialState: function getInitialState() {
    return { text: '' };
  },
  handleTextChange: function handleTextChange(e) {
    this.setState({ text: e.target.value });
  },
  handleSubmit: function handleSubmit(e) {
    var _this = this;

    e.preventDefault();
    var text = this.state.text.trim();
    if (!text) {
      return;
    }

    $.ajax({
      url: "/login/current",
      dataType: 'json',
      cache: false,
      success: function success(user) {
        var newComment = {
          userId: user._id,
          text: text,
          timestamp: new Date().toJSON()
        };
        _this.props.onCommentSubmit(newComment);
        _this.setState({ text: '' });
      },
      error: function error(xhr, status, err) {
        console.error(status, err.toString());
      }
    });
  },
  render: function render() {
    return React.createElement(
      'form',
      { className: 'form-horizontal col-xs-12 commentForm', onSubmit: this.handleSubmit.bind(this) },
      React.createElement(
        'div',
        { className: 'form-group' },
        React.createElement(
          'label',
          { className: 'control-label', htmlFor: 'newCommentText' },
          'Add new comment'
        ),
        React.createElement('textarea', {
          id: 'newCommentText',
          name: 'newCommentText',
          placeholder: 'Say something...',
          className: 'form-control input-md',
          required: 'true',
          value: this.state.text,
          onChange: this.handleTextChange.bind(this)
        })
      ),
      React.createElement(
        'div',
        { className: 'form-group' },
        React.createElement('input', { className: 'btn btn-default', type: 'submit', value: 'Comment' })
      )
    );
  }
});
"use strict";

var CommentList = React.createClass({
    displayName: "CommentList",
    render: function render() {
        var commentNodes = this.props.comments.map(function (comment) {
            return React.createElement(Comment, { comment: comment });
        });
        return React.createElement(
            "div",
            { className: "commentList" },
            commentNodes
        );
    }
});