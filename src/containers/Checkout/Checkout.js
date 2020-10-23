import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component{

    state={
        ingredients: null,
        totalPrice:0
    }

    /*before component mounting and rendering child component need to update ingredient state from
    *null to current state as ContactData will throw error.
    */
    componentWillMount(){
        const queryParams = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price=0;
        for(let param of queryParams.entries()){
            
            if(param[0] === 'price'){
                price=param[1];
            }else{
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({ingredients : ingredients, totalPrice : price});
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>
                {/** A point to here is that we are manually rendering component here
                 * by using render={} not component={} due to which this.props.history and all 
                 * will not be present in the component rendered. One way is to wrap ContactData export in 
                 * ContactData.js with withRouter helper component other is to pass props maually 
                 * to contact data
                 */}
                <Route path={this.props.match.path + '/contact-data'} render={(props) => (<ContactData
                    ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)}/>
            </div>
        );
    }
}

export default Checkout;