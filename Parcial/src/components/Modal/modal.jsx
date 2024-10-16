import React, {useState} from "react";
import { useDishes } from "../../contexts/dishes";
import { postData, putData } from "../../shared/server";
import Styles from './index.module.css';

const Modal = ({ isEdit, currentDish, closeModal }) => {
    const { setDishes } = useDishes();

    const [name, setName] = useState(isEdit ? currentDish.name : '');
    const [description, setDescription] = useState(isEdit ? currentDish.description : '');
    const [type, setType] = useState(isEdit ? currentDish.type : '');
    const [preparation, setPreparation] = useState(isEdit ? currentDish.preparation : '');

    const convertToJson = () => {
        return {
            name: name, 
            description: description,
            type: type,
            preparation: preparation,
        }
    }

    const handleAddRecipe = async (event) => {
        event.preventDefault();
        const newDish = convertToJson();

        console.log('New dish before adding: ', newDish);

        try {
            if (isEdit) {
                const response = await putData(`http://localhost:3000/dishes/${currentDish.id}`, newDish);
                if (response.id) {
                    console.log('Edited recipe: ', response);
                    setDishes((prevDishes) => prevDishes.map(dish => dish.id === isEdit ? response : dish));
                }
            } else {
                const response = await postData('http://localhost:3000/dishes', newDish);

                if (response.id) {
                    console.log('Added recipe: ', response);
                    setDishes((prevDishes) => [...prevDishes, response]);
                }
            }

            closeModal();
        } catch(error) {
            console.error("Error: ", error);
        }
    }

    return (
        <div className={Styles.overlay}>
            <div className={Styles.modal}>
                <h2 className={Styles.title}>{isEdit ? `Edit recipe` : `Add recipe`}</h2>
                <form onSubmit={handleAddRecipe}>
                    <div>
                        <label>Name</label>
                        <div>
                            <input type="text" placeholder="Dish name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                    </div>

                    <div>
                        <label>Description</label>
                        <div>
                            <input type="text" placeholder="Recipe description" value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>
                    </div>

                    <div>
                        <label>Type</label>
                        <div>
                            <input type="text" placeholder="Dish type" value={type} onChange={(e) => setType(e.target.value)} />
                        </div>
                    </div>

                    <div>
                        <label>Preparation</label>
                        <div>
                            <input type="text" placeholder="Recipe preparation" value={preparation} onChange={(e) => setPreparation(e.target.value)} />
                        </div>
                    </div>
                    <div className={Styles.buttons}>
                        <button type="submit" className={Styles.modalButton}>{isEdit ? 'Edit' : 'Add'}</button>
                        <button onClick={closeModal} className={`${Styles.modalButton} ${Styles.cancelButton}`}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Modal;