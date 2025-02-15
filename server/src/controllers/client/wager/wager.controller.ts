import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';

import { ClientWagerClass } from './wager.class';

import { WagerSchema, GamesSchema } from './../../../models/client/wager/wager.model';

const GamesModel = mongoose.model('Games', GamesSchema);
const WagersModel = mongoose.model('Wagers', WagerSchema);


export class ClientWagerController extends ClientWagerClass { 

    constructor() {
        super()
    }

    // get all wagers
    public getWagers (request: Request, response: Response, next: NextFunction) {  

        // Check authentication
        if (request.isAuthenticated()) {

            WagersModel.find({ }).populate({path: 'games'}).exec( (error, result) => {
                if (error) {
                  response.status(501).json({message: 'Wager records could not be retrieved, service error occured'});
                }
                response.status(200).json({message: 'done', wager: result});

            });

        } else {
            return response.status(401).json({message: 'Unauthorized request'});
        }

    }

    // Handle get morning wagers
    public getMorningWagers (request: Request, response: Response, next: NextFunction) {  

        // Check authentication
        if (request.isAuthenticated()) {

            const mDate = new Date().setHours(12, 0, 0, 0);

            //console.log(mDate)

            WagersModel.find({ fullDate: mDate }, (error, result) => {
                if (error) {
                  response.status(501).json({message: 'Wager records could not be retrieved, service error occured'});
                }
                response.status(200).json({message: 'done', wager: result});

            });

        } else {
            return response.status(401).json({message: 'Unauthorized request'});
        }

    }


    // Handle get noon wagers
    public getNoonWagers (request: Request, response: Response, next: NextFunction) {  

        // Check authentication
        if (request.isAuthenticated()) {

            const aDate = new Date().setHours(16, 0, 0, 0);

            //console.log(aDate)

            WagersModel.find({ fullDate: aDate }, (error, result) => {
                if (error) {
                  response.status(501).json({message: 'Wager records could not be retrieved, service error occured'});
                }
                response.status(200).json({message: 'done', wager: result});

            });

        } else {
            return response.status(401).json({message: 'Unauthorized request'});
        }

    }

    // Handle get night wagers
    public getNightWagers (request: Request, response: Response, next: NextFunction) {

        // Check authentication
        if (request.isAuthenticated()) {

            const eDate = new Date().setHours(23, 59, 0, 0);

            //console.log(eDate)

            WagersModel.find({ fullDate: eDate }, (error, result) => {
                if (error) {
                  response.status(501).json({message: 'Wager records could not be retrieved, service error occured'});
                }
                response.status(200).json({message: 'done', wager: result});

            });

        } else {
            return response.status(401).json({message: 'Unauthorized request'});
        }

    }

    // set morning wager
    public setMorningWager (request: Request, response: Response, next: NextFunction) { 
        // Check authentication
        //if (request.isAuthenticated()) {} else{
        //    return response.status(401).json({message: 'Unauthorized request'});
        //}

        // get all games
        const wagers: Array<any> = request.body.wagers;
        const gamesArray: Array<any> = [];

        for (let game of wagers) {

            gamesArray.push({
                'game': game.homeObj + ' vs ' + game.awayObj,
                'prediction': game.predictionObj,
                'status': '',
                'type': game.gameType
            });
        }

        const gamesObject: any = {
            game: gamesArray
        }
        // save
        const newGame: any = new GamesModel(gamesObject);
        newGame.save((error: any, game: any) => {
            if (error){
                response.status(501).json({message: 'Morning Wager was not saved successful, service error occured'});
            } 
            const wager: any = {
                odd: request.body.odd,
                fullDate: new Date().setHours(12, 0, 0, 0),
                games: game._id,
            }
            // save
            const newWager: any = new WagersModel(wager); 
            newWager.save((error: any, wager: any) => {
                if (error){
                    response.status(501).json({message: 'Morning Wager was not saved successful, service error occured'});
                } 
                response.status(200).json({message: 'done', wager: wager, games: game});
            })

        });

     }

