import { useEffect, useState } from "react";
import { deleteUser, getUserDetails } from "../../services/auth";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { data, useNavigate } from "react-router-dom";
import CreateUserModal from "../../components/CreateUserModal";
import { newUser } from "../../components/CreateUserModal";
import EditUserModal from "../../components/editUserModal";
import SearchBar from "../../components/searchBar";
import { adminLogout } from "../../services/auth";
import { logout } from "../../redux/features/authSlice";


export interface User {
    _id: string;
    userName: string;
    email: string;
    password: string;
    profileImage?: string;
    isAdmin: boolean;
}
const UserManagementTable = () => {
    const [userData,setUserData] = useState<User[]>([]);
    const [filterdUsers, setFilterdUsers] = useState<User[]>([])
    const [laoding, setLoading] = useState<boolean>(true)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [editMoadlOpen, setEditModalOpen] = useState<boolean>(false)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
    const dispatch=useDispatch<AppDispatch>()
    const navigate = useNavigate()
    useEffect(() => {


        const fetchUsers = async () => {
            try {

                const fromdata = await getUserDetails()
               
                setFilterdUsers(fromdata)
                setUserData(fromdata)
             
            } catch (error) {
                toast.error(`Error laoding users${error}`)
            } finally {
                setLoading(false)
            }
        }
        fetchUsers()
    }, [])


    const isAdmin = useSelector((state: RootState) => state.auth.isAdmin)


    useEffect(() => {
        if (isAdmin) {
            navigate("/adminDashboard")
        } else {
            navigate("/login")
        }

    }, [isAdmin, navigate])





    const updateUserDataInStete = (updateUser: User) => {
        setFilterdUsers((prevUsers) =>
            prevUsers.map((user) => (user._id === updateUser._id ? updateUser : user))
        );
    }

    const addUserToState = (newuser: newUser) => {
        if (!newuser.id) {
            newuser.id = crypto.randomUUID()
        }
        setFilterdUsers((prev) => [...prev, newuser as User]);
    }


    const handeleDeleteUser = async (id: string) => {
        try {
            await deleteUser(id)
            setFilterdUsers(filterdUsers.filter((user) => {
                return user._id != id
            }))
            toast.success("User deleted")
        } catch (error) {
            console.log("error in deleting user", error)
            toast.error("Failed to delete user ")
        }
    }


    const handelSerach = (query: string) => {
        if (query.trim() === "") {
            setFilterdUsers(userData); 
        } else {
            const filtered = userData.filter((user) => 
                user.userName.toLowerCase().includes(query.toLowerCase()) ||
                user.email.toLowerCase().includes(query.toLowerCase())
            );
            setFilterdUsers(filtered);
        }
    };
    
    const handleLogout = () => {
        dispatch(logout());
        adminLogout();
        navigate('/login');
    }

    if (laoding) {
        return <div className="text-center mt-10 text-lg">Loading...</div>;
    }

    if (!userData) {
        return <div className="text-center mt-10 text-red-500">Failed to load user data</div>;
    }
    return (

        <div className="w-screen mt-20">
            <div className="container mx-auto p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-3xl font-semibold">User Management</h2>
                    <SearchBar onSearch={handelSerach} />
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="bg-black text-white px-4 py-2 rounded-lg"
                    >
                        Add User
                    </button>
                    <button
                    onClick={handleLogout}
                    className="px-10 btn btn-error"
                >
                    Logout
                </button>
                </div>

                {/* -----create user modal--- */}
                <CreateUserModal isOpen={isCreateModalOpen} closeModal={() => setIsCreateModalOpen(false)} addUserToState={addUserToState} />


                {/* -----create user modal ends--- */}

                <div className="overflow-x-auto bg-white rounded-lg shadow-2xs border ">
                    <table className="min-w-full table-auto">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                                    Photo
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterdUsers?.filter((user) => !user.isAdmin)?.map((user, index) => (
                                <tr key={index + 1} className="border-b">
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        <img
                                            src={user.profileImage}
                                            alt={user.userName}
                                            className="w-12 h-12 rounded-full"
                                        />
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                        {user.userName}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{user.email}</td>

                                    <td className="px-6 py-4 text-sm ">

                                        <button
                                            onClick={() => {
                                                setSelectedUser(user)
                                                setEditModalOpen(true)
                                            }}
                                            className="bg-black text-white px-4 py-2 rounded-lg mr-2 "
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handeleDeleteUser(user._id)}
                                            className="bg-black text-white px-4 py-2 rounded-lg"
                                        >
                                            Delete
                                        </button>


                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* edit modal */}
            <EditUserModal user={selectedUser} isOpen={editMoadlOpen} closeModal={() => setEditModalOpen(false)} updateUserInState={updateUserDataInStete} userdata={userData} />

            {/* edit modal ends */}
        </div>

    );
};

export default UserManagementTable;
