export const addToStorage = (name, value) => {
	const item = JSON.parse(localStorage.getItem(name)) || [];
	item.push(value);
	localStorage.setItem(name, JSON.stringify(item));
};

export const removeFromStorage = (name, id) => {
	const item = JSON.parse(localStorage.getItem(name));
	const result = item.filter((single) => single._id !== id);
	localStorage.setItem(name, JSON.stringify(result));
};

export const clearStorage = (name) => localStorage.removeItem(name);

export const updateStorage = (name, item) => {
	const localStore = JSON.parse(localStorage.getItem(name)) || [];
	const same = localStore.filter((i) => i._id === item._id);

	if (same.length) {
		const index =
			localStore.length > 0
				? localStore.findIndex((i) => i._id === item._id)
				: false;
		localStore.splice(index, 1);
		localStore.push(item);
		localStorage.setItem(name, JSON.stringify(localStore));
	} else {
		localStore.push(item);
		localStorage.setItem(name, JSON.stringify(localStore));
	}
};
