"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const app_1 = require("./app");
const port = process.env.PORT || 3000;
app_1.app.listen(port, () => {
    console.log(`App started at http://localhost:${port}`);
});
