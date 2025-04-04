import { Images } from "../images/images.model"

export interface CardPro{
    name: string
    surname: string
    registrationNumber: string
    practiceNumber: string
    dateOfExpiry: string
    email: string
    hasDifferentEmail: boolean
    hasNoAttachment: boolean
    images: Images[]
}