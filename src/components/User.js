import { useUserContext } from "./UserContext";

const User = () => {
  const { user } = useUserContext();
  console.log(user);
  return (
    <div className="mt-32 px-36">
      {/* Use the user data here */}
      {user && (
        <>
          <h1 className="text-[24px] font-mont text-white font-semibold">
            Hi! <span className="text-[#00FFF2]">{user.displayName}</span>,
          </h1>
        </>
      )}
      <h2 className="text-white font-semibold text-[40px] mt-4 font-mont">
        Dashboard
      </h2>
    </div>
  );
};

export default User;
