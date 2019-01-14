import React from 'react';
import logoImg from '../../assets/Images/burger-logo.png';
import classes from './Logo.css'

const logo=(props)=>(
    <div className={classes.Logo}>
    <img className={classes.Img} src={logoImg} alt="Burgerlogo"/>
</div>
)
   

export default logo;