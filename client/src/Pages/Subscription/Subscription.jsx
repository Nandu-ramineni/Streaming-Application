import { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { buySubscription, initiatePayment, validatePayment, sendPaymentDetails } from '../../Services/api';
import { useNavigate } from 'react-router-dom';

const Subscription = () => {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [duration, setDuration] = useState('Monthly');
    const [coupon, setCoupon] = useState('');
    const [discount, setDiscount] = useState(0);
    const navigate = useNavigate();

    const handlePlanSelection = (plan) => {
        setSelectedPlan(plan);
    };

    const handleDurationChange = (e) => {
        setDuration(e.target.value);
    };

    const handleApplyCoupon = () => {
        if (coupon === 'TRYNEW') {
            setDiscount(0.35);
        } else if (coupon === 'Welcome') {
            setDiscount(0.15);
        } else {
            setDiscount(0.01);
        }
    };

    const getPrice = () => {
        if (!selectedPlan) return 0;
        const plan = plans.find((p) => p.name === selectedPlan);
        return plan.price[duration] * (1 - discount);
    };

    const handleSubscription = async () => {
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
            user: userId,
            plan: selectedPlan,
            duration,
            startDate: new Date(),
            endDate,
            isActive: true,
        };
        try {
            const response = await buySubscription(data);
            // alert(response.data.message);
            if (response.status === 201) {
                console.log("Subscription successful");
                const subscriptionId = response.data.newSubscription._id; 
                const paymentResponse = await initiatePayment(subscriptionId, getPrice());
                const options = {
                    key: 'rzp_test_kzINWtT3ElrntA', 
                    amount: getPrice() * 100, 
                    currency: 'INR',
                    name: 'Enjoyio',
                    description: 'Subscription Payment',
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
                                await sendPaymentDetails(subscriptionId, validationResponse.payment_id, validationResponse.status);
                                navigate('/sub-success');
                            } else {
                                alert('Payment validation failed.');
                            }
                        } catch (error) {
                            console.error('Error validating payment:', error);
                            alert('Payment validation failed.');
                        }
                    },
                    prefill: {
                        name: `${localStorage.getItem('username')}`,
                        email: 'customer@example.com',
                        contact: '9999999999'
                    },
                    theme: {
                        color: '#1A2130'
                    }
                };
                const rzp = new window.Razorpay(options);
                rzp.open();
            } else if (response.status === 400) {
                alert(response.data.message);
            }
        } catch (error) {
            console.error('Error buying subscription:', error);
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
        <div className="subscription-container text-center p-4 sm:p-6 md:p-10 flex flex-col items-center">
            <h1 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-8 pt-12 sm:pt-14 text-gray-300">Choose Your Plan</h1>
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
                    <div className="coupon-code flex items-center w-full md:w-auto">
                        <input
                            type="text"
                            placeholder="Have a Coupon code?"
                            value={coupon}
                            onChange={(e) => setCoupon(e.target.value)}
                            className="p-2 border rounded-full w-full bg-blue-100 focus:outline-none"
                        />
                        <button onClick={handleApplyCoupon} className="bg-blue-500 text-white py-2 px-4 rounded-full ml-2">Apply</button>
                    </div>
                    <button
                        onClick={handleSubscription}
                        className="flex-1 bg-blue-100 text-lg text-black py-2 px-6 rounded-full flex items-center justify-center w-full"
                    >
                        Pay ₹{getPrice().toFixed(2)}<FaArrowRight className="ml-2" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default Subscription;
