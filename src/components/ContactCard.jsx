import React from "react";
import { useNavigate } from "react-router-dom";
import useActions from "../hooks/useActions";

const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg"

export const ContactCard = ({ name, phone, email, address, id }) => {
  const { deleteContact } = useActions();
  const navigate = useNavigate();

  return (
    <div className="card my-3 border border-dark p-3">
      <div className="row d-flex align-items-center justify-content-between">
        <div className="col-4">
          <img
            src={defaultImage}
            alt="Contact"
            className="rounded-circle me-4 ps-4"
            style={{ widht: "100px", height: "100px", objectFit: "cover" }}
          ></img>
        </div>
        <div className="col-8">
          <h3>{name}</h3>
          <h4> <i className="fa-solid fa-phone me-2"></i> {phone}</h4>
          <h4> <i className="fa-solid fa-location-dot me-2"></i> {address}</h4>
          <h4> <i className="fa-solid fa-envelope me-2"></i> {email}</h4>
        </div>
        <div className="row">
        <div className="col-12 text-end">
          <button
            className="btn btn-success mt-2"
            onClick={() => navigate(`/add-contact?id=${id}`)}
          >
            <i className="fa-solid fa-pencil"></i>
          </button>
          <button className="btn btn-danger mt-2 ms-2" onClick={() => deleteContact(id)}>
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};
