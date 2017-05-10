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
    formatDATE(date) {
        var year = date.getFullYear();
        var monthNum = date.getMonth();
        var day = date.getDate();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        var month=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm + ',' + month[monthNum] + '-' + day + '-' + year;
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
    toggleExpanded: function () {
        let bt = this.state.buttonText == 'Hide Details' ? 'Show Details' : 'Hide Details';
        let e = !this.state.expanded;
        this.setState({
            expanded: e,
            buttonText: bt
        });
    },
    doPrint: function () {
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
                    setTimeout(function(){ window.open("displayPDF","_blank"); }, 2000);
                   
                    // this.setState({ results: results, printed: true });
                },
                error: function error(xhr, status, err) {
                    this.setState({ error: xhr.responseText });
                    console.error(status, err.toString());
                }
            });
        }
    },
    doTrack: function () {
        alert('Track');
    },
    doBook: function () {
        // alert('Book');

    },
    getGoogleTerm(normalString){
        return normalString;
    },
    getExpandedDiv: function () {
        // i think here we should call <CommentBox flightNo = {this.props.flightNo}>
        if (this.state.expanded) {
            return <div><br />
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
                            <dt>Destination Terminal</dt>
                            <dd>{this.props.destinationTerminal}</dd>
                            <dt>Meal</dt>
                            <dd>{this.props.meal}</dd>
                        </dl>
                    </div>
                    <div className="col-md-4">
                        {/*<CommentBox flightNo={this.props.flightNo} />*/}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                    <a className="btn btn-default" onClick={this.doPrint}>Print</a>&#160;
                    <a className="btn btn-default" onClick={this.doTrack}>Track</a>&#160;
                    <a className="btn btn-default" href ={"http://www.google.com/search?q="+ this.props.airlineName+"&btnI"} target="_blank" onClick={this.doBook}>Book</a>
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
                            <p style={{ "font-weight": "bold" }}>${this.props.price.slice(3)}</p>
                        </div>
                        <div className="time col-xs-4">
                            <p>{this.formatAMPM(new Date(this.props.departureTime))} - {this.formatAMPM(new Date(this.props.arrivalTime))}</p>
                        </div>
                        <div className="price col-xs-4">
                            <p>{this.formatDuration(this.props.duration)}</p>
                        </div>
                    </div>
                    <a className="" onClick={this.toggleExpanded}>{this.state.buttonText}</a>
                    {expandedDiv}
                </div>
            </div>
        );
    }
});
