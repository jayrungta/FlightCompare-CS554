const SearchResults = React.createClass({
    getInitialState() {
        return {
            results: [],
            expanded: false,
            buttonText: 'Show Details'
        };
    },
    componentWillMount() {

    },
    componentDidMount() {

    },
    componentWillReceiveProps(newProps) {
        this.setState({ results: newProps.results })
    },

    onChange() {
        let selected = $('#orderBySelection').val();
        let results = this.state.results;
        if (selected === 'price')
            this.setState({ results: results.sort((a, b) => parseFloat(a.price.slice(3)) - parseFloat(b.price.slice(3))) });
        else if (selected === 'duration')
            this.setState({ results: results.sort((a, b) => a.duration - b.duration) });
        else if (selected === 'arrivalTime')
            this.setState({ results: results.sort((a, b) => new Date(a.arrivalTime) - new Date(b.arrivalTime)) });
        else return;
    },

    render() {
        let resultList = this.state.results;
        let results = resultList.map((result) => {
            return (
                <ResultItem
                    airlineName={result.airlineName}
                    origin={result.origin}
                    destination={result.destination}
                    price={result.price}
                    departureTime={result.departureTime}
                    arrivalTime={result.arrivalTime}
                    duration={result.duration}
                    flightNo={result.flightNo}
                    meal={result.meal}
                    originName={result.originName}
                    destinationName={result.destinationName}
                    originTerminal={result.originTerminal}
                    destinationTerminal={result.destinationTerminal}
                />
            );
        });

        return (
            <div className="searchResults col-xs-12 ">
                <fieldset />
                <legend>Results</legend>
                {resultList.length > 0 &&
                    <select id="orderBySelection" name="orderBySelection" className="pull-right" onChange={this.onChange.bind(this)}>
                        <option selected disabled>Order by</option>
                        <option value="price">Price</option>
                        <option value="duration">Duration</option>
                        <option value="arrivalTime">Arrival Time</option>
                    </select>
                }
                {results}
            </div>
        );
    }
});
