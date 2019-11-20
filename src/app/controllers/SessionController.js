import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import authConfig from '../../config/auth';
import User from '../models/User';

class SessionController {
  async store(req, res) {
    // schema de Validalção
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    // Validando schema
    if (!(await schema.isValid(req.body))) {
      return res.json({ error: 'Erro de validação' });
    }

    const { email, password } = req.body;

    // Procurando User
    const user = await User.findOne({
      where: { email },
    });

    // Verificando se ele existe
    if (!user) {
      return res.status(401).json({ error: 'Credenciais Invalidas' });
    }

    // Verificando a senha
    if (!user.CheckPassword(password)) {
      return res.status(401).json({ error: 'Credenciais Invalidas' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
