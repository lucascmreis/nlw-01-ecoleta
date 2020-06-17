import React, {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import {FiUpload} from 'react-icons/fi'

import './style.css';

interface Props {
    onFileUploaded: (file:File) => void;
}

const Dropzone: React.FC<Props> = ({onFileUploaded}) =>  {
    const [selectFileUrl, setSelectedFileUrl] = useState('')

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        const fileUrl = URL.createObjectURL(file);

        setSelectedFileUrl(fileUrl);
        onFileUploaded(file)

    }, [onFileUploaded])
    
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
      onDrop,
      accept: 'image/*'

    })

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />
     
        {selectFileUrl ?
          <img src={selectFileUrl} alt="Point thumbnail" />  :
          
            isDragActive ?
              <p>
                   <FiUpload />
                  Arraste aqui uma imagem para o estabelecimento ...
              </p> :
              <p>
                  <FiUpload />
                  Segure e arraste ou click para carregar uma imagem 
              </p>
          
        
        }
    </div>
  )
}

export default Dropzone;