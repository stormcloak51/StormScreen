import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

function useAuth() {
	const {email, id, token, displayName, photoURL, username} = useSelector((state: RootState) => state.user)

	return {
		photoURL,
		username,
		isAuth: !!email,
		email,
		id,
		displayName,
		token
	}
}

export default useAuth