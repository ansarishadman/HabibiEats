import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import restaurantMockData from "./utils/restaurantMockData";
import { Link } from "react-router-dom";
import { filterRestaurants } from "./utils/helper";

const Body = () => {
    const initialRestaurantList = restaurantMockData.cards[5].card.card.gridElements.infoWithStyle.restaurants;
    const [searchText, setSearchText] = useState('');
    const [allRestaurants, setAllRestaurants] = useState(initialRestaurantList);
    const [filteredRestaurants, setFilteredRestaurants] = useState(initialRestaurantList);

    useEffect(() => {
        getRestaurants();
    }, [])

    async function getRestaurants() {
        const data = await fetch("https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=22.80605343524565&lng=86.17528159171343&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
        const json = await data.json();
        const restaurantList = collectAllRestaurantList(json?.data?.cards);

        if (restaurantList.length > 0) {
            setAllRestaurants(restaurantList);
            setFilteredRestaurants(restaurantList);
        }
    }

    function collectAllRestaurantList(restaurantJson) {
        let restaurantList = [];
        restaurantJson.forEach(data => {
            if (data.card?.card?.gridElements) {
                restaurantList = data.card.card.gridElements?.infoWithStyle?.restaurants;
            }
        });
        return restaurantList;
    }

    function changeText(searchTxt) {
        if (searchTxt === '') {
            setFilteredRestaurants(allRestaurants);
            return;
        }
        setSearchText(searchTxt);
        const filteredRestaurantList = filterRestaurants(allRestaurants, searchText);
        setFilteredRestaurants(filteredRestaurantList)
    }

    if (!allRestaurants) return null;

    return allRestaurants?.length === 0 ? (<Shimmer />) : (
        <div className="bg-purple-200">
            <div className='p-5 px-8 bg-pink-50 flex justify-end'>
                <input className="h-10 w-72 pl-4 focus: bg-white-400" type='text' placeholder="Search" onChange={e => changeText(e.target.value)} />
            </div>
            <div className="flex flex-wrap pb-8 px-6">
                {filteredRestaurants.map(restaurant => {
                    const restaurantId = restaurant?.info?.id;
                    return (
                            <Link to={"/restaurant/" + restaurantId} key={restaurantId}>
                                <RestaurantCard {...restaurant.info} />
                            </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default Body;