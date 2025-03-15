import React, { useState, useEffect } from "react";
import { updateUser } from "../services/auth";
import { User } from "../pages/admin/AdminDashbaord";
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export interface EditUserModalProps {
  isOpen: boolean;
  closeModal: () => void;
  user: User | null;
  updateUserInState: (updatedUser: User) => void;
  userdata: User[]
}

const EditUserModal: React.FC<EditUserModalProps> = ({ isOpen, closeModal, user, updateUserInState, userdata }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setUserName(user.userName);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();
    setLoading(true);
    setError("");

    if (!user) return;
    const updatedUser = { ...user, userName, email };
    try {

      for (let data of userdata) {
        if (data.email === email) {
          setError("email alredy used")
   return
        }
      }


      const result: User = await updateUser(user._id, updatedUser);
      updateUserInState(result);
      closeModal();
    } catch (error) {
      console.error("Failed to update user", error);
      setError("Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;




  if (loading) {
    return <div className="text-center mt-10 text-lg">Loading...</div>;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-blue-50 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-2xl p-6 w-96">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Edit User</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500">{error}</p>}
          <div className="mb-4">
            <label className="block text-sm text-gray-600">Name</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              {loading ? <AiOutlineLoading3Quarters className="animate-spin" /> : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
