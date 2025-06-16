import { useState } from "react";
import './ExamPage.css';


function TermExam({count,exams}){

    const [rollNo,setRollNo] = useState("");
    const [val,setVal] = useState(0);
    const [tamil,setTamil] = useState(0);
    const [english,setEnglish] = useState(0);
    const [maths,setMaths] = useState(0);
    const [science,setScience] = useState(0);
    const [social,setSocial] = useState(0);
    const [total,setTotal] = useState(0);
    const [marks,setMarks] = useState([]);
    const [modal,setModal] = useState(false);


  const studentAdd = () =>{
   

  
      console.log("adding values",val);
  
    let markTotal = Number(tamil) + Number(english) + Number(maths) + Number(science) + Number(social);
    const newMarks = {
        sno:val,
        rollNo,
        tamil,
        english,
        maths,
        science,
        social,
        total : markTotal,
        completed:false,
        
    };

     
    setTotal(total);
    const updatedMarks = [...marks, newMarks];
    setMarks(updatedMarks);
    console.log("updated marks",updatedMarks);
    setVal(val+1);
    setRollNo('');
    setTamil(0);
    setEnglish(0);
    setMaths(0);
    setScience(0);
    setSocial(0);
    setTotal(0);
    setModal(false)
      
  }

  
  const studentDelete = (sno) =>{
 
    const updatedMark = [];
    for (let i = 0; i < marks.length; i++) {
      if (marks[i].sno !== sno) {
        updatedMark.push({ ...marks[i]});
      }
    }
    setMarks(updatedMark);
    console.log("Exams after delete:", updatedMark);
  };

  

    return(
        <>
         <h2 className="heading">Term {count}</h2>
         <div className="student">
            <input type="text" placeholder="Enter Roll No" value={rollNo} onChange={(e) => setRollNo(e.target.value)}/>
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
          {marks.map((mark,index) => (
            <tr key={index} >
              <td>{mark.sno}</td>
              <td>
                <input
                  type="text" 
                  value={mark.rollNo}
                  onChange={(e) => setRollNo( e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number" className="id-input"
                  value={mark.tamil}
                  onChange={(e) => setTamil( e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number" className="id-input"
                  value={mark.english}
                  onChange={(e) => setEnglish(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number" className="id-input"
                  value={mark.maths}
                  onChange={(e) => setMaths( e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number" className="id-input"
                  value={mark.science}
                  onChange={(e) => setScience( e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number" className="id-input"
                  value={mark.social}
                  onChange={(e) => setSocial( e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number" className="id-input"
                  value={mark.total}
                  onChange={(e) => setTotal( e.target.value)}
                />
              </td>
              <td><button className='exam-delete' onClick={() =>studentDelete(mark.sno)}>Delete</button></td>
            </tr>
          ))}         
          
          </tbody>
        </table>
        {modal && (
        <div className="modal-box">
          <h3>Add Students Id</h3>
          {exams.map((exam, index) =>(
            <div key={index}>
              
              <input   type="checkbox" checked={exam.completed}  onChange={() => toggleCheck(count)}/>Term{exam.sno}</div>
          ))}
                
        
          <div className="modal-option">
            <button className="modal-save"  onClick={studentAdd}>Save</button>
            <button className="modal-cancel" onClick={() => setModal(false)}>Cancel</button>
          </div>
        </div>
      )} 
        </>
    );
}
export default TermExam; 