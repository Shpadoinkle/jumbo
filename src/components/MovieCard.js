import React, { Component } from 'react';

class MovieCard extends Component {
    render() {
        return (
            <div className='movie-p-top' style={{ ...this.props.style }}>
                {this.props.hasRating &&
                    <div className='movie-p-rating'>
                        <div className='movie-p-rating--text'>
                            80%
                        </div>
                    </div>
                }
            </div>
        );
    }
}

const styles = {
};

export { MovieCard };
