require("dotenv").config()
const Express = require("express");
const app = Express();
// const privateRoute = require("./routes/privateRoutes");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const publicRoute = require("./routes/publicRoutes");
const swagger = require("./swagger");

app.use(cors())
app.use(bodyParser.json())
app.use(Express.json());
app.use(publicRoute);
// app.use(privateRoute)
app.use(morgan('combined'));
swagger(app);

// Define the root route at the end
app.get('/', (request, response) => {
  response.json({
    message: 'Works',
  });
});

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
});