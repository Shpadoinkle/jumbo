import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { MovieCard } from '../../components';

class MoviePreview extends Component {
    state = {
        obj: {}
    };

    componentWillMount() {
        this.updateProps(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.updateProps(nextProps);
    }

    updateProps(props) {
        this.setState({ obj: props.movie });
    }

    goToMovie() {
        if (!_.isEmpty(this.state.obj) && !_.isUndefined(this.state.obj.id)) {
            this.props.history.push(`/movie/${this.state.obj.id}`);
        }
    }

    render() {
        return (
            <div className='movie-p' onClick={() => { this.goToMovie() }}>
                <MovieCard
                    hasRating
                    movie={this.state.obj}
                />
                <div className='movie-p-bottom'>
                    <div className='movie-p-title'>
                        {this.state.obj.title}
                    </div>
                    <div className='movie-p-date'>
                        {moment(this.state.obj.release_date, 'YYYY-MM-DD').format('MMMM YYYY')}
                    </div>
                </div>
            </div>
        );
    }
}

const styles = {

}

export default connect(null, {})(withRouter(MoviePreview));
