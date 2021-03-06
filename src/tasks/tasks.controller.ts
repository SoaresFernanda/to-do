import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Task } from './shared/task';
import { TaskService } from './shared/task.service';

@Controller('tasks')
export class TasksController {
    constructor(
        private taskService: TaskService
    ) { }

    @Get()
    async getAll(): Promise<Task[]> {
        return this.taskService.getAll();
    }
    // no @Param id, recupere-o e o adicione no id:number
    @Get(':id')
    async getById(@Param('id') id:string): Promise<Task> {
        return this.taskService.getById(id);
    }
    //chamando o body e argumentando os campos do tipo task
    @Post()
    async create(@Body() task: Task): Promise<Task> {
        return this.taskService.create(task);
    }
    @Put(':id')
    async update(@Param('id') id: string, @Body() task:Task) : Promise<Task> {
        return this.taskService.update(id, task);
    }
    @Delete(':id')
    async delete(@Param('id') id:string) {
         this.taskService.delete(id);
    }
}
