import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import _ from 'lodash';
import { getRandomColour } from '../../js';
import MoviePreview from './MoviePreview';

class HomeSearch extends Component {
    initialState = {
        backgroundColor: '#fff',
        types: [],
        selectedType: null
    }

    state = { ...this.initialState };

    componentDidMount() {
    }

    render() {
        return (
            <div className="relative pageContainer jumboBackground" style={{ padding: 17 }}>
                <div className='generalText mont' style={styles.listheader}>
                    Popular Movies
                </div>
                <div className='resultsContainer'>
                    <MoviePreview />
                    <MoviePreview />
                    <MoviePreview />
                    <MoviePreview />
                    <MoviePreview />
                    <MoviePreview />
                    <MoviePreview />
                    <MoviePreview />
                    <MoviePreview />
                    <MoviePreview />
                    <MoviePreview />
                    <MoviePreview />
                    <MoviePreview />
                    <MoviePreview />
                    <MoviePreview />
                    <MoviePreview />
                    <MoviePreview />
                    <MoviePreview />
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

export default connect(null, {})(withRouter(HomeSearch));
