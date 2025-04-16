export const initialStore = () => {
  return {
    contacts: null,
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'contactListData':
      return {
        ...store,
        contacts: action.payload.contacts || null, // Accede al primer elemento del array y su propiedad 'slug'
      };
    default:
      throw Error('Unknown action.');
  }
}