import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '../../.env' });

export const apiUrl = process.env.REACT_APP_SERVER_URL;

// export const apiUrl = 'http://localhost:4000';

export const DEFAULT_MESSAGE_TIMEOUT = 3000;
