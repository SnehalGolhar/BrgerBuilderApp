 import React , {Component} from 'react';
 import Button from '../../../components/UI/Button/Button';
 import classes from './ContactData.css';
 import axios from '../../../axios-orders';
 import Loader from '../../../components/UI/Loader/Loader';
 import Input from '../../../components/UI/Input/Input';
 import WithErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

 
 class ContactData extends Component{
   state={
    orderForm:{
        name:{
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'Your name'
            },
            value:'',
            validation:{
                required:true
            },
            valid:false,
            touched:false
        },
        street:{
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'Your Street Address'
            },
            value:'',
            validation:{
                required:true
            },
            valid:false,
            touched:false

        },
        city:{
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'Your City'
            },
            value:'',
            validation:{
                required:true
            },
            valid:false,
            touched:false
        },
        zipcode:{
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'Zipcode'
            },
            value:'',
            validation:{
                required:true,
                minLength:5,
                maxLength:5
            },
            valid:false,
            touched:false
        },
        country:{
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'Your Country'
            },
            value:'',
            validation:{
                required:true
            },
            valid:false,
            touched:false
        },   
        email:{
            elementType:'input',
            elementConfig:{
                type:'email',
                placeholder:'Your E-mail'
            },
            value:'',
            validation:{
                required:true
            },
            valid:false,
            touched:false
        },     
        deliveryMethod:{
            elementType:'select',
            elementConfig:{
                options:[{value:'fastest', displayValue:'Fastest'},
                {value:'DriveIn', displayValue:'Drive In'},
                {value:'cheapest', displayValue:'Cheapest'}]                
            },
            value:'fastest',
            validation:{},
            valid:true 
        }   
    },
       loading:false,
       formIsValid:false
   }
   
  

   orderHandler=(event)=>{
       event.preventDefault();       
        this.setState({
        loading:true        
        });

    const orderFormdata={};
    for(let inputElement in this.state.orderForm){
        orderFormdata[inputElement]=this.state.orderForm[inputElement].value;
    }

    const orders={
        ingredients:this.props.ingredients,
        price:this.props.totalPrice,
        orderdata:orderFormdata
      
    }
             axios.post('/orders.json', orders)
             .then(response=>{
                 this.setState({loading:false});
                 this.props.history.push('/');
             })
             .catch(error=>{
                 console.log('error', error);
             });
   }

   changeInuputHandler=(event,inputIdentifier)=>{
     const updatedOrderform={...this.state.orderForm};
     const updatedInput={...updatedOrderform[inputIdentifier]};
     updatedInput.valid=this.checkValidity(event.target.value,updatedInput.validation)
     updatedInput.touched=true;
     updatedInput.value=event.target.value;
     updatedOrderform[inputIdentifier]=updatedInput;
    let formIsValid=true;
    console.log(updatedInput);
    for(let inputIdentifier in updatedOrderform){        
        formIsValid=updatedOrderform[inputIdentifier].valid && formIsValid;
    }

     this.setState({
        orderForm:updatedOrderform,
        formIsValid:formIsValid
     });
   }

   checkValidity=(value, rules)=>{
    let isValid=false;
    if(rules.required){
        isValid=value.trim() !== '';
    }
    if(rules.minLength){
        isValid=value.length>=rules.minLength && isValid;
    }
    if(rules.maxLength){
        isValid=value.length<=rules.maxLength && isValid;
    }
   
    return isValid;

}
    

   render(){
       let formInput=[];
      for(let key in this.state.orderForm){
          formInput.push({
            id:key,
            config:this.state.orderForm[key]
          });
      }
      
    let form=(
      <form onSubmit={this.orderHandler}>
       {
           formInput.map(inputElement=>(               
            <Input 
            key={inputElement.id} 
            elementType={inputElement.config.elementType}
            elementConfig={inputElement.config.elementConfig}
            value={inputElement.config.value}
            invalid={!inputElement.config.valid}
            touched={inputElement.config.touched}
            shouldValidate={inputElement.config.validation}
            changed={(event)=>this.changeInuputHandler(event,inputElement.id)}/>
           ))        
       }
        
        <Button btnType='Success' disabled={!this.state.formIsValid}> ORDER </Button>
    </form>);

    if(this.state.loading){
        form=<Loader/>;
    }
       return(
           <div className={classes.ContactData}>
           <h2>Enter your data</h2>
               {form}
           </div>
       )
   }
 }

 export default WithErrorHandler(ContactData,axios);