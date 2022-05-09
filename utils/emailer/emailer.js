const nodemailer = require('nodemailer');

const createTrans = () => {
  const transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '034773c616ef6d',
      pass: 'ff05ffb74109c1',
    },
  });

  return transport;
};

const sendMail = async (user) => {
  const transporter = createTrans();
  const info = await transporter.sendMail({
    from: '"Rental" <rental@rental.com>',
    to: `${user.email}`,
    subject: `Bienvenido a Rental App ${user.organization ? user.organization : user.firstName}!`,
    html: `<h4>Hola ${user.organization ? user.organization : user.firstName}, te damos la bienvenida a la red más amplia de alojamientos de la región.</h4>
    <p>En Rental encontrarás una variada gama de hospedajes para que tu viaje sea una experiencia única.</p>
    <p>Te esperamos en tu próxima reserva!</p>`,
  });
  console.log('Message sent: %s', info.messageId);
};

exports.sendMail = (user) => sendMail(user);
