import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import _ from 'lodash';
import { getRandomColour, TEXT_BRAND_LIGHT } from '../../js';
import { MovieCard } from '../../components';

class Movie extends Component {
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
            <div className="relative pageContainer jumboBackground">
                <div className='movie-banner relative'   >
                    <MovieCard
                        style={{
                            position: 'absolute',
                            left: 20,
                            bottom: -150
                        }}
                    />
                </div>
                <div style={{ paddingLeft: 20, paddingRight: 20 }}>
                    <div style={styles.topInfo}>
                        <div className='generalText mont' style={styles.listheader}>
                            Bohemian Rhapsody
                        </div>
                        <div className='generalText mont text-light' style={styles.goooF}>
                            2018 - 82% User Score
                        </div>
                        <div className='generalText mont text-light' style={styles.goooF}>
                            2h 15 min
                        </div>
                    </div>
                    <div style={styles.bottomInfo}>
                        <div className='generalText mont' style={{ ...styles.listheader, fontSize: 18, marginBottom: 14 }}>
                            Overview
                        </div>
                        <div className='generalText text-mid' style={styles.info}>
                            Singer Freddie Mercury, guitarist Brian May, drummer Roger Taylor and bass guitarist John Deacon take the music world by storm when they form the rock 'n' roll band Queen in 1970. Hit songs become instant classics. When Mercury's increasingly wild lifestyle starts to spiral out of control, Queen soon faces its greatest challenge yet – finding a way to keep the band together amid the success and excess.
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const styles = {
    topInfo: {
        display: 'block',
        paddingLeft: 156 + 18,
        paddingTop: 18,
        minHeight: 175,
        borderBottom: `1px #9FBBC7 solid`
    },
    listheader: {
        lineHeight: '24px', 
        fontSize: 20,
        marginBottom: 18,
        fontWeight: 700,
        letterSpacing: '1px'
    },
    goooF: {
        fontSize: 12,
        lineHeight: '24px'
    },
    bottomInfo: {
        paddingTop: 25
    },
    info: {
        fontSize: 16,
        lineHeight: '24px'
    }
}

export default connect(null, {})(withRouter(Movie));
