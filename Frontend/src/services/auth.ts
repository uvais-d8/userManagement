import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { newUser } from "../components/CreateUserModal";

const User_API_URI = "http://localhost:5001/api/users";
const Admin_API_URI = "http://localhost:5001/api/admin";

export const login = async (data: {
  email: string;
  password: string;
  isAdmin: boolean;
}) => {
  try {
    console.log("the data from ", data);
    const response = await axios.post(`${User_API_URI}/login`, data);
    const token = response.data.token;
    if (!response.data.isAdmin) {
      localStorage.setItem("UserToken", token);
    } else {
      localStorage.setItem("AdminToken", token);
    }

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error?.response?.status) {
        toast(error.response.data.message || "Bad request in login");
      }
    }
  }
};

export const signup = async (data: {
  userName: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${User_API_URI}/signup`, data);
    const token = response.data.token;

    if (token) {
      localStorage.setItem("UserToken", token);
    }

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error?.response?.status) {
        console.error("Signup Error:", error?.response?.data);
        toast(
          error.response.data.message || "Bad Request. Please check your input."
        );
      }
    }
    return;
  }
};

export const fetchUser = async () => {
  try {
    const token = localStorage.getItem("UserToken");

    if (!token) throw new Error("No token found");
    const response = await axios.get(`${User_API_URI}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast(error.response?.data?.message);
    }
    throw error;
  }
};

export const updateImage = async (formdata: FormData) => {
  try {
    const token = localStorage.getItem("UserToken");

    const response = await axios.patch(
      `${User_API_URI}/updateProfile`,
      formdata,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error?.response?.status) {
        console.error("Signup Error:", error?.response?.data);
        toast(
          error.response.data.message || "Bad Request. Please check your input."
        );
      }
    }
  }
};

export const userLogout = async () => {
  localStorage.removeItem("UserToken");
};

export const adminLogout = () => {
  localStorage.removeItem("AdminTocken");
};

export const getUserDetails = async () => {
  try {
    const token = localStorage.getItem("AdminToken");
    const response = await axios.get(`${Admin_API_URI}/users`, {
      headers: {
        Authorization: `Bearer${token}`,
      },
    });
    console.log(
      "the data from the response fetching the admin side",
      response.data
    );
    return response.data;
  } catch (error) {
    console.log("The error from fetchin users for  the admin side", error);
  }
};

export const createUser = async (user: newUser) => {
  try {
    const token = localStorage.getItem("AdminToken");
    const response = await axios.post(`${Admin_API_URI}/createUser`, user, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const updateUser = async (
  id: string,
  userData: { userName: string; email: string }
) => {
  try {
    const token = localStorage.getItem("AdminToken");
    const response = await axios.patch(
      `${Admin_API_URI}/updateUser/${id}`,
      userData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("error updaing user", error);
    throw error;
  }
};

export const deleteUser = async (userid: string) => {
  try {
    const token = localStorage.getItem("AdminToken");
    const response = await axios.delete(
      `${Admin_API_URI}/deleteUser/${userid}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("error in deleting user", error);
    throw error;
  }
};
