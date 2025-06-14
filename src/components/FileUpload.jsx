import React, { useState } from 'react';

const FileUpload = () => {
  const [file, setFile] = useState(null);

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append('report', file);

    // 👇 Backend URL yaha set hoga — abhi backend bana nahi hai
    const res = await fetch("http://localhost:5000/upload", {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={uploadFile}>Upload Report</button>
    </div>
  );
};

export default FileUpload;
