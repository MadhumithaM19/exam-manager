import { useState } from 'react';
import './ExamPage.css';

function TermExam({
  exam,
  exams,
  setExams,
  rollNo,
  setRollNo,
  val,
  setVal,
  tamil,
  setTamil,
  english,
  setEnglish,
  maths,
  setMaths,
  science,
  setScience,
  social,
  setSocial,
  total,
  setTotal,
  modal,
  setModal
}) {

   
  const [selectedOne, setSelectedOne] = useState([]);
        console.log("checking selected one ",selectedOne);

  const toggleCheck = (num) => {
    let check = false;
    for (let i = 0; i < selectedOne.length; i++) {
      if (selectedOne[i] === num) {
        check = true;
        break;
      }
    }

    if (check) {
      let newSelected = [];
      for (let i = 0; i < selectedOne.length; i++) {
        if (selectedOne[i] !== num) {
          newSelected.push(selectedOne[i]);
        }
      }
      setSelectedOne(newSelected);
      console.log("checking after disselect",selectedOne);
    } else {
      let newSelected = [];
      for (let i = 0; i < selectedOne.length; i++) {
        newSelected.push(selectedOne[i]);
      }
      newSelected.push(num);
      setSelectedOne(newSelected);
      console.log("diselect after click",selectedOne);

    }
  };



  const studentAdd = () => {
    if (selectedOne.length === "") {
      return alert("Select at least one term");
    }

    const newMark = {
      sno: val,
      rollNo,
      tamil,
      english,
      maths,
      science,
      social,
      total
    };

    const updatedExams = exams.map((exam, index) => {
      let currentVal = false;

      for (let j = 0; j < selectedOne.length; j++) {
        if (selectedOne[j] === index) {
          currentVal = true;
          break;
        }
      }

      if (currentVal) {
        return { ...exam, marks: [...exam.marks, newMark] };
      }
      return exam;
    });

    setExams(updatedExams);
    setVal(val + 1);
    setRollNo('');
    setTamil(0);
    setEnglish(0);
    setMaths(0);
    setScience(0);
    setSocial(0);
    setTotal(0);
    setModal(false);
  };

  const handleMarks = (value, index, key) => {
    const updatedMark = [...exam.marks];
    updatedMark[index][key] = Number(value);
    const newTamil = Number(updatedMark[index].tamil);
    const newEnglish = Number(updatedMark[index].english);
    const newMaths = Number(updatedMark[index].maths);
    const newScience = Number(updatedMark[index].science);
    const newSocial = Number(updatedMark[index].social);
    updatedMark[index].total = newTamil + newEnglish + newMaths + newScience + newSocial;

    const updatedExams = exams.map((data) => {
      if (data.sno === exam.sno) {
        return { ...data, marks: updatedMark };
      }
      return data;
    });
    setExams(updatedExams);
    console.log("term marks",exams);
  };

  const studentDelete = (sno) => {
    const updatedMarks = [];
    for (let i = 0; i < exam.marks.length; i++) {
      if (exam.marks[i].sno !== sno) {
        updatedMarks.push(exam.marks[i]);
      }
    }

    const updatedExams = exams.map(data => {
      if (data.sno === exam.sno) {
        return { ...data, marks: updatedMarks };
      }
      return data;
    });

    setExams(updatedExams);
  };

  console.log("term exam ",exams);
  console.log("exam",exam);

  return (
    <>
      <div className="student">
        <input
          type="text"
          placeholder="Enter Roll No"
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
        />
        <button className="student-add" onClick={() => setModal(true)}>Add</button>
      </div>

      <table className="term-exam">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Roll No</th>
            <th>Tamil</th>
            <th>English</th>
            <th>Maths</th>
            <th>Science</th>
            <th>Social</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {exam.marks.map((mark, index) => (
            <tr key={index}>
              <td>{mark.sno}</td>
              <td><input type="text" value={mark.rollNo} readOnly /></td>
              <td><input type="number" style={{ width: "40px" }} value={mark.tamil} onChange={(e) => handleMarks(e.target.value, index, 'tamil')} /></td>
              <td><input type="number" style={{ width: "40px" }} value={mark.english} onChange={(e) => handleMarks(e.target.value, index, 'english')} /></td>
              <td><input type="number" style={{ width: "40px" }} value={mark.maths} onChange={(e) => handleMarks(e.target.value, index, 'maths')} /></td>
              <td><input type="number" style={{ width: "40px" }} value={mark.science} onChange={(e) => handleMarks(e.target.value, index, 'science')} /></td>
              <td><input type="number" style={{ width: "40px" }} value={mark.social} onChange={(e) => handleMarks(e.target.value, index, 'social')} /></td>
              <td><input type="number" style={{ width: "70px" }} value={mark.total} readOnly /></td>
              <td><button className="exam-delete" onClick={() => studentDelete(mark.sno)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      {modal && (
        <div className="modal-box">
          <h3>Add Students Id</h3>
          <div className="toggle">
            {exams.map((exam, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  id={index}
                  checked={selectedOne.includes(index)}
                  onChange={() => toggleCheck(index)}
                />
                {exam.examName}
              </div>
            ))}
          </div>

          <div className="modal-option">
            <button className="modal-save" onClick={studentAdd}>Save</button>
            <button className="modal-cancel" onClick={() => setModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
}

export default TermExam;
