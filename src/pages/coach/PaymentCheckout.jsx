
import React from 'react';

const PaymentCheckout = () => {
  return (
    <div className="p-8">
        <div className="text-sm text-gray-500 mb-4">Coach Marketplace &gt; Messages &gt; Payment</div>
        <div className="grid grid-cols-2 gap-12">
            <div>
                <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                <div className="border rounded-lg p-4">
                    <h3 className="text-xl font-bold">Session with Sarah L.</h3>
                    <p className="text-gray-600">Interview Prep</p>
                    <p className="text-gray-600">Topics: Mock interview, feedback, and strategy</p>
                    <p className="text-gray-600">Length: 60 min</p>
                    <p className="text-2xl font-bold mt-4">Total: $200</p>
                </div>
            </div>
            <div>
                <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
                        <input type="text" id="cardNumber" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry Date</label>
                            <input type="text" id="expiryDate" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                        </div>
                        <div>
                            <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">CVC</label>
                            <input type="text" id="cvc" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                        </div>
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold">Pay $200</button>
                    <p className="text-xs text-gray-500 mt-2 text-center">Funds are held securely and released to the coach 3 days after session completion.</p>
                </form>
            </div>
        </div>
    </div>
  );
};

export default PaymentCheckout;
