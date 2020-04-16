export interface SponsorType {
    name: string
    id: string
}

export interface CoachType {
    name: string
    id: string
}

export interface GoalType {
    target: number
    raised: number
}

export interface LocationType {
    city: string
    country: string
}
export interface ProjectData {
    _id?: string
    name: string
    createdOn: string
    title: string
    shortDesc: string
    longDesc: string
    category: string
    location: LocationType
    email: string
    linkedIn?: string
    twitter?: string
    mainImage?: string
    sponsorRelation: string
    sponsor: SponsorType
    coaches?: Array<CoachType>
    skillsWanted?: Array<string>
    goal?: GoalType
}
