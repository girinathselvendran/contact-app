import React, { useEffect, useRef, useState } from "react";
import {
  createContact,
  getAllContact,
  deleteContactList,
  updateContactList,
  uploadImage,
} from "../Services/servises";
import "./mainPage.css";
import { toast } from "react-toastify";
import axios from "axios";
import { CreateContact } from "../Components/CreateContact/createContact";
import { ContactListCard } from "./../Components/ContactListCard/contactListCard";
import { ToastMessage } from "../Components/Common/ToastMessage";

const emailValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,8}$/;

const phoneValidation = /^[0-9]{10}$/;

const nameValidation = "[a-zA-Z][a-zA-Z ]*";

export const MainPage = () => {
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
    let result = await getAllContact();
    setContactsList(result.data.data);
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    let value = e.target.value;
    let name = e.target.name;
    if (name === "PhoneNumber") {
      if (value.length <= 10) {
        setInputValues({ ...inputValues, [name]: value });
      }
    } else {
      setInputValues({ ...inputValues, [name]: value });
    }
  };

  let mandateFields =
    inputValues.EmailId.match(emailValidation) !== null &&
    inputValues.Name.match(nameValidation) !== null &&
    inputValues.PhoneNumber.match(phoneValidation) !== null &&
    inputValues.Photo !== "";

  const handleCreateContact = async (e) => {
    setCheckError(true);
    e.preventDefault();

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
        .then((result) => {
          setContactsList(result.data.data);
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
        .then((result) => {
          setContactsList(result.data.data);
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
  console.log("inputValues", inputValues);

  const deleteContact = async (id) => {
    await deleteContactList(id)
      .then((result) => {
        setContactsList(result.data.data);
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
      .then((res) => {
        // console.log("resdata", res, res.data);
        setInputValues((preValues) => ({
          ...preValues,
          ["Photo"]: res.data.secure_url,
          ["isPhotoUploaded"]: true,
          ["PhotoPublic_id"]: res.data.public_id,
        }));
        toast.success("Photo Upload Successful");
      });
  };

  function deleteImage(publicId, resourceType, callback) {
    console.log(resourceType); //image,video,raw

    // cloudinary.api.delete_resources(
    //   publicId,
    //   function (result) {
    //     console.log(result);
    //     if (result.hasOwnProperty("error")) {
    //       callback(result);
    //       return;
    //     } else {
    //       callback(result);
    //     }
    //   },
    //   { all: true, resource_type: resourceType }
    // );
  }

  return (
    <div className="card-main ">
      {/* <button onClick={deleteImage}>delete</button> */}

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

      {/* <ToastMessage showToast={true} /> */}
    </div>
  );
};
