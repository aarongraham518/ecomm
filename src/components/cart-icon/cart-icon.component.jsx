import { useContext } from 'react';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import { CartContext } from '../../context/cart.context';

import './cart-icon.styles.scss';

export const CartIcon = () => {
    const {isCartOpen, setIsCartOpen} = useContext(CartContext);

    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen)

    return (
        <div className='cart-icon-container'>
            <ShoppingIcon className='shopping-icon' onClick={toggleIsCartOpen}/>
            <span className='item-count'>10</span>
        </div>
    )
}