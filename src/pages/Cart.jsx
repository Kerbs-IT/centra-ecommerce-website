import { AuthContext } from "@/AuthContext";
import { CartContext } from "@/context/CartContext";
import { products } from "@/data/products";
import { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

function Cart() {
  const { cart, updateQty } = useContext(CartContext);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState([]);

  // hooks stay above this early return
  if (!currentUser) return <Navigate to="/sign-in" replace />;

  const items = cart
    .filter((line) => line.userId === currentUser.id)
    .map((line) => {
      const product = products.find((p) => p.id === line.id);
      return product ? { ...product, qty: line.qty } : null;
    })
    .filter(Boolean);

  const allSelected = items.length > 0 && selectedIds.length === items.length;

  const subTotal = items
    .filter((i) => selectedIds.includes(i.id))
      .reduce((sum, i) => sum + i.price * i.qty, 0);
    const shippingFee = 2;
    const total = subTotal + (selectedIds.length * shippingFee);

  function toggleItem(id) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  }

  function toggleAll() {
    setSelectedIds(allSelected ? [] : items.map((i) => i.id));
  }

  function handleCheckout() {
    navigate(`/checkout?items=${selectedIds.join(",")}`);
  }

  return (
    <div className="page min-h-[calc(100dvh-4rem)] bg-white p-5 w-full">
      <h1 className="cart-header w-full text-4xl font-bold relative pb-0.5 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-black">
        Cart
      </h1>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <p className="mb-3">Your cart is empty.</p>
          <Link to="/" className="text-blue-500 font-bold">
            Continue shopping
          </Link>
        </div>
      ) : (
        <>
          <label className="flex items-center gap-2 my-3 font-bold cursor-pointer">
            <input type="checkbox" checked={allSelected} onChange={toggleAll} />
            Select all ({items.length})
          </label>

          <div className="items-container flex flex-col">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 border-b p-3"
              >
                <input
                  type="checkbox"
                  aria-label={`Select ${item.name}`}
                  checked={selectedIds.includes(item.id)}
                  onChange={() => toggleItem(item.id)}
                />
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-16 w-16 object-contain"
                />
                <span className="flex-1 font-bold">{item.name}</span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQty(item.id, -1)}
                    disabled={item.qty <= 1}
                    aria-label="Decrease quantity"
                    className="w-8 h-8 border rounded font-bold cursor-pointer hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                  >
                    −
                  </button>
                  <span className="w-6 text-center">{item.qty}</span>
                  <button
                    onClick={() => updateQty(item.id, 1)}
                    aria-label="Increase quantity"
                    className="w-8 h-8 border rounded font-bold cursor-pointer hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                <span className="w-24 text-right font-bold">
                  ${(item.price * item.qty).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-end items-center gap-4 mt-6">
            <p className="text-2xl font-bold">Total: ${total.toFixed(2)}</p>
            <button
              onClick={handleCheckout}
              disabled={selectedIds.length === 0}
              className="bg-red-500 text-white font-bold px-5 py-2 rounded cursor-pointer hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Checkout ({selectedIds.length})
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
