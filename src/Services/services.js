import axios from "axios";

// export const API = "http://localhost:4000";

export cont API ="https://contact-app-api-mern.herokuapp.com"

export const createContact = (data) => {
    return axios.post(`${API}/api/v1/create-contact`, data);
}

export const getAllContact = (data) => {
    return axios.get(`${API}/api/v1/get-all-contacts`, data);
}

export const deleteContactList = (id) => {
    return axios.delete(`${API}/api/v1/delete-contact/${id}`);
}

export const updateContactList = (id, data) => {
    return axios.patch(`${API}/api/v1/edit-contact/${id}`, data);
}

export const uploadImage = (id, data) => {
    return axios.post(`${API}/api/v1/upload-image/${id}`, data);
}

