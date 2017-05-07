const SearchResults = React.createClass({
    getInitialState() {
        return {
            results: []
        };
    },

    componentWillMount() {

    },
    componentDidMount() {

    },
    componentWillReceiveProps(newProps) {
        this.setState({ results: newProps.results })
    },
    formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    },
    formatDuration(duration) {
        var hours = Math.trunc(duration / 60);
        var minutes = duration % 60;
        if (minutes == 0) {
            return hours + "h";
        }
        else {
            return hours + "h " + minutes + "m";
        }
    },
    render() {
        let resultList = this.state.results;
        let results = resultList.map((result) => {
            return (
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <div className="row">
                            <div className="airline col-xs-6">
                                <p>{result.airlineName}     ({result.origin}-{result.destination})</p>
                            </div>
                        </div>
                    </div>
                    <div className="panel-body">
                        <div className="listInfo row">
                            <div className="price col-xs-4">
                                <p style={{"font-weight":"bold"}}>${result.price.substring(3).toLocaleString('USD', {
                                    style: 'currency',
                                    currency: "USD",
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })}</p>
                            </div>
                            <div className="time col-xs-4">
                                <p>{this.formatAMPM(new Date(result.departureTime))} - {this.formatAMPM(new Date(result.arrivalTime))}</p>
                            </div>
                            <div className="price col-xs-4">
                                <p>{this.formatDuration(result.duration)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
        // if (!results) {
        //     results = " ";
        // }
        return (
            <div className="searchResults col-xs-12 ">
                <fieldset />
                <legend>Results</legend>
                {results}
            </div>
        );
    }
});


