import Joi from 'joi'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const schema = Joi.object({
    make: Joi.string().required(),
    model: Joi.string().required(),
    year: Joi.number().min(1886).max(new Date().getFullYear() + 1),
    miles: Joi.number().min(0).required(),
    city: Joi.string().min(2).required(),
    numberOfSeats: Joi.number().min(1).max(1000).required(),
    description: Joi.string().min(10).required(),
    features: Joi.array().items(Joi.string()).required(),
    image: Joi.string().required(),
    listerId: Joi.string().required(),
    price: Joi.number().min(0),
    name: Joi.string().required()
})
export default defineEventHandler(async(event)=>{
    const body = await readBody(event)
    const {value, error} = await schema.validate(body)
    if(error){
        throw createError({
            statusCode: 412,
            statusMessage: error.message
        })
    }
    const {
    make, name, miles, city, image, features, price, model, numberOfSeats, listerId, description
    } = body
    const car = await prisma.car.create({
        data:{ 
        make, name, miles, city: city.toLowerCase(), image, features, price, model, numberOfSeats, listerId, description
        }
    })
    return car
})