import React ,{Component} from 'react';
import Order from '../../components/Order/Order';
import Aux from '../../hoc/Auxhoc/Auxhoc';
import axios from '../../axios-orders';

class Orders extends Component{
    state={
        orders:[],
        loading:true,
    }
 componentDidMount(){
     axios.get('/orders.json')
     .then(response=>{
         const fetchedData=[];
         for(let key in response.data){
                fetchedData.push({
                    ...response.data[key],
                    id:key
                })
         }
         this.setState({
             loading:false,
             orders:fetchedData
         })
         console.log("Fetched Data" , fetchedData);
     })
     .catch(error=>{
         this.setState({
             loading:false
         });
         console.log(error);
     })
 }

render(){
    const orderData= this.state.orders.map(el=>{
        
       return <Order key={el.id} 
       ingredients={el.ingredients} 
       price={el.price}/>
    });

    
    return(
        <Aux>
            {orderData}
            </Aux>

    );
 }
}

export default Orders; 