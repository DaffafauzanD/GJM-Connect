export const environment = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  database: {
    url: process.env.DATABASE_URL || 'sqlserver://localhost:1433;initial catalog=GJM;user=LocalAuth;password=local123;encrypt=true;trustServerCertificate=true;',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'qpwoeip1o23i-widapsoxjlkadalskd9u123k5;elfsskx;vjpoekqwlasjdhKLAJDOIJa',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },
  cors: {
    origin: process.env.CORS_ORIGIN 
      ? process.env.CORS_ORIGIN.split(',') 
      : [
          'http://localhost:5173', // Vue.js dev server
          'http://localhost:3001', // Alternative port
          'http://localhost:3000', // Backend port (for testing)
          'http://127.0.0.1:5173', // Alternative localhost
          'http://127.0.0.1:3001', // Alternative localhost
        ],
  },
} as const; 