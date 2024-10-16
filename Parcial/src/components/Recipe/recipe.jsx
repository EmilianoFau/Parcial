import React from "react";
import { useNavigate } from 'react-router-dom';
import { useDishes } from "../../contexts/dishes";
import { deleteData } from "../../shared/server";
import Styles from './index.module.css';

const Recipe  = ({ dish }) => {
    const navigate = useNavigate();
    const { dishes, setDishes } = useDishes();

    const handleDeleteClick = async (id) => {
        try {
            await deleteData('http://localhost:3000/dishes', id);
            setDishes((prevDishes) => prevDishes.filter(dish => dish.id !== id));
        } catch(error) {
            console.log('Error deleting recipe: ', error);
        }
    };

    const handleDetailsClick = (id) => {
        navigate(`/dishes/${id}`);
    }

    return (
        <div className = {Styles.cardStructure}>
            <h2 className={Styles.title}>{dish.name}</h2>
            <div className = {Styles.buttons}>
                <button className = {Styles.cardButton} onClick={() => handleDetailsClick(dish.id)}>Details</button>
                <button className = {`${Styles.cardButton} ${Styles.deleteButton}`} onClick={() => handleDeleteClick(dish.id)}>Delete</button>
            </div>
        </div>
    );
}

export default Recipe;