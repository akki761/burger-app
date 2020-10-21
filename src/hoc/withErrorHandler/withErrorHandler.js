import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';


const withErrorHandler = (WrapperComponent, axios) => {
    return class extends Component {

        state = {
            error : null
        }

        componentWillMount(){
           // console.log("Inside constructor")
          //  super(props);
            //console.log("Inside error handler constructor");
            this.reqInterceptor = axios.interceptors.request.use(request => { 
                this.setState({error : null});
                //console.log("req" + this.state.error);
                return request;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                console.log("response intercepted");
                console.log(error)
                this.setState({ error : error });
               console.log(this.state.error);
            });
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        dismissErrorHandler = () => {
            this.setState({error : null});
        }

        render() {
            return (
                //add all the props that has been used on this component
                <Aux>
                    <Modal show={this.state.error} modalClosed={this.dismissErrorHandler}>
                        {this.state.error ? this.state.error.message : ''}
                    </Modal>
                    <WrapperComponent {...this.props}/>
                </Aux>
            );
        }
    }
};

export default withErrorHandler;