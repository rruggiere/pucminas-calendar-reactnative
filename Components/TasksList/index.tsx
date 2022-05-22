import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleRight, faTrash, faPlusCircle, faClock } from '@fortawesome/free-solid-svg-icons'
import { Task } from '../../Domain/task';
import { GetLocalTasks, UpdateValues } from '../../Service/storageService';
import NewTask from '../NewTask';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';

type Props = {
    date: Date;
    localTasks: Task[];
    stateAaction: (taskList: Task[]) => void;
};

function constructTasks(props: Props) {
    const tasksElements = [];
    if (props.localTasks && props.localTasks.length > 0)
        props.localTasks.forEach(task => {
            tasksElements.push(
                <View style={[styles.taskContainer]}>
                    <FontAwesomeIcon size={13} icon={faAngleRight} />
                    <Text style={styles.taskText}>
                        {task.text.toLocaleUpperCase() + " "}
                    </Text>
                    <View style={[{ flexDirection: 'row' }, styles.center]}>
                        <View style={{marginRight: 10}}><FontAwesomeIcon size={13} icon={faClock} /></View>
                        <Text style={styles.taskText}>
                            {task.hour}:{task.minutes}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={async () => { await removeTask(task, props); }}>
                        <FontAwesomeIcon size={20} color={'red'} icon={faTrash} />
                    </TouchableOpacity>
                </View>
            );
        });

    else
        tasksElements.push(<View><Text style={styles.taskText}>Nehuma atividade planejada para hoje!</Text></View>);

    return tasksElements;
}

async function removeTask(taskToRemove: Task, props: Props) {
    const taskFiltered = props.localTasks.filter(taskItem => taskToRemove.text != taskItem.text);
    await UpdateValues(props.date, taskFiltered);
    props.stateAaction(await GetLocalTasks(props.date));
}

export default function TasksList({ ...rest }: Props) {
    const [modalIsOpen, setIsOpen] = useState(false);
    let dataFormatada = JSON.stringify(rest.date);
    dataFormatada = dataFormatada.substring(1, dataFormatada.indexOf("T"));
    const onCloseModel = async () => {
        setIsOpen(false);
        const newTasks = await GetLocalTasks(rest.date);
        rest.stateAaction(newTasks);
    };

    return (
        <View style={styles.container}>
            <View style={styles.center}>
                <Text style={[{ fontSize: 15 , fontWeight: 'bold', marginBottom: 5 }]}>
                    ATIVIDADES PARA {dataFormatada}
                </Text>
                <ScrollView style={[{ width: '100%' }]}>
                    {constructTasks(rest)}
                </ScrollView>
            </View>
            <View>
                <TouchableOpacity onPress={() => setIsOpen(true)}>
                    <FontAwesomeIcon icon={faPlusCircle} color={'green'} size={40} />
                </TouchableOpacity>
            </View>
            <NewTask
                date={rest.date}
                isVisible={modalIsOpen}
                onClose={onCloseModel} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight: '30%'
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    taskText: {
        fontSize: 15
    },
    taskContainer: {
        width: '80%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'center'
    }
});