import Avatar from "react-avatar";
import { useUserInfo } from "../hooks/useUserInfo";
import toast from "react-hot-toast";
import { AiOutlineLogout } from "react-icons/ai";

const Header = () => {
  const { data, isLoading, isError } = useUserInfo();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    toast.error("Error fetching user info");
    return <div>Error fetching user info</div>;
  }

  const { fullName } = data;
  return (
    <div className="flex items-center justify-end gap-4">
      <p className="text-l text-amber-100">{`Hello ${fullName}`}</p>
      <Avatar size="30" round name={fullName} color="#c46f2d" />
      <AiOutlineLogout size={30} className="text-amber-500" />
    </div>
  );
};

export default Header;
