import { createContext, useContext, useState } from "react";

export const DishesContext = createContext();

export const useDishes = () => {
    return useContext(DishesContext);
}

export function DishesProvider ({ children }) {
    const [dishes, setDishes] = useState([]);

    return (
        <DishesContext.Provider value={{dishes, setDishes}}>
            {children}
        </DishesContext.Provider>
    );
};