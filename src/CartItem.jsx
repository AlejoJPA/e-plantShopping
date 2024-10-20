import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity, selectTotalQuantity, clearCart } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items); // 1) useSelector extracts data from Redux store! data stored as 'cart'.
  const totalQuantity = useSelector(selectTotalQuantity); // Get total number of plants
  const dispatch = useDispatch(); // useDispatch handles in the specified reducer from CartSlice!

  // 'calculateTotalAmount' returns the total amount for all products in the 'cart' (initial value '0' in reduce())
  const parseCost = (cost) => parseFloat(cost.replace('$','')); //Converting cost str into a number
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + parseCost(item.cost) * item.quantity, 0); 
  };

  
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ ...item, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    dispatch(updateQuantity({ ...item, quantity: item.quantity - 1 }));   
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item));
  }; 

  
  const calculateTotalCost = (item) => {
    return parseCost(item.cost) * item.quantity; // Calculate total cost based on quantity for an item
  };

  const handleClearCart = () => {
    dispatch(clearCart()); // Dispatch clearCart action
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <h3 style={{ color: 'black' }}>Total Plants in Cart: {totalQuantity}</h3> {/* Display total number of plants */}
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={onContinueShopping}>Continue Shopping</button> {/* Using the passed prop */}
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping}>Checkout</button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <button className="clear-cart-button" onClick={handleClearCart}>Clear Cart</button> {/* Clear cart button */}
      </div>

    </div>
  );
};

export default CartItem;
