import { db } from '@/firebase'
import { doc, setDoc } from "firebase/firestore"; 

interface IProfile {
	username: string | null,
	displayName: string | null,
	email: string | null,
	photoURL: string | null,
	uid: string | null,
	bio: string | undefined | null
}

export const createProfile = async (data: IProfile) => {
	
	await setDoc(doc(db, "profiles", data.username as string), data);
	
}