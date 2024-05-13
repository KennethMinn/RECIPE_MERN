import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const navItems = ["About", "Contact", "Login", "create", "register", "login"];
  return (
    <div className="flex items-center justify-around mx-10 ">
      <h1
        className="text-3xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        Recipe
      </h1>
      <div className="flex items-center gap-x-5">
        {navItems.map((item) => (
          <h1
            className="cursor-pointer "
            key={item}
            onClick={() => navigate(`/${item}`)}
          >
            {item}
          </h1>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
