import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '../../.env' });

export const API_URL = process.env.REACT_APP_SERVER_URL;