import React, { useState } from 'react';
import './ExamPage.css';
import TermExam from './TermExam';

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

   
  const handleInput = (value, index, key) => {
    const updatedExams = [];
    for(let i=0;i<exams.length;i++){
      if(i === index){
        const newVal = {...exams[i], [key]:value};
        updatedExams.push(newVal);
      }
      else{
        updatedExams.push(exams[i]);
      }
    }
    setExams(updatedExams);
  };

  const handleSave = () =>{
    setExams(exams);
    console.log("saved exams",exams);
  }

  const handleDelete = (sno) => {
    const updatedExams = [];
    for (let i = 0; i < exams.length; i++) {
      if (exams[i].sno !== sno) {
        updatedExams.push({ ...exams });
      }
    }
    setExams(updatedExams);
    console.log("Exams after delete:", updatedExams);
  };

  return (
    <div className='tables'>
      <div className='1st-table'>
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
          {exams.map((exam,index) => (
            
            <tr key={index} >
              <td>{exam.sno}</td>
              <td>
                <input
                  type="text" className='examname'
                  value={exam.examName}
                  onChange={(e) => handleInput( e.target.value,index,'examName')}
                />
              </td>
              <td>
                <input
                  type="date" className='examname'
                  value={exam.startDate}
                  onChange={(e) => handleInput( e.target.value,index,'startDate')}
                />
              </td>
              <td>
                <input
                  type="date" className='examname'
                  value={exam.endDate}
                  onChange={(e) => handleInput(e.target.value,index,'endDate')}
                />
              </td>
              <td>
                <input
                  type="text" className='examname'
                  value={exam.notes}
                  onChange={(e) => handleInput(e.target.value,index,'notes')}
                />
              </td>
              <td><button className='exam-delete' onClick={handleDelete}>Delete</button></td>
            </tr>
           
          ))}         
          
        </tbody>
      </table>

     </div>
     <div className='next-exam'>
      {exams.length > 0 && exams.map((exam, index) =>(
       <TermExam 
       key={index}
       count = {exam.sno}
       exams = {exams}
       ></TermExam>)
      )}
     </div>
     
  
    </div>
  );
}

export default ExamPage;
