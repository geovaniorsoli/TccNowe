import app from './app';
import conect from './src/database';

if (conect) console.log('conectado com o BD');
const port = process.env.SERVER_PORT;

app.listen(port, () => console.log(`http://localhost:${port}`));
