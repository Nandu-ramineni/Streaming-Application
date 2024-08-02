import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authenticateSignup } from "../../Services/api";
import emailjs from '@emailjs/browser';
const RegisterInitialValues = {
    email: '',
    username: '',
    password: '',
}
const Register = () => {
    const [data, setData] = useState(RegisterInitialValues);
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [generatedOtp, setGeneratedOtp] = useState("");
    const [error, setError] = useState("");
    const [stage, setStage] = useState("initial");
    const navigate = useNavigate();
    const otpRefs = useRef([]);
    const [loading, setLoading] = useState(false);

    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const otpChangeHandler = (e, index) => {
        const newOtp = [...otp];
        newOtp[index] = e.target.value;
        setOtp(newOtp);

        if (e.target.value && index < otpRefs.current.length - 1) {
            otpRefs.current[index + 1].focus();
        }
    }
    const sendOtpEmail = async (e) => {
        e.preventDefault();
        setLoading(true);
        const otp = Math.floor(1000 + Math.random() * 9000).toString(); 
        try {
            const templateParams = {
                to_email: data.email,
                to_name: data.username,
                otp: otp
            };
            await emailjs.send('service_3mqrqgc', 'template_l53xcxn', templateParams, 'Lm_Wni6iZVR4wdHdf');
            setGeneratedOtp(otp);
            setStage("otp");
        } catch (error) {
            console.error("Error sending OTP email:", error);
            setError("Failed to send OTP. Please try again.");
        }
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const enteredOtp = otp.join("");
        if (enteredOtp !== generatedOtp) {
            setError("OTP does not match. Please enter the correct OTP.");
            return;
        }
        try {
            const response = await authenticateSignup(data);
            if (response.status === 200) {
                const { token, user } = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('user', user.username);
                localStorage.setItem('userId', user._id);
                navigate('/');
                setData(RegisterInitialValues);
                setOtp(["", "", "", ""]);
                setStage("initial");
            } else {
                setError("Sign Up failed");
            }
        } catch (error) {
            console.error("Error during sign up:", error);
            if (error.response && error.response.status === 400) {
                setError(error.response.data.message);
            }
        }
    }
    return (
        <div className="flex items-center justify-center min-h-screen  text-white mx-4">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full md:w-1/3">
                <h2 className="text-2xl mb-4 text-center">SignUp to continue</h2>
                <div>
                {stage === "initial" && (
                        <form onSubmit={sendOtpEmail}>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700">Email</label>
                                <input type="email" name="email" value={data.email} placeholder="Enter your Email" className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:border-[#FF7D29]" onChange={changeHandler} required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="username" className="block text-gray-700">Username</label>
                                <input type="text" name="username" value={data.username} placeholder="Enter your username" className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:border-[#FF7D29]" onChange={changeHandler} required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-gray-700">Password</label>
                                <input type="password" name="password" value={data.password} placeholder="Enter your Password" className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:border-[#FF7D29]" onChange={changeHandler} required />
                            </div>
                            {error && <p className="text-red-500 text-md pb-4">{error}</p>}
                            <button className="w-full text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2">{loading ? 'Signing in...' : 'Signup'}</button>
                        </form>
                    )}
                    {stage === "otp" && (
                        <form onSubmit={submitHandler}>
                            <p className="text-center text-gray-700 mb-4">Enter the activation code sent to your email {data.email}</p>
                            <div className="mb-4 flex justify-between">
                                {otp.map((value, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        maxLength="1"
                                        value={value}
                                        placeholder="0"
                                        className="mt-1 p-2 border border-gray-300 bg-gray-700 text-white rounded-md w-1/6 text-center focus:outline-none focus:border-[#FF7D29]"
                                        onChange={(e) => otpChangeHandler(e, index)}
                                        ref={el => otpRefs.current[index] = el}
                                        required
                                    />
                                ))}
                            </div>
                            {error && <p className="text-red-500 text-md pb-4">{error}</p>}
                            <button className="w-full text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2">Verify</button>
                        </form>
                    )}
                    
                </div>
                <p className="text-center text-gray-400 mt-4">Already Have an account? <Link to='/login' className="text-blue-400">Login</Link></p>
            </div>
        </div>
    )
}

export default Register
