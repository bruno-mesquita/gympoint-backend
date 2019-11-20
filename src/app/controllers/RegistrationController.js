import Registration from '../models/Registration';

class RegistrationController {
  async store(req, res) {
    const register = Registration.create(req.body);

    return res.json(register);
  }
}

export default new RegistrationController();
