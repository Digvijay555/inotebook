import { useState } from "react";
import NoteContext from "./noteContex";

const NoteState = (props) => {

  const host ="http://localhost:5000"
  const noteInitialize = [ ]

  const [notes, setNotes] = useState(noteInitialize);

  //get all notes
  const getNotes = async()=>{
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJkMDZhZGFjYTI0YjYzZTIzNWM2YmY5In0sImlhdCI6MTY1NzkwOTcxOX0.FPEfHvlih-065dHVbz56-ooGKtlcx4ZLrIdHU2olpEA"
      },
    });

    const json = await response.json()
    setNotes(json);
  }

  //Add a Note
  const addNote = async (title, description, tag) => {

    // api call
    const response = await fetch(`${host}/api/notes/savenotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJkMDZhZGFjYTI0YjYzZTIzNWM2YmY5In0sImlhdCI6MTY1NzkwOTcxOX0.FPEfHvlih-065dHVbz56-ooGKtlcx4ZLrIdHU2olpEA"
      },
      body: JSON.stringify({title, description, tag})
    });
    // const json = response.json();
    
    // Logic for add note
    const note = {
      "_id": "62d3c441ad68006943bbc56f",
      "user": "62d06adaca24b63e235c6bf9",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2022-07-17T08:11:45.565Z",
      "__v": 0
    }

    setNotes(notes.concat(note))
  }

  // Delete a note
  const deleteNote = async (id) => {

    //api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJkMDZhZGFjYTI0YjYzZTIzNWM2YmY5In0sImlhdCI6MTY1NzkwOTcxOX0.FPEfHvlih-065dHVbz56-ooGKtlcx4ZLrIdHU2olpEA"
      },
      
    });

    const json = await response.json()
  
    //Logic for delete note
    const newNotes = notes.filter((note) => { return note._id != id })
    setNotes(newNotes);
  }

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    // Api call 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJkMDZhZGFjYTI0YjYzZTIzNWM2YmY5In0sImlhdCI6MTY1NzkwOTcxOX0.FPEfHvlih-065dHVbz56-ooGKtlcx4ZLrIdHU2olpEA"
      },
      body: JSON.stringify({title,description,tag})
    });
    const json = response.json();

    // Login for edit note
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];

      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  }


  return (

    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )

}

export default NoteState;