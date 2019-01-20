import React from 'react';
import Burger from '../../Burger/Burger';
import classes from './CheckoutSummary.css';
import Button from '../../UI/Button/Button';

const checkoutSummary=(props)=>{    
  return (
    <div className={classes.CheckoutSummary}>
            <h1>It looks tasty</h1>
            <div style={{width:'100%', margin:'auto'}}>
            <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType="Danger"
            clicked={props.checkouCancelled}>Cancel</Button>
            <Button btnType="Success"
            clicked={props.checkoutContinued}>Continue</Button>
                    
    </div>
    );
}
    


export default checkoutSummary;