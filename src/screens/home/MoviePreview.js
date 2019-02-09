import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import _ from 'lodash';
import { MovieCard } from '../../components';

class MoviePreview extends Component {
    // getClassNames() {
    //     let string = '';
    //     if (this.props.small) {
    //         string = string + ' monster--small';
    //     }
    //     return string;
    // }

    render() {
        return (
            <div className='movie-p'>
                <MovieCard
                    hasRating
                />
                <div className='movie-p-bottom'>
                    <div className='movie-p-title'>
                        Avengers Infinity War
                    </div>
                    <div className='movie-p-date'>
                        April 2018
                    </div>
                </div>
            </div>
        );
    }
}
        
const styles = {
        
}

export default connect(null, {})(withRouter(MoviePreview));
