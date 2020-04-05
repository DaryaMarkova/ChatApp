import React, { useState, useEffect, useRef } from 'react';
import { Modal, Radio, Button, Icon } from 'antd';
import './file-uploader.scss';

const FileUploader = (props) => {
	const [visible,  setVisible] = useState(false);
	const [selectedFiles, setSelectedFiles] = useState([])
	const [showAsImage, setShowAsImage] = useState(false);
	const fileChooserRef = useRef(null);

  useEffect(() => {
    if (props.shouldDisplay) {
      setVisible(true);
    }
  }, [props.shouldDisplay])
	
	const processSelectedFiles = () => {
		const fileData = new FormData();
		selectedFiles.forEach(it => fileData.append('attachedFiles', it))
		fileData.append('asImage', showAsImage && selectedFiles.length === 1);
		
		props.onFilesWereSelected(
			{
				files: fileData
			}
		);
		
		setVisible(false);
	}

	const onFilesChoosen = () => {
		setSelectedFiles(Array.from(fileChooserRef.current.files));
	}

	const excludeFile = (index) => {
		setSelectedFiles(
			selectedFiles.slice(0, index).concat(selectedFiles.slice(index + 1))
		);
	}
  
  return (
    <div className='fileuplaoder'>
      <Modal 
        destroyOnClose={true}
        title='Загрузка файла' 
        visible={visible} 
        okText='Загрузить' 
        cancelText='Отмена'
        closable={true}
        maskClosable={true}
        onCancel={() => setVisible(false)}
        onOk={processSelectedFiles}>

				<div className='fileuplader__content'>		
					<Button type='dashed' onClick={() => fileChooserRef.current.click()}>
						<Icon type='upload' />
						Выбрать файлы
					</Button>

					<input 
						ref={fileChooserRef}
						onChange={onFilesChoosen}
						className='filechooser'
						type='file' 
						multiple 
						style={{display: 'block', marginBottom: '20px'}}/>

					<p>Выбрано файлов: {selectedFiles.length}</p>
					<ul className='filelist'>
						{
							selectedFiles.map((it, idx) => (
								<li key={it.name}>
								 	<span>{it.name}</span>
									<Icon 
										className='drop_icon'
										type='delete' 
										onClick={() => excludeFile(idx)} 
										style={{ fontSize: '10px'}} />
								</li>
								)
							)
						}
					</ul>
					{
						selectedFiles.length === 1 &&
						<Radio.Group defaultValue={false} onChange={e => setShowAsImage(e.target.value)}>
							<Radio value={true}>Загрузить как изображение</Radio><br/>
							<Radio value={false}>Загрузить как файл</Radio>
						</Radio.Group>
					}
				</div>
      </Modal>
    </div>
  )
}

export default FileUploader;