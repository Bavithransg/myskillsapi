import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
export declare class TasksService {
    private tasks;
    static OPEN: any;
    getAllTasks(): Task[];
    getTasksWithFilters(filterDto: GetTasksFilterDto): Task[];
    getTaskById(id: string): Task;
    deleteTask(id: string): void;
    createTask(createTaskDto: CreateTaskDto): Task;
    updateTaskStatus(id: string, status: TaskStatus): Task;
}
