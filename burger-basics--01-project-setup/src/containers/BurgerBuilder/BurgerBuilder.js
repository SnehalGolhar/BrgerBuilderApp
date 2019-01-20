import React ,{Component} from 'react';
import Aux from '../../hoc/Auxhoc/Auxhoc';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Loader from '../../components/UI/Loader/Loader';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICE={
    salad:1,
    cheese:0.5,
    meat:0.8,
    bacon:1
} 



class BurgerBuilder extends Component{
    state={
       ingredients:null,
       totalPrice: 5,
       purchasable:false,
       purchasing:false,
       loading:false,
       error:null
          
    }

componentDidMount(){
  axios.get('/ingredients.json')
  .then(response=>{
      let updatedIng={...this.state.ingredients}
      if(response.data){
        updatedIng =response.data;
        this.setState({
            ingredients:updatedIng
        });
      }
      
  })
  .catch(error=>{
      this.setState({error:error});
  });
}

updatePurchasableState=(purchasableIng)=>{
    const sum=Object.keys(purchasableIng)
    .map(igKey=>{
       return  purchasableIng[igKey];
    })
    .reduce((sum,el)=>{
           return sum+el;
    },0);

    this.setState({
        purchasable:sum>0
    })
      
}

addingredienthandler=(type)=>{
  const oldCount=this.state.ingredients[type];
  const newCount=oldCount+1;
  const ingPrice=INGREDIENT_PRICE[type];
  const oldTotalPrice=this.state.totalPrice;
  const newTotalPrice=oldTotalPrice+ingPrice;
  const updatedIngridient={
      ...this.state.ingredients
  }
  updatedIngridient[type]=newCount;
  this.setState({
      ingredients:updatedIngridient,
      totalPrice:newTotalPrice
  })

  this.updatePurchasableState(updatedIngridient);
  console.log(this.state.totalPrice);
}

removeIngredientHandler=(type)=>{
    const oldCount=this.state.ingredients[type];
    if(oldCount===0){
        return;
    }
    const newCount=oldCount-1;
    const oldTotalPrice=this.state.totalPrice;
    const ingPrice=INGREDIENT_PRICE[type];
    const newPrice=oldTotalPrice -ingPrice;
    const updatedIngredient={
        ...this.state.ingredients
    }
    updatedIngredient[type]=newCount;
    this.setState({
        ingredients:updatedIngredient,
        totalPrice:newPrice
    })
    this.updatePurchasableState(updatedIngredient);   
}

purchaseHandler = () => {
    this.setState({purchasing: true});
}

purchaseCancelHandler = () => {
    this.setState({purchasing: false});
}

purchaseContinueHandler = () => {
   

    const queryParams=[];
    for(let i in this.state.ingredients){
          queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    }
    queryParams.push('price=' + this.state.totalPrice);
    const queryString= queryParams.join('&');
    this.props.history.push({
        pathname:'/checkout',
        search: '?'+queryString

    });
}



render(){
    const disableInfo={
        ...this.state.ingredients
    }
    for(let key in disableInfo){
        disableInfo[key]=disableInfo[key]<=0;
    }

    let orderSummary=null;

   
    let burger=this.state.error ? <p> Ingredients are not loading </p>: <Loader/>;
    if(this.state.ingredients){
        burger=(<Aux> <Burger ingredients={this.state.ingredients}/>
            <BuildControls addIngredient={this.addingredienthandler}
            removeIngredient={this.removeIngredientHandler}
            disabled={disableInfo}
            ordered={this.purchaseHandler}
            totalPrice={this.state.totalPrice}
            purchasable={this.state.purchasable}/></Aux>);

    orderSummary=<OrderSummary 
    ingredients={this.state.ingredients}
    totalPrice={this.state.totalPrice}
    purchaseCancelled={this.purchaseCancelHandler}
    purchaseContinued={this.purchaseContinueHandler} />;
    }
    
    if(this.state.loading){
        orderSummary=<Loader/>
     }


    return(
        <Aux>            
             <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
               {burger}
        </Aux>
    )
  }
}
export default WithErrorHandler(BurgerBuilder,axios);