import * as Yup from 'yup';
import Student from '../models/Student';

class StudentController {
  async list(req, res) {
    const students = await Student.findAll({
      attributes: { exclude: ['created_at', 'updated_at'] },
    });

    return res.json(students);
  }

  async store(req, res) {
    // Schema de validação
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      email: Yup.string().email(),
      idade: Yup.number()
        .required()
        .positive()
        .integer(),
      peso: Yup.number()
        .positive()
        .required(),
      altura: Yup.number()
        .positive()
        .required(),
    });

    // Validando o schema
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Erro na Validação' });
    }

    // Criando o aluno
    const student = await Student.create(req.body);

    return res.json(student);
  }

  async update(req, res) {
    const { id } = req.params; // id do aluno envido por http

    // Schema de Validação
    const schema = Yup.object().shape({
      nome: Yup.string(),
      email: Yup.email(),
      idade: Yup.number()
        .integer()
        .positive(),
      peso: Yup.number().positive(),
      altura: Yup.number().positive(),
    });

    // Validando o schema
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'erro de validação' });
    }

    const student = await Student.findByPk(id);

    // Verificando se o usuario existe
    if (!student) {
      return res.status(400).json({ error: 'Aluno não Encontrado' });
    }

    await student.update(req.body);

    return res.json(student);
  }

  async detroy(req, res) {
    const { id } = req.params; // id do aluno envido por http

    const student = await Student.findByPk(id);

    // Verificando se o usuario existe
    if (!student) {
      return res.status(400).json({ error: 'Aluno não Encontrado' });
    }

    await student.destroy();

    return res.json({ Ok: 'Estudante Apagado.' });
  }
}

export default new StudentController();
