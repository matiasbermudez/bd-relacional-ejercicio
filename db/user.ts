import { Model, DataTypes } from 'sequelize';
import { sequelize } from './index';
export class User extends Model {};
    
    User.init({
      username: DataTypes.STRING,
      lastname: DataTypes.STRING,
      birthday: DataTypes.DATEONLY
    },{
      sequelize, // We need to pass the connection instance
      modelName: 'user', // We need to choose the model name
});
