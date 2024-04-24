import { useEffect, useState } from "react";
import CartContext from "./CartContext";
import { API_HOST } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CartState = (props) => {

    const [cart, setCart] = useState({});

    console.log(API_HOST);

    const getAllServicesFromCart = async () => {
        try {

            const tokenG = await JSON.parse(await AsyncStorage.getItem("loggedUser"));

            const response = await fetch(`${API_HOST}/api/carts`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${tokenG.token}`
                }
            });

            const allServices = await response.json();

            console.log(allServices);

            setCart(allServices);
        }
        catch (err) {
            console.log("Get all Services from cart error : ", err.message);
        }
    }


    const addInCart = async (serviceId) => {
        try {
            const tokenG = await JSON.parse(await AsyncStorage.getItem("loggedUser"));

            const response = await fetch(`${API_HOST}/api/carts`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${tokenG.token}`
                },
                body: JSON.stringify({ serviceId }),
            });

            const getRes = await response.json();

            setCart(getRes);
        }
        catch (err) {
            console.log("Error to add a service inside a cart : ", err.message);
        }
    }

    const removeFromCart = async (serviceId) => {
        try {
            const tokenG = await JSON.parse(await AsyncStorage.getItem("loggedUser"));

            const response = await fetch(`${API_HOST}/api/carts`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${tokenG.token}`
                },
                body: JSON.stringify({ serviceId })
            });

            const getRes = await response.json();

            setCart(getRes);
        }
        catch (err) {
            console.log("Error to remove a service from a cart : ", err.message);
        }
    }


    const getCartServiceInfo = async (service_id) => {
        try {
            const response = await fetch(`${API_HOST}/api/service/${service_id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            const getService = await response.json();

            setCartService(getService);

            console.log("Cart Service info :", getService);
        }
        catch (err) {
            console.log("Get Cart Service info error : ", err.message);
        }
    }

    return (
        <CartContext.Provider value={{ cart, getAllServicesFromCart, addInCart, removeFromCart, getCartServiceInfo }}>
            {props.children}
        </CartContext.Provider>
    )

}

export default CartState;