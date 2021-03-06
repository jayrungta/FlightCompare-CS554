const SearchForm = React.createClass({
    getInitialState() {
        $.ajax({
            type: "GET",
            url: "/airports",
            success: (results) => {
                this.airports = results;
            },
            error: (xhr, status, err) => {
                this.setState({ error: xhr.responseText });
                console.error(status, err.toString());
            }
        });

        return {
            error: "",
            query: {
                origin: '',
                destination: '',
                ddate: '',
                adultCount: "1",
                maxPrice: '',
            },
            results: []
        };
    },

    componentWillMount() {

    },
    componentDidMount() {
        ReactDOM.unmountComponentAtNode(document.getElementById('content'));
        let setMaxPrice = (value) => {
            this.state.query.maxPrice = value;
        };

        $('#maxPrice').bootstrapSlider({
            formatter: function (value) {
                setMaxPrice(value);
                $('#maxPriceDisp').text("$" + value);
                return 'Max Price: $' + value;
            }
        });
        $("#origin").autocomplete({
            source: (request, response) => {
                let matcher = new RegExp("\\b" + $.ui.autocomplete.escapeRegex(request.term), "i");
                response($.grep(this.airports, function (item) {
                    return matcher.test(item);
                }));
            },
            autoFocus: true,
            delay: 0,
            minLength: 3
        });
        $("#destination").autocomplete({
            source: (request, response) => {
                let matcher = new RegExp("\\b" + $.ui.autocomplete.escapeRegex(request.term), "i");
                response($.grep(this.airports, function (item) {
                    return matcher.test(item);
                }));
            },
            autoFocus: true,
            delay: 0,
            minLength: 3
        });
    },

    onSearch(event) {
        event.preventDefault();
        this.setState({ errors: "", errorFlag: false });
        let date;
        if (this.state.ddate)
            date = this.state.ddate;
        else
            date = $("#ddate").val();

        let og = $("#origin").val().slice(0, 3);
        let dest = $("#destination").val().slice(0, 3);
        let newQuery = { origin: og, destination: dest, date: date, adultCount: this.state.query.adultCount, maxPrice: this.state.query.maxPrice };
        $.ajax({
            type: "POST",
            url: "/search",
            data: { query: newQuery },
            success: (results) => {
                this.setState({ results: results, error: '' });
            },
            error: (xhr, status, err) => {
                this.setState({ results: [], error: xhr.responseText });
                console.error(status, err.toString());
            }
        });
    },
    onChange(event) {
        const field = event.target.name;
        const query = this.state.query;
        query[field] = event.target.value;

        this.setState({
            query: query
        });
    },
    render() {
        return (
            <div className="searchContainer">
                <a href="/logout" className="logout btn btn-default btn-sm">
                    <span className="glyphicon glyphicon-log-out"></span> Log out
                 </a>
                <div className="searchPanel panel panel-default col-xs-8 ">
                    <div className="panel-body">
                        <form onSubmit={this.onSearch} className="form-horizontal col-xs-12 searchForm">
                            <fieldset />
                            <legend>Search Flights</legend>
                            <div className="row">
                                <div className="form-group inputDiv col-md-4" style={{ "margin-left": "10px" }}>
                                    <label className="control-label" htmlFor="origin">Origin</label>
                                    <input id="origin" name="origin" type="text" placeholder="Where are you flying from?" className="form-control input-md" required="true" />
                                </div>
                                <div className="form-group inputDiv col-md-4" style={{ "margin-left": "10px" }}>
                                    <label className="control-label" htmlFor="destination">Destination</label>
                                    <input id="destination" name="destination" type="text" placeholder="Where are you flying to?" className="form-control input-md" required="true" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group inputDiv col-md-4 " style={{ "margin-left": "10px" }}>
                                    <label className="control-label" htmlFor="ddate">Departure Date</label>
                                    <input id="ddate" name="ddate" type="date" placeholder="Select departure date" className="form-control input-md" required="true" onChange={this.onChange} value={this.state.query.ddate} />
                                </div>
                                <div className="form-group inputDiv col-md-3" style={{ "margin-left": "10px" }}>
                                    <label className="control-label" htmlFor="adultCount">No. of Adults</label>
                                    <select id="adultCount" name="adultCount" className="form-control" onChange={this.onChange} value={this.state.query.adultCount}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group inputDiv col-md-4 " style={{ "margin-left": "10px" }}>
                                    <label className="control-label" htmlFor="maxPrice">Max Price</label>
                                    <input id="maxPrice" name="maxPrice" data-slider-id='maxPrice' type="text" data-slider-min="0" data-slider-max="1000" data-slider-step="1" data-slider-value="0" className="form-control input-md" onChange={this.onChange} value={this.state.query.origin} />
                                    <br />
                                    <help className="maxPriceDisp" id="maxPriceDisp" name="maxPriceDisp"></help>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group inputDiv col-md-4" style={{ "margin-left": "10px" }}>
                                    <input className="btn btn-default" type="submit" value="Search" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className={this.state.error == '' ? 'hidden' : 'panel panel-error col-xs-8 show'}>
                    <div className="panel-body">
                        {this.state.error}
                    </div>
                </div>
                <SearchResults results={this.state.results} />
            </div>
        );
    }
});

ReactDOM.render(
    <SearchForm />, document.getElementById('search'));

