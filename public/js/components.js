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
            printed: false,
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
        var _this4 = this;
        if(this.state.expanded){
            event.preventDefault();
            $.ajax({
                type: "POST",
                url: "/search/airlines",
                data: {
                    flight:{
                            airlineName: this.props.airlineName,
                            origin: this.props.origin,
                            destination: this.props.destination,
                            price: this.props.price,
                            departureTime: this.formatAMPM(new Date(this.props.departureTime)),
                            arrivalTime: this.formatAMPM(new Date(this.props.arrivalTime)),
                            duration: this.formatDuration(this.props.duration),
                            flightNo: this.props.flightNo,
                            meal: this.props.meal,
                            originName: this.props.originName,
                            destinationName: this.props.destinationName,
                            originTerminal: this.props.originTerminal
                    }
                },
                success: function success(results) {
                    console.log("print success");
                    _this4.setState({ results:results, printed : true});
                },
                error: function error(xhr, status, err) {
                    _this4.setState({ error: xhr.responseText });
                    console.error(status, err.toString());
                }
            });
        }
    },
    doTrack: function doTrack() {
        alert('Track');
    },
    doBook: function doBook() {
        alert('Book');
    },
    getExpandedDiv: function getExpandedDiv() {
        // i think here we should call <CommentBox flightNo = {this.props.flightNo}>
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
                        { className: 'col-md-4' },
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
                        { className: 'col-md-4' },
                        'comments goes here.',
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
                            { className: 'btn btn-default', onClick: this.doTrack },
                            'Track'
                        ),
                        '\xA0',
                        React.createElement(
                            'a',
                            { className: 'btn btn-default', onClick: this.doBook },
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
                            this.props.price
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
                    { className: 'btn btn-default', onClick: this.toggleExpanded },
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
                originTerminal: result.originTerminal
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
        return (
            // <p>Search flight form coming soon!</p>
            React.createElement(
                'div',
                { className: 'searchContainer' },
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
                                    React.createElement('input', { id: 'origin', name: 'origin', type: 'text', placeholder: 'Where are you flying from?', className: 'form-control input-md', required: 'true', onChange: this.onChange, value: this.state.query.origin })
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'form-group inputDiv col-md-4', style: { "margin-left": "10px" } },
                                    React.createElement(
                                        'label',
                                        { className: 'control-label', htmlFor: 'destination' },
                                        'Destination'
                                    ),
                                    React.createElement('input', { id: 'destination', name: 'destination', type: 'text', placeholder: 'Where are you flying to?', className: 'form-control input-md', required: 'true', onChange: this.onChange, value: this.state.query.destination })
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
            )
        );
    }
});
ReactDOM.render(React.createElement(SearchForm, null), document.getElementById('search'));
"use strict";
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

var CommentBox = React.createClass({
    displayName: "CommentBox",
    render: function render() {
        return React.createElement(
            "div",
            { className: "" },
            "comment box ",
            this.props.flightNo
        );
    }
});
"use strict";
"use strict";