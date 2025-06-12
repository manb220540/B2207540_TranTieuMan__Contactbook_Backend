const app = require('./app');
const config = require('./app/config');
const MongoDB = require('./app/utils/mongodb.util');

// Start the server
async function startServer() {
    try {
        // Connect to MongoDB
        await MongoDB.connect(config.app.db.uri);
        console.log("Connected to MongoDB");

        // Start the Express server
        const PORT = config.app.port;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Error connecting to the database", error);
        process.exit(1); // Exit the process with failure
    }
}
startServer();
