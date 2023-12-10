import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearItem } from './slices/cartSlice';

const _arrangeCartItemsData = (cartItems) => {
    console.log('cartItems', cartItems);
    let cartItemsMap = new Map();
    cartItems.forEach(item => {
        let count;
        if (cartItemsMap.get(item.id)) {
            count = cartItemsMap.get(item.id).count + 1
        } else {
            count = 1
        }
        ;
        cartItemsMap.set(item.id, { ...item, count })
    });
    console.log(cartItemsMap, '2')
    return cartItemsMap;
};

const _calculateTotalPrice = (cartItemsValue) => {
    let totalPrice = 0;
    cartItemsValue.forEach(item => {
        totalPrice += item.count * item.price / 100;
    });
    return totalPrice;
}

const Cart = () => {

    const cartItems = useSelector(store => store.cart.items);

    const cartItemsData = _arrangeCartItemsData(cartItems);
    console.log(cartItemsData, '3')
    const cartItemsValue = [];
    cartItemsData.forEach(itemValue => cartItemsValue.push(itemValue));

    const dispatch = useDispatch();

    const clearCart = () => {
        dispatch(clearItem())
    }

    return (
        <div className='flex flex-col justify-center bg-yellow-100'>
            <div className='flex justify-center text-3xl mt-2 font-bold text-red-700'>
                Cart
            </div>
            <div className='flex justify-center mt-2 items-center'>
                <div className='flex flex-col justify-evenly'>
                    {cartItemsValue.map(item => (
                        <div className='flex justify-center my-4' key={item.id}>
                            <h1 className='font-bold px-4 text-xl'>{item.name}</h1>
                            <h2 className='px-4 font-semibold'>Price/ item - Rs. {item.price ? item.price / 100 : 0}</h2>
                            <h3 className='px-4 font-semibold text-sm'>Qty. {item.count}</h3>
                        </div>
                    ))}
                </div>
            </div>
            <div className='flex flex-col text-2xl my-6 border-t-2 items-center'>
                <div className='my-6 text-blue-800 font-bold'>
                    Total Price - { _calculateTotalPrice(cartItemsValue) }
                </div>
                <div className='my-6 text-lg font-bold text-white'>
                    <button onClick={() => clearCart()} className='bg-green-800 p-2'>Clear Cart</button>
                    <button onClick={() => window.alert('Kindly do not proceed to pay! :)')} className='bg-gray-400 p-2 ml-4'>Proceed to pay!</button>
                </div>
            </div>
        </div>
    )
};

export default Cart;