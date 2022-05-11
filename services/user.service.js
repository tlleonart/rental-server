const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');
const nodemailer = require('nodemailer');
const { config } = require('../config/config');
const { models } = require('../libs/sequelize');
const { users } = require('../api/api.json');

class UserService {
  constructor() {}

  async dbLoadUsers() {
    users.map((u) => this.create(u));
  }

  async find() {
    const allUsers = await models.User.findAll();

    if (allUsers.length === 0) {
      await this.dbLoadUsers();
    }

    return allUsers;
  }

  async findByEmail(email) {
    const user = await models.User.findOne({
      where: { email },
    });

    return user;
  }

  async delete(id, body) {
    const user = await this.findById(id);

    const userDeleted = await user.update(body);

    return userDeleted;
  }

  async findById(id) {
    const user = await models.User.findByPk(id, {
      include: [models.Hotel, models.Review, models.Booking],
    });

    if (!user) {
      throw boom.notFound('User Not Found');
    }

    return user;
  }

  async create(body) {
    const hash = await bcrypt.hash(body.password, 10);

    const newUser = await models.User.create({ ...body, password: hash, repeatPass: hash });

    delete newUser.dataValues.password;
    delete newUser.dataValues.repeatPass;

    const mail = {
      from: 'rental@rental.com',
      to: `${newUser.email}`,
      subject: `Bienvenido a Rental App ${newUser.organization ? newUser.organization : newUser.firstName}!`,
      html: `<h4>Hola ${newUser.organization ? newUser.organization : newUser.firstName}, te damos la bienvenida a la red más amplia de alojamientos de la región.</h4>
      <p>En Rental encontrarás una variada gama de hospedajes para que tu viaje sea una experiencia única.</p>
      <p>Te esperamos en tu próxima reserva!</p>
      <a href='https://rental-app-client.netlify.app/'>Ir a Rental-App</a>`,
    };

    // await this.sendMail(mail);

    return newUser;
  }

  async update(id, body) {
    const user = await this.findById(id);

    if (!user) {
      throw boom.notFound('User Not Found');
    }

    const updatedUser = await user.update(body);

    return updatedUser;
  }

  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: config.smtpEmail,
        pass: config.smtpPassword,
      },
    });

    await transporter.sendMail(infoMail);

    return { message: 'New User Mail Sent' };
  }
}

module.exports = UserService;
