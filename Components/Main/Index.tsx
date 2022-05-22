import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { GetLocalTasks } from '../../Service/storageService';
import { Task } from '../../Domain/task';
import TasksList from '../TasksList';
import CalendarPicker from 'react-native-calendar-picker'


export default function Main() {
    const [daySelected, onChange] = useState(new Date());
    const [stateTasks, setTask] = useState([] as Task[]);

    useEffect(() => {
        async function getTasks() {
            const tasks = await GetLocalTasks(daySelected);
            setTask(tasks);
        }
        getTasks();
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <Text>
                    BEM-VINDO A SUA AGENDA
                </Text>
                <View>
                    <CalendarPicker
                        onDateChange={onChange}
                    />
                </View>
            </View>
            <TasksList
                date={daySelected}
                localTasks={stateTasks}
                stateAaction={setTask} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {      
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 15
    },
  });