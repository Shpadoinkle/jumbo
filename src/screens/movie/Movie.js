import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
import FontAwesome from 'react-fontawesome';
import { safeReadParams, } from '../../helper';
import { getRandomColour, TEXT_BRAND_LIGHT, TEXT_BRAND } from '../../js';
import { MovieCard } from '../../components';

class Movie extends Component {
    initialState = {
        movieId: safeReadParams(this.props, 'movieId'),
        obj: {}
    }

    state = { ...this.initialState };

    componentDidMount() {
        if (this.state.movieId != null) {
            this.fetchMovieFromReducer();
            this.fetchMovieInfo();
        }
    }

    fetchMovieFromReducer() {
        const movieObj = _.find(this.props.list, (t) => { return t.id.toString() === this.state.movieId.toString(); });
        if (!_.isEmpty(movieObj)) {
            this.setState({ obj: movieObj });
        }
    }

    fetchMovieInfo = async () => {
        let searchString = encodeURIComponent(this.state.searchInput);
        searchString = searchString.replace(/%20/g, "+");

        let apiUrl = `https://api.themoviedb.org/3/movie/${this.state.movieId}?api_key=6ed12e064b90ae1290fa326ce9e790ff&language=en-US`;

        console.log(apiUrl)
        console.log('fetching??......');
        this.setState({ empty: false });

        axios({
            method: 'get',
            url: apiUrl,
        })
            .then((res) => {
                console.log('test results....')
                console.log(res.data);

                if (!_.isEmpty(res.data)) {
                    this.setState({ obj: res.data });
                } else {
                    this.setState({ empty: true, loading: false })
                }
            }).catch((err) => {
                console.log(err);
                console.log('error');
                this.setState({ loading: false });
            });
    }

    getBackImage() {
        if (!_.isEmpty(this.state.obj) && !_.isUndefined(this.state.obj.backdrop_path)) {
            return `url('http://image.tmdb.org/t/p/w1280${this.state.obj.backdrop_path}')`
        }
        return '';
    }

    renderInfo(data, optionalText) {
        if (_.isEmpty(this.state.obj) || _.isUndefined(data) || _.isEmpty(data.toString())) {
            return (
                <FontAwesome style={styles.spinner} name="spinner fa-pulse fa-fw" />
            );
        }
        if (optionalText) {
            return optionalText;
        }
        return data;
    }

    renderBottom() {
        if (_.isEmpty(this.state.obj) || _.isEmpty(this.state.obj.overview)) {
            return (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <FontAwesome style={styles.spinner} name="spinner fa-pulse fa-fw" />
                </div>
            );
        }
        return (
            <div>
                <div className='generalText mont' style={{ ...styles.listheader, fontSize: 18, marginBottom: 14 }}>
                    Overview
                </div>
                <div className='generalText text-mid' style={styles.info}>
                    {this.renderInfo(this.state.obj.overview)}
                </div>
            </div>
        );
    }

    timeConvert(n) {
        if (_.isUndefined(n)) {
            return '';
        }
        const num = n;
        const hours = (num / 60);
        const rhours = Math.floor(hours);
        const minutes = (hours - rhours) * 60;
        const rminutes = Math.round(minutes);
        return `${rhours}h ${rminutes} min`;
    }

    render() {
        return (
            <div className="relative pageContainer jumboBackground">
                {this.state.empty &&
                    <div style={{ display: 'flex', paddingTop: 60, justifyContent: 'center' }}>
                        <div className='generalText mont' style={{ ...styles.listheader, fontSize: 18, marginBottom: 14 }}>
                            Something went wrong, please try again
                        </div>
                    </div>
                }
                {!this.state.empty &&
                    <div>
                        <div className='movie-banner relative' style={{ backgroundImage: this.getBackImage() }} >
                            <MovieCard
                                style={{
                                    position: 'absolute',
                                    left: 20,
                                    bottom: -150
                                }}
                                // hasRating
                                movie={this.state.obj}
                            />
                        </div>
                        <div style={{ paddingLeft: 20, paddingRight: 20 }}>
                            <div style={styles.topInfo}>
                                <div className='generalText mont' style={styles.listheader}>
                                    {this.renderInfo(this.state.obj.title)}
                                </div>
                                <div className='generalText mont text-light' style={styles.goooF}>
                                    {this.renderInfo(this.state.obj.release_date, moment(this.state.obj.release_date, 'YYYY-MM-DD').format('YYYY'))} - {this.renderInfo(this.state.obj.vote_average, `${Math.floor((this.state.obj.vote_average / 10) * 100)}% User Score`)}
                                </div>
                                <div className='generalText mont text-light' style={styles.goooF}>
                                    {this.renderInfo(this.state.obj.runtime, this.timeConvert(this.state.obj.runtime))}
                                </div>
                            </div>
                            <div style={styles.bottomInfo}>
                                {this.renderBottom()}
                            </div>
                        </div>
                    </div>
                }
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
    },
    spinner: {
        color: TEXT_BRAND
    }
}

const mapStateToProps = (state) => {
    return {
        list: state.list.list
    };
};

export default connect(mapStateToProps, {})(withRouter(Movie));
