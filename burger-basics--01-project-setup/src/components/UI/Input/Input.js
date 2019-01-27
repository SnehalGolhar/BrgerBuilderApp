import React from 'react';
import classes from './Input.css';

const input=(props)=>{  
    
    let inputElement=null;
    let validationError = null;
    const inputClasses=[classes.InputElement];
    if(props.invalid && props.shouldValidate&& props.touched){
        inputClasses.push(classes.Invalid);
        validationError = <p>Please enter a valid </p>;
    }

    switch(props.elementType){
        case'input':{
           inputElement=<input 
           className={inputClasses.join(' ')}  
           {...props.elementConfig}
           value={props.value}
           onChange={props.changed}/>;
           break;
        }
        case'textarea':{
            inputElement=<textarea 
             className={inputClasses.join(' ')}
             {...props.elementConfig}
             value={props.value}/>;
            break;
        }
        case'select':{
             inputElement=(<select 
             className={inputClasses.join(' ')}
             value={props.value}>
             {props.elementConfig.options.map(element=>(
                    <option key={element.value} value={element.value}>{element.displayValue}</option>
             ))}
             </select>);
             break;
        }
        default:{
            inputElement=<input 
             className={inputClasses.join(' ')}
             {...props.elementConfig}
             value={props.value}/>;
            break;
        }
    }
    return(
        <div className={classes.Input}>
            <label className={classes.Label}></label>
            {inputElement}
            {validationError}
        </div>
    )
}

export default input; 