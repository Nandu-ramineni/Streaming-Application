import { useState, useEffect } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { getSubscriptions, updateSubscription, initiatePayment, validatePayment, sendPaymentDetails } from '../../Services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpgradeSubscription = () => {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [duration, setDuration] = useState('Monthly');
    const [currentSubscription, setCurrentSubscription] = useState(null);
    const [upgradeAmount, setUpgradeAmount] = useState(0);

    useEffect(() => {
        const fetchSubscription = async () => {
            const userId = localStorage.getItem('userId');
            const response = await getSubscriptions(userId);
            if (response && response.data) {
                setCurrentSubscription(response.data.sub);
                setSelectedPlan(response.data.sub.plan);
                setDuration(response.data.sub.duration);
            }
        };
        fetchSubscription();
    }, []);

    useEffect(() => {
        if (currentSubscription && selectedPlan && duration) {
            calculateUpgradeAmount();
        }
    }, [currentSubscription, selectedPlan, duration]);

    const calculateUpgradeAmount = () => {
        if (!currentSubscription) return;

        const currentPlanPrice = plans.find((p) => p.name === currentSubscription.plan).price[currentSubscription.duration];
        const newPlanPrice = plans.find((p) => p.name === selectedPlan).price[duration];

        const currentDate = new Date();
        const endDate = new Date(currentSubscription.endDate);
        const remainingDays = (endDate - currentDate) / (1000 * 60 * 60 * 24);

        const totalDays = {
            Monthly: 30,
            Quarterly: 90,
            Yearly: 365,
        }[currentSubscription.duration];

        const remainingValue = (currentPlanPrice / totalDays) * remainingDays;
        const newPlanValue = newPlanPrice;

        const amountToPay = Math.max(newPlanValue - remainingValue, 0);
        setUpgradeAmount(amountToPay.toFixed(2));
    };

    const handlePlanSelection = (plan) => {
        setSelectedPlan(plan);
    };

    const handleDurationChange = (e) => {
        setDuration(e.target.value);
    };

    const handleSubscriptionUpgrade = async () => {
        const userId = localStorage.getItem('userId');
        const startDate = new Date();
        let endDate;
        switch (duration) {
            case 'Monthly':
                endDate = new Date(startDate.setMonth(startDate.getMonth() + 1));
                break;
            case 'Quarterly':
                endDate = new Date(startDate.setMonth(startDate.getMonth() + 3));
                break;
            case 'Yearly':
                endDate = new Date(startDate.setFullYear(startDate.getFullYear() + 1));
                break;
            default:
                endDate = startDate;
        }
        const data = {
            plan: selectedPlan,
            duration,
            startDate: new Date(),
            endDate,
            isActive: true,
        };
        try {
            const response = await updateSubscription(userId, data);
            if (response.status === 200) {
                const paymentResponse = await initiatePayment(response.data.subscriptionId, upgradeAmount);
                if (!paymentResponse || !paymentResponse.id) {
                    toast.error('Failed to initiate payment. Please try again.');
                    return;
                }
                const options = {
                    key: 'rzp_test_kzINWtT3ElrntA',
                    amount: upgradeAmount * 100, 
                    currency: 'INR',
                    name: 'Enjoyio',
                    description: 'Subscription Upgrade Payment',
                    order_id: paymentResponse.id,
                    handler: async (paymentResponse) => {
                        const paymentDetails = {
                            razorpay_payment_id: paymentResponse.razorpay_payment_id,
                            razorpay_order_id: paymentResponse.razorpay_order_id,
                            razorpay_signature: paymentResponse.razorpay_signature
                        };
                        try {
                            const validationResponse = await validatePayment(paymentDetails);
                            if (validationResponse.status === 'success') {
                                await sendPaymentDetails(response.data.subscriptionId, validationResponse.payment_id, validationResponse.status);
                                toast.success('Subscription upgrade successful!');
                            } else {
                                toast.error('Payment validation failed.');
                            }
                        } catch (error) {
                            console.error('Error validating payment:', error);
                            toast.error('Payment validation failed.');
                        }
                    },
                    prefill: {
                        name: 'Customer Name',
                        email: 'customer@example.com',
                        contact: '9999999999'
                    },
                    theme: {
                        color: '#8EC44C'
                    }
                };
                const rzp = new window.Razorpay(options);
                rzp.on('payment.failed', (response) => {
                    toast.error('Payment failed. Please try again.');
                    console.error('Payment failed:', response.error);
                });
                rzp.open();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Error upgrading subscription:', error);
        }
    };

    const plans = [
        {
            name: 'Basic',
            price: { Monthly: 99, Quarterly: 299, Yearly: 499 },
            features: [
                'Watch on 1 device at a time',
                'SD quality',
                'No downloads',
            ],
        },
        {
            name: 'Flex',
            price: { Monthly: 150, Quarterly: 499, Yearly: 799 },
            features: [
                'Watch on 2 devices at a time',
                'HD quality',
                'Download available',
                'No ads',
            ],
        },
        {
            name: 'Premium',
            price: { Monthly: 299, Quarterly: 699, Yearly: 1299 },
            features: [
                'Watch on 4 devices at a time',
                'Ultra HD quality',
                'Dolby Atmos sound',
                'Download available',
                'Unlimited downloads',
                'No ads',
                'Access to exclusive content',
            ],
        },
    ];

    const allFeatures = [
        'Watch on 1 device at a time',
        'Watch on 2 devices at a time',
        'Watch on 4 devices at a time',
        'SD quality',
        'HD quality',
        'Ultra HD quality',
        'Dolby Atmos sound',
        'No downloads',
        'Download available',
        'Unlimited downloads',
        'No ads',
        'Access to exclusive content',
    ];

    return (
        <div className="upgrade-subscription-container text-center p-4 sm:p-6 md:p-10 flex flex-col items-center">
            <ToastContainer />
            <h1 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-8 pt-12 sm:pt-14 text-gray-300">Upgrade Your Plan</h1>
            {currentSubscription && (
                <p className="mb-4 text-gray-300">
                    Your current subscription is <strong>{currentSubscription.plan}</strong> for <strong>{currentSubscription.duration}</strong>.
                </p>
            )}
            <div className="flex flex-wrap justify-center w-full">
                <div className="subscription-plans grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full sm:w-2/3">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`plan border rounded-lg p-4 sm:p-6 cursor-pointer transition-transform transform ${selectedPlan === plan.name
                                ? 'scale-105 border-blue-500 bg-blue-100 text-black'
                                : 'border-gray-300 text-gray-300'
                                }`}
                            onClick={() => handlePlanSelection(plan.name)}
                        >
                            <h2 className="text-lg sm:text-xl font-bold mb-4">{plan.name}</h2>
                            <ul className="mt-4 text-left">
                                {allFeatures.map((feature, index) => (
                                    <li key={index} className="mb-2 flex items-center">
                                        {plan.features.includes(feature) ? (
                                            <span className="text-green-500 mr-2">✔</span>
                                        ) : (
                                            <span className="text-red-500 mr-2">✘</span>
                                        )}
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            {selectedPlan && (
                <div className="mt-8 pt-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-8 w-full sm:w-2/3">
                    <div className="flex-1 flex items-center gap-2 w-full">
                        <label className="text-gray-300 px-2 text-xl sm:text-2xl">{selectedPlan}</label>
                        <select
                            value={duration}
                            onChange={handleDurationChange}
                            className="p-2 border rounded-full text-black bg-blue-100 focus:outline-none w-full"
                        >
                            <option value="Monthly" className='text-black'>Monthly</option>
                            <option value="Quarterly" className='text-black'>Quarterly</option>
                            <option value="Yearly" className='text-black'>Yearly</option>
                        </select>
                    </div>
                    <div className="coupon-code flex items-center w-full md:w-auto ">
                        <input
                            type="text"
                            placeholder="Have a Coupon code?"
                            className="p-2 border rounded-full w-full bg-blue-100 focus:outline-none"
                        />
                        <button className="bg-blue-500 text-white py-2 px-4 rounded-full ml-2">Apply</button>
                    </div>
                    <button
                        onClick={handleSubscriptionUpgrade}
                        className="flex-1 bg-blue-100 text-lg text-black py-2 px-6 rounded-full flex items-center justify-center w-full"
                    >
                        Pay ₹{upgradeAmount}<FaArrowRight className="ml-2 " />
                    </button>
                </div>
            )}
        </div>
    );
};

export default UpgradeSubscription;
