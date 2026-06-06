import React, { useState } from 'react';
import { useEffect } from 'react';
import Navbar from "../components/Navbar";
import RateLimit from '../components/RateLimit';
import api from "../lib/axios";
import toast from "react-hot-toast";
import NoteCard from '../components/NoteCard';
import NotesNotFound from '../components/NotesNotFound';

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error fetching notes");
        console.log(error)
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        }
        else {
          toast.error("Failed to load notes");
        }
      }
      finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  const handleDeleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter(note => note._id !== id));
  };

  return (
    <div className='min-h-screen bg-base-100'>
      <Navbar />
      {isRateLimited && <RateLimit />}
      <div className="max-w-7xl mx-auto px-4 mt-6">
        {loading && <div className="text-center text-primary py-10">Loading notes...</div>}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map(note => (
              <NoteCard key={note._id} note={note} onDelete={handleDeleteNote} />
            ))}
          </div>
        )}
        {notes.length === 0 && !loading && !isRateLimited && (<NotesNotFound />)}
      </div>
    </div>
  )
}

export default HomePage;
