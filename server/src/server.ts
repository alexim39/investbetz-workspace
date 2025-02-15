import app from "./app";
import dotenv from 'dotenv';

// set environment configs
dotenv.config({ path: './server-variables.env' });
const port: any = process.env.PORT || 8383;

app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
})
