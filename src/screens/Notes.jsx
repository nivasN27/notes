import React, { useEffect, useRef, useState } from "react";
import NotesContainer from "../components/NotesContainer";
import Modal from "../components/Modal";
import style from './less/notes.module.less'
import plus from '../assets/images/plusIcon.webp'
import light from '../assets/images/light.webp'
import dark from '../assets/images/dark.webp'


const Notes = () => {
  const [note, setNote] = useState("");
  const [imageUrls, setImage] = useState([]);
  const [noteList, setNoteList] = useState([]);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('add')
  const [theme, setTheme] = useState('dark');
  const uploadRef = useRef();

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes"));
    if (storedNotes) {
      setNoteList(storedNotes);
    }
  }, []);

  const handleChange = (value) => {
    setNote(value.target.value);
  };


  const handleAdd = () => {
    let updatedNotes;
    setOpen(false);
    if(type==='add'){
      if(imageUrls.length === 0){
        updatedNotes = [...noteList, {data:note}];
      } else if (note.length === 0) {
        updatedNotes = [...noteList, {imgList:imageUrls}];
      } else {
        updatedNotes = [...noteList, {data:note, imgList:imageUrls}];
      }
    if (note.length > 0 || imageUrls.length>0) {
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      setNoteList(updatedNotes);
      setNote('')
    }
    } else {
      const updatedNotes = noteList.map((e, idx)=>{
        if(idx===type){
          return note;
        }
        return e;
      })
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      setNoteList(updatedNotes);
    }
  };

  const handleAddImage = () => {
    uploadRef.current && uploadRef.current.click()
  }

  const handleUploadImage = () => {
    const files = uploadRef.current.files;
    const urls = [];
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        urls.push(reader.result);
        if (urls.length === files.length) {
          console.log(urls)
          setImage(urls);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleTheme = () => {
    if(theme === 'dark'){
      setTheme('light')
    } else{
      setTheme('dark')
    }
  }


  return (
    <div className={style.container}>
      {open ? (
        <Modal
          handleChange={handleChange}
          setOpen={setOpen}
          handleAdd={handleAdd}
          handleAddImage={handleAddImage}
          note={note}
          type={type}
          theme={theme}
          imageUrls={imageUrls}
        />
      ) : (
        <>
          <div className={style.btnContainer} onClick={() => {
            setOpen(true)
            setType('add')
          }}>
            <p className={style.btnContent}>Add your notes</p>
            <img src={plus} alt="icon" className={style.btnIcon} />
          </div>
          <NotesContainer
            list={noteList}
            setNoteList={setNoteList}
            setOpen={setOpen}
            setType={setType}
            setNote={setNote}
            theme={theme}
          />
        </>

      )}
      <div className={style.themeIconWrapper}>
        <img src={theme==='dark'? dark : light} className={style.themeIcon} onClick={handleTheme}/>
      </div>
      <input multiple ref={uploadRef} type="file" accept="image/*" style={{display:"none"}} onChange={handleUploadImage} />
    </div>
  );
};

export default Notes;
