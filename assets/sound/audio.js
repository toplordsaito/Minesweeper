import { Audio } from 'expo-av';


export const playFlagSound = async () => {
    try {
        const { sound: soundObject, status } = await Audio.Sound.createAsync(
            require("./flag.mp3"),
            { shouldPlay: true }
        );
    } catch (error) {
    }
}

export const playOpenSound = async () => {
    try {
        const { sound: soundObject, status } = await Audio.Sound.createAsync(
            require("./open.mp3"),
            { shouldPlay: true }
        );
    } catch (error) {
    }
}

export const playVictorySound = async () => {
    try {
        const { sound: soundObject, status } = await Audio.Sound.createAsync(
            require("./victory.mp3"),
            { shouldPlay: true }
        );
    } catch (error) {
    }
}

export const playDieSound = async () => {
    try {
        const { sound: soundObject, status } = await Audio.Sound.createAsync(
            require("./die.mp3"),
            { shouldPlay: true }
        );
    } catch (error) {
    }
}