import { useState } from "react";
import './ExamPage.css';


function TermExam({count,setCount}){

    const [rollNo,setRollNo] = useState("");
    const [tamil,setTamil] = useState(0);
    const [english,setEnglish] = useState(0);
    const [maths,setMaths] = useState(0);
    const [science,setScience] = useState(0);
    const [social,setSocial] = useState(0);
    const [total,setTotal] = useState(0);
    const [marks,setMarks] = useState([]);
    const [modal,setModal] = useState(false);


  const studentAdd = () =>{
    setModal(true);
      console.log("adding values",count);
  
    const markTotal = Number(tamil) + Number(english) + Number(maths) + Number(science) + Number(social);
    const newMarks = {
        sno:count,
        rollNo,
        tamil,
        english,
        maths,
        science,
        social,
        total : markTotal,
        
    };

    setModal(false);
     
    setTotal(total);
    const updatedMarks = [...marks, newMarks];
    setMarks(updatedMarks);
    console.log("updated marks",updatedMarks);
    setCount(count+1);
    setRollNo('');
    setTamil('');
    setEnglish('');
    setMaths('');
    setScience('');
    setSocial('');
    setTotal('');
      
  }
  
  const studentDelete = (sno) =>{
 
    const updatedMark = [];
    for (let i = 0; i < marks.length; i++) {
      if (marks[i].sno !== sno) {
        updatedMark.push({ ...marks});
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
            <button className="student-add" onClick={studentAdd}>Add</button>
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
          {marks.map((mark) => (
            <tr key={mark.sno} >
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
                  type="number"
                  value={mark.tamil}
                  onChange={(e) => setTamil( e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={mark.english}
                  onChange={(e) => setEnglish(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={mark.maths}
                  onChange={(e) => setMaths( e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={mark.science}
                  onChange={(e) => setScience( e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={mark.social}
                  onChange={(e) => setSocial( e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={mark.total}
                  onChange={(e) => setTotal( e.target.value)}
                />
              </td>
              <td><button className='exam-delete' onClick={studentDelete(mark.sno)}>Delete</button></td>
            </tr>
          ))}         
          
          </tbody>
        </table>

        {modal && (
          <input type="checkbox" value={count}> Mark</input>
        )

        }


        </>
    );
}
export default TermExam; 