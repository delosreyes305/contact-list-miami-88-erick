import useGlobalReducer from "./useGlobalReducer";

const useActions = () => {
  const { store, dispatch } = useGlobalReducer();

  const getContacts = async () => {
    const response = await fetch(
      "https://playground.4geeks.com/contact/agendas/Erick/contacts",
      {
        method: "GET",
      },
    );
    if (!response.ok) {
      console.log("error: ", response.status, response.statusText);
      return;
    }
    const data = await response.json();
    dispatch({ type: "store_get_contacts", 
               payload: data.contacts });
    return data;
  };

  const deleteContact = async (id) => {
  const response = await fetch(
    `https://playground.4geeks.com/contact/agendas/Erick/contacts/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    console.log("Error deleting:", response.status);
    return;
  }

  await getContacts(); // refresh store
};

  return { getContacts, deleteContact };
};

export default useActions;
