import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { v4 as uuid } from 'uuid';
import Header from './../Header';
import './noteTakingApp-styles.scss';

const colorThemes = [
    {
        key: "theme1",
        value: "C4F0E8",
        class: "color_C4F0E8"
    },
    {
        key: "theme2",
        value: "FFC1B1",
        class: "color_FFC1B1"
    },
    {
        key: "theme3",
        value: "F2EBD7",
        class: "color_F2EBD7"
    },
    {
        key: "theme4",
        value: "AFE9B2",
        class: "color_AFE9B2"
    },
    {
        key: "theme5",
        value: "EDBD8C",
        class: "color_EDBD8C"
    }

];

const NoteApp = () => {
    const [notes, updateNotes] = useState([]);
    const [editNoteList, updateEditNoteList] = useState([]);
    const [showAddForm, setShowFormStatus] = useState(false);
    const [newNote, setNewNote] = useState({ id: uuid(), title: "", text: "", colorTheme: colorThemes[0].value });

    useEffect(() => {
        setNewNote({ id: uuid(), title: "", text: "", colorTheme: colorThemes[0].value });
    }, [notes]);

    function handleAddNoteClick() {
        setShowFormStatus(false);
        updateNotes([...notes, newNote]);
    }

    const handleNoteEdit = (noteId, key) => (e) => {
        let newNoteList = [...editNoteList];
        newNoteList[newNoteList.findIndex(({ id }) => id === noteId)][key] = e.target.value;
        updateEditNoteList(newNoteList);
    };

    function saveNote(noteId) {
        let allNotes = [...notes];
        allNotes[allNotes.findIndex(({ id }) => id === noteId)] = {
            ...editNoteList.filter(({ id }) => id === noteId)[0]
        };
        updateNotes(allNotes);
        updateEditNoteList([...editNoteList.filter(({ id }) => id !== noteId)]);
    }

    return (
        <Container fluid className="notesWrapper wrapper">
            <Header header="Projects" subHeader="Note Taking App" url="#" subUrl="#notesapp" />
            <ul id="notesContainer" className={(showAddForm ? "showForm" : "")}>
                <li id="addNoteContainer" className="noteContainer">
                    <span className="addIcon" title="Click to add a note" onClick={() => setShowFormStatus(true)}>+</span>
                    <div className="header">
                        <input type="text" id="newNoteTitle" className="noteTitle" placeholder="Title" value={newNote?.title} onChange={(e) => setNewNote({ ...newNote, title: e.target.value })} />
                        <select value={newNote?.colorTheme} id="newColorSelector" className="colorSelector" title="Select Color" onChange={(e) => setNewNote({ ...newNote, colorTheme: e.target.value })}>
                            {
                                colorThemes.map((theme) => <option key={theme.key} value={theme.value} className={`color ${theme.class}`}></option>)
                            }
                        </select>
                    </div>
                    <textarea id="newNoteText" className="noteText" placeholder="Text..." value={newNote?.text} onChange={(e) => setNewNote({ ...newNote, text: e.target.value })}></textarea>
                    <div className="buttonContainer">
                        <button id="saveNote" className="btn saveBtn" onClick={handleAddNoteClick} disabled={(newNote?.title || newNote?.text) ? false : true}>Add</button>
                        <button id="cancelNewNoteSave" className="btn cancelBtn" onClick={() => setShowFormStatus(false)}>Cancel</button>
                    </div>
                </li>
                {
                    notes.map(note => {
                        let editNote = editNoteList.filter(({ id }) => id === note.id);
                        let isEditEnabled = editNote.length > 0;
                        let data = (isEditEnabled) ? editNote[0] : note;
                        return (
                            <li key={note.id} className={`noteContainer color_${note.colorTheme}${(isEditEnabled ? " showEditForm" : "")}`}>
                                <div className="header">
                                    <input
                                        type="text"
                                        className={`noteTitle noBorder${(isEditEnabled ? "" : " defaultCursor")}`}
                                        title={data.title}
                                        value={data.title}
                                        onChange={handleNoteEdit(note.id, "title")}
                                        readOnly={(isEditEnabled ? false : true)}
                                    />
                                    <span className="iconContainer">
                                        <i
                                            className="fa fa-pencil icon"
                                            title="Edit Note"
                                            onClick={() => updateEditNoteList([...editNoteList, { ...note }])}></i>
                                        <i
                                            className="fa fa-trash icon"
                                            title="Delete Note"
                                            onClick={() => updateNotes([...notes.filter(({ id }) => id !== note.id)])}></i>
                                        <select value={data.colorTheme} className="colorSelector" title="Select Color" onChange={handleNoteEdit(note.id, "colorTheme")}>
                                            <option value="C4F0E8" className="color color_C4F0E8"></option>
                                            <option value="FFC1B1" className="color color_FFC1B1"></option>
                                            <option value="F2EBD7" className="color color_F2EBD7"></option>
                                            <option value="AFE9B2" className="color color_AFE9B2"></option>
                                            <option value="EDBD8C" className="color color_EDBD8C"></option>
                                        </select>
                                    </span>
                                </div>
                                <textarea
                                    className={`noteText noBorder${(isEditEnabled ? "" : " defaultCursor")}`}
                                    value={data.text}
                                    onChange={handleNoteEdit(note.id, "text")}
                                    readOnly={(isEditEnabled ? false : true)}
                                ></textarea>
                                <div className="buttonContainer">
                                    <button className="btn saveBtn" style={{}} onClick={() => saveNote(note.id)}>Save</button>
                                    <button className="btn cancelBtn" onClick={() => updateEditNoteList([...editNoteList.filter(({ id }) => id !== note.id)])}>Cancel</button>
                                </div>
                            </li>
                        );
                    })
                }
            </ul>
        </Container>
    );
}

export default NoteApp;