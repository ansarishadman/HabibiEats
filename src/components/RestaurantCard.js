import { IMG_CDN } from "./utils/constants";

const RestaurantCard = ({ name, avgRating, cloudinaryImageId, cuisines }) => {

    return (
        <div className='w-56 h-80 p-2 m-2 shadow-lg bg-pink-50 hover:scale-125'>
            <img className="h-40 w-56" src={IMG_CDN + cloudinaryImageId} />
            <h2 className="font-bold text-lg">{name}</h2>
            <h3 className="text-sm">{cuisines.join(', ')}</h3>
            <div className="flex items-center">{+avgRating >= 4 ? 
            <span className="text-2xl text-green-700">★</span> : 
            <span className="text-2xl text-red-700">★</span>} {avgRating ?? '-'} </div>
        </div>
    )
}

export default RestaurantCard;