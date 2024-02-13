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

  @Get('/{clueId}')
  public async getClueData(@Path() clueId: number): Promise<any> {
    return this.genericFunctionsService.getClueData(clueId);
  }
}
