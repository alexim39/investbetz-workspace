import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';

import { ClientFeedbackClass } from './feedback.class';

import { TestimonialSchema } from './../../../models/client/feedback/testimonial.model';

const TestimonialModel = mongoose.model('Testimonial', TestimonialSchema);

export class ClientTestimonialController extends ClientFeedbackClass { 

    constructor() {
        super()
    }

    // Handle testimonial saving
    public saveClientTestimonial (request: Request, response: Response, next: NextFunction) { 

        // Check authentication
        if (request.isAuthenticated()) {

            // save
            const testimonialModel: any = new TestimonialModel(request.body); 

            testimonialModel.save((error: any, testimonial: any) => {
                if (error){
                    response.status(501).json({message: `Messages was not saved but thanks for filling our feedback form`});
                }    
                response.status(200).json({message: 'done', data: testimonial});
            });
            
        } else {
            return response.status(401).json({message: 'Unauthorized request'});
        }
    }

}