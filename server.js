const express = require("express")
const bodyParser = require("body-parser")
const UssdMenu = require("ussd-builder")

const app = express()
const port = 7050

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.send("hello")
})

app.get("/james", (req, res) => {
  res.send("I am james")
})

let menu = new UssdMenu()

menu.startState({
  run: () => {
    // use menu.con() to send response without terminating session
    menu.con(
      "Welcome! Ready to register for the Zizi Conference:" +
        "\n1. Get started" +
        "\n2. Get out!"
    )
  },
  // next object links to next state based on user input
  next: {
    1: "register",
    2: "quit",
  },
})

app.post("/ussd", (req, res) => {
  menu.run(req.body, (ussdResult) => {
    res.send(ussdResult)
  })
})

app.listen(port, () => {
  console.log("App is runing on port " + port)
})
