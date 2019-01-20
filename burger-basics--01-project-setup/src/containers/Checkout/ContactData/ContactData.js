 import React , {Component} from 'react';
 import Button from '../../../components/UI/Button/Button';
 import classes from './ContactData.css';
 import axios from '../../../axios-orders';
 import Loader from '../../../components/UI/Loader/Loader';
 import Input from '../../../components/UI/Input/Input';
 import WithErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
 
 class ContactData extends Component{
   state={
       name:'Snehal',
       email:'nsnsn',
       address:{
           street:'',
           postalCode:''
       },
       loading:false
   }
  
   orderHandler=(event)=>{
       event.preventDefault();       
        this.setState({
        loading:true        
        });

    const orders={
        ingredients:this.props.ingredients,
        price:this.props.totalPrice,
        customer:{
            name: 'Snehal Golhar',
            Address:{
                street:'101 E San Fernando',
                city:'Fremont',
                zipcode:'94538',
                State:'California' 
            },
            deliveryMethod:'fastest'  
        }
    }
             axios.post('/orders.json',orders)
             .then(response=>{
                 this.setState({loading:false});
                 this.props.history.push('/');
             })
             .catch(error=>{
                 console.log('error', error);
             });
   }


    

   render(){
    let form=(<form>
        <Input inputtype={'text'} type='text'  placeholder='Name'/>
        <Input inputtype={'text'}  type='email'  placeholder='Email'/>
        <Input inputtype={'text'}  type='text'  placeholder='street'/>
        <Input inputtype={'text'}  type='text'  placeholder='Postal Code'/>
        <Button btnType='Success' clicked={this.orderHandler}> ORDER </Button>
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