import { useState, useEffect } from "react";
import CategoryContext from "./CategoryContext";
import { API_HOST } from "@env";

const CategoryState = (props) => {

    const [category, setCategory] = useState([]);
    const [catServices, setCatServices] = useState([]);
    const [reviews, setReviews] = useState([]);

    console.log(category, API_HOST);


    const getAllCategories = async () => {

        try {
            const response = await fetch(`${API_HOST}/api/serviceCategory`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            const allCategories = await response.json();

            setCategory(allCategories);
        }
        catch (err) {
            console.log("Get all Categories error : ", err.message);
        }
    }

    const getSpecificServiceReviews = async (id) => {
        try {
            const response = await fetch(`${API_HOST}/api/review/service/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            const serviceReview = await response.json();

            setReviews(serviceReview);

            // console.log("Cat Services", catServices);
        }
        catch (err) {
            console.log("Get review of a specific service error : ", err.message);
        }
    }


    return (
        <CategoryContext.Provider value={{ category, catServices, getAllCategories, reviews, getSpecificServiceReviews }}>
            {props.children}
        </CategoryContext.Provider>
    )

}

export default CategoryState;