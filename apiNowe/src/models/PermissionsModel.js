import { Model, DataTypes } from 'sequelize';

export default class Permission extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        unique: {
          msg: 'este usuario já possui uma permissão',
        },
        primaryKey: true,
      },
      adm: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      insert: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      edit: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      delet: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    }, {
      sequelize,
      tableName: 'permissions',
    });
  }

  static associate(models) {
    this.belongsTo(
      models.User,
      {
        constraints: true,
        foreignKey: {
          type: DataTypes.INTEGER,
          name: 'user_id',
          unique: {
            msg: 'este usuario já possui uma permissão',
          },
          allowNull: false,
        },
        as: 'user',
      },
    );
  }
}
