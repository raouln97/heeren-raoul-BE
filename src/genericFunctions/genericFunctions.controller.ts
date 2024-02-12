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
} from "tsoa";
// import { ApplicationReqDTO, StatusUpdateDTO } from "./application.dto";
// import { ApplicationService } from "./application.service";

@Tags("Applications")
@Route("/applications")
export class GenericController extends Controller {
  // private readonly applicationService: ApplicationService

  constructor() {
    super();
    //   this.applicationService = new ApplicationService();
  }

  @Get("/")
  public async getApplications(): Promise<any> {}
}
