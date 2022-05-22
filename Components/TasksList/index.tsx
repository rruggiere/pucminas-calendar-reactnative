import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircleArrowRight, faTrash, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
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
                <View>
                    <FontAwesomeIcon size={13} icon={faCircleArrowRight} />
                    <Text>
                        {task.text}
                    </Text>
                    <Text>
                        | {task.hour}:{task.minutes}
                    </Text>
                    <TouchableOpacity onPress={() => { removeTask(task, props); }}>
                        <FontAwesomeIcon size={13} color={'red'} icon={faTrash} />
                    </TouchableOpacity>
                </View>
            );
        });

    else
        tasksElements.push(<View><Text>Nehuma atividade planejada para hoje!</Text></View>);

    return tasksElements;
}

function removeTask(taskToRemove: Task, props: Props) {
    const taskFiltered = props.localTasks.filter(taskItem => taskToRemove.text != taskItem.text);
    UpdateValues(props.date, props.localTasks);
    props.stateAaction(taskFiltered);
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
                <Text>
                    Atividades para {dataFormatada}
                </Text>
                <ScrollView >
                    {constructTasks(rest)}
                </ScrollView>
            </View>
            <View>
                <TouchableOpacity onPress={() => setIsOpen(true)}>
                    <FontAwesomeIcon icon={faPlusCircle} color={'green'} size={25} />
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
    }
});