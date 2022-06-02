import express from "express"; 
import swaggerUi from "swagger-ui-express"; 
import swaggerJsDoc from "swagger-jsdoc";
import  router  from "../src/routes/presta.router"
import { connectToDatabase } from "./services/database.service";
import { prestaRouter } from "./routes/presta.routermongo";

const app = express();

app.use("/api", router);

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title:'PrestaGo',
            version: '1.0.0'
        },
        servers: [
            {
                url:'http://localhost:5000'
            }
        ]
    },
    apis: ['./dist/docs/*.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))


connectToDatabase()
    .then(() => {
        app.use("/", prestaRouter)
        app.listen(process.env.PORT, () => {
            console.log(`Server started at http://localhost:${process.env.PORT}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });
