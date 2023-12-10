export function filterRestaurants(restaurants, searchText) {
    return restaurants.filter(restaurant => restaurant.info?.name?.toLowerCase().includes(searchText.toLowerCase()));
}