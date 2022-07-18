import { useState } from "react";
import NoteContext from "./noteContex";

const NoteState = (props)=>{

    const noteInitialize=[
        {
            "_id": "62d3c440ad68006943bbc56d",
            "user": "62d06adaca24b63e235c6bf9",
            "title": "myNotes",
            "description": "do not open",
            "tag": "personal",
            "date": "2022-07-17T08:11:44.774Z",
            "__v": 0
          },
          {
            "_id": "62d3c441ad68006943bbc56f",
            "user": "62d06adaca24b63e235c6bf9",
            "title": "myNotes",
            "description": "do not open",
            "tag": "personal",
            "date": "2022-07-17T08:11:45.565Z",
            "__v": 0
          },
          {
            "_id": "62d3c440ad68006943bbc56d",
            "user": "62d06adaca24b63e235c6bf9",
            "title": "myNotes",
            "description": "do not open",
            "tag": "personal",
            "date": "2022-07-17T08:11:44.774Z",
            "__v": 0
          },
          {
            "_id": "62d3c441ad68006943bbc56f",
            "user": "62d06adaca24b63e235c6bf9",
            "title": "myNotes",
            "description": "do not open",
            "tag": "personal",
            "date": "2022-07-17T08:11:45.565Z",
            "__v": 0
          },
          {
            "_id": "62d3c440ad68006943bbc56d",
            "user": "62d06adaca24b63e235c6bf9",
            "title": "myNotes",
            "description": "do not open",
            "tag": "personal",
            "date": "2022-07-17T08:11:44.774Z",
            "__v": 0
          },
          {
            "_id": "62d3c441ad68006943bbc56f",
            "user": "62d06adaca24b63e235c6bf9",
            "title": "myNotes",
            "description": "do not open",
            "tag": "personal",
            "date": "2022-07-17T08:11:45.565Z",
            "__v": 0
          },
    ]

    const [notes, setNotes] = useState(noteInitialize);
    return(

        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;