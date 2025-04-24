import { Link } from "react-router-dom";
import Container from "../../Container";
import { GoCommandPalette } from "react-icons/go";

const Navbar = () => {
  return (
    <nav>
      <Container className="flex justify-between items-center border-b">
        <Link to="/" className="text-2xl font-semibold">
          Todo
        </Link>
        <div>
          <Link to="/create" className="flex items-center justify-center">
            <GoCommandPalette className="text-2xl" />
            <p>Create New</p>
          </Link>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
