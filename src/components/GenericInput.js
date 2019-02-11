import React, { Component } from 'react';
import _ from 'lodash';

class GenericInput extends Component {
    getAutoComplete() {
        if (!_.isUndefined(this.props.autoComplete)) {
            return this.props.autoComplete ? 'on' : 'off';
        }
        return 'off';
    }

    render() {
        return (
            <div style={styles.row} className={'genericInput-outer'} >
                <input
                    id={this.props.id}
                    placeholder={!_.isUndefined(this.props.placeholder) ? this.props.placeholder : ''}
                    type={'text'}
                    className={'genericInput'}
                    value={this.props.value}
                    onChange={this.props.onChange}
                    onKeyPress={this.props.onEnter}
                    style={{ ...this.props.inputStyle }}
                    autoComplete={this.getAutoComplete()}
                />
                {this.props.extraContent && this.props.extraContent}
            </div>
        );
    }
}

const styles = {
    // row: {
    //     display: 'flex',
    //     flexDirection: 'row',
    //     marginBottom: 8,
    //     alignItems: 'center'
    // }
};

export { GenericInput };
