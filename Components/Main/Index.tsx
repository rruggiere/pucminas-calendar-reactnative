import { StyleSheet, Text, View } from 'react-native';
import Reat, { useState } from 'react';

export default function Main() {
    const [daySelected, onChange] = useState(new Date());
    const tasks = {};
    const [stateTasks, setTask] = useState({ tasks });
}