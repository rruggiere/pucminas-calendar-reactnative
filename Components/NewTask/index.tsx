import {
    Modal,
    View,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    Text
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
    const [hourValue, setHourValue] = useState("");
    const [minuteValue, setMinuteValue] = useState("");

    function treatTimeEntries(entryText: string, maxTimeRange: number) {
        const entryNumber = parseInt(entryText);
        if (entryNumber < 0)
            return "00";
        else if (entryNumber > maxTimeRange)
            return maxTimeRange.toString();

        return entryText;
    }
    return (<Modal
        transparent={true}
        animationType={"slide"}
        visible={isVisible}>
        <View style={styles.content}>
            <TouchableOpacity onPress={async () => await onClose()}>
                <FontAwesomeIcon size={30} color='red' icon={faClose} />
            </TouchableOpacity>
            <View>
                <TextInput style={styles.textContent} onChangeText={(event) => setTaskValue(event)} placeholder="Insira uma atividade." />
                <Text>Insira um horário:</Text>
                <View style={{ flexDirection: 'row' }}>
                    <TextInput
                        value={hourValue}
                        keyboardType='numeric'
                        maxLength={2}
                        style={[styles.textContent, styles.timeContent]}
                        onChangeText={(entryText) => setHourValue(treatTimeEntries(entryText, 23))} placeholder="Hora."
                    />
                    <Text>:</Text>
                    <TextInput
                        value={minuteValue}
                        keyboardType='numeric'
                        style={[styles.textContent, styles.timeContent]}
                        onChangeText={(entryText) => setMinuteValue(treatTimeEntries(entryText, 59))}
                        placeholder="Min."
                        maxLength={2}
                    />
                </View>
            </View>
            <TouchableOpacity style={styles.saveContent} onPress={async () => {
                const task = {
                    text: taskDescription,
                    hour: hourValue,
                    minutes: minuteValue
                };           
                await InsertValue(date, task as Task);
                await onClose();
                setHourValue("");
                setMinuteValue("");
            }}>
                <FontAwesomeIcon size={30} color='green' icon={faSave} />
            </TouchableOpacity>
        </View>

    </Modal>
    )
}

const styles = StyleSheet.create({
    content: {
        top: '50%',
        left: '40%',
        right: 'auto',
        bottom: 'auto',
        transform: [{ translateX: -50 }, { translateY: -50 }],
        backgroundColor: 'white',
        width: 220,
        height: 200,
        borderColor: 'black',
        borderRadius: 15,
        borderWidth: 3,
        justifyContent: 'space-between',
        padding: 5
    },
    saveContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContent: {
        borderColor: 'black',
        borderRadius: 15,
        borderWidth: 1,
        height: 40,
        marginBottom: 3
    },
    timeContent: {
        maxWidth: 80
    }
});