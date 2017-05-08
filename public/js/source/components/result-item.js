const ResultItem = React.createClass({
    getInitialState() {
        return {
            expanded: false,
            buttonText: 'Show Details'
        };
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
    toggleExpanded: function() {
        let bt = this.state.buttonText == 'Hide Details' ? 'Show Details' : 'Hide Details';
        let e = !this.state.expanded;
        this.setState({
            expanded: e,
            buttonText: bt
        });
    },
    doPrint: function() {
        alert('Print');
    },
    doTrack: function() {
        alert('Track');
    },
    doBook: function() {
        alert('Book');
    },
    getExpandedDiv: function() {
        // i think here we should call <CommentBox flightNo = {this.props.flightNo}>
        if (this.state.expanded) {
          return <div><br/>
            <div className="row">
                <div className="col-md-4">
                    <dl className="dl-horizontal">
                        <dt>Flight Number</dt>
                        <dd>{this.props.flightNo}</dd>
                        <dt>Origin</dt>
                        <dd>{this.props.originName}</dd>
                        <dt>Destination</dt>
                        <dd>{this.props.destinationName}</dd>
                        <dt>Origin Terminal</dt>
                        <dd>{this.props.originTerminal}</dd>
                        <dt>Meal</dt>
                        <dd>{this.props.meal}</dd>
                    </dl>
                </div>
                <div className="col-md-4">
                    <CommentBox flightNo = {this.props.flightNo}/>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <a className="btn btn-default" onClick={this.doPrint}>Print</a>&#160;
                    <a className="btn btn-default" onClick={this.doTrack}>Track</a>&#160;
                    <a className="btn btn-default" onClick={this.doBook}>Book</a>
                </div>
            </div>
          </div>;
        } else {
          return null;
        }
    },
    render() {
        let expandedDiv = this.getExpandedDiv();
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <div className="row">
                        <div className="airline col-xs-6">
                            <p>{this.props.airlineName} ({this.props.origin}-{this.props.destination})</p>
                        </div>
                    </div>
                </div>
                <div className="panel-body">
                    <div className="listInfo row">
                        <div className="price col-xs-4">
                            <p style={{"font-weight":"bold"}}>${this.props.price}</p>
                        </div>
                        <div className="time col-xs-4">
                            <p>{this.formatAMPM(new Date(this.props.departureTime))} - {this.formatAMPM(new Date(this.props.arrivalTime))}</p>
                        </div>
                        <div className="price col-xs-4">
                            <p>{this.formatDuration(this.props.duration)}</p>
                        </div>
                    </div>
                    <a className="btn btn-default" onClick={this.toggleExpanded}>{this.state.buttonText}</a>
                    { expandedDiv }
                </div>
            </div>
        );
    }
});
