import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DB_URI, {
	dialect: 'postgres',
	logging: false,
	dialectOptions: {
		ssl: {
			require: true,
			rejectUnauthorized: false,
		},
	},
});

try {
	await sequelize.authenticate();
	console.log('Database connection successful');
} catch (error) {
	console.error('Database connection error:', error.message);
	process.exit(1);
}

export default sequelize;
