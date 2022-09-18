import React from "react";
import "./contactList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMobileAlt,
  faEnvelopeOpen,
} from "@fortawesome/fontawesome-free-solid";

export const ContactListCard = ({ data, editContact, deleteContact }) => {
  return (
    <div className="contact-card">
      <section className="img-section">
        <img
          width={"50px"}
          height="80px"
          style={{
            borderRadius: "50%",
            width: "100px",
            border: "2px solid gray",
            marginBottom: "5px",
          }}
          src={
            data.profile
              ? data.profile
              : "https://s3-us-west-2.amazonaws.com/s.cdpn.io/764024/profile/profile-512.jpg"
          }
          alt="profile"
        />
        <p className="no-padding no-margin">
          {" "}
          <b>{data?.name}</b>
        </p>
      </section>
      <section style={{ marginTop: "10px" }}>
        <p style={{ margin: "5px 0px" }}>
          <FontAwesomeIcon icon={faMobileAlt} />
          &nbsp;&nbsp; +91 {data?.phoneNumber}
        </p>
        <p style={{ margin: "5px 0px" }}>
          <FontAwesomeIcon icon={faEnvelopeOpen} />
          &nbsp;&nbsp; {data?.emailId}
        </p>
      </section>
      <div className="btn-section">
        <button
          className="edit-btn cursor-pointer"
          onClick={() => editContact(data)}
        >
          Edit
        </button>
        <button
          className="delete-btn cursor-pointer"
          onClick={() => deleteContact(data._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
