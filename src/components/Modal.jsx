import style from './less/modal.module.less'
import upload from '../assets/images/uploadIcon.webp'
import deleteIcon from "../assets/images/deleteIcon.webp";

const Modal = (props) => {
    const {handleChange, setOpen, handleAdd, handleAddImage, note, type, theme, imageUrls} = props;
  return (
    <div className={style.modalContainer}>
      <div className={`${style.modal} ${theme!=='dark' && style.lightModal}`}>
          <h3 className={style.title}>{type==='add'? 'Add notes' : 'Edit notes'}</h3>
          <textarea
          onChange={handleChange}
          placeholder="Add a note"
          className={style.textArea}
          value={note}
          />
          <div className={style.btnContainer}>
          <img src={upload} alt='upoad' className={style.uploadIcon} onClick={handleAddImage} />
          <button onClick={() => setOpen(false)} className={style.cancelBtn}>Cancel</button>
          <button disabled={note.length === 0 && imageUrls.length === 0} onClick={handleAdd} className={style.addBtn }>{type==='add' ? 'Add' : 'Update'}</button>
          </div>
          {
            imageUrls.length > 0 && (
              <div className={`${style.uploadedImgContainer} ${theme!=='dark' && style.lightuploadedImgContainer}`}>
                {imageUrls.map((ele, idx) => (
                  <div className={style.uploadedImgwrapper}>
                    <img src={ele} key={`uploadedImg_${idx}`} className={style.uploadedImg}/>
                    <img src={deleteIcon} key={`deleteImg_${idx}`} className={style.deleteIcon} />
                  </div>
                ))}
              </div>
            )
          }
      </div>
    </div>
  )
}

export default Modal
