import "reflect-metadata";
import { app } from './app';

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App started at http://localhost:${port}`);
})