import React, { Component } from 'react';
import { initialize } from 'redux-form';
import ReactDOM from 'react-dom';

class Modal extends Component<any, any> {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        document.body.style.overflow = "hidden";
    }

    componentWillUnmount() {
        document.body.style.overflow = "visible";
    }

    unmount() {

    }

    handleClick(e) {
        e.stopPropagation()
    }

    render() {
        return ReactDOM.createPortal(
            <div id={this.props.id} onClick={(e) => { this.handleClick(e) }} style={{ position: "absolute", display: "flex", alignItems: "center", backgroundColor: "rgb(0,0,0,0.3)", justifyContent: "center", top: 0, left: 0, width: "100%", height: "100%", zIndex: 10000 }}>
                <div style={{ backgroundColor: "white", marginTop: "-100px", borderRadius: "4px", zIndex: 100000000, opacity: 1, padding: "56px", border: "1px solid #e2e2e2" }}>
                    {this.props.children}
                </div>
            </div>
            , document.body)
    }
}

export default Modal;