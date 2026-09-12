import "dotenv/config";
// dotenv.config({ path: "./.env" });
import app from "./src/app.js"
import connectDB from "./src/config/db.js"

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});
