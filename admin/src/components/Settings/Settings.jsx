import { useState } from "react";
import { maintenanceMode } from "../../services/api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Settings = () => {
    const [generalSettings, setGeneralSettings] = useState({
        siteName: "My Streaming App",
        maintenanceMode: false,
        defaultLanguage: "English"
    });

    const [notificationSettings, setNotificationSettings] = useState({
        emailNotifications: true,
        pushNotifications: true
    });

    const [userManagementSettings, setUserManagementSettings] = useState({
        maxLoginAttempts: 5,
        accountLockoutDuration: 30 
    });

    const handleGeneralSettingsChange = (e) => {
        const { name, value, type, checked } = e.target;
        setGeneralSettings((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleNotificationSettingsChange = (e) => {
        const { name, checked } = e.target;
        setNotificationSettings((prev) => ({
            ...prev,
            [name]: checked
        }));
    };

    const handleUserManagementSettingsChange = (e) => {
        const { name, value } = e.target;
        setUserManagementSettings((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await maintenanceMode(generalSettings.maintenanceMode);
            console.log('Settings saved:', response);
            if(response.status === 200) {
                toast.success('Maintenance mode Turned On');
                
            } else {
                toast.error('Failed to save settings');
            }
        } catch (error) {
            console.log('Error saving settings:', error);
        }
    };

    return (
        <div className="w-full px-4">
            <ToastContainer />
            <header className="shadow">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl text-center font-bold text-white">Admin Settings</h1>
                </div>
            </header>
            <main className="py-6 h-[79vh] overflow-y-scroll" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-semibold mb-4">General Settings</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-700 mb-1" htmlFor="siteName">Site Name</label>
                                    <input
                                        id="siteName"
                                        name="siteName"
                                        type="text"
                                        value={generalSettings.siteName}
                                        onChange={handleGeneralSettingsChange}
                                        className="border border-gray-300 rounded-lg w-full p-2"
                                    />
                                </div>
                                <div>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="maintenanceMode"
                                            checked={generalSettings.maintenanceMode}
                                            onChange={handleGeneralSettingsChange}
                                            className="mr-2"
                                        />
                                        Maintenance Mode
                                    </label>
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-1" htmlFor="defaultLanguage">Default Language</label>
                                    <select
                                        id="defaultLanguage"
                                        name="defaultLanguage"
                                        value={generalSettings.defaultLanguage}
                                        onChange={handleGeneralSettingsChange}
                                        className="border border-gray-300 rounded-lg w-full p-2"
                                    >
                                        <option value="English">English</option>
                                        <option value="Spanish">Telugu</option>
                                        <option value="French">Tamil</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="emailNotifications"
                                            checked={notificationSettings.emailNotifications}
                                            onChange={handleNotificationSettingsChange}
                                            className="mr-2"
                                        />
                                        Email Notifications
                                    </label>
                                </div>
                                <div>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="pushNotifications"
                                            checked={notificationSettings.pushNotifications}
                                            onChange={handleNotificationSettingsChange}
                                            className="mr-2"
                                        />
                                        Push Notifications
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-semibold mb-4">User Management Settings</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-700 mb-1" htmlFor="maxLoginAttempts">Max Login Attempts</label>
                                    <input
                                        id="maxLoginAttempts"
                                        name="maxLoginAttempts"
                                        type="number"
                                        value={userManagementSettings.maxLoginAttempts}
                                        onChange={handleUserManagementSettingsChange}
                                        className="border border-gray-300 rounded-lg w-full p-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-1" htmlFor="accountLockoutDuration">Account Lockout Duration (minutes)</label>
                                    <input
                                        id="accountLockoutDuration"
                                        name="accountLockoutDuration"
                                        type="number"
                                        value={userManagementSettings.accountLockoutDuration}
                                        onChange={handleUserManagementSettingsChange}
                                        className="border border-gray-300 rounded-lg w-full p-2"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="text-center">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
                            >
                                Save Settings
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default Settings;
