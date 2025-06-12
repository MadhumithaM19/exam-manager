import React, { useState } from 'react';
import './ExamPage.css';

function ExamPage() {
  const [count, setCount] = useState(1);
  const [examName, setExamName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [notes, setNotes] = useState('');
  const [exams, setExams] = useState([]);

  const handleChange = () => {
    const newExam = {
      sno: count,
      examName,
      startDate,
      endDate,
      notes,
    };

    const updatedExams = [...exams, newExam];
    setExams(updatedExams);
    console.log("Exams:", updatedExams);

    setExamName('');
    setStartDate('');
    setEndDate('');
    setNotes('');
    setCount(count + 1);
  };

  const handleSave = () =>{
    setExams(exams);
    console.log("saved exams",exams);
  }

  const handleDelete = (sno) => {
    const updatedExams = [];
    for (let i = 0; i < exams.length; i++) {
      if (exams[i].sno !== sno) {
        updatedExams.push({ ...exams[i] });
      }
    }
    setExams(updatedExams);
    console.log("Exams after delete:", updatedExams);
  };

  return (
    <div>
      <h2 className="exam">Exam Manager</h2>
      <div className="adding">
        <button className="add-button" onClick={handleChange}>Add Exam</button>
       
          <button className="save-button" onClick={handleSave}>Save</button>
      
      </div>

      <table className="exam-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Exam Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Notes</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam) => (
            <tr key={exam.sno} onChange={(e) =>setCount(e.target.value)}>
              <td>{exam.sno}</td>
              <td>
                <input
                  type="text"
                  value={exam.examName}
                  onChange={(e) => setExamName( e.target.value)}
                />
              </td>
              <td>
                <input
                  type="date"
                  value={exam.startDate}
                  onChange={(e) => setStartDate( e.target.value)}
                />
              </td>
              <td>
                <input
                  type="date"
                  value={exam.endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={exam.notes}
                  onChange={(e) => setNotes( e.target.value)}
                />
              </td>
              <td><button className='exam-delete' onClick={handleDelete}>Delete</button></td>
            </tr>
          ))}         
          
        </tbody>
      </table>
    </div>
  );
}

export default ExamPage;
