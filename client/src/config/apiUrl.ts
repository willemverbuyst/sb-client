import * as dotenv from 'dotenv'

dotenv.config({ path: `${__dirname}../../.env` })

export const API_URL = process.env.REACT_APP_SERVER_URL
export const GO_SERVICE_URL = process.env.REACT_APP_GO_SERVICE_URL
