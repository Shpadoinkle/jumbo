import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import _ from 'lodash';
import axios from 'axios';
import FontAwesome from 'react-fontawesome';
import { loadLists, loadPop } from '../../actions';
import MoviePreview from './MoviePreview';
import { TEXT_BRAND } from '../../js';
import { GenericInput } from '../../components';

class HomeSearch extends Component {
    initialState = {
        Search: '',
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

    getUrl() {
        if (window.location.pathname !== '/') {
            return ' lockScroll'
        }
        return '';
    }

    updateProps(props) {
        this.setState({ popular: props.pop, testResults: props.list });
    }

    triggerSearch() {
        this.search();
    }

    handleEnter(event) {
        if (!_.isUndefined(event.charCode) && event.charCode === 13) {
            this.search();
        }
    }

    handleChange(event) {
        var stateChange = {};
        stateChange[event.target.getAttribute('id')] = event.target.value;
        if (event.target.value === '') {
            stateChange.searchReturn = false;
        }
        this.setState(stateChange);
    }

    search = async (isPop) => {
        let searchString = encodeURIComponent(this.state.Search);
        searchString = searchString.replace(/%20/g, "+");

        let apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=6ed12e064b90ae1290fa326ce9e790ff&query=${searchString}&language=en-US`;

        if (isPop) {
            apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=6ed12e064b90ae1290fa326ce9e790ff&language=en-US&page=1`
        }

        this.setState({ loading: !isPop, testResults: [], empty: false, searchReturn: false });

        axios({
            method: 'get',
            url: apiUrl,
        })
            .then((res) => {
                // console.log('results....')
                // console.log(res.data.results);
                if (isPop) {
                    this.props.loadPop(res.data.results);
                    this.setState({
                        popular: res.data.results,
                        empty: _.isEmpty(res.data.results),
                        loading: false
                    });
                } else {
                    this.props.loadLists(res.data.results);
                    this.setState({
                        testResults: res.data.results,
                        empty: _.isEmpty(res.data.results),
                        loading: false,
                        searchReturn: true
                    });
                }
            }).catch((err) => {
                console.log(err);
                console.log('error');
                this.setState({ loading: false });
            });
    }

    renderResults() {
        if (this.state.loading) {
            return null;
        }
        let source = this.state.searchReturn ? this.state.testResults : this.state.popular;

        if (this.state.searchReturn && _.isEmpty(source)) {
            <div style={{ display: 'flex', paddingTop: 60, justifyContent: 'center' }}>
                <div className='generalText mont' style={{ ...styles.listheader, fontSize: 18, marginBottom: 14 }}>
                    No results found for this search.
                </div>
            </div>
        }

        return _.map(source, (t, index) => {
            if (t == null) {
                return null;
            }
            return <MoviePreview key={t.id} movie={t} />
        });
    }

    renderLoading() {
        if (this.state.loading) {
            return (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <FontAwesome style={styles.spinner} name="spinner fa-pulse fa-fw" />
                </div>
            );
        }
    }

    getHeading() {
        if (this.state.loading) {
            return 'Searching...';
        }
        if (this.state.searchReturn) {
            return 'Search Results';
        }
        return 'Popular Movies';
    }

    render() {
        return (
            <div className={`relative pageContainer jumboBackground ${this.getUrl()}`} style={{ padding: 17, paddingTop: 0 }}>
                <div style={{ width: '100%', height: 130, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div className='logo' />
                </div>
                <div className='searchBarContainer'>
                    <GenericInput
                        id="Search"
                        placeholder="Search"
                        value={this.state.Title}
                        onChange={(e) => this.handleChange(e)}
                        onEnter={(e) => this.handleEnter(e)}

                        extraContent={
                            <FontAwesome style={{ color: '#01D277', marginLeft: 8 }} name="search" />
                        }
                    />
                </div>

                <div className='generalText mont' style={styles.listheader}>
                    {this.getHeading()}
                </div>
                {this.renderLoading()}
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
    },
    spinner: {
        color: TEXT_BRAND
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
