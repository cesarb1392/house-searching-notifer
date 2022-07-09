import {FilterOutHouse, House} from "./types";
import {addHouse, getHouse} from "./storage";

const filterOutHouse: FilterOutHouse = (house) => {
    const newHouse: House[] = []
    for (const item of house) {
        if (!getHouse(item.address)) {
            addHouse(item.address)
            newHouse.push(item)
        }
    }
    return newHouse
}

export default filterOutHouse
