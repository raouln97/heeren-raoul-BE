import {
  Controller,
  Route,
  Get,
  Security,
  Request,
  Path,
  Post,
  Body,
  Put,
  Tags,
  Query,
  Delete,
  Header,
} from 'tsoa';
import { GenericFunctionsService } from './genericFunctions.service';
import { checkAnswerDTO } from './genericFunctions.dto';
// import { ApplicationReqDTO, StatusUpdateDTO } from "./application.dto";
// import { ApplicationService } from "./application.service";

@Tags('Applications')
@Route('/applications')
export class GenericController extends Controller {
  private readonly genericFunctionsService: GenericFunctionsService;

  constructor() {
    super();
    this.genericFunctionsService = new GenericFunctionsService();
  }

  // @Get('/')
  // public async test(): Promise<any> {
  //   return 'ok';
  // }

  @Get('/')
  public async getClueData(
    @Query() id: number,
    @Query() type?: string
  ): Promise<any> {
    const clueId = id;
    return this.genericFunctionsService.getClueData(clueId, type);
  }

  @Post('/answer')
  public async checkAnswer(@Body() body: checkAnswerDTO): Promise<any> {
    return this.genericFunctionsService.checkAnswer(body);
  }
}
