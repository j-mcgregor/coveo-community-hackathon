import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { TextInput } from '../../components/form/TextInput'
import { TextAreaInput } from '../../components/form/TextAreaInput'
import { DropdownInput } from '../../components/form/DropdownInput'
import { FileUploadInput } from '../../components/form/FileUploadInput'
import { ProjectData, GoalType, LocationType, SponsorType } from '../../features/counter/types'

import countriesJSON from '../../data/countries.json'
import categoryList from '../../data/categoryList.json'
import sponsorList from '../../data/sponsorList.json'
import skillsList from '../../data/skillsList.json'

interface FormProps {
    onSubmit(data: ProjectData): void
}

interface ReqSkillsProps {
    reqSkillsList: Array<string>
    handleRemoveSkill(r: any): void
}

const ReqSkills = ({ reqSkillsList, handleRemoveSkill }: ReqSkillsProps) => {
    const [skills, setSkills] = useState(reqSkillsList)

    useEffect(() => setSkills(reqSkillsList), [reqSkillsList])

    const handleOnRemoveSkill = (r: any) => {
        handleRemoveSkill(skills.filter((s: any) => s !== r))
    }

    return (
        <div>
            {skills.map((r: string) => (
                <small className="badge badge-secondary">
                    {r} <FontAwesomeIcon className="ml-2" icon={faTimes} onClick={() => handleOnRemoveSkill(r)} />
                </small>
            ))}
        </div>
    )
}

export const Form = ({ onSubmit }: FormProps) => {
    const [title, setTitle] = useState('')
    const [name, setName] = useState('')

    const [shortDesc, setShortDesc] = useState('')
    const [longDesc, setLongDesc] = useState('')
    const [category, setCategory] = useState('')
    const [email, setEmail] = useState('')
    const [linkedIn, setLinkedIn] = useState('http://linkedin.com')
    const [twitter, setTwitter] = useState('http://twitter.com')
    const [mainImage, setMainImage] = useState('')
    const [sponsorRelation, setSponsorRelation] = useState('')

    const [city, setCity] = useState('')
    const [cities, setCities] = useState<Array<string>>([])

    const [country, setCountry] = useState('')
    const [countries, setCountries] = useState<Array<string>>([])

    const [skill, setSkill] = useState('')
    const [requestedSkills, setRequestedSkills] = useState<Array<string>>([])

    const handleRequestSkill = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSkill(e.target.value)
        const currentRequestedSkills = [...new Set([...requestedSkills, e.target.value])]
        setRequestedSkills(currentRequestedSkills)
    }

    const handleRemoveSkill = (r: any) => setRequestedSkills(r)

    useEffect(() => {
        const countryList: string[] = Object.keys(countriesJSON)
        setCountries(countryList)
    }, [])

    useEffect(() => {
        const cityList = Object.entries(countriesJSON)
        const countryCities = cityList.find((cl: any) => cl[0] === country)
        if (countryCities && countryCities.length) {
            setCities(countryCities[1])
        } else {
            setCities(countriesJSON.Afghanistan)
        }
    }, [country])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const sponsor: SponsorType = {
            name: 'Test McUser',
            id: '123',
        }

        const goal: GoalType = {
            target: Math.floor(Math.random() * 1000),
            raised: 0,
        }

        const location: LocationType = {
            city,
            country,
        }

        const skillsWanted: Array<string> = requestedSkills

        const projectData: ProjectData = {
            title,
            name,
            shortDesc,
            longDesc,
            category,
            location,
            email,
            linkedIn,
            twitter,
            mainImage,
            sponsorRelation,
            createdOn: new Date().toJSON(),
            // CURRENT USER NAME
            sponsor,
            coaches: [],
            goal,
            skillsWanted,
        }
        onSubmit(projectData)
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>New Project</h1>
            <div className="row">
                <div className="col-md-6">
                    {/* TITLE */}
                    <TextInput
                        label="Title"
                        value={title}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                        placeholder="What's the name of your project?"
                    />
                    {/* SHORT DESCRIPTION */}
                    <TextAreaInput
                        label="Short description of your project"
                        value={shortDesc}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setShortDesc(e.target.value)}
                        placeholder="A short description to rouse interest"
                    />
                    {/* LONG DESCRIPTION */}
                    <TextAreaInput
                        label="Longer description of your project"
                        value={longDesc}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setLongDesc(e.target.value)}
                        placeholder="A longer description of your project to grab attention"
                    />
                    {/* CATEGORIES */}
                    <DropdownInput
                        label="Category"
                        options={categoryList}
                        value={category}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value)}
                    />
                    {/* SKILLS LIST */}
                    <DropdownInput
                        label="Coaching skills needed"
                        options={skillsList}
                        value={skill}
                        onChange={handleRequestSkill}
                    />
                    <ReqSkills reqSkillsList={requestedSkills} handleRemoveSkill={handleRemoveSkill} />
                    {/* SPONSOR RELATION */}
                    <DropdownInput
                        label="Sponsor Relation"
                        options={sponsorList}
                        value={sponsorRelation}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSponsorRelation(e.target.value)}
                    />

                    {/* LOCATION */}
                    <DropdownInput
                        label="Country"
                        options={countries}
                        value={country}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCountry(e.target.value)}
                    />
                    <DropdownInput
                        label="City"
                        options={cities}
                        value={city}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCity(e.target.value)}
                    />
                </div>
                <div className="col-md-6">
                    {/* email */}
                    <TextInput
                        label="Project owner"
                        value={name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                        placeholder="Project owner name"
                    />
                    {/* email */}
                    <TextInput
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        placeholder="Email address"
                    />
                    {/* linkedin */}
                    <TextInput
                        label="LinkedIn URL"
                        value={linkedIn}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLinkedIn(e.target.value)}
                        placeholder="LinkedIn URL"
                        logo={<FontAwesomeIcon className="mr-2" icon={faLinkedin} />}
                    />
                    {/* linkedin */}
                    <TextInput
                        label="Twitter URL"
                        value={twitter}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTwitter(e.target.value)}
                        placeholder="Twitter URL"
                        logo={<FontAwesomeIcon className="mr-2" icon={faTwitter} />}
                    />
                    {/* IMAGE */}
                    <FileUploadInput
                        value={mainImage}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMainImage(e.target.value)}
                        label="Main image"
                    />
                </div>
            </div>

            {/* CONTACT */}
            <hr />

            <button className="btn btn-dark btn-lg" type="submit">
                Create
            </button>
        </form>
    )
}
