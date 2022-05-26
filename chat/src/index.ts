import express, { Application, Request, Response, NextFunction } from 'express'

const app: Application = express()
const port = 9000

app.use('/', (_req: Request, res: Response, _next: NextFunction) => {
  res.status(200).send({ message: 'Testing root' })
})

app.listen(port, () => console.log(`Server is listening on port ${port}!`))
