const { Sequelize } = require('sequelize');
const { exec } = require('child_process');

// Database configuration (make sure this matches your production config)
const sequelize = new Sequelize('root', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',  // or 'postgres', 'sqlite', etc.
});

// Function to run migrations
async function runMigration() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Run migration
    exec('npx sequelize-cli db:migrate --env production', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return;
      }
      console.log(`Migration Output: ${stdout}`);
    });

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await sequelize.close();
  }
}

runMigration();
