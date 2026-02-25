import React, { useState } from 'react';

const PaymentCheckout = ({ onBack, onSuccess, coach, session }) => {
    const [isPaid, setIsPaid] = useState(false);

    if (isPaid) {
        return (
            <div className="p-8 text-center max-w-lg mx-auto">
                 <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
                <p className="text-gray-600 mb-8">Your session is confirmed.</p>
                <div className="text-left bg-gray-50 p-4 rounded-lg mb-8">
                    <p><strong className="font-semibold">Coach:</strong> {coach.name}</p>
                    <p><strong className="font-semibold">Date:</strong> {session.date}</p>
                    <p><strong className="font-semibold">Amount Paid:</strong> ${session.price}</p>
                </div>
                <button onClick={onSuccess} className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg">Back to Messages</button>
            </div>
        )
    }

    return (
        <div className="p-8">
            <div className="text-sm text-gray-500 mb-4"> 
                <a href="#" onClick={onBack} className="hover:underline"> &lt; Coach Marketplace &gt; Messages </a> &gt; Payment
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                <div>
                    <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                    <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
                        <div className="flex items-center">
                            <img src={coach.photo} alt={coach.name} className="w-12 h-12 rounded-full mr-4"/>
                            <div>
                                <p className="font-bold">{coach.name}</p>
                                <p className="text-sm text-gray-500">{session.category}</p>
                            </div>
                        </div>
                        <div className="my-4 h-px bg-gray-200"></div>
                        <p className="font-semibold">{session.title}</p>
                        <p className="text-sm text-gray-600">{session.topics}</p>
                         <p className="text-sm text-gray-600">Date & Time: TBD</p>
                        <p className="text-sm text-gray-600">Length: {session.length} min</p>
                        <div className="my-4 h-px bg-gray-200"></div>
                        <p className="text-lg font-bold text-right">Total: ${session.price}</p>
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-6">Payment Details</h2>
                    <div className="space-y-4">
                         <input type="text" placeholder="Card Number" className="w-full p-3 border rounded-md"/>
                         <div className="flex space-x-4">
                            <input type="text" placeholder="MM/YY" className="w-1/2 p-3 border rounded-md"/>
                            <input type="text" placeholder="CVC" className="w-1/2 p-3 border rounded-md"/>
                         </div>
                         <button onClick={() => setIsPaid(true)} className="w-full bg-blue-600 text-white font-bold py-4 rounded-lg mt-4">Pay ${session.price}</button>
                         <p className="text-xs text-gray-500 text-center mt-2">🔒 Funds are held securely and released to the coach 3 days after session completion.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentCheckout;
