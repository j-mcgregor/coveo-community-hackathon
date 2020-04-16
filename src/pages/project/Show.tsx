/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faDollarSign, faUsers, faProjectDiagram, faLocationArrow } from '@fortawesome/free-solid-svg-icons'
import { Modal } from 'react-bootstrap'

import moment from 'moment'
import { ProjectData, CoachType } from '../../features/counter/types'
import placeholder from '../../img/placeholder.png'
import personPlaceholder from '../../img/placeholder-person.png'
import { NumberInput } from '../../components/form/NumberInput'
import { DropdownInput } from '../../components/form/DropdownInput'
import { TextAreaInput } from '../../components/form/TextAreaInput'

interface ActionModalProps {
    show: boolean
    handleClose(): void
    title: string
    confirmAction(): void
    children?: React.ReactNode
}

const ActionModal: React.FC<ActionModalProps> = ({
    show,
    handleClose,
    title,
    confirmAction,
    children,
}: ActionModalProps) => (
    <>
        {' '}
        <Modal show={show} onHide={handleClose} animation={false} centered className="p2">
            <Modal.Header closeButton>
                <Modal.Title style={{ color: '#f57f20' }}>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ fontSize: '16px' }}>{children}</Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn btn-lg " onClick={confirmAction}>
                    Save Changes
                </button>
            </Modal.Footer>
        </Modal>
    </>
)

