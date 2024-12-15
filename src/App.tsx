import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TaskForm } from '@/components/TaskForm';
import { TaskCard } from '@/components/TaskCard';
import { useTasks } from '@/hooks/useTasks';
import { Category, Status, Task } from '@/types/task';
import { CheckCircle2, ListTodo, Package } from 'lucide-react';

export default function App() {
  const { tasks, addTask, updateTask, deleteTask } = useTasks();
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<Status | 'all'>('all');

  const filteredTasks = tasks
    .filter((task) => selectedCategory === 'all' || task.category === selectedCategory)
    .filter((task) => selectedStatus === 'all' || task.status === selectedStatus)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Package className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">TaskChute</h1>
          <p className="text-gray-600">Streamline your tasks, boost your productivity</p>
        </header>

        <div className="grid md:grid-cols-[350px,1fr] gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md h-fit">
            <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
            <TaskForm onSubmit={addTask} />
          </div>

          <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <Tabs defaultValue="all" className="w-full">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                  <TabsList>
                    <TabsTrigger value="all">
                      <Package className="h-4 w-4 mr-2" />
                      All
                    </TabsTrigger>
                    <TabsTrigger value="todo">
                      <ListTodo className="h-4 w-4 mr-2" />
                      Todo
                    </TabsTrigger>
                    <TabsTrigger value="completed">
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Completed
                    </TabsTrigger>
                  </TabsList>

                  <select
                    className="px-3 py-2 border rounded-md"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value as Category | 'all')}
                  >
                    <option value="all">All Categories</option>
                    <option value="work">Work</option>
                    <option value="personal">Personal</option>
                    <option value="shopping">Shopping</option>
                    <option value="health">Health</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <TabsContent value="all" className="space-y-4">
                  {filteredTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onStatusChange={(id, status) => updateTask(id, { status })}
                      onDelete={deleteTask}
                    />
                  ))}
                </TabsContent>

                <TabsContent value="todo" className="space-y-4">
                  {filteredTasks
                    .filter((task) => task.status === 'todo')
                    .map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onStatusChange={(id, status) => updateTask(id, { status })}
                        onDelete={deleteTask}
                      />
                    ))}
                </TabsContent>

                <TabsContent value="completed" className="space-y-4">
                  {filteredTasks
                    .filter((task) => task.status === 'completed')
                    .map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onStatusChange={(id, status) => updateTask(id, { status })}
                        onDelete={deleteTask}
                      />
                    ))}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}