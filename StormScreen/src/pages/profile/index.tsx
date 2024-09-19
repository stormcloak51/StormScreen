// import useAuth from '@/hooks/use-auth'
import { db } from '@/firebase'
import { doc, getDoc } from 'firebase/firestore'
import {FC, useEffect} from 'react';
import {useParams} from 'react-router-dom';

const Profile: FC = () => {
	const params = useParams()

	useEffect(() => {
		const fetchUserInfo = async () => {
			const userRef = doc(db, "profiles", params.username as string)
			const userSnap = await getDoc(userRef)
			if (userSnap.exists()) {
				console.log("User data:", userSnap.data());
			} else {
				console.log("No such document!");
			}
		}
		fetchUserInfo()
	}, [params?.username]) 


	return (
		<div>asdasd</div>
	);
}

export default Profile;