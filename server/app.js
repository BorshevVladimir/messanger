import express from 'express'
import { resolve } from 'path'
import fallback from 'express-history-api-fallback'

const PORT = 3000

const app = express()

const root = resolve('dist')
app.use('/', express.static(root))
app.use(fallback('index.html', { root }))

app.listen(PORT, () => {
	console.log('Server is started')
})
