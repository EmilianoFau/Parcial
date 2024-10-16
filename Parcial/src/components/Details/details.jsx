import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getElement } from "../../shared/server";
import Styles from './index.module.css';
import Modal from "../Modal/modal";
import { useTheme } from '../../contexts/theme';

const Details = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { isDarkMode, toggleTheme } = useTheme();
    const [currentDish, setCurrentDish] = useState(null);
    const [openAddModal, setOpenAddModal] = useState(false);

    useEffect(() => {
        const fetchDish = async () => {
            try {
                const data = await getElement('http://localhost:3000/dishes', id);
                setCurrentDish(data);
            } catch (error) {
                console.error("Error obtaining dish: ", error);
            }
        };
        fetchDish();
    }, [id, currentDish]);

    const openModal = () => {
        setOpenAddModal(true);
    };

    const closeModal = () => {
        setOpenAddModal(false);
    };

    const handleBackClick = () => {
        navigate('/');
    }

    return (
        <div className={`${Styles.detailsContainer} ${isDarkMode ? Styles.darkModeContainer : ''}`}>
            <div className={Styles.buttonContainer}>
                <button onClick={handleBackClick} className={Styles.backButton}>Back</button>
                <button onClick={toggleTheme} className={`${Styles.toggleThemeButton} ${isDarkMode ? Styles.darkModeButton : ''}`}>{isDarkMode ? 'Light mode' : 'Dark mode'}</button>
            </div>
            {currentDish ? (
                <>
                    <div className={Styles.infoContainer}>
                    <h2 className={`${Styles.titles} ${isDarkMode ? Styles.darkModeTitle : ''}`}>Name</h2>
                    <h3 className={`${Styles.info} ${isDarkMode ? Styles.darkModeInfo : ''}`}>{currentDish.name}</h3>
                    </div>
                    <div className={Styles.infoContainer}>
                        <h2 className={`${Styles.titles} ${isDarkMode ? Styles.darkModeTitle : ''}`}>Description</h2>
                        <h3 className={`${Styles.info} ${isDarkMode ? Styles.darkModeInfo : ''}`}>{currentDish.description}</h3>
                    </div>
                    <div className={Styles.infoContainer}>
                        <h2 className={`${Styles.titles} ${isDarkMode ? Styles.darkModeTitle : ''}`}>Type</h2>
                        <h3 className={`${Styles.info} ${isDarkMode ? Styles.darkModeInfo : ''}`}>{currentDish.type}</h3>
                    </div>
                    <div className={Styles.infoContainer}>
                        <h2 className={`${Styles.titles} ${isDarkMode ? Styles.darkModeTitle : ''}`}>Preparation</h2>
                        <h3 className={`${Styles.info} ${isDarkMode ? Styles.darkModeInfo : ''}`}>{currentDish.preparation}</h3>
                    </div>
                </>
            ) : (
                <p className={Styles.loading}>Loading dish...</p>
            )}
            <div className={Styles.editButtonContainer}>
                <button onClick={openModal} className={Styles.editButton}>Edit</button>
            </div>
            {openAddModal && <Modal isEdit={true} currentDish={currentDish} closeModal={closeModal} />}
        </div>
    )
}

export default Details;