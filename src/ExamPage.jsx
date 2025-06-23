import React, { useState } from 'react';
import './ExamPage.css';
import TermExam from './TermExam';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

function ExamPage() {
  const [count, setCount] = useState(1);
  const [examName, setExamName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [notes, setNotes] = useState('');
  const [exams, setExams] = useState([]);
  const [rollNo, setRollNo] = useState('');
  const [val, setVal] = useState(1);
  const [tamil, setTamil] = useState(0);
  const [english, setEnglish] = useState(0);
  const [maths, setMaths] = useState(0);
  const [science, setScience] = useState(0);
  const [social, setSocial] = useState(0);
  const [total, setTotal] = useState(0);
  const [modal, setModal] = useState(false);

  const handleChange = () => {

   
    const newExam = {
      sno: count,
      examName,
      startDate,
      endDate,
      notes,
      marks: [] 
    };
    
    

    setExams([...exams, newExam]);
    setCount(count + 1);
    setExamName('');
    setStartDate('');
    setEndDate('');
    setNotes('');
  };

  const handleInput = (value, index, key) => {
    const updated = [...exams];
    updated[index][key] = value;
    setExams(updated);
  };

  const handleSave = () =>{
    console.log("saved exams",exams);
  }

  const handleDelete = (sno) => {
    const updated = [];
    for (let i = 0; i < exams.length; i++) {
      if (exams[i].sno !== sno) {
        updated.push(exams[i]);
      }
    }
    
    setExams(updated);
    console.log("deleting exams",updated);
     setExamName('');
    setStartDate('');
    setEndDate('');
    setNotes('');

  };

  return (
    <div className='tables'>
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
              <th>Start</th>
              <th>End</th>
              <th>Notes</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((exam, index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td><input   type="text" value={exam.examName} onChange={(e) => handleInput(e.target.value, index, 'examName')} /></td>
                <td><input  type="date" value={exam.startDate} onChange={(e) =>{
                  if((exam.startDate&& e.target.value) > exam.endDate){
                    alert("start date should be smaller than enddate")
                  }
                  else{
                    handleInput(e.target.value, index, 'startDate')}
                  }
                   }/></td>
                  <td><input  type="date" value={exam.endDate} onChange={(e) => {
                    if (e.target.value < exam.startDate ) {
                    alert("End date should be greater than start date");
                  }

                  else {
                    handleInput(e.target.value, index, 'endDate');
                  }
                }} /></td>
                <td><input  type="text" value={exam.notes} onChange={(e) => handleInput(e.target.value, index, 'notes')} /></td>
                <td><button className="exam-delete" onClick={() => handleDelete(exam.sno)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Tabs>
        <TabList>
          {exams.map((exam,index) => (
            <Tab key={index}>{exam.examName || `Term ${index+1}`}</Tab>
          ))}
        </TabList>

        {exams.map((exam) => (
          <TabPanel key={exam.sno}>
            <TermExam
              exam={exam}
              exams={exams}
              setExams={setExams}
              rollNo={rollNo}
              setRollNo={setRollNo}
              val={val}
              setVal={setVal}
              tamil={tamil}
              setTamil={setTamil}
              english={english}
              setEnglish={setEnglish}
              maths={maths}
              setMaths={setMaths}
              science={science}
              setScience={setScience}
              social={social}
              setSocial={setSocial}
              total={total}
              setTotal={setTotal}
              modal={modal}
              setModal={setModal}
            />
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
}

export default ExamPage;