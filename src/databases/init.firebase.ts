import { initializeApp } from 'firebase/app'
import { FirebaseStorage, deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { firebaseConfig } from '../configs/firebase.config'

class Firebase {
    static instance: Firebase
    static storage: FirebaseStorage

    constructor() {
        this.connectStorage()
    }

    connectStorage = () => {
        const app = initializeApp(firebaseConfig)
        Firebase.storage = getStorage(app)
    }

    getDownloadURL = (folderName: string, fileName: string) => {
        const path = folderName + '/' + fileName
        const downloadRef = ref(Firebase.storage, path)
        return getDownloadURL(downloadRef)
    }

    addImage = (folderName: string, file: File) => {
        const storageRef = ref(Firebase.storage, folderName)
        return uploadBytes(storageRef, file)
    }

    deleteImage = (folderName: string, nameImage: string) => {
        const path = folderName + '/' + nameImage
        const desertRef = ref(Firebase.storage, path)
        return deleteObject(desertRef)
    }

    static getInstance = () => {
        if (!Firebase.instance) {
            Firebase.instance = new Firebase()
        }
        return Firebase.instance
    }
}

export default Firebase.getInstance()
