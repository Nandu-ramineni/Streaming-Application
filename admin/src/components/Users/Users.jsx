import { useEffect, useState } from "react";
import * as XLSX from 'xlsx';
import { BsUpload } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import {deleteUserById, getUsers, } from "../../services/api";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getUsers();
                setUsers(response.users);
            } catch (error) {
                console.log("Error while fetching users", error);
            }
        };
        fetchUsers();
    }, []);

    const deleteUser = async (userId) => {
        try {
            const response = await deleteUserById(userId);
            if (response && response.message) {
                alert(response.message);
                const updatedUsers = users.filter(user => user._id !== userId);
                setUsers(updatedUsers);
            }
        } catch (error) {
            console.log("Error while deleting user", error);
        }
    };

    const exportToExcel = () => {
        const exportData = users.map(user => ({
            Username: user.username,
            Email: user.email,
        }));
        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
        XLSX.writeFile(workbook, "UsersData.xlsx");
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) 
    );

    return (
        <div className="w-full px-4 ">
            <div className="flex justify-between items-center px-4">
                <h2 className="text-2xl font-semibold mb-4 px-4 text-white">Users Data</h2>
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
                        placeholder="Search by username or email"
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
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase w-1/4">Username</th>
                            <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase w-1/4">Email</th>
                            <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-right text-sm font-semibold text-gray-700 uppercase w-1/4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map(user => (
                                <tr key={user._id}>
                                    <td className="py-2 px-4 border-b border-gray-200">{user.username}</td>
                                    <td className="py-2 px-4 border-b border-gray-200 text-left">
                                        <a href={`mailto:${user.email}`} className="text-gray-700">{user.email}</a>
                                    </td>
                                    
                                    <td className="py-2 px-4 border-b border-gray-200 text-right">
                                        <button
                                            onClick={() => deleteUser(user._id)}
                                            className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                                        >
                                            <AiOutlineDelete className="text-xl" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="py-2 px-4 border-b border-gray-200 text-center">No Users Found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;
