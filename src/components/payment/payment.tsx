
"use client";
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import './payment.css';
import { Box } from '@mui/material';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CheckoutForm: React.FC = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const [country, setCountry] = useState<string>('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardNumberElement = elements.getElement(CardNumberElement);
        const cardExpiryElement = elements.getElement(CardExpiryElement);
        const cardCvcElement = elements.getElement(CardCvcElement);

        try {
            const response = await axios.post('/payments/create-payment-intent', {
                amount: 1000, 
            });

            const { clientSecret } = response.data;

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardNumberElement!,
                    billing_details: {
                        name: 'Test User',
                        address: {
                            country,
                        },
                    },
                },
            });

            if (result.error) {
                setError(result.error.message ?? "An unknown error occurred");
            } else {
                if (result.paymentIntent?.status === 'succeeded') {
                    setSuccess(true);
                }
            }
        } catch (error: any) {
            setError(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="checkout-form">
            <Box className="field-wrapper">
                <label>Card Number</label>
                <CardNumberElement className="card-element" />
            </Box>
            <Box className="field-wrapper">
                <label>Expiration Date</label>
                <CardExpiryElement className="card-element" />
            </Box>
            <Box className="field-wrapper">
                <label>CVC</label>
                <CardCvcElement className="card-element" />
            </Box>
            <Box className="field-wrapper" >
                <label>Country</label>
                <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="card-element country"
                >
                    <option value="" disabled>Select Country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="GB">United Kingdom</option>
                    <option value="In">India</option>
                </select>
            </Box>
            <button type="submit" disabled={!stripe} className="pay-button">
                Pay
            </button>
            {error && <Box className="error-message">Payment not completed! Please try again later.</Box>}
            {success && <Box className="success-message">Payment Successful!</Box>}
        </form>
    );
};

const Payment: React.FC = () => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );
};

export default Payment;
