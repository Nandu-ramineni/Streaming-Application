import { useState } from 'react';
import Modal from 'react-modal';
import { MdAdd, MdClose} from 'react-icons/md';
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

const CustomModal = ({ isOpen, onRequestClose, title, content }) => {
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [rating, setRating] = useState(0);

    const toggleExpand = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    const handleStarClick = (starIndex) => {
        setRating(starIndex + 1);
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="fixed inset-0 flex items-center justify-center p-4 bg-gray-800 bg-opacity-75"
            overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75"
        >
            <div className="bg-gray-900 text-gray-100 p-6 rounded-lg w-full max-w-2xl relative">
                <button
                    onClick={onRequestClose}
                    className="absolute top-4 right-4 text-gray-300 hover:text-gray-100"
                >
                    <MdClose size={24} />
                </button>
                <h2 className="text-2xl font-semibold mb-4">{title}</h2>
                <div>
                    {content.map((item, index) => (
                        <div key={index} className="mb-4">
                            <div className="flex items-center gap-2 cursor-pointer" onClick={() => toggleExpand(index)}>
                                <MdAdd size={20} className={expandedIndex === index ? 'rotate-45' : ''} />
                                <p className="font-medium">{item.question}</p>
                            </div>
                            {expandedIndex === index && (
                                <p className="mt-2">{item.answer}</p>
                            )}
                        </div>
                    ))}
                    <div>
                        <textarea className="w-full p-2 rounded border border-gray-600 bg-gray-900 text-gray-100" rows="4" placeholder="Your feedback..."></textarea>
                        <div className="flex justify-between items-center gap-4 mt-4">
                            <div className='flex items-center gap-2'>
                                <p className="text-gray-100 text-lg">Rate us:</p>
                                <div className="flex">
                                    {[...Array(5)].map((_, index) => (
                                        <button key={index} onClick={() => handleStarClick(index)}>
                                            {index < rating ? (
                                                <FaStar size={24} className="text-yellow-500" />
                                            ) : (
                                                <CiStar size={24} className="text-yellow-500" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br font-medium rounded-lg text-lg px-5 py-2.5">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default CustomModal;
