import { useState, useEffect } from 'react';
import { FaRegCircleUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import Notifications from './Notifications';
import useOutsideClick from './useOutsideClick';
import { getAllNotifications } from '../../Services/api';

const CustomButtons = () => {
    const navigate = useNavigate();
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unread, setUnread] = useState(false);
    const notificationsRef = useOutsideClick(() => setShowNotifications(false));

    const handleUser = () => {
        navigate('/login');
    };

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
        if (!showNotifications) {
            setUnread(false);
        }
    };

    const fetchNotifications = async () => {
        try {
            const response = await getAllNotifications();
            setNotifications(response.data.reverse());
            if (response.data.length > 0) {
                setUnread(true);
            }
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    return (
        <div className="relative flex justify-between items-center gap-6 text-2xl">
            <button className="text-white hover:text-[#175D00] transition ease-in relative">
                <IoSearch onClick={() => navigate('/search')}/>
            </button>
            <div className="relative" ref={notificationsRef}>
                <button
                    className="text-white pt-2 hover:text-[#175D00] transition ease-in relative"
                    onClick={toggleNotifications}
                >
                    {unread && (
                        <span className="absolute top-2 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
                    )}
                    <IoMdNotificationsOutline />
                </button>
                {showNotifications && (
                    <div className="absolute right-0 flex mt-2 w-80 bg-white rounded shadow-lg">
                        <Notifications notifications={notifications} />
                    </div>
                )}
            </div>
            <button className="text-white hover:text-[#175D00] transition ease-in" onClick={handleUser}>
                <FaRegCircleUser />
            </button>
        </div>
    );
};

export default CustomButtons;
