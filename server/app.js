import express from "express"
import { resolve } from "path"

const PORT = 3000

const app = express()
app.use("/", express.static(resolve("dist")))

app.listen(PORT, () => {
	console.log("Server is started")
})
