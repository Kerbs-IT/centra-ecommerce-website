import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { CartContext } from "@/context/CartContext";
import { products } from "../data/products";
import { AuthContext } from "@/AuthContext";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";



function Checkout() {
    const { cart, removeItems } = useContext(CartContext);
    const {currentUser} = useContext(AuthContext);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const buyNowId = searchParams.get("buyNow");
    const shippingFee = 2;
    
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
      if (!currentUser) {
        toast.add({
          type: "error",
          description: "Please log in to checkout.",
          timeout: 2500,
        });
      }
    }, [currentUser]);

    if (!currentUser) return <Navigate to="/sign-in" replace />;
   async function handlePlaceOrder() {
     setProcessing(true);
     try {
       await new Promise((r) => setTimeout(r, 2000)); // fake payment delay

       // "Buy now" never touched the cart, so only clear it for a cart checkout
       if (!buyNowId) removeItems(items.map((i) => i.id));

       toast.add({
         type: "success",
         description: "Thank you, purchase completed.",
         timeout: 1500,
       });
       navigate(-1);
     } finally {
       setProcessing(false);
     }
   }

 
  // always an array of { id, qty }, one item or many
  // "1,3" → [1, 3]
  const selectedIds = (searchParams.get("items") ?? "")
    .split(",")
    .filter(Boolean)
    .map(Number);

  const lines = buyNowId
    ? [{ id: Number(buyNowId), qty: 1 }]
    : cart.filter(
        (line) =>
          line.userId === currentUser.id && selectedIds.includes(line.id),
      );

  // join with product data (name, price, image)
  const items = lines
    .map((line) => {
      const product = products.find((p) => p.id === line.id);
      return product ? { ...product, qty: line.qty } : null;
    })
    .filter(Boolean);

  const subTotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const total = (subTotal + items.length * shippingFee).toFixed(2);

  if (items.length === 0)
    return <p className="text-center py-10">Nothing to checkout.</p>;

  return (
    <section className="container min-h-[calc(100dvh-4rem)] flex flex-col mt-1 mx-auto p-4 bg-white rounded">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>

      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-4   p-3 mb-2 rounded"
        >
          <img
            src={item.image}
            alt={item.name}
            className="h-16 w-16 object-contain"
          />
          <div className="flex-1">
            <p className="font-bold">{item.name}</p>
            <p className="text-sm text-gray-600">Qty: {item.qty}</p>
          </div>
          <p className="font-bold">${(item.price * item.qty).toFixed(2)}</p>
        </div>
      ))}

      <div className="order-details">
        <h3 className="font-bold text-lg">Order Detail</h3>
        <div className="item-subtotal-con flex justify-between mb-2">
          <h5 className="">Merchandise Subtotal</h5>
          <h5 className="font-bold">$ {subTotal.toFixed(2)}</h5>
        </div>
        <div className="item-shipping-fee-con flex justify-between mb-2">
          <h5 className="">Shipping</h5>
          <h5 className="font-bold">$ {items.length * shippingFee}</h5>
        </div>
        <div className="item-total-con flex justify-between mb-2">
          <h2 className="font-bold text-lg">
            Total <span className="text-gray-400">VAT included</span>
          </h2>
          <h5 className="font-bold text-lg">$ {total}</h5>
        </div>
      </div>

      {/* show the procesing of order */}
      {processing && (
        <Item variant="muted" className="mb-3">
          <ItemMedia>
            <Spinner />
          </ItemMedia>
          <ItemContent>
            <ItemTitle className="line-clamp-1">
              Processing payment...
            </ItemTitle>
          </ItemContent>
          <ItemContent className="flex-none justify-end">
            <span className="text-sm tabular-nums">${total}</span>
          </ItemContent>
        </Item>
      )}

      {/* checkout button */}
      <div className="checkout-btn-con flex w-full justify-end items-end">
        <button
          onClick={handlePlaceOrder}
          disabled={processing}
          className="bg-red-500 disabled:opacity-50 hover:cursor-pointer text-white py-3 px-5 font-bold rounded"
        >
          Place Order
        </button>
      </div>
    </section>
  );
}

export default Checkout;
