 import React from 'react';
 import classes from './Order.css';
 
 const order =(props)=>{     
     const ingredients=[];
     for(let ingredientName in props.ingredients){
         ingredients.push({'name':ingredientName,
        'value':props.ingredients[ingredientName]});
     }
      const ingredientOutput=ingredients.map(ig=>{
          return <span
          style={{
              textTransform:'Capitalize',
              display:'inline-block',
              textAlign:'center',
              margin :'0 10px',
              padding:'5px',
              border:'1px solid #ccc',

          }}
           key={ig.name}>
            {ig.name} ({ig.value})</span>
      })
    return <div className={classes.Order}>
         <p>Ingredients:{ingredientOutput} </p>
         <p> price:<strong> {props.price}</strong></p>
     </div>
 }
     
 
 export default order;