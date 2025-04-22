import { firebase } from '@react-native-firebase/app';
import { getAuth } from "firebase/auth";

// Si tu n'as pas encore configuré Firebase, il te faut d'abord l'ajouter via la console Firebase.
const firebaseConfig = {
  apiKey: 'AIzaSyABlb_QO8A80NvxWj87SO76Ww45Ik-PXQ4',
  authDomain: "ceinture-a99d5.firebaseapp.com",
    projectId: 'ceinture-a99d5',
  storageBucket: 'ceinture-a99d5.firebasestorage.app',
  messagingSenderId: '579048446697',
  appId: '1:579048446697:ios:d26c79d65ee0f8aace2e78',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };
