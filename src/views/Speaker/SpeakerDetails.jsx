import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { speakers } from "../../data/speakers";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";



const SpeakerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(speaker);
    toast.success("Added to cart!");
  };

  const [tab, setTab] = useState("gallery");

  const speaker = speakers.find(
    (item) => item.id === Number(id)
  );

  const [activeImage, setActiveImage] = useState(
    speaker?.images?.[0] || speaker?.image
  );

  if (!speaker) {
    return <p className="text-center mt-10">Speaker not found</p>;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto p-6 flex flex-col h-full lg:h-screen lg:overflow-hidden">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="mb-3 text-orange-500 font-semibold self-start"
        >
          ← Back
        </button>

        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:flex-shrink-0 lg:h-[60vh]">
          {/* Left */}
          <div className="flex flex-col items-center justify-center">
            <img
              src={activeImage}
              alt={speaker.name}
              className="max-h-[300px] lg:max-h-[350px] object-contain"
            />

            <div className="flex gap-3 mt-4 overflow-x-auto w-full justify-center">
              {speaker.images?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  onClick={() => setActiveImage(img)}
                  className={`w-16 h-16 flex-shrink-0 rounded cursor-pointer object-cover border
                    ${activeImage === img
                      ? "border-orange-500 border-2"
                      : "border-gray-300"
                    }
                  `}
                />
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col justify-center">
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">
              {speaker.name}
            </h1>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-yellow-500">
                ⭐ {speaker.rating}
              </span>
              <span className="text-sm text-gray-500">
                (1,077 reviews)
              </span>
            </div>

            <ul className="space-y-2 text-gray-700 mb-6 text-sm lg:text-base">
              <li>✔ Louder, more powerful sound</li>
              <li>✔ IP67 waterproof & dustproof</li>
              <li>✔ 12 Hours of playtime</li>
            </ul>

            <p className="text-3xl font-bold text-orange-600 mb-1">
              {speaker.price}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Inclusive of all taxes
            </p>

            <button
              onClick={handleAddToCart}
              className="px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 w-full lg:w-auto"
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-8 lg:mt-6 lg:flex-1 lg:overflow-y-auto lg:border-t pt-4">
          <div className="flex gap-8 border-b mb-4">
            {["gallery", "features", "specs", "reviews"].map((item) => (
              <button
                key={item}
                onClick={() => setTab(item)}
                className={`pb-2 capitalize ${tab === item
                  ? "border-b-2 border-orange-500 font-semibold"
                  : "text-gray-500"
                  }`}
              >
                {item}
              </button>
            ))}
          </div>

          {tab === "gallery" && (
            <p className="text-gray-600">
              High-resolution product images gallery.
            </p>
          )}

          {tab === "features" && (
            <ul className="list-disc ml-6 text-gray-600 space-y-1">
              <li>JBL Original Pro Sound</li>
              <li>PartyBoost support</li>
              <li>USB-C fast charging</li>
            </ul>
          )}

          {tab === "specs" && (
            <table className="w-full text-sm border">
              <tbody>
                <tr>
                  <td className="border p-2">Battery</td>
                  <td className="border p-2">12 Hours</td>
                </tr>
                <tr>
                  <td className="border p-2">Waterproof</td>
                  <td className="border p-2">IP67</td>
                </tr>
                <tr>
                  <td className="border p-2">Bluetooth</td>
                  <td className="border p-2">5.1</td>
                </tr>
              </tbody>
            </table>
          )}

          {tab === "reviews" && (
            <p className="text-gray-600">
              ⭐⭐⭐⭐☆ – Customers love the sound quality!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpeakerDetails;
