"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./config/db");
const routes_1 = __importDefault(require("./routes"));
if (process.env.NODE_ENV !== "production") {
    dotenv_1.default.config({ path: `.env.${process.env.NODE_ENV || "development"}` });
}
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];
app.use((0, cors_1.default)({ origin: "*" })); // temporarily allow all for testing
app.use("/", routes_1.default);
(async () => {
    await (0, db_1.connectDB)();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();
