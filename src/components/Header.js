import Title from "./Title";
import { Link } from "react-router-dom";
import useOnline from './utils/useOnline';
import { useContext } from "react";
import UserContext from "./context/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
    const isOnline = useOnline();

    const { user } = useContext(UserContext);

    const cartItems = useSelector((store) => store.cart.items);
    console.log(cartItems)

    return (
        <div className='flex justify-between bg-yellow-50 shadow-lg px-16'>
            <Title />
            <h1 className="text-3xl font-bold pt-6 text-pink-700">Eats حبيبي</h1>
            <div>
                <ul className="flex py-6">
                    <li className="px-2">
                        <Link to='/'>
                            Home
                        </Link>
                    </li>
                    <li className="px-2">
                        <Link to='/about'>
                            About
                        </Link>
                    </li>
                    <li className="px-2">
                        <Link to='/profile'>
                            Profile
                        </Link>
                    </li>
                    <li className="px-2 text-red-800 font-bold">
                        <Link to='/cart'>
                        🛒 {cartItems.length}
                        </Link>
                    </li>
                    <li className="px-2">
                        {isOnline ? <span className="text-green-700">{user.name} 🟢</span> : <span className="text-red-700">{user.name} 🔴</span>}
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Header;