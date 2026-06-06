import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import notesRoutes from "./routes/notesRoutes.js";
import {connectDB} from "./config/db.js";
import rateLimiter from "../middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

//MIDDLEWARE
app.use(
    cors({
        origin: "http://localhost:5173",
    })
);
app.use(express.json()); //this middleware will parse JSON bodies: req.body
app.use(rateLimiter);

//our simple custom middleware
// app.use((req,res, next)=>{
//     console.log(`Req method id ${req.method} & Req URL is ${req.url}`);
//     next(); //execute next function
// });

app.use("/api/notes", notesRoutes);

connectDB().then(()=> {
    app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
});

});

//REST APIs - GET, POST, PUT, DELETE
// app.get("/api/notes", (req, res)=>{
//     res.send("<p>You got 20 notes</p> <p>you got 3</p>");
// });

// app.post("/api/notes", (req,res)=>{
//     res.status(200).json({message:"Note created successfully!"});
// });

// app.put("/api/notes/:id", (req,res)=>{
//     res.status(200).json({message:"Note updated successfully!"});
// });

// app.delete("/api/notes/:id", (req,res)=>{
//     res.status(200).json({message:"Note deleted successfully!"});
// });



