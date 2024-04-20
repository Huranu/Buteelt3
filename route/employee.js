const express = require("express");

const {createEmployee,getEmployee,getEmployees,deleteEmployee,updateEmployee} = require("../controller/employee");

const router = express.Router();
  
router.route("/").post(createEmployee).get(getEmployees);

router.route("/:id").get(getEmployee).delete(deleteEmployee).put(updateEmployee);

  
module.exports = router;