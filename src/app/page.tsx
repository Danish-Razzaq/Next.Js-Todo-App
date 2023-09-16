import Image from 'next/image'
import AddTask from './components/AddTask'
import TodoList from './components/TodoList'
import { getAllTodos } from '@/Api'

export default async function Home() {
  const tasks = await getAllTodos();
  // console.log(tasks);
    
  return (
    <main className='max-w-xl mx-auto'>
      <div className='text-center my-5 flex flex-col gap-4'>
     <h1 className='text-2xlv font-bold'>Todo List App</h1>
         <AddTask/>
        </div> 
        <TodoList  taskList={tasks} />
    </main>
  )
}
