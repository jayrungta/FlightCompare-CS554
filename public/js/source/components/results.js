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
    render() {
        let resultList = this.state.results;
        let results = resultList.map((result) => {
            return (
             <ResultItem
                airlineName={result.airlineName}
                origin = {result.origin}
                destination = {result.destination}
                price = {result.price}
                departureTime = {result.departureTime}
                arrivalTime = {result.arrivalTime}
                duration = {result.duration}
                flightNo = {result.flightNo}
                meal = {result.meal}
                originName = {result.originName}
                destinationName = {result.destinationName}
                originTerminal = {result.originTerminal}
              />
         );
        });
        return (
            <div className="searchResults col-xs-12 ">
                <fieldset />
                <legend>Results</legend>
                {results}
            </div>
        );
    }
});
