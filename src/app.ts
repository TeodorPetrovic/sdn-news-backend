import express from 'express';
import os from 'os';
import { sequelize } from './config/db';
import setCommentRoutes from './routes/commentRoutes';
import setPostRoutes from './routes/postRoutes';
import setCategoryRoutes from './routes/categoryRoutes';
import setUserRoutes from './routes/userRoutes';
import { setStatsRoutes } from './routes/statsRoutes';
import http from 'http';
import dotenv from 'dotenv';
import './models/index';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Health endpoint for Consul
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Register routes
setCommentRoutes(app);
setPostRoutes(app);
setCategoryRoutes(app);
setUserRoutes(app);
setStatsRoutes(app);

// Connect to MySQL via Sequelize
sequelize.authenticate()
  .then(() => {
    console.log('MySQL connected');
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
      registerWithConsul();
    });
  })
  .catch(err => console.error('MySQL connection error:', err));

// Register with Consul (using native HTTP)
function registerWithConsul() {
  const hostname = os.hostname();
  const serviceId = `${process.env.SERVICE_NAME}-${hostname}-${process.env.INSTANCE_ID}`;
  const consulHost = process.env.CONSUL_HOST || 'localhost';
  const consulPort = Number(process.env.CONSUL_PORT) || 8500;
  console.log("APP Hostname: ", process.env.HOSTNAME);

  const registration = {
    ID: serviceId,
    Name: process.env.SERVICE_NAME,
    Address: process.env.HOSTNAME,
    Port: Number(port),
    Tags: [
      "urlprefix-/api weight=50", // load balancing tags
    ],
    Check: {
      HTTP: `http://${process.env.HOSTNAME}:${port}/health`,
      Interval: '10s'
    }
  };

  const data = JSON.stringify(registration);

  const options = {
    hostname: consulHost,
    port: consulPort,
    path: '/v1/agent/service/register',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };

  const req = http.request(options, res => {
    if (res.statusCode === 200) {
      console.log('Service registered with Consul');
    } else {
      console.error(`Consul registration failed with status code: ${res.statusCode}`);
    }
  });

  req.on('error', error => {
    console.error('Error registering with Consul:', error);
  });

  req.write(data);
  req.end();
}

export default app;