export interface SponsorType {
    name: string
    id: string
}
export interface ProjectData {
    _id?: string
    createdOn: string
    title: string
    shortDesc: string
    longDesc: string
    category: string
    email: string
    linkedIn?: string
    twitter?: string
    mainImage?: string
    sponsorRelation: string
    sponsor: SponsorType
}
