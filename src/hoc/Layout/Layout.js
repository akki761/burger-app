import React, {Component} from 'react';
import Aux from '../Aux/Aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Naviagtion/Toolbar/Toolbar';
import SideDrawer from '../../components/Naviagtion/SideDrawer/SideDrawer';

class Layout extends Component{

    state = {
        showSideDrawer: false
    };

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer : false});
    }

    toggleSideDrawerHandler = () => {
        const toggleState = !this.state.showSideDrawer;
        this.setState({showSideDrawer : toggleState});
    }

    render(){
        return (
            <Aux>
                <Toolbar toggleSideBar={this.toggleSideDrawerHandler}/>
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}/>
                <main className = {classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;