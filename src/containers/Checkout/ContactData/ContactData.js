import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component{
    state = {
        name: '',
        email:'',
        address: {
            street: '',
            pincode: ''
        },
        loading: false,
    }

    orderHandler = (event) => {
        event.preventDefault();
        //alert("You go!!");
        //for firebase any node name or relative path plus json as url
        this.setState({loading : true});
        const order = {
            ingredients : this.props.ingredients,
            totalPrice : this.props.price,
            //adding additional data, not necessary
            customer : {
                name : 'Akash Gupta',
                address : {
                    street : 'MG Road',
                    zipcode : '1234'
                },
                email : 'akash@xyz'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                //set purchasing to false such that modal will be closed once we get the response or
                //error
                this.setState({loading : false})
                this.props.history.push('/');
            }).catch(error => {
                this.setState({loading : false})
                console.log(error);
            });
    }


    render(){
        let form = (<form className={classes.Input}>
                <input type="text" name="name" placeholder="Enter name..."/>
                <input type="email" name="email" placeholder="Enter email..."/>
                <input type="text" name="street" placeholder="Enter street..."/>
                <input type="text" name="pincode" placeholder="Enter pincode..."/>
                <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
            </form>);
        if(this.state.loading){
            form = <Spinner/>   
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter Contact Info</h4>
                {form}
            </div>
        );
    }
}

export default ContactData