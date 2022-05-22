import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../Domain/task';

function generateDateKey(date: Date) {
    const dateSplited = date.toString().split(" ");
    const key = dateSplited[1] + dateSplited[2];
    return key;
}

export async function GetLocalTasks(date: Date) {
    const tasksResponse = await AsyncStorage.getItem(generateDateKey(date));
    if (tasksResponse)
        return JSON.parse(tasksResponse) as Task[];

    return null! as Task[];
}

export async function UpdateValues(date: Date, tasks: Task[]) {
    const key = generateDateKey(date);

    if (tasks.length > 0)
        await AsyncStorage.setItem(key, JSON.stringify(tasks));
    else
        await AsyncStorage.removeItem(key);
}

export async function InsertValue(date: Date, task: Task) {
    const key = generateDateKey(date);
    const localResponse = await AsyncStorage.getItem(key);
    let tasksValues;

    if (localResponse) {
        localStorage.removeItem(key);
        tasksValues = JSON.parse(localResponse);
        tasksValues.push(task);
    }
    else
        tasksValues = [task]

    if (tasksValues)
        localStorage.setItem(key, JSON.stringify(tasksValues))
}
