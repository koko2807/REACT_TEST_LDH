import React from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './css/BoardRead.module.css'
import * as format from '../../utils/format'

const BoardRead = ({ board, mainFile, fileList, onDownload }) => {
  const { id } = useParams();

  // 기본값 설정: board가 없을 경우 빈 객체로 초기화
  // const { title = '', writer = '', content = '' } = board || {};

  return (
    <div className="container">
      <h1 className="title">게시글 조회</h1>

      {/* 메인 이미지 */}
      <div>
        {
         mainFile 
         ? <img src={`/api/files/img/${mainFile?.id}`} alt={mainFile?.originName} />
         : <></>
        }
      </div>

      <table className={styles.table}>
        <tbody>
          <tr>
            <th>제목</th>
            
            <td>
              {/* 
              value vs defaultValue

                - Controllered Component ( 상태관리 컴포넌트 )
                  * 상태들이 변경되면 UI 에 업데이트
                  * value 값의 변경을 UI 업데이트 가능
                  * 
                - Uncontrollered Component ( 컴포넌트 )
                  * 상태 변겸 감지 안함
                  * defaultValue 값은 초기에만 세팅
              */}
              <input type="text" value={board.title} readOnly className={styles['form-input']} />
            </td>
          </tr>
          <tr>
            <th>작성자</th>
            <td>
              <input type="text" value={board.writer} readOnly className={styles['form-input']} />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <textarea cols={40} rows={10} value={board.content} readOnly className={styles['form-input']}></textarea>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
                {
                  fileList.map( (file) => (
                    <div key={file.no} className='flex-box'>
                      <div className="item">
                        <div className='item-img'>
                          { file.type == 'MAIN' && <span className='badge'>대표</span>}
                          <img src={`/api/files/img/${file.id}`} alt={file.originName}
                            className='file-img' />
                        </div>
                        <span>{file.originName} ({ format.byteToUnit(file.fileSize)})</span>
                      </div>
                      <div className="item">
                        <button className='btn' onClick={ () => onDownload(file.id, file.originName) }>다운로드</button>
                      </div>
                    </div>
                  ))
                }
            </td>
          </tr>
        </tbody>
      </table>
      <div className="btn-box">
        <Link to="/boards" className="btn">목록</Link>
        <Link to={`/boards/update/${id}`} className="btn">수정</Link>
      </div>
    </div>
  );
};

export default BoardRead;