import React from "react";
import addImg from "../../Asserts/Images/addImg.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faTrash } from "@fortawesome/fontawesome-free-solid";
import { InputComponent } from "./../Common/Input";

export const CreateContact = ({
  inputValues,
  handlePhotoChange,
  setInputValues,
  handlePhotoUpload,
  handleCreateContact,
  handleInputChange,
  checkError,
  message,
  setMessage,
  emailValidation,
  phoneValidation,
  nameValidation,
}) => {
  console.log("inputValues.Id", inputValues.Id);

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Create Contact</h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <section className="inputCard">
          <div style={{ textAlign: "center" }}>
            <div
              className={`input-file-div ${
                checkError === true && inputValues.Photo == ""
                  ? "errorPhotoValidation"
                  : ""
              }`}
            >
              {inputValues?.Photo ? (
                <img src={inputValues?.Photo} width="100px" height={"100px"} />
              ) : (
                <button>
                  <label for="files">
                    <img
                      src={addImg}
                      width="100%"
                      height={"100%"}
                      for="files"
                    />
                  </label>
                  <input
                    hidden
                    id="files"
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handlePhotoChange}
                  />
                </button>
              )}
            </div>
            {inputValues.Photo ? (
              <>
                {inputValues?.Photo && (
                  <button
                    onClick={() =>
                      setInputValues((preDatas) => ({
                        ...preDatas,
                        ["Photo"]: "",
                        ["isPhotoUploaded"]: false,
                      }))
                    }
                    className="uploadImg-btn color-white bg-color-red border-none cursor-pointer"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                    &nbsp; Image{" "}
                  </button>
                )}
              </>
            ) : null}
            &nbsp;
            {inputValues.isPhotoUploaded ? null : (
              <>
                {inputValues?.Photo && (
                  <button
                    onClick={handlePhotoUpload}
                    className="uploadImg-btn color-white bg-color-green border-none cursor-pointer"
                  >
                    <FontAwesomeIcon icon={faUpload} /> &nbsp; Upload
                  </button>
                )}
              </>
            )}
          </div>

          <form onSubmit={(e) => handleCreateContact(e)}>
            <InputComponent
              name={"Name"}
              label="Name"
              type="text"
              //   required={true}
              value={inputValues?.Name}
              onChange={(e) => handleInputChange(e)}
              checkError={checkError}
              message={message}
              validationMSG={
                inputValues.Name.match(nameValidation) === null
                  ? "Name should be valid"
                  : ""
              }
            />
            <InputComponent
              name={"PhoneNumber"}
              label="Phone Number"
              type="number"
              onwheel="none"
              maxLength="10"
              //   required={true}
              value={inputValues.PhoneNumber}
              onChange={(e) => handleInputChange(e)}
              checkError={checkError}
              message={message}
              // errorMSG="Phone Number is must"
              validationMSG={
                inputValues.PhoneNumber.match(phoneValidation) === null
                  ? "Phone Number should be 10 digit"
                  : ""
              }
            />
            <InputComponent
              name={"EmailId"}
              label="Email Id"
              type="email"
              //   required={true}
              value={inputValues.EmailId}
              onChange={(e) => handleInputChange(e)}
              checkError={checkError}
              message={message}
              // errorMSG="Email Id is must"
              validationMSG={
                inputValues.EmailId.match(emailValidation) === null
                  ? "Email Id must be valid"
                  : ""
              }
            />
            <dvi className="createContact-btn">
              <button class="button-85" type="submit" role="button">
                {inputValues.Id ? "Update Contact" : "Create Contact"}
              </button>
            </dvi>
          </form>
        </section>
      </div>
    </div>
  );
};
