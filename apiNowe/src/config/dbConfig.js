require('dotenv').config();

module.exports = {
  dialect: 'mysql',
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: '',
  database: process.env.DATABASE,
  define: {
    timestamps: true,
    underscored: true,
  },
};
