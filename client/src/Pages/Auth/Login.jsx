import { useContext, useEffect, useState } from "react";
import QR from '../../assets/qr.png';
import { DataContext } from "../../Context/DataProvider";
import { authenticateLogin } from "../../Services/api";
import { Link, useNavigate } from "react-router-dom";
const LoginInitialValues = {
    email: "",
    password: "",
};

const Login = () => {
    const [data, setData] = useState(LoginInitialValues);
    const { setAccount } = useContext(DataContext);
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = localStorage.getItem('admin');
            setAccount(user);
            navigate('/profile');
        }
    }, [navigate, setAccount]);
    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await authenticateLogin(data);
            if (response.status === 200) {
                console.log("Login Successful");
                const { token, user } = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('user', user.username);
                localStorage.setItem('userId', user._id);
                setAccount(user);
                navigate('/');
            } else {
                console.log("Login failed");
                setError("Invalid Credentials");
            }
        } catch (error) {
            console.log('Error while calling authenticateLogin API', error);
            if (error.response && error.response.status === 400) {
                setError(error.response.data.message);
            } else {
                setError("Something went wrong. Please try again later.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen  text-white mx-4 ">
            <div className="bg-gray-800 px-6 py-2 rounded-lg shadow-lg">
                <h2 className="text-2xl mb-4 text-center">Login to continue</h2>
                <div>
                    <div className="mb-2">
                        <div className="flex justify-center mb-4">
                            <img src={QR} alt="QR Code" className="w-32 h-32" />
                        </div>
                        <p className="text-center mb-4">Use Camera App to Scan QR</p>
                        <p className="text-center mb-6">Click on the link generated to redirect to the Enjoyio mobile app</p>
                        <div className="flex items-center justify-between mb-6">
                            <span className="border-b border-gray-700 flex-grow mr-2"></span>
                            <span className="text-gray-400">OR</span>
                            <span className="border-b border-gray-700 flex-grow ml-2"></span>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-400 mb-2">Enter email</label>
                            <input
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={changeHandler}
                                className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-gray-400 mb-2">Enter password</label>
                            <input
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={changeHandler}
                                className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
                                required
                            />
                        </div>
                        {error && <p className="text-red-500 text-md pb-4">{error}</p>}
                        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded focus:outline-none">
                            {loading ? <div className="loader"></div> : "Login"}
                        </button>
                    </form>
                </div>
                <p className="text-center text-gray-400 mt-4">Having trouble logging in? <a href="#" className="text-blue-400">Get Help</a></p>
                <p className="text-center text-gray-400 mt-4">New to enjoyio? <Link to='/register' className="text-blue-400">SignUp</Link></p>
            </div>
        </div>
    );
};

export default Login;
