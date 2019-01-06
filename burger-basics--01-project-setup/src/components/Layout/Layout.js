import React from 'react';
import Aux from '../../hoc/Aux';
import classes from '../Layout/Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';


const layout= ( props ) => (
<Aux>
    <div> 
        <Toolbar/>
    </div>
    <main className={classes.Content}>
        {props.children} 
    </main>
</Aux>
);

export default layout; 