    import React, { useContext, useReducer } from "react";
import { createContext } from "react";
import { cartReducer } from "../reducer/cartReducer";


    const initialState = {
        cartList: [],
        total: 0
    }

    const CartContext = createContext(initialState);

    export const CartProvider = ({children}) =>{

       const [state, dispatch ] = useReducer(cartReducer, initialState); 

       const addToCart = (product) =>{
            const updateCartList = state.cartList.concat(product);
            dispatch({
                type: "ADD_TO_CART",
                payload: {
                    products: updateCartList
                }
            })
       }

       const removeFromCart = (product) =>{
            const updateCartList = state.cartList.filter(current => current.id !== product.id);

            dispatch({
                type: "REMOve_FROM_CART",
                payload: {
                    products: updateCartList
                }
            })
       }


        const value = {
            total: state.total,
            cartList: state.cartList,
            addToCart,
            removeFromCart
        };

        return (
            <CartContext.Provider value={value}>
                {children}
            </CartContext.Provider>
        );

    }

    export const useCart = () =>{
        const context = useContext(CartContext);
        return context;
    }