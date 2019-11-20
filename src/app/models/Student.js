import Sequelize, { Model } from 'sequelize';

// Classe para os alunos da GYM
class Student extends Model {
  // Metodo static construtor
  static init(sequelize) {
    // Chamando o metodo init construtor - pai
    super.init(
      // campos do student
      {
        nome: Sequelize.STRING,
        email: Sequelize.STRING,
        idade: Sequelize.INTEGER,
        peso: Sequelize.FLOAT,
        altura: Sequelize.FLOAT,
      },
      // Conexão passada por parametros
      {
        sequelize,
      }
    );
  }
}

export default Student;
