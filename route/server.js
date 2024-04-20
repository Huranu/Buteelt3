const express = require("express");

const {createServer,deleteServer,getServer,getServers, updateServer} = require("../controller/server");

const {getServerEmployees,addEmployeeToServer,transfer} = require("../controller/employee");

const router = express.Router();
  
router.route("/").post(createServer).get(getServers);

router.route("/:id").get(getServer).delete(deleteServer).put(updateServer);

router.route("/:id/employee").get(getServerEmployees).post(addEmployeeToServer);

router.route("/:id/transfer").post(transfer);
  
module.exports = router;