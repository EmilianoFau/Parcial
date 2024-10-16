import React, { useEffect, useState } from "react";
import Recipe from "../Recipe/recipe";
import { useDishes } from "../../contexts/dishes";
import { getData } from "../../shared/server";
import Modal from "../Modal/modal";
import Styles from "./index.module.css";
import { useTheme } from '../../contexts/theme';

const Home = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    const { dishes, setDishes } = useDishes();
    const [openAddModal, setOpenAddModal] = useState(false);
  
    useEffect(() => {
      const loadData = async () => {
        try {
          const data = await getData("http://localhost:3000/dishes");
          setDishes(data);
          console.log(data);
        } catch (e) {
          console.error(e);
        }
      };
  
      loadData();
    }, [setDishes]);
  
    const openModal = () => {
      setOpenAddModal(true);
    };
  
    const closeModal = () => {
      setOpenAddModal(false);
    };

    return (
      <div className={Styles.homeContainer}>
        <h1>Recipes</h1>
        <div className={Styles.buttonContainer}>
          <button className={Styles.addButton} onClick={openModal}>
            Add recipe
          </button>
          {openAddModal && <Modal closeModal={closeModal} />}
        </div>
        <ul className={Styles.recipeList}>
          {dishes.map((dish) => (
            <li key={dish.id}>
              <Recipe dish={dish} />
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default Home;
  