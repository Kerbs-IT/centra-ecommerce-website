import { AuthContext } from "@/AuthContext";
import { toast } from "@/components/ui/toast";

import { createContext, useContext, useState } from "react";

export const CartContext = createContext(null);

export function CartProvider({ children }) {
    const { isAuth } = useContext(AuthContext);
    const [ cart, setCart ] = useState([]);

    function addToCart(product) {
        if (!isAuth) {
            toast.add({
              type: "error",
              description: "Please log in to add items to your cart.",
              timeout: 1500,
            });

            return;
        }

        setCart((prev) => {
            const existing = prev.find((i) => i.id === product.id);
            if (existing) {
                return prev.map((i) =>
                    i.id === product.id ? { ...i, qty: i.qty + 1 } : i
                );
            }
            return [...prev, { id: product.id, qty: 1 }];

        });
         toast.add({
           type: "success",
           description: `${product.name} added to cart.`,
           timeout: 1500,
         });
    }
    // const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart}}>
            {children}
        </CartContext.Provider>
    );
}