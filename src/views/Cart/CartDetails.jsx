import React from "react";
import { useCart } from "../../views/context/CartContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { IoMdTrash } from "react-icons/io";

const CartDetails = () => {
    const { cart, totalAmount, removeFromCart } = useCart();

    if (cart.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-gray-600">
                <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
                <Link to="/Speakers" className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">
                    Browse Speakers
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-4">Shopping Cart</h1>

            <div className="space-y-6">
                {cart.map((item) => (
                    <div key={item.id} className="flex flex-col md:flex-row items-start md:items-center gap-6 p-4 border rounded-xl shadow-sm hover:shadow-md transition bg-gray-50">
                        {/* Image */}
                        <img
                            src={item.image || item.images?.[0]}
                            alt={item.name}
                            className="w-24 h-24 object-contain bg-white rounded-lg border p-1"
                        />

                        {/* Details */}
                        <div className="flex-1 w-full md:w-auto">
                            <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                            <p className="text-gray-500 text-sm">Price: {item.price}</p>
                        </div>

                        {/* Quantity */}
                        <div className="flex flex-col items-center">
                            <span className="text-xs text-gray-500 uppercase tracking-wide">Qty</span>
                            <span className="text-lg font-bold text-orange-600">{item.qty}</span>
                        </div>

                        {/* Subtotal */}
                        <div className="md:text-right min-w-[100px] flex md:block justify-between w-full md:w-auto mt-2 md:mt-0">
                            <span className="text-xs text-gray-500 uppercase tracking-wide md:block inline mr-2 text-right">Subtotal</span>
                            <span className="text-lg font-bold text-gray-800">
                                ₹{(Number(item.price.replace(/[^0-9.-]+/g, "")) * item.qty).toLocaleString()}
                            </span>
                        </div>

                        {/* Remove Action */}
                        <button
                            onClick={() => {
                                removeFromCart(item.id);
                                toast.success("Item removed");
                            }}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition self-end md:self-center"
                            title="Remove Item"
                        >
                            <IoMdTrash size={24} />
                        </button>
                    </div>
                ))}
            </div>

            {/* Summary */}
            <div className="mt-8 border-t pt-6 flex justify-end">
                <div className="w-full max-w-sm">
                    <div className="flex justify-between text-xl font-bold text-gray-800 mb-6">
                        <span>Total Amount:</span>
                        <span className="text-orange-600">
                            {/* Simple formatting assuming price string is consistent, ideally should be handled in context/utils */}
                            ₹{totalAmount.toLocaleString()}
                        </span>
                    </div>

                    <button className="w-full py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition shadow-lg">
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartDetails;
