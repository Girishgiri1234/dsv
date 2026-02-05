import React from "react";
import { useNavigate } from "react-router-dom";
import { speakers } from "../../data/speakers";

const SpeakersList = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Portable Speakers</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {speakers.map((speaker) => (
          <div
            key={speaker.id}
            className="border rounded-lg p-4 cursor-pointer hover:shadow-lg"
            onClick={() => navigate(`/speakerk/${speaker.id}`)}
          >
            <img
              src={speaker.image}
              alt={speaker.name}
              className="w-full h-48 object-contain mb-4"
            />

            <h2 className="text-lg font-semibold">{speaker.name}</h2>
            <p className="text-gray-600">{speaker.price}</p>
            <p className="text-yellow-500">⭐ {speaker.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpeakersList;
