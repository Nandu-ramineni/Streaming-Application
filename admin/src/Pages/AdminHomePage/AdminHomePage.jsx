
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { getSubscriptions, getUsers, getVideos } from '../../services/api';

const data = [
    { name: 'Jan', Users: 100, Content: 20 },
    { name: 'Feb', Users: 120, Content: 25 },
    { name: 'Mar', Users: 130, Content: 30 },
    { name: 'Apr', Users: 150, Content: 35 },
    { name: 'May', Users: 170, Content: 40 },
    { name: 'Jun', Users: 200, Content: 50 },
];

const AdminHomePage = () => {
    const [users, setUsers] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);
    const [videos, setVideos] = useState([]);
    // const [chartData, setChartData] = useState([]);

    const fetchUsers = async () => {
        try {
            const [usersResponse, subscriptionsResponse, videoResponse] = await Promise.all([getUsers(), getSubscriptions(), getVideos()]);
            setUsers(usersResponse.users.length);
            setSubscriptions(subscriptionsResponse.subs.length);
            setVideos(videoResponse.length);
            // const formattedData = usersResponse.users.map((user) => ({
            //     name: user.month, 
            //     Users: user.length,  
                
            // }));
    
            // setChartData(formattedData);
        } catch (error) {
            console.log("Error while fetching data", error);
        }
    };
    
    

    useEffect(() => {
        fetchUsers();
    },[])
    return (
        <div className="w-full px-4">
            <header className=" shadow">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl text-center font-bold text-white">Admin Dashboard</h1>
                </div>
            </header>
            <main className='h-[78vh] overflow-y-auto' style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap gap-4">
                        <div className="bg-white overflow-hidden shadow rounded-lg flex-1 min-w-0">
                            <div className="p-5 text-center">
                                <h2 className="text-xl font-semibold">Total Users</h2>
                                <p className="text-2xl font-bold">{users}</p>
                            </div>
                        </div>
                        <div className="bg-white overflow-hidden shadow rounded-lg flex-1 min-w-0">
                            <div className="p-5 text-center">
                                <h2 className="text-xl font-semibold">Total Subscriptions</h2>
                                <p className="text-2xl font-bold">{subscriptions}</p>
                            </div>
                        </div>
                        <div className="bg-white overflow-hidden shadow rounded-lg flex-1 min-w-0">
                            <div className="p-5 text-center">
                                <h2 className="text-xl font-semibold">Total Videos</h2>
                                <p className="text-2xl font-bold">{videos}</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold mb-4">Quick Stats</h3>
                            <div className="w-full ">
                                <LineChart width={300} height={200} data={data}  margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="Users" stroke="#8884d8" strokeWidth={2} />
                                    <Line type="monotone" dataKey="Content" stroke="#82ca9d" strokeWidth={2} />
                                </LineChart>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold mb-2">Recent Notifications</h3>
                            <ul className="text-gray-600 space-y-2">
                                <li>New user registration: john.doe@example.com</li>
                                <li>Content upload pending review: Video_ID_123</li>
                                <li>Subscription expired for user: jane.doe@example.com</li>
                            </ul>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold mb-2">Upcoming Events</h3>
                            <ul className="text-gray-600 space-y-2">
                                <li>Content review meeting: July 25, 2024</li>
                                <li>System maintenance: August 1, 2024</li>
                                <li>New feature release: August 15, 2024</li>
                            </ul>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Link to="/users" className="bg-white p-6 rounded-lg shadow-lg hover:bg-gray-100">
                            <h3 className="text-xl font-semibold mb-2">Manage Users</h3>
                            <p className="text-gray-600">View and manage all users in the system.</p>
                        </Link>
                        <Link to="/subscriptions" className="bg-white p-6 rounded-lg shadow-lg hover:bg-gray-100">
                            <h3 className="text-xl font-semibold mb-2">Manage Subscriptions</h3>
                            <p className="text-gray-600">View and manage all subscriptions.</p>
                        </Link>
                        <Link to="/upload" className="bg-white p-6 rounded-lg shadow-lg hover:bg-gray-100">
                            <h3 className="text-xl font-semibold mb-2">Manage Content</h3>
                            <p className="text-gray-600">Upload, edit, and manage video content.</p>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminHomePage;
