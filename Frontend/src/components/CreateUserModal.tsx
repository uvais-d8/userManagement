import { useState } from "react";
import { createUser } from "../services/auth";
import { User } from "../pages/admin/AdminDashbaord.js";
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
export interface newUser {
  id?: string;
  userName: string;
  email: string;
  password: string;
}

export interface CreateUserModalProps {
  isOpen: boolean;
  closeModal: () => void;
  addUserToState: (newuser: newUser) => void;
}

const CreateUserModal = ({ isOpen, closeModal, addUserToState }: any) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newuser = { userName, email, password };
    console.log(newuser)
    setLoading(true);
    try {
      const createdUser: User = await createUser(newuser);
      addUserToState(createdUser);
      closeModal();
    } catch (error) {
      console.log("Filed to create new user", error);
      setError("Failed to create  user");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-blue-50 bg-opacity-50">

      <div className="bg-white rounded-lg shadow-2xl p-6 w-96">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Add New User
        </h2>

<form action="" onSubmit={handleSubmit}>
{error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <label className="block text-sm text-gray-600">Name</label>
          <input
            type="text"
            name="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm text-gray-600">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm text-gray-600">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={closeModal}
            className="bg-gray-400 text-white px-4 py-2 rounded-lg mr-2"
          >
            Cancel
          </button>
          <button
    type="submit"
            className="bg-black text-white px-4 py-2 rounded-lg"
          >
              {loading ? <AiOutlineLoading3Quarters className="animate-spin" /> : 'Create User'}
          </button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;
