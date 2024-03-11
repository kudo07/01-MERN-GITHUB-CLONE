import React from 'react';
import { useAuthContext } from '../context/AuthContext';
import { FaHeart } from 'react-icons/fa6';
import { toast } from 'react-hot-toast';
const LikeProfile = ({ userProfile }) => {
  const { authUser } = useAuthContext();
  const isOwnProfile = authUser?.username === userProfile.login;
  const handleLikeProfile = async () => {
    try {
      const res = await fetch(`/api/users/like/${userProfile.login}`, {
        method: 'POST',
        credentials: 'include',
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  //authUser coming from the AuthContext which get the api/github which coming from the database

  if (!authUser || isOwnProfile) return null;
  return (
    <button
      className="p-2  text-xs w-full font-medium rounded-md bg-glass border border-blue-400 flext items-center gap-2"
      onClick={handleLikeProfile}
    >
      <span className="flex justify-evenly">
        <FaHeart size={16} />
        Like Profile
      </span>
    </button>
  );
};

export default LikeProfile;
