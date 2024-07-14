import express from "express";
import { routes } from "./routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/", routes);
app.use(express.json);

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});
