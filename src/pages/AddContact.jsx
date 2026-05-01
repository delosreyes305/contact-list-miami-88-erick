import React, { useState, useEffect } from "react";
import useActions from "../hooks/useActions";
import { Link, useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const AddContact = () => {
  const [inputValues, setInputValues] = useState({
    nameInput: "",
    emailInput: "",
    addressInput: "",
    phoneInput: "",
  });

  const { getContacts } = useActions();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const { store } = useGlobalReducer();

  const contactId = searchParams.get("id");
  const isEditing = Boolean(contactId);

const postContact = async (event) => {
  event.preventDefault();

  const url = isEditing
    ? `https://playground.4geeks.com/contact/agendas/Erick/contacts/${contactId}`
    : "https://playground.4geeks.com/contact/agendas/Erick/contacts";

  const method = isEditing ? "PUT" : "POST";

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: inputValues.nameInput,
      phone: inputValues.phoneInput,
      address: inputValues.addressInput,
      email: inputValues.emailInput,
    }),
  });

  if (!response.ok) {
    console.log("error: ", response.status, response.statusText);
    return;
  }

  await getContacts();
  navigate("/");
};

  useEffect(() => {
  if (isEditing && store?.contacts?.length > 0) {
    const contact = store.contacts.find(
      (c) => c.id === Number(contactId)
    );

    if (contact) {
      setInputValues({
        nameInput: contact.name || "",
        emailInput: contact.email || "",
        addressInput: contact.address || "",
        phoneInput: contact.phone || "",
      });
    }
  }
}, [isEditing, contactId, store?.contacts]);

  return (
    <>
      <div className="row mt-4">
        <div className="col-3"></div>
        <div className="col-6">
          <h1>{isEditing ? "Edit Contact" : "Add Contact"}</h1>
          <form onSubmit={(e) => postContact(e)}>
            <fieldset>
              <label htmlFor="nameInput">Name</label>
              <input
                type="text"
                id="nameInput"
                name="nameInput"
                className="form-control"
                value={inputValues.nameInput}
                onChange={(event) =>
                  setInputValues({ ...inputValues, nameInput: event.target.value })
                }
              />
            </fieldset>
            <fieldset>
              <label htmlFor="phoneInput">Phone</label>
              <input
                type="text"
                id="phoneInput"
                name="phoneInput"
                className="form-control"
                value={inputValues.phoneInput}
                onChange={(event) =>
                  setInputValues({ ...inputValues, phoneInput: event.target.value })
                }
              />
            </fieldset>
            <fieldset>
              <label htmlFor="emailInput">Email</label>
              <input
                type="text"
                id="emailInput"
                name="emailInput"
                className="form-control"
                value={inputValues.emailInput}
                onChange={(event) =>
                  setInputValues({ ...inputValues, emailInput: event.target.value })
                }
              />
            </fieldset>
            <fieldset>
              <label htmlFor="addressInput">Address</label>
              <input
                type="text"
                id="addressInput"
                name="addressInput"
                className="form-control"
                value={inputValues.addressInput}
                onChange={(event) =>
                  setInputValues({
                    ...inputValues,
                    addressInput: event.target.value,
                  })
                }
              />
            </fieldset>
            <div className="mt-3">

              <button type="submit" className="btn btn-success ms-auto">
                Save
              </button>
              <Link to="/">
                <button className="btn btn-danger ms-2">Back To Home</button>
              </Link>
            </div>
          </form>
        </div>
        <div className="col-3"></div>
      </div>
    </>
  );
};

export default AddContact;
