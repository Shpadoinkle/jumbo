import React, { Component } from 'react';
import _ from 'lodash';

class MovieCard extends Component {
    state = {
        obj: {}
    };

    //http://image.tmdb.org/t/p/w185//nBNZadXqJSdt05SHLqgT0HuC5Gm.jpg

    componentWillMount() {
        this.updateProps(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.updateProps(nextProps);
    }

    updateProps(props) {
        this.setState({ obj: props.movie });
    }

    getBackImage() {
        if (!_.isEmpty(this.state.obj) && !_.isUndefined(this.state.obj.poster_path)) {
            return `url('http://image.tmdb.org/t/p/w185${this.state.obj.poster_path}')`
        }
        return '';
    }

    render() {
        return (
            <div className='movie-p-top' style={{ ...this.props.style, backgroundImage: this.getBackImage() }}>
                {this.props.hasRating &&
                    <div className='movie-p-rating'>
                        <div className='movie-p-rating--text'>
                            {Math.floor((this.state.obj.vote_average / 10) * 100)}%
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
