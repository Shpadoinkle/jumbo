import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import _ from 'lodash';
import axios from 'axios';
import { loadLists, loadPop } from '../../actions';
import MoviePreview from './MoviePreview';

class HomeSearch extends Component {
    initialState = {
        searchInput: 'star wars',
        loading: false,
        testResults: [],
        popular: []
    }

    state = { ...this.initialState };

    componentDidMount() {
        this.search(true);
        this.updateProps(this.props);
    }
    componentWillReceiveProps(nextProps) {
        this.updateProps(nextProps);
    }

    updateProps(props) {
        this.setState({ popular: props.pop });
    }

    triggerSearch() {
        this.search();
    }

    search = async (isPop) => {
        let searchString = encodeURIComponent(this.state.searchInput);
        searchString = searchString.replace(/%20/g, "+");

        let apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=6ed12e064b90ae1290fa326ce9e790ff&query=${searchString}&language=en-US`;

        if (isPop) {
            apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=6ed12e064b90ae1290fa326ce9e790ff&language=en-US&page=1`
        }

        this.setState({ loading: true, testResults: [], empty: false });

        axios({
            method: 'get',
            url: apiUrl,
        })
            .then((res) => {
                console.log('results....')
                console.log(res.data.results);
                if (isPop) {
                    this.props.loadPop(res.data.results);
                    this.setState({
                        popular: res.data.results,
                        empty: _.isEmpty(res.data.results)
                    });
                } else {
                    this.props.loadLists(res.data.results);
                    this.setState({
                        testResults: res.data.results,
                        empty: _.isEmpty(res.data.results)
                    });
                }
            }).catch((err) => {
                console.log(err);
                console.log('error');
                this.setState({ loading: false });
            });
    }

    renderResults() {
        return _.map(this.state.popular, (t, index) => {
            if (t == null) {
                return null;
            }
            return <MoviePreview key={t.id} movie={t} />
        });
    }

    render() {
        return (
            <div className="relative pageContainer jumboBackground" style={{ padding: 17 }}>
                <div className='generalText mont' style={styles.listheader}>
                    Popular Movies
                </div>
                <div className='resultsContainer'>
                    {this.renderResults()}
                </div>
            </div>
        );
    }
}

const styles = {
    resultsContainer: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    listheader: {
        lineHeight: '24px',
        fontSize: 20,
        marginBottom: 18,
        fontWeight: 700,
        letterSpacing: '1px'
    }
}

const mapStateToProps = (state) => {
    const { list } = state;
    return {
        pop: list.popular,
        list: list.list
    };
};

export default connect(mapStateToProps, { loadLists, loadPop })(withRouter(HomeSearch));
