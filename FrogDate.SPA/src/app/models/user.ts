import { Photo } from "./photo"

export interface User {
    //basic information
    id?: number
    username?: string
    gender?: string
    age?: string
    zodiacSign?: string
    created?: string
    lastActive?: string
    city?: string
    country?: string

    //specific information
    growth?: string
    eyeColour?: string
    skinColour?: string
    martialStatus?: string
    education?: string
    profession?: string
    children?: string
    languages?: string
    motto?: string
    description?: string
    personality?: string
    lookingFor?: string
    intrests?: string
    freeTime?: string
    sports?: string
    films?: string
    music?: string
    iLike?: string
    idisslike?: string
    makesMeLaught?: string
    iFellsBestIn?: string
    friendsDescribeMe?: string
    photos?: Photo[]
    photoUrl: string | null
  }


