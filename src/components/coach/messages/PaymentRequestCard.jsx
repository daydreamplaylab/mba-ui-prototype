import React, { useState } from 'react';

const PaymentRequestCard = ({ data, coachName }) => {
    const [isDeclined, setIsDeclined] = useState(false);

    if (data.paid) {
        return (
            <div className="p-4 my-4 border rounded-lg bg-green-50 text-green-800">
                <p>✓ Paid on {data.paidDate}</p>
            </div>
        )
    }

    if (isDeclined) {
        return (
            <div className="p-4 my-4 border rounded-lg bg-red-50 text-red-800">
                <p>You have declined this payment request.</p>
            </div>
        )
    }

    return (
        <div className="p-4 my-4 border-2 border-amber-300 rounded-lg bg-amber-50">
            <h4 className="font-bold mb-2">Payment Request from {coachName}</h4>
            <p className="font-semibold">{data.title}</p>
            <p className="text-sm text-gray-600">{data.topics}</p>
            <div className="my-2 h-px bg-gray-200"></div>
            <p className="text-sm text-gray-600">Session Length: {data.length} min</p>
            <p className="text-sm text-gray-600">Price: ${data.price}</p>
            <div className="flex justify-end mt-4 space-x-4">
                <button onClick={() => setIsDeclined(true)} className="text-sm font-semibold text-gray-600 hover:underline">Decline</button>
                <button onClick={() => window.handlePaymentStart(coachName, data)} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">Pay & Confirm</button>
            </div>
        </div>
    )
}

export default PaymentRequestCard;