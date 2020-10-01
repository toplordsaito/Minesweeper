import Sound from 'react-native-sound';

Sound.setCategory('Ambient', true);

const flagSound = new Sound(require('./flag.wav'), error => console.log(error));
export const playFlagSound = () => {
    flagSound.play((success) => flagSound.reset());
}