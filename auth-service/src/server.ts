import dotenv from 'dotenv';
dotenv.config({ path: "../auth-service/.env"});

console.log(process.env.DATABASE_URL)
