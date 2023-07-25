import Avatar from "react-avatar";
import { useUserInfo } from "../hooks/useUserInfo";
import toast from "react-hot-toast";
import { AiOutlineLogout } from "react-icons/ai";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { routes } from "../helpers/routes";

const Header = () => {
  const { data, isLoading, isError } = useUserInfo();
  const isLogOut = useAuth();
  const navigate = useNavigate();
  const { home } = routes;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    toast.error("Error fetching user info");
    return <div>Error fetching user info</div>;
  }

  const { fullName } = data;

  const logout = () => {
    // @ts-ignore
    isLogOut.onLogout();
    navigate(home);
  };
  return (
    <div className="flex items-center justify-end gap-4">
      <p className="text-l text-amber-100">{`Hello ${fullName}`}</p>
      <Avatar size="30" round name={fullName} color="#c46f2d" />
      <AiOutlineLogout size={30} className="text-amber-500" onClick={logout} />
    </div>
  );
};

export default Header;
