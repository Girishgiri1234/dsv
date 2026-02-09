import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { speakers } from "../../data/speakers";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import { FiArrowLeft, FiShoppingCart, FiStar, FiBatteryCharging, FiDroplet, FiBluetooth, FiPlay, FiCheck, FiShare2 } from "react-icons/fi";

const SpeakerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const speaker = speakers.find((item) => item.id === Number(id));
  const [activeImage, setActiveImage] = useState(null);
  const [tab, setTab] = useState("features");

  useEffect(() => {
    if (speaker) {
      setActiveImage(speaker.images?.[0] || speaker.image);
    }
  }, [speaker]);

  // Handle scroll spy to update active tab
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["features", "specs", "reviews"];
      const scrollPosition = window.scrollY + 200; // Offset

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setTab(section);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!speaker) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="text-2xl font-bold text-gray-800">Product Not Found</h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-6 py-2 text-orange-600 font-semibold hover:underline"
        >
          Go Back
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(speaker);
    toast.success(`${speaker.name} added to cart!`, {
      style: {
        border: '1px solid #f97316',
        padding: '16px',
        color: '#f97316',
      },
      iconTheme: {
        primary: '#f97316',
        secondary: '#FFFAEE',
      },
    });
  };

  const tabs = [
    { id: "features", label: "Features" },
    { id: "specs", label: "Specs" },
    { id: "reviews", label: "Reviews" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-20">
      {/* Navigation / Back Button */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-orange-600 transition-colors font-medium group"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to Speakers
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

        {/* Left Column: Gallery */}
        <div className="flex flex-col gap-6">
          <div className="relative bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex items-center justify-center h-[400px] lg:h-[500px] group overflow-hidden">
            {/* Product Badge */}
            <div className="absolute top-6 left-6 bg-orange-600 text-white text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-sm">
              Best Seller
            </div>
            <img
              src={activeImage}
              alt={speaker.name}
              className="max-h-full max-w-full object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-4 overflow-x-auto pb-2 justify-center lg:justify-start">
            {speaker.images?.map((img, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(img)}
                className={`relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-300 ${activeImage === img
                    ? "border-orange-600 ring-2 ring-orange-100 ring-offset-2"
                    : "border-transparent hover:border-gray-300"
                  }`}
              >
                <img
                  src={img}




                  
                  alt={`View ${index + 1}`}
                  className="w-full h-full object-cover bg-white"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: details */}
        <div className="flex flex-col pt-4">
          <div className="flex justify-between items-start">
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 mb-4 leading-tight">
              {speaker.name}
            </h1>
            <button className="text-gray-400 hover:text-orange-600 transition-colors p-2 rounded-full hover:bg-orange-50">
              <FiShare2 size={24} />
            </button>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex text-yellow-500 text-lg">
              {[...Array(5)].map((_, i) => (
                <FiStar key={i} fill={i < Math.floor(speaker.rating) ? "currentColor" : "none"} className={i < Math.floor(speaker.rating) ? "" : "text-gray-300"} />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-500 border-l pl-4 border-gray-300">
              1,240 Reviews
            </span>
          </div>

          <p className="text-4xl font-bold text-orange-600 mb-2">
            {speaker.price}
          </p>
          <p className="text-sm text-gray-500 mb-8">
            Includes all taxes & free shipping
          </p>

          <p className="text-gray-600 leading-relaxed text-lg mb-8">
            Bold audio with big bass. The {speaker.name} delivers powerful JBL Original Pro Sound with consistent clarity and deep bass. Portable, waterproof, and durable.
          </p>

          {/* Quick Features */}
          <div className="grid grid-cols-2 gap-4 mb-10">
            {[
              { icon: FiBatteryCharging, text: "12 Hours Playtime" },
              { icon: FiDroplet, text: "IP67 Waterproof" },
              { icon: FiBluetooth, text: "Bluetooth 5.1" },
              { icon: FiPlay, text: "PartyBoost" },
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3 text-gray-700 font-medium bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                <feature.icon className="text-orange-600 text-xl" />
                <span className="text-sm">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-orange-600 text-white font-bold text-lg py-4 px-8 rounded-full shadow-lg shadow-orange-200 hover:bg-orange-700 hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <FiShoppingCart /> Add to Cart
            </button>
            <button className="flex-1 bg-white text-gray-800 font-bold text-lg py-4 px-8 rounded-full border border-gray-300 hover:bg-gray-50 transition-all active:scale-95">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Sticky Sub-Navigation */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200 mt-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex gap-8 overflow-x-auto no-scrollbar">
          {tabs.map((t) => (
            <a
              key={t.id}
              href={`#${t.id}`}
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById(t.id);
                if (element) {
                  const offset = 80; // height of sticky header
                  const bodyRect = document.body.getBoundingClientRect().top;
                  const elementRect = element.getBoundingClientRect().top;
                  const elementPosition = elementRect - bodyRect;
                  const offsetPosition = elementPosition - offset;

                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                  setTab(t.id);
                }
              }}
              className={`py-4 text-sm uppercase tracking-widest font-bold transition-all border-b-2 ${tab === t.id
                  ? "border-orange-600 text-orange-600"
                  : "border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300"
                }`}
            >
              {t.label}
            </a>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">

        {/* Features Section */}
        <div id="features" className="py-16 border-b border-gray-100 scroll-mt-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Product Features</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-lg">
                To the pool. To the park. JBL Flip 6 is IP67 waterproof and dustproof, so you can bring your speaker anywhere.
              </p>
              <div className="grid grid-cols-1 gap-6">
                {[
                  { title: "Louder, more powerful sound", desc: "The beat goes on with the JBL Flip 6 2-way speaker system, engineered to deliver loud, crystal clear, powerful sound." },
                  { title: "IP67 waterproof and dustproof", desc: "Don't sweat the small stuff like rechargeable battery, waterproof, and dustproof." },
                  { title: "12 Hours of Playtime", desc: "Don't sweat the small stuff like charging your battery. JBL Flip 6 gives you up to 12 hours of playtime on a single charge." },
                  { title: "Bold design", desc: "Bold audio meets bold design. Big-sounding yet easy to carry, the design fits any personal aesthetic." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                        <FiCheck className="text-orange-600" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">{item.title}</h4>
                      <p className="text-gray-600 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-100 rounded-3xl h-[500px] flex items-center justify-center relative overflow-hidden group">
              <img src={speaker.images?.[1] || speaker.images?.[0] || activeImage} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Feature Lifestyle" />
              <div className="absolute inset-0 bg-black/10"></div>
              <button className="relative z-10 w-20 h-20 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white text-white hover:scale-110 transition-transform">
                <FiPlay size={32} fill="currentColor" />
              </button>
            </div>
          </div>
        </div>

        {/* Specs Section */}
        <div id="specs" className="py-16 border-b border-gray-100 scroll-mt-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Tech Specs</h2>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12 bg-gray-50 border-r border-gray-100">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <FiBatteryCharging className="text-orange-600" /> General Specifications
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-gray-500">Transducer</span>
                    <span className="text-gray-900 font-medium">45 x 80 mm woofer, 16 mm tweeter</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-gray-500">Output power</span>
                    <span className="text-gray-900 font-medium">20 W RMS</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-gray-500">Frequency response</span>
                    <span className="text-gray-900 font-medium">63 Hz - 20 kHz</span>
                  </div>
                </div>
              </div>
              <div className="p-8 md:p-12">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <FiBluetooth className="text-blue-600" /> Connection & Dimensions
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-gray-500">Bluetooth version</span>
                    <span className="text-gray-900 font-medium">5.1</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-gray-500">Dimensions (cm)</span>
                    <span className="text-gray-900 font-medium">17.8 x 6.8 x 7.2</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-gray-500">Weight (kg)</span>
                    <span className="text-gray-900 font-medium">0.55</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div id="reviews" className="py-16 scroll-mt-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Customer Reviews</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Summary Card */}
            <div className="bg-orange-50 rounded-2xl p-8 text-center flex flex-col items-center justify-center">
              <div className="text-6xl font-extrabold text-orange-600 mb-2">{speaker.rating}</div>
              <div className="flex text-yellow-400 text-2xl mb-2">★★★★★</div>
              <p className="text-gray-600 font-medium">Based on 1,240 reviews</p>
              <button className="mt-6 bg-white text-gray-900 px-6 py-2 rounded-full font-bold shadow-sm hover:shadow-md transition-all">
                Write a Review
              </button>
            </div>

            {/* Review Cards */}
            <div className="md:col-span-2 space-y-6">
              {[1, 2].map((review) => (
                <div key={review} className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">JD</div>
                      <div>
                        <h4 className="font-bold text-gray-900">John Doe</h4>
                        <span className="text-xs text-gray-400">Verified Purchaser</span>
                      </div>
                    </div>
                    <span className="text-gray-400 text-sm">2 days ago</span>
                  </div>
                  <div className="flex text-yellow-400 text-sm mb-3">★★★★★</div>
                  <h5 className="font-bold text-gray-800 mb-2">Great Sound Quality!</h5>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    I was surprised by how loud this little speaker gets. The bass is punchy and deep, exactly what I expected from JBL. Battery life is also excellent, lasted me a whole weekend trip without charging.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeakerDetails;
