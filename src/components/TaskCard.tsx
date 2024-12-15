import { Calendar, CheckCircle2, Clock, Tag } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Task } from '@/types/task';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface TaskCardProps {
  task: Task;
  onStatusChange: (id: string, status: Task['status']) => void;
  onDelete: (id: string) => void;
}

const priorityColors = {
  low: 'bg-blue-100 text-blue-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
};

const categoryColors = {
  work: 'bg-purple-100 text-purple-800',
  personal: 'bg-green-100 text-green-800',
  shopping: 'bg-pink-100 text-pink-800',
  health: 'bg-teal-100 text-teal-800',
  other: 'bg-gray-100 text-gray-800',
};

export function TaskCard({ task, onStatusChange, onDelete }: TaskCardProps) {
  return (
    <Card className={cn(
      'transition-all duration-300',
      task.status === 'completed' && 'opacity-60'
    )}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-semibold">{task.title}</CardTitle>
          <Badge variant="outline" className={priorityColors[task.priority]}>
            {task.priority}
          </Badge>
        </div>
        <CardDescription>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            {format(new Date(task.createdAt), 'PPP')}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{task.description}</p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className={categoryColors[task.category]}>
            <Tag className="h-3 w-3 mr-1" />
            {task.category}
          </Badge>
          {task.dueDate && (
            <Badge variant="outline" className="bg-orange-100 text-orange-800">
              <Calendar className="h-3 w-3 mr-1" />
              Due: {format(new Date(task.dueDate), 'PPP')}
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onStatusChange(task.id, 'todo')}
            className={cn(task.status === 'todo' && 'bg-blue-100')}
          >
            Todo
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onStatusChange(task.id, 'in-progress')}
            className={cn(task.status === 'in-progress' && 'bg-yellow-100')}
          >
            In Progress
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onStatusChange(task.id, 'completed')}
            className={cn(task.status === 'completed' && 'bg-green-100')}
          >
            <CheckCircle2 className="h-4 w-4 mr-1" />
            Complete
          </Button>
        </div>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}