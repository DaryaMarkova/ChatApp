import { Button, Avatar } from 'antd';
import React, { useEffect, useState } from 'react';
import attachmentApi from 'utils/api/attachment';
import { saveAs } from 'file-saver';
import './file-preview.scss';

const FilePreview = ({originalname, size, id, mimetype, asImage}) => {
  const [fileSource, setFileSource] = useState(null);
  const newSize = (size / 1024).toFixed(2);
  
  useEffect(() => {
    if ( mimetype.includes('image') && !fileSource) {
      const fetchFile = asImage ? attachmentApi.getFile : attachmentApi.getFilePreview;
      fetchFile(id, mimetype).then(
        response => {
          const blob = new Blob([response.data], { type: mimetype });
          const src = URL.createObjectURL(blob);
          setFileSource(src);
        }
      )
    }
  }, [id, asImage, fileSource, mimetype])

  const readFile = () => {
    attachmentApi.getFile(id, mimetype)
      .then(response => {
        saveAs(new Blob([response.data], {type: mimetype}), originalname);
      })
  }

  if (asImage) {
    return  <img src={fileSource} style={{width:'300px', height: 'auto'}} alt='' />
  }

  return (
    <div className='file-preview'>
      <div className='file-preview__icon'>
        {
          fileSource ? 
          <Avatar src={fileSource} onClick={readFile} /> :
          <Button shape='circle' icon='file' onClick={readFile} />
        }
      </div>
      <div className='file-preview__meta'>
        <a onClick={readFile} className='name'>{originalname}</a>
        <span className='size'>{newSize} Кб</span>
      </div>
    </div>
  )
}

export default FilePreview;