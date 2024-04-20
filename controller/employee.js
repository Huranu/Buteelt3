const asyncHandler = require("express-async-handler");
const MyError=require('../utils/myError');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.createEmployee = asyncHandler(async (req, res, next) => {

    const { email,fname,lname,phone,age,profession } = req.body;
    const employee = await prisma.employee.create({
    data: {
        email,fname,lname,phone,age,profession
    },
  })
  res.status(201).json({
    success: true,
    data: employee
  });
})


  exports.getEmployees = asyncHandler(async (req, res, next) => {
    const employees = await prisma.employee.findMany();
    res.status(200).json({
        success: true,
        data: employees,
      });
  });

  exports.getServerEmployees = asyncHandler(async (req, res, next) => {
    const sort = req.query.sort;
  
    ["sort"].forEach((el) => delete req.query[el]);
  
    let Query = {  };
    Query.where = {};
    Query.select = {};
    Query.where.server_id=Number(req.params.id);
  
    if (req.query) {
      Query.where.server_id=Number(req.params.id);
      Query.where.employee=req.query;
    }
    if (sort) {
      Query.order = sort
        .split(" ")
        .map((el) => [
          el.charAt(0) === "-" ? el.substring(1) : el,
          el.charAt(0) === "-" ? "DESC" : "ASC",
        ]);
    }
    Query.select.employee=true
    const employees = await prisma.server_emp.findMany(Query);
    const formattedEmps = employees.map((item) => item.employee);

      res.status(200).json({
          success: true,
          data: formattedEmps,
        });
    });

  exports.getEmployee = asyncHandler(async (req, res, next) => {
    const employee = await prisma.employee.findUnique({
    where:{
      id:req.params.id,
    },
  })
  if (!employee) {
    throw new MyError("Iim id-tai employee baihgui baina.", 400);
  }
  res.status(200).json({
    success: true,
    data: employee,
  });
  });

  exports.deleteEmployee = asyncHandler(async (req, res, next) => {
    const employee = await prisma.employee.delete({
      where:{
        id:Number(req.params.id),
      },
  })
  if (!employee) {
    throw new MyError("Iim id-tai employee baihgui baina", 400);
  }
  res.status(200).json({
    success: true,
    data: employee,
  });
  });

  exports.updateEmployee = asyncHandler(async (req, res, next) => {
    const employee = await prisma.employee.findUnique({
      where:{
        id:Number(req.params.id),
      },
    })
    if (!employee) {
      throw new MyError("Iim id-tai employee baihgui baina", 400);
    }
    const { email,fname,lname,password,phone,server_id,age,proffesion } = req.body;
    const updatedEmployee = await prisma.employee.update({
      where:{
        id:Number(req.params.id),
      },
    data: {
        email,fname,lname,password,phone,server_id,age,proffesion
    },
  })

  res.status(200).json({
    success: true,
    data: updatedEmployee,
  });
  });

  exports.addEmployeeToServer = asyncHandler(async (req, res, next) => {
    const { emp_id } = req.body;
    const result = await prisma.server_emp.create(
        {
            data: {
                emp_id,
                server_id : Number(req.params.id)
            },
        }
    );
    res.status(200).json({
        success: true,
        data: result,
      });
  });

  exports.transfer = asyncHandler(async (req, res, next) => {
    const sort = req.query.sort;
  
    ["sort"].forEach((el) => delete req.query[el]);
  
    let Query = { };
    Query.where = { };
    Query.select = { };
    Query.where.server_id=Number(req.params.id);
  
    if (req.query) {
      Query.where.server_id=Number(req.params.id);
    }
    if (sort) {
      Query.order = sort
        .split(" ")
        .map((el) => [
          el.charAt(0) === "-" ? el.substring(1) : el,
          el.charAt(0) === "-" ? "DESC" : "ASC",
        ]);
    }
    Query.select.employee=true
    const { server_id } = req.body;
    const employees = await prisma.server_emp.findMany(Query);
    const formattedEmps = employees.map((item) => item.employee);
    formattedEmps.map(async (e)=>{

    const datat = await prisma.server_emp.findUnique({
        where:{
            emp_id:e.id,
            server_id:Number(req.params.id)
          },
    });

    const deleted = await prisma.server_emp.delete({
        where:{
            id:datat.id
        }
    });
    const created = await prisma.server_emp.create({
        data:{
            emp_id:e.id,
            server_id
        }
    });
    })
    res.status(200).json({
        success: true,
        data: employees,
    });
  });