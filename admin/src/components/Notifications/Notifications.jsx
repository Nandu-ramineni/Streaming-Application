import { useState } from "react";
import { createNotification } from "../../services/api";

const notificationInitialValues = {
    message: '',
    type: 'all', 
}

const Notifications = () => {
    const [data, setData] = useState(notificationInitialValues);
    const [loading, setLoading] = useState(false);

    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(data);
        try {
            setLoading(true);
            const response = await createNotification(data.message, data.type); 
            console.log(response);
        } catch (error) {
            console.error("Error sending notification:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center   text-white">
            <h2 className="text-2xl font-semibold mb-6">Notifications</h2>
            <form onSubmit={submitHandler} className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-md">
                <div className="mb-4">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                    <textarea 
                        type="text" 
                        name="message" 
                        id="message" 
                        value={data.message} 
                        onChange={changeHandler} 
                        required 
                        className="w-full p-2.5 bg-gray-700 text-white rounded-md focus:ring focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="type" className="block text-sm font-medium text-gray-400 mb-2">Type</label>
                    <select 
                        name="type" 
                        id="type" 
                        value={data.type} 
                        onChange={changeHandler} 
                        required 
                        className="w-full p-2.5 bg-gray-700 text-white rounded-md focus:ring focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="all">All</option>
                        <option value="subscribed">Subscribed</option>
                    </select>
                </div>
                <button 
                    type="submit" 
                    disabled={loading} 
                    className="w-full py-2.5 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-md hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                    {loading ? 'Loading...' : 'Send Notification'}
                </button>
            </form>
        </div>
    )
}

export default Notifications;
