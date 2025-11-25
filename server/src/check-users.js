import dotenv from 'dotenv';
dotenv.config();
import { connectDB } from './utils/db.js';
import User from './models/User.js';

await connectDB();

console.log('Checking users in database...');
console.log('MONGO_URI:', process.env.MONGO_URI);

const users = await User.find({});
console.log(`\nTotal users: ${users.length}`);

if (users.length > 0) {
  console.log('\nUsers found:');
  users.forEach(u => {
    console.log(`- ${u.username} (${u.email}) - Role: ${u.role}`);
  });
} else {
  console.log('\nNo users found in database!');
}

process.exit(0);
