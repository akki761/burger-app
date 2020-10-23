import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        price: 4,
        purchasable: false,
        purchasing: false,
        loading: false
    };

    componentDidMount(){
        axios.get('/ingredients.json')
            .then(response => {
                this.setState({ingredients :  response.data});
            }).catch(error => {
                console.log(error);
            });
    }

    updatePurchaseState = (updatedIngredients)=>{
        const totalIngredients = Object.entries(updatedIngredients).reduce((total, currentVal) => {                   
            return total += currentVal[1];
        }, 0);
        const updatePurchaseState = totalIngredients > 0;
        this.setState({purchasable : updatePurchaseState});
    };

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type] + this.state.price;
        this.setState({
            price: priceAddition,
            ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount - 1;
        const updatedPrice = this.state.price - INGREDIENT_PRICES[type];
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        this.setState({
            ingredients: updatedIngredients,
            price: updatedPrice
        });
        this.updatePurchaseState(updatedIngredients);
    };

    purchaseHandler  = ()=> {
        this.setState({purchasing : true});    
    }

    purchaseCancelHander = () => {
        this.setState({purchasing : false});
    }

    purchaseContinueHandler = () => {
        const queryParams = [];
        for(let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.price);
        const queryString = '?' + queryParams.join('&');
        this.props.history.push({
            pathname : '/checkout',
            search : queryString
        });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0;
        }
        let orderSummary = null;
        let burger = <Spinner/>
        if(this.state.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler} 
                        disabledInfo={disabledInfo}
                        price={this.state.price}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}/>
                </Aux>
            );

            orderSummary = <OrderSummary ingredients={this.state.ingredients}
            purchaseContinue={this.purchaseContinueHandler}
            purchaseCancel={this.purchaseCancelHander}
            price={this.state.price}/>
            if(this.state.loading){
                orderSummary = <Spinner/>
            }
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHander}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);