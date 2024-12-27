import './App.css';
import { useEffect, useState } from 'react';
import axios from "axios";
import Formtable from './Components/Formtable';

axios.defaults.baseURL=" https://crud-operations-backend-tn20.onrender.com";
axios.get('/some-endpoint')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('There was an error!', error);
  });

function App() {
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const [formDataEdit, setFormDataEdit] = useState({
    name: "",
    email: "",
    mobile: "",
    _id: ""
  });
  const [dataList, setDataList] = useState([]);

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields before submission
    if (!formData.name || !formData.email || !formData.mobile) {
      alert('Please fill in all fields!');
      return;
    }

    const data = await axios.post("/create", formData);
    if (data.data.success) {
      setAddSection(false);
      alert(data.data.message);
      getFetchData();
      setFormData({
        name: "",
        email: "",
        mobile: ""
      });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Validate form fields before submission
    if (!formDataEdit.name || !formDataEdit.email || !formDataEdit.mobile) {
      alert('Please fill in all fields!');
      return;
    }

    const data = await axios.put("/update", formDataEdit);
    if (data.data.success) {
      getFetchData();
      alert(data.data.message);
      setEditSection(false);
    }
  };

  const getFetchData = async () => {
    const data = await axios.get("/");
    if (data.data.success) {
      setDataList(data.data.data);
    }
  };

  useEffect(() => {
    getFetchData();
  }, []);

  const handleDelete = async (id) => {
    const data = await axios.delete("/delete/" + id);
    if (data.data.success) {
      getFetchData();
      alert(data.data.message);
    }
  };

  const handleEdit = (el) => {
    setFormDataEdit(el);
    setEditSection(true);
  };

  return (
    <>
      <div className="container">
        <button className="btn btn-add" onClick={() => setAddSection(true)}>Add</button>

        {addSection && (
          <Formtable
            handleSubmit={handleSubmit}
            handleOnChange={handleOnChange}
            handleclose={() => setAddSection(false)}
            rest={formData}
            isEditing={false} // Not in editing mode
          />
        )}

        {editSection && (
          <Formtable
            handleSubmit={handleUpdate}
            handleOnChange={(e) => {
              const { value, name } = e.target;
              setFormDataEdit((prev) => ({
                ...prev,
                [name]: value
              }));
            }}
            handleclose={() => setEditSection(false)}
            rest={formDataEdit}
            isEditing={true} // In editing mode
          />
        )}

        <div className='tableContainer'>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {dataList.length > 0 ? (
                dataList.map((el) => (
                  <tr key={el._id}>
                    <td>{el.name}</td>
                    <td>{el.email}</td>
                    <td>{el.mobile}</td>
                    <td>
                      <button className='btn btn-edit' onClick={() => handleEdit(el)}>Edit</button>
                      <button className='btn btn-delete' onClick={() => handleDelete(el._id)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;




























































































































































// import './App.css';
// // import {MdClose} from "react-icons/md"
// import { useEffect, useState } from 'react';
// import axios from "axios"
// // import Formtable from './components/Formtable';
// import Formtable from './Components/Formtable';

// axios.defaults.baseURL = "http://localhost:8080/";
// axios.get('/some-endpoint')
//   .then(response => {
//     console.log(response.data);
//   })
//   .catch(error => {
//     console.error('There was an error!', error);
//   });
// function App() {
//   const [addSection,setAddSection] = useState(false)
//   const [editSection,setEditSection] = useState(false)
//   const [formData,setFormData] = useState({
//     name : "",
//     email : "",
//     mobile : "",
//   })
//   const [formDataEdit,setFormDataEdit] = useState({
//     name : "",
//     email : "",
//     mobile : "",
//     _id : ""
//   })
//   const [dataList,setDataList] = useState([])

//   const handleOnChange = (e)=>{
//     const {value,name} = e.target
//     setFormData((preve)=>{
//         return{
//           ...preve,
//           [name] : value
//         }
//     })
//   }


//   const handleSubmit = async(e)=>{
//       e.preventDefault()
//       const data = await axios.post("/create",formData)
//       console.log(data)
//       if(data.data.success){
//           setAddSection(false)
//           alert(data.data.message)
//           getFetchData()
//           setFormData({
//             name : "",
//             email : "",
//             mobile : ""
//           })

//       }
//   }
//   const getFetchData = async()=>{
//     const data = await axios.get("/")
//     console.log(data)
//     if(data.data.success){
//         setDataList(data.data.data)
//     }
//   }
//   useEffect(()=>{
//     getFetchData()
//   },[])

//   const handleDelete = async(id)=>{
//     const data = await axios.delete("/delete/"+id)
    
//       if(data.data.success){
//         getFetchData()
//         alert(data.data.message)
//       }
//   }

//   const handleUpdate = async(e)=>{
//     e.preventDefault()
//     const data = await axios.put("/update",formDataEdit)
//     if(data.data.success){
//       getFetchData()
//       alert(data.data.message)
//       setEditSection(false)
//     }
//   }
//   const handleEditOnChange = async(e)=>{
//     const {value,name} = e.target
//     setFormDataEdit((preve)=>{
//         return{
//           ...preve,
//           [name] : value
//         }
//     })
//   }
//   const handleEdit = (el)=>{
//     setFormDataEdit(el)
//     setEditSection(true)
//   }
//   return (
//    <>
//       <div className="container">
//         <button className="btn btn-add" onClick={()=>setAddSection(true)}>Add</button>

//       {
//         addSection && (
//           <Formtable
//             handleSubmit={handleSubmit}
//             handleOnChange={handleOnChange}
//             handleclose = {()=>setAddSection(false)}
//             rest={formData}
//           />
//         )
//       }
//       {
//         editSection && (
//           <Formtable
//             handleSubmit={handleUpdate}
//             handleOnChange={handleEditOnChange}
//             handleclose = {()=>setEditSection(false)}
//             rest={formDataEdit}
//           />
//         )
//       }


//       <div className='tableContainer'>
//         <table>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Mobile</th>
//               <th>
              
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             { dataList[0] ? (
//               dataList.map((el)=>{
//                 console.log(el)
//                 return(
//                   <tr>
//                     <td>{el.name}</td>
//                     <td>{el.email}</td>
//                     <td>{el.mobile}</td>
//                     <td>
//                       <button className='btn btn-edit' onClick={()=>handleEdit(el)}>Edit</button>
//                       <button className='btn btn-delete' onClick={()=>handleDelete(el._id)}>Delete</button>
//                     </td>
//                   </tr>
//                 )
//               }))
//               : (
//                 <p style={{textAlign : "center"}}>No data</p>
//               )
//             }
//           </tbody>
//         </table>
//       </div>
     


//       </div>
//    </>
//   );
// }

// export default App;
