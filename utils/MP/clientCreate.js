const mercadopago = require('mercadopago');
const { config } = require('../../config/config');

mercadopago.configure({
  access_token: config.accessToken,
});

const customerData = { email: 'test_payer_12345@testuser.com' };

mercadopago.customers.create(customerData).then((customer) => {
  const cardData = {
    token: '9b2d63e00d66a8c721607214cedaecda',
    customer_id: customer.id,
    issuer_id: '23',
    payment_method_id: 'debit_card',
  };

  mercadopago.card.create(cardData).then((card) => {
    console.log(card);
  });
});
