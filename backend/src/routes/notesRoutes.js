import express from "express"
import { getAllNotes, getNoteByID, updateNote, createNote, deleteNote } from "../controllers/notesControllers.js";

const router = express.Router();

router.get("/", getAllNotes);

router.get("/:id", getNoteByID);

router.post("/", createNote);

router.put("/:id", updateNote);

router.delete("/:id", deleteNote);
export default router;