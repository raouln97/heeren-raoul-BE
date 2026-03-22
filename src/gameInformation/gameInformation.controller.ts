// import {
//   Controller,
//   Route,
//   Get,
//   Security,
//   Request,
//   Path,
//   Post,
//   Body,
//   Put,
//   Tags,
//   Query,
//   Delete,
//   Header,
// } from 'tsoa';
// import { GameInformationCreationDTO } from './gameInformation.dto';
// import { GameInformationService } from './gameInformation.service';
// import { get } from 'http';
// // import { ApplicationReqDTO, StatusUpdateDTO } from "./application.dto";

// @Tags('GameInformation')
// @Route('/info')
// export class GameInformationController extends Controller {
//   private readonly gameInformationService: GameInformationService;

//   constructor() {
//     super();
//     this.gameInformationService = new GameInformationService();
//   }

//   @Post('/')
//   public async uploadInformation(
//     @Body() body: GameInformationCreationDTO
//   ): Promise<any> {
//     return await this.gameInformationService.uploadGameInformation(body);
//   }

//   @Get('/retrieve')
//   public async gameInformation(@Query() id: string): Promise<any> {
//     return await this.gameInformationService.retrieveGameInformation(id);
//   }
// }
