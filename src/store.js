export const initialStore = () => {
  return {
    contacts: null,
    agendas: null,
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'get_agendas':
      return {
        ...store,
        agendas: action.payload
      };
    case 'get_agenda_by_slug':
      return {
        ...store,
        agenda: action.payload
      };
    default:
      throw Error('Unknown action.');
  }
}