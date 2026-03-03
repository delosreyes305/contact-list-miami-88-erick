import React, { useState } from "react";
import useActions from "../hooks/useActions";
import { Link, useNavigate } from "react-router-dom";

export const AddContact = () => {
  const [inputValues, setInputValues] = useState({
    nameInput: "",
    emailInput: "",
    addressInput: "",
    phoneInput: "",
  });

  const { getContacts } = useActions();
  const navigate = useNavigate();

  const postContact = async (event) => {
    console.log("Sending data:", inputValues);
    event.preventDefault();
    const response = await fetch(
      "https://playground.4geeks.com/contact/agendas/Erick/contacts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: inputValues.nameInput,
          phone: inputValues.phoneInput,
          address: inputValues.addressInput,
          email: inputValues.emailInput,
        }),
      },
      
    );
console.log("Response status:", response.status);
    if (!response.ok) {
      console.log("error: ", response.status, response.statusText);
      getContacts();
      return;
    }
    const data = await response.json();

    await getContacts();
    navigate("/");
    return data;
  };

  return (
    <>
    <div className="row mt-4">
      <div className="col-3"></div>
    <div className="col-6">
      <h1>Add Contact</h1>
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
          <Link to="/">
            <button className="btn btn-danger ms-auto">Back To Home</button>
          </Link>
          <button type="submit" className="btn btn-success ms-2">
            Add Contact
          </button>
        </div>
      </form>
      </div>
      <div className="col-3"></div>
      </div>
    </>
  );
};

export default AddContact;
