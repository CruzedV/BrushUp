import "../../globals.scss";
import Link from "next/link";

const Header = () => (
  <div className="header">
    <h2>
      <Link href="/">BrushUp</Link>
    </h2>
  </div>
);

export default Header;