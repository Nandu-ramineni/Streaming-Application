import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const FeedbackForm = () => {
    const [rating, setRating] = useState(0);

    const handleStarClick = (value) => {
        setRating(value);
    };

    const stars = Array(5).fill(0).map((_, index) => (
        <FaStar
            key={index}
            onClick={() => handleStarClick(index + 1)}
            className={`cursor-pointer ${rating >= index + 1 ? "text-yellow-500" : "text-gray-500"}`}
            size={24}
        />
    ));

    return (
        <div>
            <textarea
                className="w-full p-2 rounded border border-gray-600 bg-gray-900 text-gray-100"
                rows="4"
                placeholder="Your feedback..."
            ></textarea>
            <div className="flex items-center gap-4 mt-4">
                <button
                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br font-medium rounded-lg text-lg px-5 py-2.5"
                >
                    Submit
                </button>
                <div>
                    <p className="text-gray-100">Rate us:</p>
                    <div className="flex gap-1">
                        {stars}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeedbackForm;
