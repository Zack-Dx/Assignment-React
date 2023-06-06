import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header>
        <nav className="py-8 px-12 font-semibold flex md:flex-row flex-col items-center justify-between bg-black text-white">
          <div className="logo text-pink-500 text-4xl">
            <Link to={"/"}>The Shows</Link>
          </div>
          <ul className="flex gap-6 mt-4 md:mt-0">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/"}>About</Link>
            </li>
            <li>
              <Link to={"/"}>Services</Link>
            </li>
            <li>
              <Link to={"/"}>Contact</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
