
const PaymentSuccessful = () => {
    return (
        <div className="payment-successful-container text-white">
            <div className="tick-container">
                <svg className="tick-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fill="none"
                        stroke="green"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                    />
                </svg>
            </div>
            <h1 className="success-message">Payment Successful!</h1>
            <p>Your payment has been processed successfully. Thank you for your purchase.</p>
        </div>
    );
};

export default PaymentSuccessful;
