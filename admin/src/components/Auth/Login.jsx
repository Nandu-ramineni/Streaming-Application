import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { DataContext } from "../../context/DataProvider";
import { authenticateAdmin } from "../../services/api";

const LoginInitialValues = {
    username: "",
    password: "",
}

const Login = () => {
    const [data, setData] = useState(LoginInitialValues);
    const navigate = useNavigate();
    const { setAccount } = useContext(DataContext);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const admin = localStorage.getItem('admin');
            setAccount(admin);
            navigate('/');
        }
    }, [navigate, setAccount]);

    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await authenticateAdmin(data);
            console.log(response);
            setLoading(true);
            if (response && response.status === 200) {
                console.log("Login Successful");
                const { token, username } = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('admin', username);
                setAccount(username);
                setData(LoginInitialValues);
                navigate('/');
            }else {
                console.log("Login failed");
                setError("Invalid Credentials");
            }
        } catch (error) {
            console.error("Error during login:", error);
            if (error.response && error.response.status === 400) {
                setError(error.response.data.message);
            } else {
                setError("Something went wrong. Please try again later.");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex items-center justify-center text-white mt-28 ">
            <div className="bg-gray-800 px-6 py-2 rounded-lg shadow-lg w-1/3">
                <h2 className="text-2xl font-semibold mb-4 text-center text-gray-200 flex justify-center items-center gap-2">
                        <FaRegUserCircle />Login
                    </h2>
                    <form onSubmit={submitHandler}>
                        <div className="mb-4">
                            <label htmlFor="userName" className="block font-medium text-gray-400">Username</label>
                            <input
                                type="text"
                                name="username"
                                placeholder="Enter your Username"
                                className="text-black mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-[#FF7D29]"
                                onChange={changeHandler}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block font-medium text-gray-400">Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your Password"
                                className="text-black mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-[#FF7D29]"
                                onChange={changeHandler}
                                required
                            />
                        </div>
                        {error && <p className="text-red-500 text-md pb-4">{error}</p>}
                        <button className="w-full text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-md px-5 py-2.5 text-center mb-2 " disabled={loading}>
                        {loading ? <div className="loader"></div> : "Login"}
                        </button>
                    </form>
            </div>
        </div>
    )
}

export default Login;
