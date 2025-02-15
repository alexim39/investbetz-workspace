import { ClientAuthController } from '../controllers/client/auth/auth.controller';
import { ClientDepositController } from '../controllers/client/deposit/deposit.controller';
import { ClientInvestmentController } from './../controllers/client/investment/investment.controller';
import { ClientBalanceController } from './../controllers/client/balance/balance.controller';
import { ProfileUpdateController } from '../controllers/client/profile/profileUpdate.controller';
import { ClientWithdrawalController } from './../controllers/client/withdrawal/withdrawal.controller';
import { ClientWagerController } from './../controllers/client/wager/wager.controller';
import { ClientAutoWithdrawalController } from './../controllers/client/withdrawal/auto-withdrawal.controller';
import {ClientTestimonialController} from './../controllers/client/feedback/testimonial.controller';
import {ClientMessageController} from './../controllers/client/feedback/message.controller';
import {ClientPasswordController} from './../controllers/client/security/password.controller';


export class Routes {

    private authController: ClientAuthController = new ClientAuthController();
    private depositController: ClientDepositController = new ClientDepositController();
    private investmentController: ClientInvestmentController = new ClientInvestmentController();
    private balanceController: ClientBalanceController = new ClientBalanceController();
    private profileUpdateController: ProfileUpdateController = new ProfileUpdateController();
    private withdrawalController: ClientWithdrawalController = new ClientWithdrawalController();
    private wagerController: ClientWagerController = new ClientWagerController();
    private autoWithdrawalController: ClientAutoWithdrawalController = new ClientAutoWithdrawalController();
    private testimonialController: ClientTestimonialController = new ClientTestimonialController();
    private msgController: ClientMessageController = new ClientMessageController();
    private passwordController: ClientPasswordController = new ClientPasswordController();

    constructor() {}

    public routes(app: any): void { 
        /* app.route('/')
            .get((request: Request, response: Response) => {            
                response.status(200).send('Welcome to Investbetz server!');
        }); */

        // New client signup
        app.route('/api/Clients/signup')
            .post(this.authController.newClientSignUp);

        // Client sign in
        app.route('/api/Clients/signin')
            .post(this.authController.clientSignIn);

        // Client sign out
        app.route('/api/Clients/signout')
            .get(this.authController.clientSignOut);



        
            
        /*** Client Resources ***/

        // Get user
        app.route('/api/Clients/client' )
            .get(this.authController.getClient);

        // Get users
        app.route('/api/Clients' )
            .get(this.authController.getClients);




        // Create a new client card deposit
        app.route('/api/Clients/card')
            .post(this.depositController.cardDeposit);

        // Get all client deposit
        app.route('/api/Clients/deposits/:clientId' )
            .get(this.depositController.getClientDeposits);

        // Get client deposit balance
        app.route('/api/Clients/balance/deposit/:clientId')
            .get(this.balanceController.getClientDepositBalance);

        // Get client withrawable balance
        app.route('/api/Clients/balance/withdrawable/:clientId' )
            .get(this.balanceController.calculateClientWithdrawableBalance);

        // Create new client wager investment from deposit balance
        app.route('/api/Clients/investment/wager')
            .post(this.investmentController.wagerInvestFromDeposit);

        // Create new client cashout investment from deposit balance
        app.route('/api/Clients/investment/deposit')
            .post(this.investmentController.cashoutInvestmentFromDepositBalance);

        // Create new client cashout/cashup investment from withdrawable balance
        app.route('/api/Clients/investment/withdrawable')
            .post(this.investmentController.investmentFromWithdrawableBalance);

        // get client investment histories
        app.route('/api/Clients/investment/history/:clientId')
            .get(this.investmentController.investmentHistories);

        // update client profile
        app.route('/api/Clients/profile/update')
            .post(this.profileUpdateController.updateClientProfile);

        // update client profile
        app.route('/api/Clients/bank/update')
            .post(this.profileUpdateController.updateBankDetails);

        // save Client withdraw request
        app.route('/api/Clients/withdrawal/request/save')
            .post(this.withdrawalController.saveWithdrawRequest);

        // get client withdraw request
        app.route('/api/Clients/withdrawal/request/:clientId')
            .get(this.withdrawalController.getWithdrawRequest);

        //  delete client withdraw request
        app.route('/api/Clients/withdrawal/cancel/:withdrawId')
            .get(this.withdrawalController.cancelWithdrawRequest);

        // save Client auto withdraw request
        app.route('/api/Clients/withdrawal/request/auto')
            .post(this.autoWithdrawalController.saveAutoWithdrawRequest);

        // get client auto withdraw request
        app.route('/api/Clients/auto-withdrawal/request/:clientId')
            .get(this.autoWithdrawalController.getAutoWithdrawRequest);

        //  delete client withdraw request
        app.route('/api/Clients/auto-withdrawal/cancel/:withdrawId')
            .get(this.autoWithdrawalController.cancelAutoWithdrawRequest);

        //  save testimonial feedback
        app.route('/api/Clients/testimonial')
            .post(this.testimonialController.saveClientTestimonial);





        /*** Client WAGERS Resources ***/

        // get all wagers
        app.route('/api/Clients/wagers').get(this.wagerController.getWagers);

        //  save morning wager for client
        app.route('/api/Clients/wagers/morning').post(this.wagerController.setMorningWager);

        //  save noon wager for client
        app.route('/api/Clients/wagers/noon').post(this.wagerController.setNoonWager);

        //  save night wager for client
        app.route('/api/Clients/wagers/night').post(this.wagerController.setNightWager);

        //  get morning wager for client
        app.route('/api/Clients/wagers/morning').get(this.wagerController.getMorningWagers);

        //  get noon wager for client
        app.route('/api/Clients/wagers/noon').get(this.wagerController.getNoonWagers);

        //  get night wager for client
        app.route('/api/Clients/wagers/night').get(this.wagerController.getNightWagers);

        // update a specific wager
        app.route('/api/Clients/wagers/:wagerId').put(this.wagerController.updateWagers);





        /*** Client MESSAGE Resources ***/

        // new message
        app.route('/api/Clients/msg')
            .post(this.msgController.saveClientMsg);

        // get sent messages
        app.route('/api/Clients/msg/sent/:clientId')
            .get(this.msgController.getClientSentMsg);

        // get received messages
        app.route('/api/Clients/msg/received/:clientId')
            .get(this.msgController.getClientReceivedMsg);

        // get a messages
        app.route('/api/Clients/msg/:msgId')
            .get(this.msgController.getSingleMsg);

        // delete a messages
        app.route('/api/Clients/msg/:msgId')
            .delete(this.msgController.deleteMsg);

        // update a messages
        app.route('/api/Clients/msg/:msgId')
            .put(this.msgController.updateMsg);


        
        
        
            /*** Client Password Resources ***/

        // change client password
        app.route('/api/Clients/password/change')
            .post(this.passwordController.changePassword);

        
        /* // Get all users
        app.route('/api/Clients')
            .get(this.userController.getClients);

        // update a specific user
        app.route('/api/Clients/:clientId')
            .put(this.userController.updateClient);
        
        // delete a specific user
        app.route('/api/Clients/:clientId')
            .delete(this.userController.deleteClient); */

    }
}
