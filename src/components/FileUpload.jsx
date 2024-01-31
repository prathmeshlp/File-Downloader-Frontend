// components/Upload.js
import React, { useState, useRef,  } from "react";
import {useNavigate} from 'react-router-dom'
import axios from "axios";

function Upload() {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:3000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });
      // Display success message or redirect
      alert("File Uploaded Successfully");
      fileInputRef.current.value = "";
      setFile(null);
      navigate("/filelist");
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  const navigateToFilelist = () => {
    navigate("/filelist");
  };

  return (
    <div  className='w-[45%] p-8 border border-black rounded-lg mx-auto mt-[100px] flex flex-col justify-center place-items-center'>
      <h2 className="text-xl">Upload File</h2>
      <input className='w-80 border border-black rounded-md p-3 mt-5 ' type="file" onChange={handleFileChange} ref={fileInputRef} />
      <button className='w-40  mt-4 border border-black rounded-md py-1' onClick={handleUpload}>Upload</button>
      <div >
      <button className='w-[200px]  mt-10 border border-black rounded-md px-5 py-2' onClick={navigateToFilelist}>Show List Of Files</button>
      </div>
    </div>
  );
}

export default Upload;
