import React, { Component } from 'react';
import classes from './Modal.module.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState){
        //component should update when show property has changed or when there is change in children
        //i.e. first there was ordersummary component and when loading is true then show loader
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }
    
    render() {
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}

export default Modal;