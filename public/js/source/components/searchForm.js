const SearchForm = React.createClass({
    componentDidMount() {
        ReactDOM.unmountComponentAtNode(document.getElementById('content'));
    },
  
    render() {
        return (
           <p>Search flight form coming soon!</p>
        );
    }
});
ReactDOM.render(
    <SearchForm />, document.getElementById('search'));