const mercadopago = require('mercadopago');
const { config } = require('../../config/config');

mercadopago.configurations.setAccessToken(config.accessToken);

const paymentData = {
  transaction_amount: 100,
  token: 'ff8080814c11e237014c1ff593b57b4d',
  installments: 1,
  payer: {
    type: 'customer',
    id: '123456789-jxOV430go9fx2e',
  },
};

mercadopago.payment.create(paymentData).then((data) => {
  console.log(data);
});
