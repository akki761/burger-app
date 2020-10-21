import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component{

    state={
        ingredients: {
            cheese:0,
            salad:0,
            meat:0,
            bacon:0
        }
    }

    componentDidMount(){
        const queryParams = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for(let param of queryParams.entries()){
            ingredients[param[0]] = +param[1];
        }
        this.setState({ingredients : ingredients});
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
            </div>
        );
    }
}

export default Checkout;