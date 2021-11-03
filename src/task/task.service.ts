import { Injectable } from '@nestjs/common';
import { TaskDTO } from './dto/task.dto';
import { ITask } from './dto/task.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TaskService {
  tasks: ITask[] = [];

  create(TaskDTO: TaskDTO): ITask {
    const task = {
      id: uuidv4(),
      ...TaskDTO,
    };
    this.tasks.push(task);
    return task;
  }

  findAll(): ITask[] {
    return this.tasks;
  }

  findOne(id: string): ITask {
    return this.tasks.find((t) => t.id === id);
  }

  update(id: string, taskDto: TaskDTO): ITask {
    const newtask = { id, ...taskDto };
    this.tasks = this.tasks.map((t) => (t.id === id ? newtask : t));
    return taskDto;
  }

  delete(id: string){
    this.tasks = this.tasks.filter((t) => t.id !== id);
    return 'Task deleted';
  }
}
