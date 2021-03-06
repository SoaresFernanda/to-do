import { Injectable } from '@nestjs/common';
import { Task } from './task';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class TaskService {
    
constructor(@InjectModel('Task') private readonly taskModel:Model<Task>) { }
       
    async getAll() {
        return await this.taskModel.find().exec();
    }
    async getById(id: string) {
        return await this.taskModel.findById(id).exec();
   
    }
    async create(task: Task) {
        const createdTask = new this.taskModel(task);
        return await createdTask.save();
    }
    //estou dizendo que atualizei 1 _id do mongo e o passei e o seu model.
    //para retornar a atualização, é necessário chamar o id novamente, por isso foi executado o getById;
    async update(id: string, task: Task) {
        await this.taskModel.updateOne({ _id: id }, task).exec();
        return this.getById(id);
    }
    async delete(id: string) {
        return await this.taskModel.deleteOne({ _id: id }).exec();
    }
}
