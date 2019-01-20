import React from 'react';
import classes from './Burger.css';
import {withRouter} from 'react-router-dom';
import BurgerIngredient from './BurgeringredIent/BurgerIngredient';

const burger=(props)=>{
    console.log(props);
    let transformedIng=Object.keys(props.ingredients)
    .map(igKey=>{
        return [...Array(props.ingredients[igKey])].map((_,i)=>{
            return <BurgerIngredient key={igKey+i} type={igKey}/>
    
        });
    })
    .reduce((arr,el)=>{
        return arr.concat(el);
    },[]);

    if(transformedIng.length===0){
      transformedIng=<p>Start adding Ingredients</p>
    }
    return(
        <div className={classes.Burger}>
        <BurgerIngredient type="bread-top"/> 
        {transformedIng}
       
        <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default withRouter(burger);
