import React, {Component} from 'react';
import Aux from '../Auxhoc/Auxhoc';
import classes from '../Layout/Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';


class Layout extends Component{
    state={
        showSidedrawer: false
    }

    closesideDrawerHandler=()=>{
        this.setState({
            showSidedrawer:false
        });
    }

    opensideDrawerhandler=()=>{
        this.setState((prevstate)=>{
           return { showSidedrawer:!prevstate.showSidedrawer}
        });
    }
    render(){
        return(
            <Aux> 
                <div> 
                    <Toolbar opened={this.opensideDrawerhandler}/>
                    <SideDrawer open={this.state.showSidedrawer} closed={this.closesideDrawerHandler}/>
                </div>
                <main className={classes.Content}>
                    {this.props.children} 
                </main>
            </Aux>
        )
    }

}

export default Layout; 