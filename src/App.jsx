import { useState, useCallback } from 'react'
import './App.css'

// 单个 Todo 项组件
function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <span className="todo-text" onClick={() => onToggle(todo.id)}>
        {todo.text}
      </span>
      <button className="delete-btn" onClick={() => onDelete(todo.id)}>
        删除
      </button>
    </li>
  )
}

// 筛选按钮组件
function FilterButton({ label, active, onClick }) {
  return (
    <button
      className={`filter-btn ${active ? 'active' : ''}`}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: '学习 React 19 新特性', completed: false },
    { id: 2, text: '完成待办事项项目', completed: true },
    { id: 3, text: '阅读官方文档', completed: false },
  ])
  const [inputValue, setInputValue] = useState('')
  const [filter, setFilter] = useState('all') // all | active | completed

  // 添加待办
  const addTodo = useCallback(() => {
    const text = inputValue.trim()
    if (!text) return
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    }
    setTodos(prev => [...prev, newTodo])
    setInputValue('')
  }, [inputValue])

  // 切换完成状态
  const toggleTodo = useCallback((id) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }, [])

  // 删除待办
  const deleteTodo = useCallback((id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }, [])

  // 筛选后的列表
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  // 统计
  const activeCount = todos.filter(t => !t.completed).length
  const completedCount = todos.filter(t => t.completed).length

  return (
    <div className="todo-app">
      <h1>📝 待办事项</h1>

      {/* 输入区域 */}
      <div className="input-area">
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTodo()}
          placeholder="输入新任务，按回车添加..."
        />
        <button onClick={addTodo}>添加</button>
      </div>

      {/* 筛选按钮 */}
      <div className="filter-area">
        <FilterButton
          label={`全部 (${todos.length})`}
          active={filter === 'all'}
          onClick={() => setFilter('all')}
        />
        <FilterButton
          label={`进行中 (${activeCount})`}
          active={filter === 'active'}
          onClick={() => setFilter('active')}
        />
        <FilterButton
          label={`已完成 (${completedCount})`}
          active={filter === 'completed'}
          onClick={() => setFilter('completed')}
        />
      </div>

      {/* 待办列表 */}
      <ul className="todo-list">
        {filteredTodos.length === 0 ? (
          <li className="empty-tip">暂无任务</li>
        ) : (
          filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))
        )}
      </ul>

      {/* 底部统计 */}
      <div className="footer">
        共 {todos.length} 项 · {activeCount} 项待完成
      </div>
    </div>
  )
}

export default App
