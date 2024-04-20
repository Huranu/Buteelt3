const express = require('express');
const dotenv=require('dotenv');

dotenv.config({path:'./config/config.env'});
const app = express();

// Routes
const EmpRoutes = require("./route/employee");
const ServerRoutes = require("./route/server");
// const ProjectRoutes = require("./routes/projects");
// const MileRoutes = require("./routes/milestones");

// Middlewares
app.use(express.json());

// Routes
app.use("/employee", EmpRoutes);
app.use("/server", ServerRoutes);


app.listen(process.env.PORT , ()=>{
  console.log(`server started on ${process.env.PORT} PORT🔥`);
});