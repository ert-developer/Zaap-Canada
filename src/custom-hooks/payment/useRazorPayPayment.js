import RazorpayCheckout from 'react-native-razorpay';
import {envConfig} from '../../assets/helpers/envApi';

const handlePayment = async (amount = 500) => {
  try {
    // Create order on your server
    const orderResponse = await fetch('https://zaaprazorpayserver.onrender.com/api/payments/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({amount}), // Simplified amount sending
    });

    const order = await orderResponse.json();

    // Define Razorpay options
    const options = {
      description: 'Payment for Order',
      image: 'https://your-logo-url.com',
      currency: order.currency,
      key: `${envConfig.RAZORPAY_API_KEY}`, // Replace with your key id
      amount: order.amount,
      order_id: order.id, // Add order_id generated by Razorpay
      prefill: {
        email: 'customer.email@example.com',
        contact: '9876543210',
        name: 'Customer Name',
      },
      theme: {color: '#53a20e'},
    };

    // Open Razorpay checkout
    const data = await RazorpayCheckout.open(options);

    // Verify the payment on the server
    const verifyResponse = await fetch('https://zaaprazorpayserver.onrender.com/api/payments/verify-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order_id: order.id,
        payment_id: data.razorpay_payment_id,
        signature: data.razorpay_signature,
      }),
    });

    const result = await verifyResponse.json();

    if (result.status === 'success') {
      console.log('Payment successful:', result);
      return {result, data: {order_id: order.id, payment_id: data.razorpay_payment_id}}; // Return success status
    } else {
      console.log('Payment verification failed:', result);
      return {result}; // Return failure status
    }
  } catch (error) {
    console.error('Payment process error:', error);
    return {status: 'failure', error: error.message}; // Return failure status with error
  }
};

export default handlePayment;