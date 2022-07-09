import NodeCache from 'node-cache';
import {AddHouse, GetOrDeleteHouse} from "./types";

const storage = new NodeCache({stdTTL: 0, forceString: true});

const addHouse: AddHouse = (address) => {
    return storage.set(address, address)
}

const getHouse: GetOrDeleteHouse = (address) => {
    return storage.get(address)
}

const deleteHouse: GetOrDeleteHouse = (address) => {
    return storage.take(address)
}

export {addHouse, getHouse, deleteHouse}
