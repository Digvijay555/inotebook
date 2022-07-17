const express = require('express')
const router = express.Router();
var fetchuser = require('../middlewear/fetchuser')
const Notes = require('../models/Note')
const { body, validationResult } = require('express-validator');
const Note = require('../models/Note');

// fetchallnotes api is for fetch all node from database for particular user
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
    }

})


//savenotes api is for save the user notes in database

router.post('/savenotes', fetchuser, [
    body('title', "Enter a valid title").isLength({ min: 3 }),
    body('description', "Enter description").isLength({ min: 3 }),

], async (req, res) => {
    try {
        // get title, description, tag of notes
        const { title, description, tag } = req.body;
        // check if notes is empty or not
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNotes = note.save()
        res.json(savedNotes)
    } catch (error) {
        console.error(error.message);
    }
})

//updatenote api is for update the user existing notes in database
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const {title,description,tag}=req.body;
        //create a newnote object
        const newNote={}
        if(title){newNote.title=title}
        if(description){newNote.description = description}
        if(tag){newNote.tag=tag}

        //Find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if(!note){return res.send(404).send("Not found")}
        if(note.user.toString() !==req.user.id){return res.send(401).send("Not Allowed")}

        note = await Notes.findByIdAndUpdate(req.params.id, {$set:newNote}, {new:true})
        res.json({note})
    } catch (error) {
        console.error(error.message);
    }

})

//delete api is used to delete user existing note from database
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        const {title,description,tag}=req.body;
        //create a newnote object
        const newNote={}
        if(title){newNote.title=title}
        if(description){newNote.description = description}
        if(tag){newNote.tag=tag}

        //Find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if(!note){return res.send(404).send("Not found")}
        if(note.user.toString() !==req.user.id){return res.send(401).send("Not Allowed")}

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({"Success":"Note has beed deleted",note:note})
    } catch (error) {
        console.error(error.message);
    }

})


module.exports = router