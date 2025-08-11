import '../styles/components/Payment.css'; 
import React, { useState } from 'react';
import GooglePayButton from '@google-pay/button-react';

function Payment() {
  // State to hold form data
  const [formData, setFormData] = useState({
    amount: '1', // Default amount
    description: 'Donation to HumaNGO',
    currency: 'INR', // Default currency
    country: 'IN' // Default country code
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="Pay">
      <div className="payment_box">
        <h1>Support HumaNGO</h1>
        <p>Your generous contribution helps us continue our mission.</p>

        <form>
          <div className="form-group">
            <label htmlFor="amount">Amount:</label>
            <input 
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              placeholder="Enter amount"
              id="amount"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <input 
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter description"
              id="description"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="currency">Currency Code:</label>
            <input 
              type="text"
              name="currency"
              value={formData.currency}
              onChange={handleInputChange}
              placeholder="Enter currency code (e.g., INR)"
              id="currency"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="country">Country Code:</label>
            <input 
              type="text"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              placeholder="Enter country code (e.g., IN)"
              id="country"
              required
            />
          </div>
        </form>
        
        <GooglePayButton
          environment="TEST"
          paymentRequest={{
            apiVersion: 2,
            apiVersionMinor: 0,
            allowedPaymentMethods: [
              {
                type: 'CARD',
                parameters: {
                  allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                  allowedCardNetworks: ['MASTERCARD', 'VISA'],
                },
                tokenizationSpecification: {
                  type: 'PAYMENT_GATEWAY',
                  parameters: {
                    gateway: 'example',
                    gatewayMerchantId: 'exampleGatewayMerchantId',
                  },
                },
              },
            ],
            merchantInfo: {
              merchantId: '12345678901234567890',
              merchantName: 'BelleZa',
            },
            transactionInfo: {
              totalPriceStatus: 'FINAL',
              totalPriceLabel: 'Total',
              totalPrice: formData.amount, // Use the amount entered by the user
              currencyCode: 'INR', // Use the currency code entered by the user
              countryCode: 'IN', 
            },
            shippingAddressRequired: true,
            callbackIntents: ['SHIPPING_ADDRESS', 'PAYMENT_AUTHORIZATION'],
          }}
          onLoadPaymentData={paymentRequest => {
            console.log('Success', paymentRequest);
          }}
          onPaymentAuthorized={paymentData => {
            console.log('Payment Authorised Success', paymentData);
            return { transactionState: 'SUCCESS' };
          }}
          onPaymentDataChanged={paymentData => {
            console.log('On Payment Data Changed', paymentData);
            return {};
          }}
          existingPaymentMethodRequired='false'
          buttonColor='black'
          buttonType='checkout'
        />

        <div className="footer-note">
          Pay securely using Google Pay!
        </div>
      </div>
    </div>
  );
}

export default Payment;