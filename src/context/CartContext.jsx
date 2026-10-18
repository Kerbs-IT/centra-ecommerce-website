import { AuthContext } from "@/AuthContext";
import { toast } from "@/components/ui/toast";

import { createContext, useContext, useState } from "react";

export const CartContext = createContext(null);

export function CartProvider({ children }) {
    const { isAuth,currentUser } = useContext(AuthContext);
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
        const isMine = (i) =>
          i.userId === currentUser.id && i.id === product.id;

        if (prev.some(isMine)) {
          return prev.map((i) => (isMine(i) ? { ...i, qty: i.qty + 1 } : i));
        }

        return [...prev, { userId: currentUser.id, id: product.id, qty: 1 }];
      });

      toast.add({
        type: "success",
        description: `${product.name} added to cart.`,
        timeout: 1500,
      });
    }

    function updateQty(productId, delta) {
      if (!currentUser) return;

      setCart((prev) =>
        prev.map((line) =>
          line.userId === currentUser.id && line.id === productId
            ? { ...line, qty: Math.max(1, line.qty + delta) }
            : line,
        ),
      );
    }

    function removeItems(productIds) {
      if (!currentUser) return;

      setCart((prev) =>
        prev.filter(
          (line) =>
            !(line.userId === currentUser.id && productIds.includes(line.id)),
        ),
      );
    }

    // const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

    return (
      <CartContext.Provider value={{ cart, addToCart, updateQty, removeItems }}>
        {children}
      </CartContext.Provider>
    );
}