const express = require('express');
const http = require('http');
const { app, server } = require('./server');

server.listen(process.env.PORT, () => {
  console.log(`🧠 Vera iniciada em http://localhost:${process.env.PORT}`);
});
