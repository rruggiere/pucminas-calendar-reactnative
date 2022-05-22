import {
    Modal,
    View,
    TouchableOpacity,
    TextInput
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faClose, faSave } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react';
import { InsertValue } from '../../Service/storageService';
import { Task } from '../../Domain/task';

type Props = {
    date: Date;
    isVisible: boolean;
    onClose: () => Promise<void>;
};

export default function NewTask({ date, isVisible, onClose }: Props) {
    const [taskDescription, setTaskValue] = useState("");
    const [hourValue, setHourValue] = useState(0);

    return (<Modal
        transparent={true}
        animationType={"slide"}
        visible={isVisible}>
        <View>
            <TouchableOpacity onPress={async () => await onClose()}>
                <FontAwesomeIcon icon={faClose} />
            </TouchableOpacity>
            <View>
                <TextInput onChangeText={(event) => setTaskValue(event)} placeholder="Insira uma atividade."/>
                <TextInput onChangeText={(event) => setHourValue(parseInt(event))} placeholder="Insira um horário."/>
            </View>
            <TouchableOpacity onPress={async () => {
                const task = {
                    text: taskDescription,
                    hour: hourValue,
                    minutes: hourValue
                };
                InsertValue(date, task as Task);
                await onClose();
            }}>
                <FontAwesomeIcon icon={faSave} />
            </TouchableOpacity>
        </View>

    </Modal>
    )
}