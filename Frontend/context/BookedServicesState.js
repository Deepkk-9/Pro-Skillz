import { useState } from "react";
import BookedServicesContext from "./BookedServicesContext";
import { API_HOST } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BookedServicesState = (props) => {

    // console.log(API_HOST);
    console.log(API_HOST);

    const [bookedServices, setBookedServices] = useState(null);

    const updateBookedServices = async () => {
        try {
            const tokenG = await JSON.parse(await AsyncStorage.getItem("loggedServiceProvider"));

            const response = await fetch(`${API_HOST}/api/bookedService/user`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${tokenG}`
                }
            });

            const allBookedServices = await response.json();

            // console.log("Res : ", allBookedServices);

            setBookedServices(allBookedServices);
        }
        catch (err) {
            console.log("Some error occured : ", err.message);
        }
    }


    return (
        <BookedServicesContext.Provider value={{ bookedServices, updateBookedServices }}>
            {props.children}
        </BookedServicesContext.Provider>
    )

}

export default BookedServicesState;