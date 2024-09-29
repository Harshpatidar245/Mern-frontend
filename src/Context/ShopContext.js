import React, { createContext, useState, useEffect, useContext } from 'react';
import all_product from '../Components/Assets/all_product';
import { AuthContext } from './AuthContext';

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < all_product.length + 1; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {
    const { token } = useContext(AuthContext);
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : getDefaultCart();
    });
    const [wishlist, setWishlist] = useState(() => {
        const savedWishlist = localStorage.getItem('wishlist');
        return savedWishlist ? JSON.parse(savedWishlist) : [];
    });

    useEffect(() => {
        if (token) {
            fetchCartItems();
            fetchWishlist();
        }
    }, [token]);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const fetchCartItems = async () => {
        const response = await fetch('http://localhost:3000/cart', {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        const data = await response.json();
        setCartItems(data);
    };

    const fetchWishlist = async () => {
        const response = await fetch('http://localhost:3000/wishlist', {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        const data = await response.json();
        setWishlist(data);
    };

    const saveCartItems = async (cart) => {
        await fetch('http://localhost:3000/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ cartItems: cart }),
        });
    };

    const saveWishlist = async (wishlist) => {
        await fetch('http://localhost:3000/wishlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ wishlist }),
        });
    };

    const addToCart = (itemId) => {
        setCartItems(prev => {
            const newCart = { ...prev, [itemId]: (prev[itemId] || 0) + 1 };
            saveCartItems(newCart);
            return newCart;
        });
    };

    const removeFromCart = (itemId) => {
        setCartItems(prev => {
            const newCart = { ...prev, [itemId]: Math.max((prev[itemId] || 1) - 1, 0) };
            saveCartItems(newCart);
            return newCart;
        });
    };

    const toggleWishlist = (itemId) => {
        setWishlist(prev => {
            const newWishlist = prev.includes(itemId) 
                ? prev.filter(id => id !== itemId) 
                : [...prev, itemId];
            saveWishlist(newWishlist);
            return newWishlist;
        });
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item));
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
    };

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    };

    const contextValue = {
        getTotalCartItems,
        getTotalCartAmount,
        all_product,
        cartItems,
        addToCart,
        removeFromCart,
        wishlist,
        toggleWishlist,
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
