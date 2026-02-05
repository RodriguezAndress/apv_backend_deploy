import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectarDB from "./config/db.js";
import veterinarioRoutes from './routes/veterinarioRoutes.js'
import pacientesRoutes from './routes/pacienteRoutes.js'


const app= express();
app.use(express.json());
dotenv.config();

conectarDB();

const dominiosPermitidos = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: function (origin, callback){
        if (/*!origin ||*/ dominiosPermitidos.indexOf(origin) !== -1) {
            // Permite peticiones sin origin (Postman, curl) y desde dominios permitidos
            callback(null, true);
        } else {
            callback(new Error("No permitido por CORS"));
        }
    },
};
app.use(cors(corsOptions));

app.use("/api/veterinarios", veterinarioRoutes );
app.use("/api/pacientes", pacientesRoutes );

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`el serv esta funcionando en el puerto ${PORT}`);
});