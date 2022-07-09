
interface House {
    image: string,
    address: string,
    price: string,
    info: string
    link: string
}

interface Operation {
    to: string
    url: string
}

type Void = () => Promise<void>
type GetEnvVar = (key: string) => string
type GetHouse = (url :string) => Promise<House[]>
type FilterOutHouse = (key: House[]) => House[]
type GetOrDeleteHouse = (key: string) => string | undefined
type Notify = (key: House[], data: Operation) => Promise<void>
type AddHouse = (key: string) => boolean

export {House, Void, GetEnvVar, GetHouse, Notify, FilterOutHouse, AddHouse, GetOrDeleteHouse, Operation}
