import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

function useAuth() {
	const {email, id, token, displayName, photo} = useSelector((state: RootState) => state.user)

	return {
		photoURL: photo,
		isAuth: !!email,
		email,
		id,
		displayName,
		token
	}
}

export default useAuth