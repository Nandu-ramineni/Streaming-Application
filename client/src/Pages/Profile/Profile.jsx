import { useEffect, useState } from "react";
import { GetProfile, getSubscriptions } from "../../Services/api";
import { IoIosArrowForward } from "react-icons/io";
import ProfileDetails from "./ProfileDetails";
import SubscriptionDetails from "./SubscriptionDetails";
import { FaPowerOff } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
    const [subscription, setSubscription] = useState(null);
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProfile();
        fetchSubscription();
    }, []);

    const fetchSubscription = async () => {
        const userId = localStorage.getItem('userId');
        try {
            const response = await getSubscriptions(userId);
            if (response.status === 200) {
                setSubscription(response.data.sub);
            } else if (response && response.status === 400) {
                alert(response.data.message);
            }
        } catch (error) {
            console.error('Error fetching subscription:', error);
        }
    };

    const fetchProfile = async () => {
        const userId = localStorage.getItem('userId');
        try {
            const response = await GetProfile(userId);
            if (response.status === 200) {
                setProfile(response.data);
            } else if (response && response.status === 400) {
                alert(response.data.message);
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const handleLogOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <div className="pt-20 min-h-screen" style={{ padding: '1rem 6%' }}>
            <section className="flex justify-between items-center pt-14 mt-6">
                <div>
                    <h2 className="text-2xl font-semibold text-gray-100 flex items-center gap-2">
                        Enjoyio <span className="text-[#FFE18B]">{subscription ? subscription.plan : <Link to="/subscription" className="text-[#FFE18B]">Buy</Link>}</span> <IoIosArrowForward className="text-[#FFE18B]" />
                    </h2>
                    {profile && (
                        <>
                            <p className="hidden md:flex text-gray-100 py-2">{profile.email}</p>
                            <p className="flex md:hidden text-gray-100 py-2">{profile.username}</p>
                        </>
                    )}
                </div>
                <div className="flex flex-col">
                    <button onClick={() => navigate('/upgrade-subscription')} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2">
                        Upgrade
                    </button>
                    <p className="text-sm text-gray-600">Upgrade for more benefits</p>
                </div>
            </section>
            <div className="flex items-center justify-between my-6 relative z-100">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-1/6 h-px bg-gradient-to-r from-transparent to-gray-700"></div>
                    <div className="flex-grow h-px bg-gray-700"></div>
                    <div className="w-1/6 h-px bg-gradient-to-l from-transparent to-gray-700"></div>
                </div>
            </div>
            {profile && <ProfileDetails profile={profile} fetchProfile={fetchProfile} />}
            <div className="flex items-center justify-between my-6 relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-1/6 h-px bg-gradient-to-r from-transparent to-gray-700"></div>
                    <div className="flex-grow h-px bg-gray-700"></div>
                    <div className="w-1/6 h-px bg-gradient-to-l from-transparent to-gray-700"></div>
                </div>
            </div>
            {subscription && <SubscriptionDetails subscription={subscription} profile={profile} />}
            <div className="flex items-center justify-between my-5 relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-1/6 h-px bg-gradient-to-r from-transparent to-gray-700"></div>
                    <div className="flex-grow h-px bg-gray-700"></div>
                    <div className="w-1/6 h-px bg-gradient-to-l from-transparent to-gray-700"></div>
                </div>
            </div>
            <section>
                <button onClick={handleLogOut} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 flex items-center gap-2">
                    <FaPowerOff />Log Out
                </button>
            </section>
        </div>
    );
};

export default Profile;
