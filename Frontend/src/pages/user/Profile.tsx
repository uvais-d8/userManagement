

import React, { useEffect, useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { fetchUser, updateImage, userLogout } from '../../services/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { logout } from '../../redux/features/authSlice'
import { useDispatch } from 'react-redux'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Dashboard', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Support', href: '#' },

]
export interface User {
  data: {
    userName: string;
    email: string;
    profileImage?: string;
  }

}


export default function Profile() {
  const [user, setUser] = useState<User | null>(null)
  const [newProfileImage, setNewProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profileLoading, setProfileLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handelLogout = async () => {
    dispatch(logout())
    userLogout()
    navigate("/login")

  }

  useEffect(() => {

    const loadUser = async () => {
      try {

        const userData = await fetchUser()

        setUser(userData)
      } catch (error) {
        toast("Please login")
        navigate("/login")
      } finally {
        setLoading(false)
      }
    }
    loadUser()
  }, [navigate]);

  const handleImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      setNewProfileImage(file)
      setPreviewImage(URL.createObjectURL(file))
    }
  }

  const handleSaveChanges = async () => {
    if (!newProfileImage) {
      toast.info("Please select a  image to upload")
      return
    }
    const formdata = new FormData();
    formdata.append("profileImage", newProfileImage);
    console.log('from data for checking :', [...formdata.entries()]);

    setProfileLoading(true)
    try {

      await updateImage(formdata)
      toast.success("Profile image updated successfully!");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Error updating profile image");
    } finally {
      setProfileLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center mt-10 text-lg">Loading...</div>;
  }
  if (!user) {
    return <div className="text-center mt-10 text-red-500">Failed to load user data</div>;
  }

  return (
    <div className="bg-white ">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">

          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm/6 font-semibold text-gray-900">
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="#" className="text-sm/6 font-semibold text-gray-900">

            </a>
          </div>
        </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >

                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>



        <div className='flex flex-auto  justify-center items-center  relative isolate px-6 pt-14 lg:px-64'>
          <div className="bg-white-800 border p-8 rounded-lg shadow-lg text-center w-96 ">
            <label htmlFor="file-upload" className='cursor-pointer'>
              <img
                className="w-32 h-32 mb-4 rounded-full mx-auto"
                src={
                  previewImage ||
                  user.data.profileImage ||
                  "https://cdn-icons-png.flaticon.com/512/6858/6858504.png"
                }
                alt="Profile"
              />
              <input id='file-upload' type="file" className='hidden' accept='image*/' onChange={handleImage} />

            </label>



            <h5 className="text-2xl font-medium text-black">{user.data.userName}</h5>
            <span className="text-black">{user.data.email}</span>
            <div className="mt-6 flex flex-col gap-4">

              <button disabled={profileLoading}
                className={`px-4 py-2 bg-indigo-600 text-white font-semibold  rounded-md ${profileLoading ? 'bg-indigo-600 cursor-not-allowed' : 'bg-indigo-6 hover:bg-indigo-500'} text-white`}
                onClick={handleSaveChanges}
              >
                {profileLoading ? <AiOutlineLoading3Quarters className=" animate-spin flex justify-center  " /> : "Save Changes"}
              </button>


              <a href="#" className="text-sm/6 font-semibold text-gray-900" onClick={handelLogout}>
                Logout →
              </a>
            </div>
          </div>

        </div>




        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>
    </div>
  )
}
