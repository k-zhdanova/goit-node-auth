import { DataTypes } from 'sequelize';
import sequelize from '../db/db.js';
import User from './User.js';

const Contact = sequelize.define('Contact', {
	name:   { type: DataTypes.STRING,  allowNull: false },
	email:  { type: DataTypes.STRING,  allowNull: false },
	phone:  { type: DataTypes.STRING,  allowNull: false },
	favorite: { type: DataTypes.BOOLEAN, defaultValue: false },
	owner:  { type: DataTypes.INTEGER, allowNull: false },
}, {
	tableName: 'contacts',
	freezeTableName: true,
});

User.hasMany(Contact, { foreignKey: 'owner', onDelete: 'CASCADE' });
Contact.belongsTo(User, { foreignKey: 'owner' });

export default Contact;
