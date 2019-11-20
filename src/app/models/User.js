import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  // Classe para molde -- Model
  static init(sequelize) {
    // Metodo init chamado na incialização do model
    super.init(
      // campos passados por object
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      // segundo args um object contendo a conexão com o bd
      {
        sequelize,
      }
    );
    // Hook -- Antes de Salvar -- Hash da senha
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = bcrypt.hash(user.password, 8);
      }
    });
  }

  // Metodo para verificar a senha
  CheckPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
