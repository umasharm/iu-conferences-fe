import logo from './logo.svg';
import './App.css';
import { Button, FormLabel, FormControlLabel } from "@mui/material"
import React, { useState } from 'react';
import axios from 'axios';


function App() {
  const [submitting, setSubmitting] = useState(false);
  const [theme, setTheme] = useState("");
  const [webtheme, setWebtheme] = useState("");
  const [WebIdtheme, setWebIdtheme] = useState("");
  const [token, setToken] = useState("");
  const [id, setId] = useState("");
  const [webId, setWebId] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedWebFile, setSelectedWebFile] = useState(null);
  const [selectedDeleteFile, setSelectedDeleteFile] = useState(null);
  const [webExcelFile,setWebExcelFile] = useState(null);
  const [schedMeet, setSchedMeet] = useState(true);
  const [delMeet, setDelMeet] = useState(false);
  const [updateMeet, setUpdateMeet] = useState(false);
  const [schedWeb, setSchedWeb] = useState(false);
  const [updateWeb, setUpdateWeb] = useState(false);
  const [updateWebTemp , setUpdateWebTemp] = useState(false);


  
  const handleSubmit = event => {
    event.preventDefault();
    setSubmitting(true);
    submitForm();
    // setTimeout(() => {
    //   setSubmitting(false);
    //   alert("Form Submitted");
    // }, 3000); 
  }

  const submitForm = () => {
    const formData = new FormData();
    formData.append("topic", theme);
    formData.append("token", token);
    formData.append("input_excel", selectedFile);

    axios.post("http://localhost:5002/preprocess_zoom_excel", formData, {responseType: 'arraybuffer'})
    .then((response) => {
      alert("File Upload Success");
      console.log(response);
      const type = response.headers['Content-Type']
      const blob = new Blob([response.data], { type: type })
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = 'file.xlsx'
      link.click()
    })
  
    .catch((err) => alert("File Upload Error"));
  }

  const handleSubmitWeb = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("topic", webtheme);
    formData.append("input_excel", selectedWebFile);

    axios.post("http://localhost:5002/schedule_webinar", formData, {responseType: 'arraybuffer'})
    .then((response) => {
      alert("File Upload Success");
      console.log(response);
      const type = response.headers['Content-Type']
      const blob = new Blob([response.data], { type: type })
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = 'file.xlsx'
      link.click()
    })
  
    .catch((err) => alert("File Upload Error"));
  }

  const handleSubmitWebTemplate = (e) =>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("WebIdtheme", WebIdtheme);
    formData.append("webID", webId);
    formData.append("input_excel", webExcelFile);

    axios.post("https://iu-conferences.herokuapp.com/flask/hello", formData, {responseType: 'arraybuffer'})
    .then((response) => {
      alert("File Upload Success");
      console.log(response);
      const type = response.headers['Content-Type']
      const blob = new Blob([response.data], { type: type })
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = 'file.xlsx'
      link.click()
    })
  
    .catch((err) => alert("File Upload Error"));
  }


  const handleSubmitDelete = (e) => {
    e.preventDefault();

    // alert("Meeting deleted")
    console.log("------", selectedDeleteFile)
    const formData = new FormData();
    //formData.append("id", id);
    formData.append("id", id);
    formData.append("input_excel", selectedDeleteFile);
    axios.post("http://localhost:5002/delete_meeting", formData)
    .then((response) => {
      console.log("res=",response.data.success)
      if (response.data.success == true){
        alert("Meeting was deleted");
      }
      else{
        alert("Meeting Id is invalid")
      }
    })
  
    .catch((err) => alert("File Upload Error"));
  }

  const downloadFile = () => {
    window.open("https://iuc-website-abstracts-fall-pts-2022.s3.us-east-2.amazonaws.com/FirstStepsINPUTTEST.xlsx", '_blank').focus() 
  } 

  const deleteMeeting=()=>{
    setDelMeet(true)
    setSchedMeet(false)
    setUpdateMeet(false)
    setSchedWeb(false)
    setUpdateWeb(false)
    setUpdateWebTemp(false)
  }

  const scheduleMeeting=()=>{
    setSchedMeet(true)
    setDelMeet(false)
    setUpdateMeet(false)
    setSchedWeb(false)
    setUpdateWeb(false)
    setUpdateWebTemp(false)
  }

  const updateMeeting=()=>{
    setDelMeet(false)
    setSchedMeet(false)
    setUpdateMeet(true)
    setSchedWeb(false)
    setUpdateWeb(false)
    setUpdateWebTemp(false)
  }

  const scheduleWebinar=()=>{
    setSchedWeb(true)
    setDelMeet(false)
    setSchedMeet(false)
    setUpdateMeet(false)
    setUpdateWeb(false)
    setUpdateWebTemp(false)
  }

  const updateWebinar=()=>{
    setDelMeet(false)
    setSchedMeet(false)
    setUpdateMeet(false)
    setSchedWeb(false)
    setUpdateWeb(true)
    setUpdateWebTemp(true)
  }
  
  const handleSubmitUpdate=(e)=>{
    e.preventDefault();
  }
  

  
  return (
    <div className="wrapper">      
      <h1> Zoom Meeting Scheduler</h1>
      {
        submitting && <div> Submitting Form... </div>
      }
      

      <button onClick={scheduleMeeting}>Schedule Meeting</button> &nbsp;  
      <a href="https://github.iu.edu/Indiana-University-Conferences/zoom/blob/main/Sample_excel.xlsx"><button>Download Sample File</button></a>  &nbsp;
  
      <button onClick={deleteMeeting}> Delete Meeting</button>     &nbsp;  
      {/* <button onClick={updateMeeting}>Update Existing Meeting</button>  &nbsp;   */}
      <button onClick={scheduleWebinar}>Schedule a Webinar</button>  &nbsp;   
      <button onClick={updateWebinar}>Schedule Webinar Using Template</button>  &nbsp;   

       
      {schedMeet?<form onSubmit={handleSubmit}>
        
      <fieldset>
      {/* <button onClick={downloadFile}>Download Sample File</button>   */}
         <label>
           <p>Prefix</p>
           <input name="theme" type="text" value={theme} onChange={(e) => setTheme(e.target.value)}/>
           
         </label>
         <br></br>
         <br></br>
         <label>
           <p> Upload Input Excel File </p>
         <input  type='file' onChange={(e) => setSelectedFile(e.target.files[0])}/>
         </label>
       </fieldset>
      
       <button type="submit">Submit</button>
      </form>:""}

      {delMeet? <form onSubmit={handleSubmitDelete}>
      <fieldset> 
      <label>
          <p>Meeting ID</p>
          <input name="ID" type="text" value={id} onChange={(e) => setId(e.target.value)}/>
           </label>
           <br></br>
           <p>OR</p> 
         <label>
           <p> Upload Input Excel File for deleting meetings </p>
         <input  type='file' onChange={(e) => setSelectedDeleteFile(e.target.files[0])}/>
         </label>
       </fieldset>
      
       <button type="submit">Delete</button>
      </form>:""}

      {/* {updateMeet? <form onSubmit={handleSubmitUpdate}>
      <fieldset>  

         <label>
           <p>Schedule for :</p>
           <input name="theme" type="text" value={theme} onChange={(e) => setTheme(e.target.value)}/>
         </label>
         <br></br>

         <label>
           <p>Meeting Date</p>
           <input name="theme" type="text" value={theme}/>
         </label>
         <br></br>

         <label>
           <p>Meeting Duration</p>
           <input name="theme" type="text" value={theme} onChange={(e) => setTheme(e.target.value)}/>
         </label>
         <br></br>

         <label>
           <p>Waiting room</p>
           <input name="theme" type="text" value={theme}/>
         </label>
         <br></br>

         <label>
           <p>Start time</p>
           <input name="theme" type="text" value={theme} onChange={(e) => setTheme(e.target.value)}/>
         </label>
         <br></br>

         <label>
           <p>End Time</p>
           <input name="theme" type="text" value={theme}/>
         </label>
         <br></br>

         <label>
           <p>Automatically record meeting</p>
           <input name="theme" type="text" value={theme} onChange={(e) => setTheme(e.target.value)}/>
         </label>
         <br></br>

         <label>
           <p>Allow participants anytime</p>
           <input name="theme" type="text" value={theme}/>
         </label>
         <br></br>

         <label>
           <p>Q and A</p>
           <input name="theme" type="text" value={theme} onChange={(e) => setTheme(e.target.value)}/>
         </label>
         <br></br>


       </fieldset>
      
       <button type="submit">Update Meeting</button>
      </form>:""} */}

      {schedWeb?<form onSubmit={handleSubmitWeb}>
        
        <fieldset>
        {/* <button onClick={downloadFile}>Download Sample File</button>   */}
           <label>
             <p>Prefix</p>
             <input name="theme" type="text" value={webtheme} onChange={(e) => setWebtheme(e.target.value)}/>
             
           </label>
           <br></br>
           <br></br>
           <label>
             <p> Upload Input Excel File </p>
           <input  type='file' onChange={(e) => setSelectedWebFile(e.target.files[0])}/>
           </label>
         </fieldset>
        
         <button type="submit">Submit</button>
        </form>:""}

        {updateWebTemp?<form onSubmit={handleSubmitWebTemplate}>
        
        <fieldset>
        {/* <button onClick={downloadFile}>Download Sample File</button>   */}
           <label>
          <p>Webinar Template ID</p>
          <input name="webID" type="text" value={webId} onChange={(e) => setWebId(e.target.value)}/>
           </label>
           <br></br>
           <label>
          <p>Prefix</p>
          <input name="themeId" type="text" value={WebIdtheme} onChange={(e) => setWebIdtheme(e.target.value)}/>
           </label>
           <br></br>
           <label> 
           <p> Upload Excel File </p>
         <input  type='file' onChange={(e) => setWebExcelFile(e.target.files[0])}/>
         </label>

         </fieldset>
        
         <button type="submit">Submit</button>
        </form>:""}
    </div>

  );
  
}

export default App;
