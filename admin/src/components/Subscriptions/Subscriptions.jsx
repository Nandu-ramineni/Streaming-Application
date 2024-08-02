import { useEffect, useState } from "react";
import { getSubscriptions } from "../../services/api";
import * as XLSX from 'xlsx';
import { BsUpload } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";

const Subscriptions = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    
    const fetchSubscriptions = async () => {
        try {
            const response = await getSubscriptions();
            setSubscriptions(response.subs);
        } catch (error) {
            console.log("Error while fetching subscriptions", error);
        }
    };

    const exportToExcel = () => {
        const exportData = subscriptions.map(sub => ({
            User: sub.user.username,
            Email: sub.user.email,
            Plan: sub.plan,
            Duration: sub.duration,
            Amount: sub.amount,
            StartDate: new Date(sub.startDate).toLocaleDateString(),
            EndDate: new Date(sub.endDate).toLocaleDateString(),
            IsActive: sub.isActive ? 'Yes' : 'No'
        }));
        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Subscriptions");
        XLSX.writeFile(workbook, "SubscriptionsData.xlsx");
    }

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredSubscriptions = subscriptions.filter(sub => 
        sub.user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.user.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
        sub.plan.toLowerCase().includes(searchTerm.toLowerCase()));

    useEffect(() => {
        fetchSubscriptions();
    }, []);

    return (
        <div className="w-full px-4">
            <div className="flex justify-between items-center px-4">
                <h2 className="text-2xl font-semibold mb-4 px-4 text-white">Subscriptions Data</h2>
                <button
                    onClick={exportToExcel}
                    className="bg-[#8EC44C] text-white px-4 py-2 rounded-md flex items-center gap-2"
                >
                    <BsUpload />Excel
                </button>
            </div>
            <div className="w-full flex m-auto py-8">
                <div className="relative w-3/4 m-auto">
                    <input
                        type="text"
                        placeholder="Search by username, email, or phone number"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="border border-gray-300 px-3 py-2 w-full rounded-full focus:outline-none focus:border-[#8EC44C] pl-10"
                    />
                    <div className="absolute left-4 top-3">
                        <AiOutlineSearch className="text-gray-400" />
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto rounded-tr-2xl rounded-tl-2xl">
                <table className="min-w-full bg-white table-fixed">
                    <thead>
                        <tr>
                            {['User', 'Email', 'Plan', 'Duration', 'Amount', 'Start Date', 'End Date', 'Is Active'].map((header) => (
                                <th
                                    key={header}
                                    className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase w-1/8"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSubscriptions && filteredSubscriptions.length > 0 ? (
                            filteredSubscriptions.map((sub, index) => (
                                <tr key={index}>
                                    <td className="py-2 px-4 border-b border-gray-200 w-1/8">{sub.user.username}</td>
                                    <td className="py-2 px-4 border-b border-gray-200 w-1/8">
                                        <a href={`mailto:${sub.user.email}`} >
                                            {sub.user.email}
                                        </a>
                                    </td>
                                    <td className="py-2 px-4 border-b border-gray-200 w-1/8">{sub.plan}</td>
                                    <td className="py-2 px-4 border-b border-gray-200 w-1/8">{sub.duration}</td>
                                    <td className="py-2 px-4 border-b border-gray-200 w-1/8">₹ {sub.amount}</td>
                                    <td className="py-2 px-4 border-b border-gray-200 w-1/8">{new Date(sub.startDate).toLocaleDateString()}</td>
                                    <td className="py-2 px-4 border-b border-gray-200 w-1/8">{new Date(sub.endDate).toLocaleDateString()}</td>
                                    <td className="py-2 px-4 border-b border-gray-200 w-1/8">{sub.isActive ? 'Yes' : 'No'}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="py-2 px-4 border-b border-gray-200 text-center">No Subscriptions Found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Subscriptions;
