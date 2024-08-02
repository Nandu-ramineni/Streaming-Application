import { useState } from 'react';
import { FaDownload, FaRegCircleUser } from "react-icons/fa6";
import { LuLaptop2 } from "react-icons/lu";
import { MdKeyboardArrowRight, MdLaptopMac, MdOutlineTabletMac } from "react-icons/md";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { TbDeviceIpad } from "react-icons/tb";
import CustomModal from './CustomModal';
import { useNavigate } from 'react-router-dom';
import { getInvoice } from '../../Services/api';

const SubscriptionDetails = ({ subscription, profile }) => {
    const { plan, endDate, _id } = subscription;
    const [isHelpModalOpen, setHelpModalOpen] = useState(false);
    const [isFeedbackModalOpen, setFeedbackModalOpen] = useState(false);
    const navigate = useNavigate();
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);
        const [month, day, year] = formattedDate.replace(/,/g, '').split(' ');

        return `${day} ${month}, ${year}`;
    };

    const getUserDeviceInfo = () => {
        const userAgent = navigator.userAgent;
        let device = "Unknown Device";
        let icon = <LuLaptop2 />;
        if (/mobile/i.test(userAgent)) {
            device = "Mobile";
            icon = <HiOutlineDevicePhoneMobile />;
        } else if (/tablet/i.test(userAgent)) {
            device = "Tablet";
            icon = <MdOutlineTabletMac />;
        } else if (/iPad|Macintosh/i.test(userAgent) && 'ontouchend' in document) {
            device = "iPad";
            icon = <TbDeviceIpad />;
        } else if (/Mac/i.test(userAgent)) {
            device = "Mac";
            icon = <MdLaptopMac />;
        } else if (/Win/i.test(userAgent)) {
            device = "Windows PC";
            icon = <LuLaptop2 />;
        } else if (/Linux/i.test(userAgent)) {
            device = "Linux PC";
            icon = <LuLaptop2 />;
        }

        return { device, icon };
    };

    const { device: userDevice, icon: deviceIcon } = getUserDeviceInfo();

    const helpCenterContent = [
        {
            question: "How do I reset my password?",
            answer: "You can reset your password by going to the 'Forgot Password' section on the login page and following the instructions."
        },
        {
            question: "How do I contact support?",
            answer: "You can contact support by sending an email to support@enjoyio.gmail.com or using the contact form on our website."
        },
        {
            question: "How do I buy a subscription?",
            answer: "To purchase a subscription, go to the 'Subscriptions' section in your account settings and choose the plan that suits you. Follow the prompts to complete the payment process."
        },
        {
            question: "How do I upgrade my subscription?",
            answer: "To upgrade your subscription, go to the 'Subscriptions' section in your account settings. Select the new plan you want to upgrade to and follow the instructions to complete the upgrade."
        },
        {
            question: "Can I cancel my subscription?",
            answer: "Yes, you can cancel your subscription by going to the 'Subscriptions' section in your account settings and selecting 'Cancel Subscription'. Follow the prompts to complete the cancellation process."
        },
        {
            question: "How do I view my billing history?",
            answer: "You can view your billing history by going to the 'Billing' section in your account settings. Here, you'll find a detailed list of all your past transactions and invoices."
        },
        {
            question: "How do I update my payment information?",
            answer: "To update your payment information, go to the 'Billing' section in your account settings. Select 'Update Payment Information' and enter your new payment details."
        },
        {
            question: "What should I do if I encounter an error while streaming?",
            answer: "If you encounter an error while streaming, try restarting the app or refreshing the page. If the problem persists, contact our support team with details about the issue for further assistance."
        }
    ];
    const handleUpgradeClick = () => {
        navigate('/upgrade-subscription');
    };
    const handleDownloadInvoice = async () => {
        try {
            const response = await getInvoice(_id);
            const url = window.URL.createObjectURL(new Blob([response.data], { type: response.headers['content-type'] }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Invoice_${_id}.pdf`);
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error downloading invoice:', error);
        }
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
                <h2 className="text-2xl font-semibold text-gray-100 mb-4 flex items-center gap-2"><FaRegCircleUser /> Subscription Details</h2>
                {plan ? (
                    <div>
                        <div className="text-gray-100 mb-2 text-lg">
                            <span className="font-medium ">Plan:</span> Enjoyio {plan}
                            <button onClick={handleDownloadInvoice} className="text-gray-100 ml-2 hover:text-gray-300">
                                <FaDownload />
                            </button>
                        </div>
                        <div className="text-gray-100 mb-2 ">
                            <p>Next Payment on <span className="font-medium text-[#FFE18B]">{formatDate(endDate)} </span></p>
                        </div>
                        <div className="py-2">
                            {plan !== 'Yearly Premium' && (
                                <button
                                    onClick={handleUpgradeClick}
                                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-5 mr-1 py-2.5 text-center mb-2"
                                >
                                    Upgrade
                                </button>
                            )}
                            <button className="text-white bg-[#4e4e4e] font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2">
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <button onClick={() => navigate('/subscription')} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2">Buy Subscription</button>
                )}
            </div>
            <div>
                <h2 className="text-2xl font-semibold text-gray-100 mb-2 flex items-center gap-2">Registered Email</h2>
                <div className="text-gray-100 pb-3 ">
                    <span className="font-medium text-sm ">{profile?.email}</span> <br />
                    <span className="font-medium text-sm ">{profile?.username}</span>
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-gray-100 mb-2 flex items-center gap-2">This Device</h2>
                    <p className="text-gray-100 text-lg flex items-center gap-2">{deviceIcon} {userDevice}</p>
                </div>
            </div>
            <div>
                <h2 className="text-xl font-normal text-gray-100 mb-3 flex items-center gap-2">HELP & SUPPORT</h2>
                <div className="text-gray-100 text-lg flex justify-between items-center gap-2 cursor-pointer" onClick={() => setHelpModalOpen(true)}>
                    <div>
                        <p>Help Center?</p>
                        <p className="text-sm">Happy to help</p>
                    </div>
                    <div>
                        <MdKeyboardArrowRight className="text-3xl" />
                    </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                    <span className="border-b border-gray-700 flex-grow mr-2"></span>
                </div>
                <div className="text-gray-100 text-lg py-2 flex justify-between items-center gap-2 cursor-pointer" onClick={() => setFeedbackModalOpen(true)}>
                    <div>
                        <p className="cursor-pointer">Send us Feedback</p>
                        <p className="text-sm">We would love to hear your suggestions</p>
                    </div>
                    <div>
                        <MdKeyboardArrowRight className="text-3xl" />
                    </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                    <span className="border-b border-gray-700 flex-grow mr-2"></span>
                </div>
            </div>
            <CustomModal
                isOpen={isHelpModalOpen}
                onRequestClose={() => setHelpModalOpen(false)}
                title="Help Center"
                content={helpCenterContent}
            />
            <CustomModal
                isOpen={isFeedbackModalOpen}
                onRequestClose={() => setFeedbackModalOpen(false)}
                title="Feedback"
                content={[
                    {
                        question: "", answer: (
                            <div>
                                <textarea className="w-full p-2 rounded border border-gray-600 bg-gray-900 text-gray-100" rows="4" placeholder="Your feedback..."></textarea>
                                <div className="flex items-center gap-4 mt-4">
                                    <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br font-medium rounded-lg text-lg px-5 py-2.5">
                                        Submit
                                    </button>
                                    <div>
                                        <p className="text-gray-100">Rate us:</p>
                                        <select className="bg-gray-900 border border-gray-600 rounded p-2 text-gray-100">
                                            <option value="1">1 Star</option>
                                            <option value="2">2 Stars</option>
                                            <option value="3">3 Stars</option>
                                            <option value="4">4 Stars</option>
                                            <option value="5">5 Stars</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                ]}
            />
        </div>
    );
};

export default SubscriptionDetails;
