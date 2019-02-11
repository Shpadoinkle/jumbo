import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import _ from 'lodash';
import axios from 'axios';
import { getRandomColour } from '../../js';
import { loadLists } from '../../actions';
import MoviePreview from './MoviePreview';

class HomeSearch extends Component {
    initialState = {
        searchInput: 'star wars',
        loading: false,
        testResults: []
    }

    state = { ...this.initialState };

    componentDidMount() {
        this.search();
    }

    triggerSearch() {
        this.search();
    }

    search = async () => {
        let searchString = encodeURIComponent(this.state.searchInput);
        searchString = searchString.replace(/%20/g, "+");

        let apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=6ed12e064b90ae1290fa326ce9e790ff&query=${searchString}&language=en-US`;

        console.log(apiUrl)
        console.log('fetching??......');
        this.setState({ loading: true, testResults: [], empty: false });

        axios({
            method: 'get',
            url: apiUrl,
        })
            .then((res) => {
                console.log('test results....')
                console.log(res.data.results);

                this.props.loadLists(res.data.results);
                this.setState({
                    testResults: res.data.results,
                    empty: _.isEmpty(res.data.results)
                });
            }).catch((err) => {
                console.log(err);
                console.log('error');
                this.setState({ loading: false });
            });
    }


    renderResults() {
        return _.map(this.state.testResults, (t, index) => {
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

export default connect(null, { loadLists })(withRouter(HomeSearch));
