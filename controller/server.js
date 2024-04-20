const asyncHandler = require("express-async-handler");
const MyError=require('../utils/myError');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.createServer = asyncHandler(async (req, res, next) => {

    const { name } = req.body;
    const server = await prisma.server.create({
    data: {
        name
    },
  })
  res.status(201).json({
    success: true,
    data: server
  });
})


  exports.getServers = asyncHandler(async (req, res, next) => {
    const servers = await prisma.server.findMany();
    res.status(200).json({
        success: true,
        data: servers,
      });
  });

  exports.getServer = asyncHandler(async (req, res, next) => {
    const server = await prisma.server.findUnique({
    where:{
      id:req.params.id,
    },
  })
  if (!server) {
    throw new MyError("Iim id-tai server baihgui baina.", 400);
  }
  res.status(200).json({
    success: true,
    data: server,
  });
  });

  exports.deleteServer = asyncHandler(async (req, res, next) => {
    const server = await prisma.server.delete({
      where:{
        id:Number(req.params.id),
      },
  })
  if (!server) {
    throw new MyError("Iim id-tai server baihgui baina", 400);
  }
  res.status(200).json({
    success: true,
    data: server,
  });
  });

  exports.updateServer = asyncHandler(async (req, res, next) => {
    const server = await prisma.server.findUnique({
      where:{
        id:Number(req.params.id),
      },
    })
    if (!server) {
      throw new MyError("Iim id-tai server baihgui baina", 400);
    }
    const { name } = req.body;
    const updatedServer = await prisma.server.update({
      where:{
        id:Number(req.params.id),
      },
    data: {
        name
    },
  })

  res.status(200).json({
    success: true,
    data: updatedServer,
  });
  });