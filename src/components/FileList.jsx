// components/FileList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function FileList() {
  console.log("FileList Componenet");
  const [files, setFiles] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/files", {
        headers: {
          Authorization: token,
        },
      });
      setFiles(response.data);
    } catch (error) {
      console.error("Failed to fetch files", error);
    }
  };

  const handleFileUpload = () => {
    navigate("/upload");
  };

  const handleDelete = async (filename) => {
    console.log(filename);
    try {
      if (window.confirm("Do you really want to delete the file?")) {
        const token = localStorage.getItem("token");
        const response = await axios.delete(
          `http://localhost:3000/files/${filename}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        alert("File Deleted SuccessFully");
        fetchFiles();
      }
    } catch (error) {
      console.error("Failed to fetch files", error);
    }
  };

  const handleDownload = async (code) => {
    console.log(code);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3000/download/${code}`,
        {
          responseType: "blob",
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response);
      // Get the filename from response headers
      let filename = "downloadedfile.jpg"; // Default filename

      const headers = response.headers;
      if (headers["content-disposition"]) {
        const contentDisposition = headers["content-disposition"];
        const match = contentDisposition.match(/filename="(.+)"/);
        if (match && match[1]) {
          filename = match[1];
        }
      }

      // Create a URL for the binary blob
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create a link element and initiate the download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Failed to fetch files", error);
    }
  };

  return (
    <>
      <div className="w-[80%] rounded-lg p-4 border border-black mx-auto mt-[100px] flex flex-col justify-center place-items-center">
        <h2>File List</h2>
        <table className="table table-striped border border-black w-[1000px] rounded-lg">
          <thead className="border border-black p-4">
            <tr>
              <th className="border border-black" scope="col">
                Username
              </th>
              <th className="border border-black" scope="col">
                FileName
              </th>
              <th className="border border-black" scope="col">
                Code
              </th>
              <th className="border border-black" scope="col">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {files &&
              files.map((file) => (
                <tr key={file.code}>
                  <td className="border border-black p-2">{file.username}</td>
                  <td className="border border-black p-2">{file.filename}</td>
                  <td className="border border-black p-2">{file.code}</td>
                  <td className="border border-black p-2">
                    <button
                      className="mr-2 border border-black px-5 rounded-md"
                      onClick={() => handleDelete(file.filename)}
                    >
                      Delete
                    </button>
                    <button
                      className="mr-2 border border-black px-5 rounded-md"
                      onClick={() => handleDownload(file.code)}
                    >
                      Download File
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <button
          className="mt-5 border border-black px-5 py-2 rounded-md"
          onClick={handleFileUpload}
        >
          Back to Upload File
        </button>
      </div>
    </>
  );
}
export default FileList;
