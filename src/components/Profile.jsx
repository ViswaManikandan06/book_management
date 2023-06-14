import React from "react";

const ProfilePicture = ({ name }) => {
  const getInitials = (name) => {
    const names = name.split(" ");
    const initials = names.map((name) => name.charAt(0));
    return initials.join("");
  };

  return (
    <div className="h-[100px] w-[100px] flex justify-center items-center">
      <div className="h-[50px] w-[50px] rounded-full bg-blue-500 flex justify-center items-center text-white text-lg font-bold">
        {getInitials(name)}
      </div>
    </div>
  );
};

export default ProfilePicture;
