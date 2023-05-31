import { useState } from 'react';
import { FileUpload } from '../components';

import './style/index.css';

const { REACT_APP_API_URL } = process.env;

function App() {
  const [loading, setLoading] = useState(false);

  const getFile = async (file: File) => {
    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    fetch(REACT_APP_API_URL as string, {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        setLoading(false);
        if (response.ok) {
          return response.blob();
        } else {
          throw new Error('File upload failed');
        }
      })
      .then((data) => {
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${Date.now()}.xlsx`);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
      });
  };

  return (
    <div>
      <div id="container">
        <h1>
          <span id="fancy">Object Detection from Videos with YOLO</span> using
          Python
        </h1>
        <div id="file-container">
          <FileUpload getFile={getFile} loading={loading} />
        </div>
      </div>
    </div>
  );
}

export default App;
