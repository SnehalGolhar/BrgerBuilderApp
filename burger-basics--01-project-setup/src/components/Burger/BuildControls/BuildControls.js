import React from 'react';
import BuildControl from './BuildControl/BuildControl'
import classes from './BuildControls.css'

const items=[
    {label:'Salad',type:'salad'},
    {label:'Meat',type:'meat'},
    {label:'Cheese',type:'cheese'},
    {label:'Bacon',type:'bacon'},
];
const buildControls=(props)=>(
    <div className={classes.BuildControls}>
    <p>Current price :<strong>{props.totalPrice.toFixed(2)}</strong></p>
    {items.map(item=>{
        return  <BuildControl key={item.label} 
        label={item.label }
        added={()=>props.addIngredient(item.type)}
        removed={()=>{props.removeIngredient(item.type)}}
        disabled={props.disabled[item.type]}/>
    })}
        
        <button className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}>ORDER NOW</button>
    </div>
);

export default buildControls;