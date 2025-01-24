import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
// import styles from './css/BoardUpdateForm.module.css'
import styles from './css/BoardUpdateForm.module.css'
import * as format from '../../utils/format'
import DownloadIcon from '@mui/icons-material/Download';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// import Checkbox from '@mui/material/Checkbox';

const BoardUpdateForm = ( {
  board, onUpdate, onDelete, fileList, onDownload,
  onDeleteFile, deleteCheckedFiles, mFile
 } ) => {

  const { id } = useParams()

  // 💎 state 선언
  const [title, setTitle] = useState('')
  const [writer, setWriter] = useState('')
  const [content, setContent] = useState('')
  const [fileIdList, setFileIdList] = useState([])
  const [mainFile, setMainFile] = useState(null)
  const [files, setFiles] = useState(null)

  const changeTitle = (e) => { setTitle( e.target.value ) }
  const changeWriter = (e) => { setWriter( e.target.value ) }
  const changeContent = (e) => { setContent( e.target.value ) }

  // ✅ 파일 변경 이벤트 핸들러 추가
  const changeMainFile = (e) => {
    setMainFile(e.target.files[0])
  }
  const changeFile = (e) => {
    setFiles(e.target.files)
  }

  const onSubmit = () => {

    // 파일 업로드
    // application/json → multipart/form-data
    const formData = new FormData()
    // 게시글 정보 세팅
    formData.append('id', id)
    formData.append('title', title)
    formData.append('writer', writer)
    formData.append('content', content)

    // 🤷‍♂️ 파일 데이터 세팅
    if( mainFile ) {
      formData.append('mainFile', mainFile)
    }
    if( files ) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        formData.append('files', file)
      }
    }

    // 🍖 헤더
    const headers = {
      'Content-Type' : 'multipart/form-data'
    }
    // onUpdate(title, writer, content) // application/json
    onUpdate(formData, headers)         // multipart/form-daa
  }

  const handleDelete = () => {
    const check = window.confirm('정말로 삭제하시겠습니까?')
    if( check )
      onDelete(id)
  }

  const handleFileDelete = (id) => {
    const check = window.confirm('파일을 삭제하시겠습니까?')
    if( check )
      onDeleteFile(id)
  }

  const handleCheckedFileDelete = (id) => {
    const check = window.confirm(`선택한 ${fileIdList.length} 개의 파일을 삭제하시겠습니까?`)
    if( check ){
      deleteCheckedFiles(fileIdList) 
      setFileIdList([]) // 삭제할 id 리스트를 초기화
    }
  }


  
  // 체크박스 클릭 핸들러
  const checkFileId = (id) => {
    // console.log(id);
    
    let checked = false

    // 체크 여부 확인
    for (let i = 0; i < fileIdList.length; i++) {
      const fileId = fileIdList[i];
      // 체크 ⭕ : 체크박스 해제
      if( fileId == id ){
        fileIdList.splice(i, 1)
        checked = true
      }
    }

    // 체크 ❌ : 체크박스 지정 ✅
    if( !checked ){
      // 체크한 아이디 추가
      fileIdList.push(id)
    }
    console.log(`체크한 아이디 : ${fileIdList}`);
    setFileIdList(fileIdList)
  }

  useEffect( () => {
    if( board ){
      setTitle(board.title)
      setWriter(board.writer)
      setContent(board.content)
    }
  }, [board])

  return (
    <div className="container">
      <h1 className='title'>게시글 수정</h1>
      {/* <h3>번호 : {id}</h3> */}
      <table className={styles.table}>
        <tbody>
          <tr>
            <th>제목</th>
            <td>
              <input type="text" value={title} onChange={changeTitle} className={styles['form-input']} />
            </td>
          </tr>
          <tr>
            <th>작성자</th>
            <td>
              <input type="text" value={writer} onChange={changeWriter} className={styles['form-input']} />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <textarea cols={40} rows={10} value={content} onChange={changeContent} className={styles['form-input']}></textarea>
            </td>
          </tr>
          {/* mFile(대표파일) 없을 때, 파일첨부UI 출력 */}
          {/* mFile(대표파일) 있을 때, 파일첨부UI 숨김 */}
          {
            mFile
           ?
           <></>
           :
           (
            <tr>
              <td>대표파일</td>
              <td>
                <input type="file" onChange={changeMainFile} />
              </td>
            </tr>
           )
          }
          <tr>
            <td>첨부파일</td>
            <td>
              <input type="file" multiple onChange={changeFile} />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
                {
                  fileList.map( (file) => (
                    <div key={file.id} className='flex-box'>
                      <div className="item">
                        <input type="checkbox" onClick={ () => checkFileId( file.id )} />
                        <div className='item-img'>
                          { file.type == 'MAIN' && <span className='badge'>대표</span>}
                          <img src={`/api/files/img/${file.id}`} alt={file.originName}
                              className='file-img' />
                        </div>
                        <span>{file.originName} ({ format.byteToUnit(file.fileSize)})</span>
                      </div>
                      
                      <div className="item">
                        <button className='btn' onClick={ () => onDownload(file.id, file.originName) }>
                          <DownloadIcon />
                        </button>
                        <button className='btn' onClick={ () => handleFileDelete(file.id) }>
                          <DeleteForeverIcon />
                        </button>
                      </div>
                    </div>
                  ))
                }
            </td>
          </tr>
        </tbody>
      </table>
      <div className="btn-box">
        <div>
          <Link to="/boards" className="btn">목록</Link>
          <button className="btn" onClick={ () => handleCheckedFileDelete( fileIdList )}>선택 삭제</button>
        </div>
        <div>
          <button onClick={onSubmit} className='btn'>수정</button>
          <button onClick={handleDelete} className='btn'>삭제</button>
        </div>
      </div>
    </div>
  )
}

export default BoardUpdateForm