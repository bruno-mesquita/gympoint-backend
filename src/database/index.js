import Sequelize from 'sequelize';

// Configurações
import configDB from '../config/database';

// Models
import User from '../app/models/User';
import Student from '../app/models/Student';
import Plan from '../app/models/Plan';
import Registration from '../app/models/Registration';

// Models em um Array
const models = [User, Student, Plan, Registration];

// Classe Default para o BD
class Database {
  constructor() {
    this.init();
  }

  init() {
    // inicia uma conexão
    this.connection = new Sequelize(configDB);

    // inicia todos os models dentro do array
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
