import style from "./less/notesContainer.module.less";
import deleteIcon from "../assets/images/deleteIcon.webp";
import edit from "../assets/images/editIcon.webp";

const NotesContainer = (props) => {
  const { list, setNoteList, setOpen, setType, setNote, theme } = props;
  const handleDelete = (idx) => {
    const updatedList = list.filter((ele, index) => index !== idx);
    setNoteList(updatedList);
    localStorage.setItem("notes", JSON.stringify(updatedList));
  };

  const handleEdit = (data, index) => {
    setNote(data?.data || '');
    setType(index);
    setOpen(true);
  };

  const renderContent = (data, index) => {
    console.log(data);
    return (
      <>
        {data?.imgList &&
          data?.imgList.length > 0 &&
          data?.imgList.map((ele, idx) => (
            <img src={ele} key={`img${idx}`} className={style.imgContent} />
          ))}
        {data?.data?.startsWith("http") ? (
          <div key={index} className={style.textContainer}>
            <a href={data.data} target="_blank">
              {data.data}
            </a>
          </div>
        ) : (
          <div key={index} className={style.textContainer}>
            <p>{data.data}</p>
          </div>
        )}
      </>
    );
  };
  return (
    <div className={style.container}>
      {list.map((data, index) => (
        <div
          key={index}
          className={`${style.contentWrapper} ${
            theme !== "dark" && style.lightContentWrapper
          }`}
        >
          {renderContent(data, index)}
          <div className={style.actionContainer}>
            <img
              className={style.editIcon}
              src={edit}
              alt="editIcon"
              onClick={() => handleEdit(data, index)}
            />
            <img
              className={style.deleteIcon}
              src={deleteIcon}
              alt="delIcon"
              onClick={() => handleDelete(index)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotesContainer;
