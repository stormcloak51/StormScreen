import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

function useAuth() {
	const {email, id, token, displayName} = useSelector((state: RootState) => state.user)

	return {
		isAuth: !!email,
		email,
		id,
		displayName,
		token
	}
}

export default useAuth