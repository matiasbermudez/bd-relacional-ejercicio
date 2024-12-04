import { Model, DataTypes} from 'sequelize';
import { sequelize } from './index';

export class Product extends Model{};

Product.init({
    precio : {
        type: DataTypes.INTEGER,
        allowNull : false},
    title : {
        type: DataTypes.STRING,
        allowNull: false}
},{
    sequelize,
    modelName : 'product'
});

 
// Product.init({
//     title: DataTypes.STRING,
//     precio: DataTypes.INTEGER,
//   },{
//     sequelize, // We need to pass the connection instance
//     modelName: 'user', // We need to choose the model name
// })