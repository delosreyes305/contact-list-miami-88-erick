import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import useActions from "../hooks/useActions.jsx";
import { ContactCard } from "../components/ContactCard.jsx";


export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const { getContacts } = useActions();

  const createUser = async () => {
    const response = await fetch(
      "https://playground.4geeks.com/contact/agendas/Erick",
      {
        method: "POST",
      },
    );
    if (!response.ok) {
      console.log("error: ", response.status, response.statusText);
      getContacts();
      return;
    }
    const data = await response.json();
    console.log(data);
    return data;
  };

  useEffect(() => {
    const initialize = async () => {
      await createUser();
      await getContacts();
    };
    initialize();
  }, []);

  return (
    <div className="container mt-5">
      <h1>Contacts</h1>
      
        {store?.contacts.map((contacts) => (
          <ContactCard
            name={contacts.name}
            phone={contacts.phone}
            email={contacts.email}
            address={contacts.address}
            id={contacts.id}
            key={contacts.id}
          />
        ))}
      
    </div>
  );
};
