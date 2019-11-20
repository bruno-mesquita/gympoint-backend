import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async list(req, res) {
    const plans = await Plan.findAll({
      attributes: ['id', 'title', 'duration', 'price'],
    });
    return res.json(plans);
  }

  async store(req, res) {
    // Schema de Validação
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number()
        .positive()
        .integer()
        .required(),
      price: Yup.number()
        .positive()
        .required(),
    });

    // Validando Schema
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Erro de Validação' });
    }

    const { title, duration, price } = await Plan.create(req.body);

    return res.json({ plan: { title, duration, price } });
  }

  async update(req, res) {
    // Schema de Validação
    const schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number()
        .positive()
        .integer(),
      price: Yup.number().positive(),
    });

    // Validando Schema
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Erro de Validação' });
    }

    const { id } = req.params;

    const plan = await Plan.findByPk(id);

    if (!plan) {
      return res.status(400).json({ error: 'Plano não Encontrado' });
    }

    const { title, duration, price } = await plan.update(req.body);

    return res.json({ plan: { title, duration, price } });
  }

  async destroy(req, res) {
    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res.status(401).json({ error: 'Esse Plano não existe' });
    }

    await plan.destroy();

    return res.json();
  }
}

export default new PlanController();
