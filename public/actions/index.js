export const CHANGE_USER = 'CHANGE_USER';

export const changeUser = function(obj) {
	return {
		type: CHANGE_USER,
		obj
	}
}