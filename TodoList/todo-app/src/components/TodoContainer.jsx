import React, { useEffect, useState } from 'react'
import TodoFooter from './TodoFooter'
import TodoHeader from './TodoHeader'
import TodoInput from './TodoInput'
import TodoList from './TodoList'

const TodoContainer = () => {

  // state
  const [todoList, setTodoList] = useState([])
  const [input, setInput] = useState('')

  // 할 일 목록 요청 함수
  const getList = async () => {
    try {
      const response = await fetch('http://localhost:8080/todos')
      const data = await response.json()
      console.log(data)
      setTodoList(data.list)
    } catch (error) {
      console.error(error)
    }
  }

  // 이벤트 함수
  // 체크박스 토글 함수
  const onToggle = async (todo) => {
    // 상태 수정 요청
    const data = {
      ...todo,
      status: !todo.status
    }
    const option = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }

    try {
      const url = 'http://localhost:8080/todos'
      const response = await fetch(url, option)
      console.log(await response.text())
    } catch (error) {
      console.log(error)
    }
    // 서버로 부터 할 일 목록 요청
    getList()
  }

  // 할 일 삭제 함수
  const onRemove = async (id) => {
    const option = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const url = `http://localhost:8080/todos/${id}`
      const response = await fetch(url, option)
      const msg = await response.text()
      console.log(msg)
    } catch (error) {
      console.log(error)
    }

    getList()
  }

  useEffect(() => {
    // 할일 목록 요청
    getList()
  }, [])

  // 할 일 입력 변경 이벤트 함수
  const onChange = (e) => {
    console.log(e.target.value)
    setInput(e.target.value)
  }

  const onSubmit = async (e) => {
    e.preventDefault() // 기본 이벤트 동작 방지
    let name = input;
    if (input === '') setInput('제목없음');

    // 데이터 등록 요청
    const data = {
      name: input,
      seq: 1
    }
    const option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    try {
      const url = 'http://localhost:8080/todos'
      const response = await fetch(url, option)
      const msg = await response.text()
      console.log(msg)
    } catch (error) {
      console.log(error)
    }
    getList() // 할 일 목록 다시조회
    setInput('') // 입력 값 비우기
  }

  // 전체 완료
  // [PUT] - /todos
  const onCompleteAll = async () => {
    // PUT
    const data = {
      id: null
    }
    const option = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    const url = `http://localhost:8080/todos`
    try {
      const response = await fetch(url, option)
      const msg = await response.text()
      console.log(msg)
    } catch (error) {
      console.log(error)
    }
    getList()
  }

  // 전체 삭제
  // [DELETE] - /todos
  const onDeleteAll = async () => {
    // DELETE
    const data = {
      id: null
    }
    const option = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    const url = `http://localhost:8080/todos`
    try {
      const response = await fetch(url, option)
      const msg = await response.text()
      console.log(msg)
    } catch (error) {
      console.log(error)
    }
    getList()
  }

  return (
    <div className="container">
      <TodoHeader />
      <TodoInput input={input} onChange={onChange} onSubmit={onSubmit} />
      <TodoList
        todoList={todoList} onToggle={onToggle} onRemove={onRemove} />
      <TodoFooter onCompleteAll={onCompleteAll} onDeleteAll={onDeleteAll} />
    </div>
  )
}

export default TodoContainer