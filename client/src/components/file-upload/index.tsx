import { useDropzone } from 'react-dropzone';

import './style/index.css';

enum AcceptTypes {
  mp4 = '.mp4',
  MP4 = '.MP4',
}

const FileUpload = ({
  getFile,
  loading,
}: {
  getFile: (file: File) => void;
  loading: boolean;
}) => {
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    multiple: false,
    maxFiles: 1,
    accept: {
      'image/jpeg': Object.values(AcceptTypes),
    },
    onDropAccepted: (files) => {
      getFile(files[0]);
    },
  });

  return (
    <section
      className="container"
      style={{
        borderColor: acceptedFiles?.[0] ? '#229091' : '#6D96F3',
      }}
    >
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        {acceptedFiles?.[0] ? (
          loading ? (
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921"
              alt="Loading"
              id="loading"
              style={{ width: '100%', height: '100%' }}
            />
          ) : (
            <p id="text-success">Video successfully analyzed !</p>
          )
        ) : (
          <p id="caption">
            Drag 'n' drop some video here, or click to select video
          </p>
        )}
      </div>
    </section>
  );
};

export default FileUpload;
