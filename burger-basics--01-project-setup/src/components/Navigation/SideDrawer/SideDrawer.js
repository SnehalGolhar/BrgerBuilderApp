import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxhoc/Auxhoc';

const sideDrawer =(props)=>{
    let attachedClasess=[classes.Sidedrawer, classes.Close];
    if(props.open){
        attachedClasess=[classes.Sidedrawer, classes.Open];
    }
 return(
     <Aux>
     <Backdrop show={props.open} clicked={props.closed}/>
     <div className={attachedClasess.join(' ')}>
        <div className={classes.Logo}>
         <Logo/>
         </div>
         <nav>
         <NavigationItems/>
         </nav>
     </div>
     </Aux>
 );
}

export default sideDrawer; 