const express = require("express");
const connectDB = require("./config/db");
const app = express();
const swaggerJsDoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")
const swaggerJson = require("./swagger.json")

// import routes
const planningKpiRoute = require("./routes/api/planning_kpis")
const refineryKpiRoute = require("./routes/api/refinery_kpis")
const itrmKpiRoute = require("./routes/api/itrm_kpis")
const buRetailKpiRoute = require("./routes/api/business_unit")
// const refineryDailyStatementRoute = require("./routes/api/refineryDailyStatement");
// const refineryDataFromOtherSystems = require("./routes/api/refineryDataFromOtherSystems");


// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: swaggerJson,
  // ['.routes/*.js']
  apis: ["./routes/api/*.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

connectDB();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const port = process.env.port || 5000;
app.use(express.json({ extended: false }));
app.use("/api/bpcl/planning", planningKpiRoute);
app.use("/api/bpcl/refinery", refineryKpiRoute)
app.use("/api/bpcl/itrm", itrmKpiRoute)
app.use("/api/bpcl/business_unit", buRetailKpiRoute)
// app.use("/api/bpcl/refineryDS", refineryDailyStatementRoute);
// app.use("/api/bpcl/refineryDFOS", refineryDataFromOtherSystems);

app.listen(port, () => console.log(`Server is running on ${port}`));

app.get("/", (req, res) => {
  res.json({ message: "Server is up!" }).status(200);
});

