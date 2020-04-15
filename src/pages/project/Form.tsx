import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { TextInput } from '../../components/form/TextInput'
import { TextAreaInput } from '../../components/form/TextAreaInput'
import { DropdownInput } from '../../components/form/DropdownInput'
import { FileUploadInput } from '../../components/form/FileUploadInput'
import { ProjectData } from '../../features/counter/types'

const categoryList = [
    'Agriculture, Food and Natural Resources',
    'Architecture and Construction',
    'Arts, Audio/Video Technology and Communications',
    'Business Management and Administration',
    'Education and Training',
    'Finance',
    'Government and Public Administration',
    'Health Science',
    'Hospitality and Tourism',
    'Human Services',
    'Information Technology',
    'Law, Public Safety, Corrections and Security',
    'Manufacturing',
    'Marketing, Sales and Service',
    'Science, Technology, Engineering and Mathematics',
    'Transportation, Distribution and Logistics',
    'Other',
]

const sponsorList = ['Friend', 'Family']

interface FormProps {
    onSubmit(data: ProjectData): void
}

export const Form = ({ onSubmit }: FormProps) => {
    const [title, setTitle] = useState(`Project: ${Math.random().toString().split('.')[1]}`)
    const [shortDesc, setShortDesc] = useState('t vero eos et accusam et justo duo dolores et ea rebum')
    const [longDesc, setLongDesc] = useState(
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
    )
    const [category, setCategory] = useState('Finance')
    const [email, setEmail] = useState('test@test.com')
    const [linkedIn, setLinkedIn] = useState('http://linkedin.com')
    const [twitter, setTwitter] = useState('http://twitter.com')
    const [mainImage, setMainImage] = useState('')
    const [sponsorRelation, setSponsorRelation] = useState('Family')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const sponsor = {
            name: 'Test McUser',
            id: '123',
        }
        const projectData = {
            title,
            shortDesc,
            longDesc,
            category,
            email,
            linkedIn,
            twitter,
            mainImage,
            sponsorRelation,
            createdOn: new Date().toJSON(),
            // CURRENT USER NAME
            sponsor,
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
                    />{' '}
                    {/* SPONSOR RELATION */}
                    <DropdownInput
                        label="Sponsor Relation"
                        options={sponsorList}
                        value={sponsorRelation}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSponsorRelation(e.target.value)}
                    />
                </div>
                <div className="col-md-6">
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
                    {/* LOCATION */}
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
