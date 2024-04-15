import Link from "next/link";
import { useBetaRecords } from "../page";

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>Vocab Builder</h1>
            <div className="links">
                <Link href="/">Home</Link>
                <Link href="/create">New Vocab</Link>
            </div>
        </nav>
    );
};
export default Navbar;