     // set noon wager
    public setNoonWager (request: Request, response: Response, next: NextFunction) { 
        // Check authentication
        //if (request.isAuthenticated()) {} else{
        //    return response.status(401).json({message: 'Unauthorized request'});
        //}

        // get all games
        const wagers: Array<any> = request.body.wagers;
        const gamesArray: Array<any> = [];

        for (let game of wagers) {

            gamesArray.push({
                'game': game.homeObj + ' vs ' + game.awayObj,
                'prediction': game.predictionObj,
                'status': '',
                'type': game.gameType
            });
        }

        const gamesObject: any = {
            game: gamesArray
        }
        // save
        const newGame: any = new GamesModel(gamesObject);
        newGame.save((error: any, game: any) => {
            if (error){
                response.status(501).json({message: 'NoonwWager was not saved successful, service error occured'});
            } 
            //response.status(200).json({message: 'done', data: data});
            const wager: any = {
                odd: request.body.odd,
                fullDate: new Date().setHours(16, 0, 0, 0),
                games: game._id,
            }
            // save
            const newWager: any = new WagersModel(wager); 
            newWager.save((error: any, wager: any) => {
                if (error){
                    response.status(501).json({message: 'NoonwWager was not saved successful, service error occured'});
                } 
                response.status(200).json({message: 'done', wager: wager, games: game});
            })
        });
        
     }

     // set night wager
    public setNightWager (request: Request, response: Response, next: NextFunction) {
        // Check authentication
        //if (request.isAuthenticated()) {} else{
        //    return response.status(401).json({message: 'Unauthorized request'});
        //}
        
        // get all games
        const wagers: Array<any> = request.body.wagers;
        const gamesArray: Array<any> = [];

        for (let game of wagers) {

            gamesArray.push({
                'game': game.homeObj + ' vs ' + game.awayObj,
                'prediction': game.predictionObj,
                'status': '',
                'type': game.gameType
            });
        }

        const gamesObject: any = {
            game: gamesArray
        }
        // save
        const newGame: any = new GamesModel(gamesObject); 

        newGame.save((error: any, game: any) => {
            if (error){
                response.status(501).json({message: 'Night wager was not saved successful, service error occured'});
            } 
            
            const wager: any = {
                odd: request.body.odd,
                fullDate: new Date().setHours(23, 59, 0, 0),
                games: game._id,
            }
            const newWager: any = new WagersModel(wager);

            newWager.save((error: any, wager: any) => {
                if (error){
                    response.status(501).json({message: 'Night wager was not saved successful, service error occured'});
                } 
                response.status(200).json({
                    message: 'done', 
                    wager: wager, 
                    games: game
                });
            });

        });
     }

     // update wager
     public updateWagers(request: Request, response: Response, next: NextFunction) {
        // Check authentication
        //if (request.isAuthenticated()) {} else{
        //    return response.status(401).json({message: 'Unauthorized request'});
        //}


            WagersModel.find({ _id: request.params.wagerId }).populate('games').exec( (error: any, wager: any) => {
                console.log(wager[0].games)

                /* for( let i = 0; i < wager.games.length; i++) {
                    for(let j = 0; j < request.body.length; j++){

                        console.log(request.body[j]._id )
                        console.log(wager.games[i]._id)

                        if(request.body[j]._id == wager.games[i]._id ) {
                            // match
                
                            const sentStatus: string = request.body[j].status;
                            const retrivedStatus: string = wager.games[i].status ;
                
                
                            GamesModel.findOneAndUpdate({ _id: wager.games[i]._id }, {}, (error: any, data: any) => {
                
                                if (error){
                                    response.status(501).json({error: 'Wager was not updated, service error occured'});
                                }
                                response.status(200).json({message: 'done', data: data});
                            });
                
                        } else {
                            // no match
                            response.status(501).json({error: 'Games status was not updated, no match found'});
                        }
                        
                    }
                } */

          });

     }

     
}