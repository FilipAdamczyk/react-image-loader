import React, { Component } from 'react'

class Image extends Component {
    constructor() {
        super();
        this.state = {
            available: false
        };
        this.loaded = this.loaded.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.src != this.props.src) {
            this.setState({
                available: false
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (this.state.available != nextState.available);
    }

    loaded() {
        this.setState({available: true});
    }

    render() {
        let { className, src } = this.props;

        className = (this.props.className ? this.props.className : '') + (this.state.available ? '' : "loading");

        if ( src && ! /^http[s]?:\/\//i.test(src) ) {
            src = window.location.origin + (src.charAt(0) == '/' ? '' : '/')+src;
        }

        return (
            <span>
                <img {...this.props} src={src} className={className ? className : null} onLoad={this.loaded} />
                this.state.available ? null : <i className="fa fa-refresh fa-spin fa-2x" title="Converting" />
            </span>
        )
    }
}
export default Image;