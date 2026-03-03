import React from "react";
import useActions from "../hooks/useActions";

export const ContactCard = ({ name, phone, email, address, id }) => {
  const { deleteContact } = useActions();

  return (
    <div className="card d-flex my-3 border border-dark p-3">
      <div>
        <h2>{name}</h2>
        <h2>{phone}</h2>
        <h4>{address}</h4>
        <h4>{email}</h4>
      </div>
      <div>
        <button className="btn btn-danger mt-2" onClick={() => deleteContact(id)}>
          Delete
        </button>
      </div>
    </div>
  );
};
