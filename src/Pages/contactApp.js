import React, { useEffect, useState } from "react";
import {
  createContact,
  getAllContact,
  deleteContactList,
  updateContactList,
} from "../Services/services";
import "./contactApp.css";
import { toast } from "react-toastify";
import axios from "axios";
import { CreateContact } from "../Components/CreateContact/createContact";
import { ContactListCard } from "../Components/ContactListCard/contactListCard";

const emailValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,8}$/;

const phoneValidation = /^[0-9]{10}$/;

const nameValidation = "[a-zA-Z][a-zA-Z ]*";

export const ContactApp = () => {
  const [inputValues, setInputValues] = useState({
    Id: "",
    Name: "",
    PhoneNumber: "",
    EmailId: "",
    Photo: "",
    PhotoPublic_id: "",
    isPhotoUploaded: false,
  });
  const [contactsList, setContactsList] = useState([]);
  const [profileImage, setProfileImage] = useState();
  const [message, setMessage] = useState({
    error: "",
    message: "",
  });
  const [checkError, setCheckError] = useState(false);

  useEffect(() => {
    getAllContacts();
  }, []);

  const getAllContacts = async () => {
    let { data } = await getAllContact();
    setContactsList(data.data);
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    let { name, value } = e.target;

    if (name === "PhoneNumber") {
      if (value.length <= 10) {
        setInputValues((preVal) => ({ ...preVal, [name]: value }));
      }
    } else {
      setInputValues((preVal) => ({ ...preVal, [name]: value }));
    }
  };

  let mandateFields =
    inputValues.EmailId.match(emailValidation) !== null &&
    inputValues.Name.match(nameValidation) !== null &&
    inputValues.PhoneNumber.match(phoneValidation) !== null &&
    inputValues.Photo !== "";

  const handleCreateContact = async (e) => {
    e.preventDefault();
    setCheckError(true);

    if (!inputValues.isPhotoUploaded) {
      toast.error("Please Upload Profile Image.");
      return;
    }
    if (!mandateFields) {
      toast.error("Please Enter All Details.");
      return;
    }

    if (inputValues.Id) {
      updateContactList(inputValues.Id, inputValues)
        .then(({ data }) => {
          setContactsList(data.data);
          setInputValues({
            Id: "",
            Name: "",
            PhoneNumber: "",
            EmailId: "",
            Photo: "",
          });
          toast.success("Contact Update Successful");
        })
        .catch((error) => {
          toast.error("Contact Update Failed");
        })
        .finally(setCheckError(false));
    } else {
      createContact(inputValues)
        .then(({ data }) => {
          setContactsList(data.data);
          setInputValues({
            Id: "",
            Name: "",
            PhoneNumber: "",
            EmailId: "",
            Photo: "",
          });
          toast.success("Contact Create Successful");
        })
        .catch((error) => {
          toast.error("Contact Create Failed");
        })
        .finally(setCheckError(false));
    }
  };

  const deleteContact = async (id) => {
    await deleteContactList(id)
      .then(({ data }) => {
        setContactsList(data.data);
        toast.success("Contact Delete Successful");
      })
      .catch((err) => {
        toast.success("Contact Delete Failed");
      });
  };

  const editContact = async (data) => {
    setInputValues({
      Id: data._id,
      Name: data.name,
      PhoneNumber: data.phoneNumber,
      EmailId: data.emailId,
      Photo: data.profile ? data.profile : "",
      isPhotoUploaded: true,
      PhotoPublic_id: data.photoPublic_id,
    });
    window.scrollTo(0, 0);
  };

  const handlePhotoChange = async (event) => {
    let image = URL.createObjectURL(event.target.files[0]);
    setInputValues({ ...inputValues, ["Photo"]: image });
    setProfileImage(event.target.files[0]);
  };

  const handlePhotoUpload = async () => {
    let formData = new FormData();
    formData.append("file", profileImage);
    formData.append("upload_preset", "ml_default");
    axios
      .post("https://api.cloudinary.com/v1_1/dqaevwfop/image/upload", formData)
      .then(({ data }) => {
        setInputValues((preValues) => ({
          ...preValues,
          ["Photo"]: data.secure_url,
          ["isPhotoUploaded"]: true,
          ["PhotoPublic_id"]: data.public_id,
        }));
        toast.success("Photo Upload Successful");
      });
  };

  return (
    <div className="card-main ">
      <CreateContact
        inputValues={inputValues}
        handlePhotoChange={handlePhotoChange}
        setInputValues={setInputValues}
        handlePhotoUpload={handlePhotoUpload}
        handleCreateContact={handleCreateContact}
        handleInputChange={handleInputChange}
        emailValidation={emailValidation}
        phoneValidation={phoneValidation}
        nameValidation={nameValidation}
        checkError={checkError}
        message={message}
        setMessage={setMessage}
      />

      {contactsList?.length > 0 && (
        <section className="cards-map-main">
          <h2 style={{ margin: "50px 0px" }}>Contact Lists</h2>
          <div className="cards-map">
            {contactsList?.map((item, index) => {
              return (
                <div key={index}>
                  <ContactListCard
                    data={item}
                    deleteContact={deleteContact}
                    editContact={editContact}
                  />
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};