export const Show = () => {
    // DONATE
    const [showDonateModal, setShowDonateModal] = useState(false)
    const handleCloseDonateModal = () => setShowDonateModal(false)
    const handleShowDonateModal = () => setShowDonateModal(true)
    const [donationAmount, setDonationAmount] = useState('')

    // VOLUNTEER
    const [showVolunteerModal, setShowVolunteerModal] = useState(false)
    const [volunteerSkill, setVolunteerSkill] = useState('')
    const [volunteerExtraInfo, setVolunteerExtraInfo] = useState('')

    const handleCloseVolunteerModal = () => setShowVolunteerModal(false)
    const handleShowVolunteerModal = () => setShowVolunteerModal(true)

    const [project, setProject] = useState<ProjectData>()
    const { id } = useParams()

    useEffect(() => {
        const projectsList = window.localStorage.getItem('projects')

        if (projectsList) {
            const filteredProject = JSON.parse(projectsList).find((p: ProjectData) => p._id === id)
            setProject(filteredProject)
            if (project && project.skillsWanted) {
                setVolunteerSkill(project.skillsWanted[0])
            }
        }
    }, [])

    const handleDonateAction = () => {
        if (project && project.goal) {
            // UPDATE PROJECT
            const newAmount = project.goal.raised + parseFloat(donationAmount)
            const updatedProject: ProjectData = {
                ...project,
                goal: {
                    ...project.goal,
                    raised: newAmount,
                },
            }
            // UPDATE LIST
            const projects = window.localStorage.getItem('projects')

            if (projects) {
                // get all projects
                const parsedProjects = JSON.parse(projects)
                // find and replace
                const newProjectArray = parsedProjects.map((p: ProjectData) => {
                    if (p._id === project._id) {
                        return updatedProject
                    }
                    return p
                })

                // save
                window.localStorage.setItem('projects', JSON.stringify(newProjectArray))
                window.location.reload()
            }
        }
    }

    const handleVolunteerAction = () => {
        if (project && project.coaches) {
            // UPDATE PROJECT
            const newCoach = {
                id: '123',
                name: 'Jack McGregor',
                skill: volunteerSkill,
            }

            const updatedProject: ProjectData = {
                ...project,
                coaches: [...new Set([...project.coaches, newCoach])],
            }

            // UPDATE LIST
            const projects = window.localStorage.getItem('projects')

            if (projects) {
                // get all projects
                const parsedProjects = JSON.parse(projects)
                // find and replace
                const newProjectArray = parsedProjects.map((p: ProjectData) => {
                    if (p._id === project._id) {
                        return updatedProject
                    }
                    return p
                })

                // save
                window.localStorage.setItem('projects', JSON.stringify(newProjectArray))
                window.location.reload()
            }
        }
    }

    return (
        <div className="container-fluid p0">
            {project ? (
                <>
                    <div
                        className="jumbotron jumbotron-fluid col-md-12 py5 m0"
                        style={{ background: '#f57f20', color: 'white' }}
                    >
                        <div className="container">
                            <h1>{project.title}</h1>
                            <h6>
                                {project.name}
                                <span className="mx1">|</span>
                                {project.sponsorRelation} of{' '}
                                <a
                                    href={`http://coveo.com/employee/${project.sponsor.id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: 'white', textDecoration: 'underline' }}
                                >
                                    {project.sponsor.name}
                                </a>
                            </h6>
                            <h6 className="my1">{project.category}</h6>
                            <h6>
                                {project.skillsWanted &&
                                    project.skillsWanted.map((s: any, i: number) => (
                                        <span className="my1">
                                            {s}
                                            {project.skillsWanted && i !== project.skillsWanted.length - 1 ? ', ' : ''}
                                        </span>
                                    ))}
                            </h6>
                            <h6 className="my1">{moment(project.createdOn).format('MMM Do YY')}</h6>
                            <h6 className="my1">
                                {project.location.city}, {project.location.country}
                            </h6>
                        </div>
                    </div>
                    <div
                        className="jumbotron jumbotron-fluid col-md-12 py3"
                        style={{ background: '#01488d', color: 'white' }}
                    >
                        <div className="container text-center">
                            <div className="row">
                                <div className="col-md-6">
                                    {project.goal && (
                                        <>
                                            <h3>
                                                <FontAwesomeIcon size="2x" className="mr-2" icon={faDollarSign} />
                                            </h3>
                                            <h4>
                                                $ {project.goal.raised} / {project.goal.target} raised
                                            </h4>
                                            <button
                                                type="button"
                                                className="btn btn-lg btn-banner"
                                                onClick={handleShowDonateModal}
                                            >
                                                Donate
                                            </button>
                                            <ActionModal
                                                show={showDonateModal}
                                                handleClose={handleCloseDonateModal}
                                                title={`Donate to ${project.name}'s cause?`}
                                                confirmAction={handleDonateAction}
                                            >
                                                <>
                                                    <p>{`If you would like to donate to support ${project.name} please enter an amount below and click confirm. You will be sent an email to confirm and the amount will be collated and deducted from your salary`}</p>
                                                    <NumberInput
                                                        value={donationAmount}
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                            setDonationAmount(e.target.value)
                                                        }
                                                    />
                                                </>
                                            </ActionModal>
                                        </>
                                    )}
                                </div>
                                <div className="col-md-6">
                                    {project.coaches && (
                                        <>
                                            <h3>
                                                <FontAwesomeIcon size="2x" className="mr-2" icon={faUsers} />
                                            </h3>
                                            <h4>{project.coaches.length} Coaches</h4>
                                            <button
                                                type="button"
                                                className="btn btn-lg btn-banner"
                                                onClick={handleShowVolunteerModal}
                                            >
                                                Volunteer
                                            </button>
                                            <ActionModal
                                                show={showVolunteerModal}
                                                handleClose={handleCloseVolunteerModal}
                                                title={`Volunteer for ${project.name}'s cause?`}
                                                confirmAction={handleVolunteerAction}
                                            >
                                                <>
                                                    <p>{`Would you like to volunteer for ${project.name}? If so, please select which skill they looking for help with that you will be able to coach them on, with any extra information you think might be necessary`}</p>
                                                    {project.skillsWanted && project.skillsWanted.length && (
                                                        <DropdownInput
                                                            value={volunteerSkill}
                                                            options={project.skillsWanted}
                                                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                                                                setVolunteerSkill(e.target.value)
                                                            }
                                                        />
                                                    )}
                                                    <TextAreaInput
                                                        label="Further information"
                                                        value={volunteerExtraInfo}
                                                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                                            setVolunteerExtraInfo(e.target.value)
                                                        }
                                                        placeholder="any other information"
                                                    />
                                                </>
                                            </ActionModal>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 container py1">
                        <div className="row">
                            <div className="col-md-6 text-justify p1">
                                <p>{project.shortDesc}</p>
                                <small>{project.longDesc}</small>
                                <ul className="list-group list-group-flush pt2">
                                    {project.email && (
                                        <li className="list-group-item pl0">
                                            <small>
                                                <a href={`mailto:${project.email}`}>
                                                    <FontAwesomeIcon className="mr-2" icon={faEnvelope} />
                                                    {project.email}
                                                </a>
                                            </small>
                                        </li>
                                    )}
                                    {project.linkedIn && (
                                        <li className="list-group-item pl0">
                                            <small>
                                                <a href={project.linkedIn} target="_blank" rel="noopener noreferrer">
                                                    <FontAwesomeIcon className="mr-2" icon={faLinkedin} />
                                                    {project.linkedIn}
                                                </a>
                                            </small>
                                        </li>
                                    )}
                                    {project.twitter && (
                                        <li className="list-group-item pl0">
                                            <small>
                                                <a href={project.twitter} target="_blank" rel="noopener noreferrer">
                                                    <FontAwesomeIcon className="mr-2" icon={faTwitter} />
                                                    {project.twitter}
                                                </a>
                                            </small>
                                        </li>
                                    )}
                                </ul>
                            </div>
                            <div className="col-md-5 offset-md-1 text-justify py1">
                                <p>Coach list</p>
                                {project.coaches && project.coaches.length ? (
                                    project.coaches.map((p: any) => (
                                        <div className="media flex flex-center my1">
                                            <img
                                                src={personPlaceholder}
                                                alt="person-placeholder"
                                                className="img-rounded mr1"
                                                width="40"
                                                style={{ borderRadius: '50%' }}
                                            />
                                            <div className="media-body">
                                                <h6>{p.name}</h6>
                                                {p.skill && (
                                                    <small className="text-muted">Coaching with: {p.skill}</small>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div style={{ height: '100px' }} className="">
                                        <small>
                                            No coaches yet.{' '}
                                            <span
                                                onClick={handleShowVolunteerModal}
                                                style={{ color: '#f57f20', cursor: 'pointer' }}
                                            >
                                                {' '}
                                                Why not volunteer?
                                            </span>
                                        </small>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="row py3">
                            <div className="col-md-12">
                                <div className="img-container text-center">
                                    {project.mainImage ? (
                                        <img src={project.mainImage} alt="main" className="img-thumbnail" />
                                    ) : (
                                        <img src={placeholder} alt="main" className="img-thumbnail" />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div style={{ height: '90vh', width: '100vw' }} className="flex flex-center flex-column">
                    <h2>No project with this ID</h2>
                    <Link to="/">Go back</Link>
                </div>
            )}
        </div>
    )
}
