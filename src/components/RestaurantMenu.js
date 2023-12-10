import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IMG_CDN_URL, MENU_ITEM_TYPE_KEY, RESTAURANT_TYPE_KEY, SWIGGY_MENU_API } from './utils/constantsAPI';
import Shimmer from './Shimmer';
import { addItem } from './slices/cartSlice';
import { useDispatch } from 'react-redux';

function setRestaurantMenuData(json) {
  // Set menu item data
  const menuItemsData =
    json?.data?.cards
      .find((x) => x.groupedCard)
      ?.groupedCard?.cardGroupMap?.REGULAR?.cards?.map(
        (x) => x.card?.card
      )
      ?.filter((x) => x["@type"] == MENU_ITEM_TYPE_KEY)
      ?.map((x) => x.itemCards)
      .flat()
      .map((x) => x.card?.info) || [];

  const uniqueMenuItems = [];
  menuItemsData.forEach((item) => {
    if (!uniqueMenuItems.find(menu => menu.id === item.id)) {
      uniqueMenuItems.push(item);
    }
  });
  return uniqueMenuItems;
}

const RestaurantMenu = () => {
  const { id } = useParams();
  const [restaurantData, setRestaurantData] = useState({});
  const [restaurantMenu, setRestaurantMenu] = useState([]);

  useEffect(() => {
    getRestaurantInfo();
  }, []);

  async function getRestaurantInfo() {
    try {
      const data = await fetch(SWIGGY_MENU_API + id);
      if (!data.ok) {
        const err = data.status;
        throw new Error(err);
      } else {
        const json = await data.json();

        // Set restaurant data
        const restaurantData =
          json?.data?.cards
            ?.map((x) => x.card)
            ?.find((x) => x && x.card["@type"] === RESTAURANT_TYPE_KEY)?.card
            ?.info || null;
        setRestaurantData(restaurantData);

        // set restaurant menu
        const menuItems = setRestaurantMenuData(json);
        setRestaurantMenu(menuItems);
      }
    } catch (err) {
      setRestaurantMenu([]);
      setRestaurantData({});
      console.log(err);
    }
  }

  const dispatch = useDispatch();

  const handleAddFoodItem = (item) => {
    dispatch(addItem(item));
  }

  return !restaurantMenu ? <Shimmer /> : (
    <>
      <div className='flex flex-col px-24 py-12'>
        <div className='bg-pink-600 flex justify-center items-center'>
          <img className='w-56 py-6' src={IMG_CDN_URL + restaurantData?.cloudinaryImageId} />
          <div className='flex flex-col align-center justify-center pl-6 text-white'>
            <h2 className='text-xl font-bold'>{restaurantData?.name}</h2>
            <h3 className='text-sm font-semibold'>{restaurantData?.area}</h3>
            <h3 className='text-sm font-semibold'>{restaurantData?.city}</h3>
            <div className="flex items-center text-lg font-semibold">
              {+restaurantData?.avgRating >= 4 ?
                <span className="text-lg text-green-700">★</span> :
                <span className="text-lg text-red-700">★</span>}
              {restaurantData?.avgRating ?? '-'}
            </div>
          </div>
        </div>
        <div className='flex flex-col justify-center items-center py-6'>
          <h1 className='text-3xl font-bold underline text-red-600'>Menu</h1>
          <ul className='py-6'>
            {restaurantMenu.map(item => {
              return (
                <div key={item?.id} className='flex justify-between border border-b-pink-700 px-12 py-4 mt-2'>
                  <div className='flex flex-col'>
                    <div className='text-lg font-bold'>{item?.name}</div>
                    <div className='text-sm font-semibold'>Rs.{item?.price ? item?.price / 100 : 0}</div>
                  </div>
                  <button className='p-1 bg-green-100 text-sm px-4' onClick={() => handleAddFoodItem(item)}>Add Item</button>
                  {/* <button className='p-1 bg-red-100 text-sm px-4'>Remove Item</button> */}
                </div>
              )
            })}
          </ul>
        </div>
      </div>
    </>
  )
}

export default RestaurantMenu;