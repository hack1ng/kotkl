import api from '@/services/Api'

export default () => {
	register (credentials) {
		return Api().post('register', credentials)
	}
}
