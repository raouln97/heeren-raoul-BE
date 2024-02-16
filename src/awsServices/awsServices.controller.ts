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
import { AwsService } from './awsServices.service';
import { AwsMultipleUploadBody, AwsUploadBody } from './google.dto';
// import { ApplicationReqDTO, StatusUpdateDTO } from "./application.dto";

@Tags('GoogleApi')
@Route('/aws')
export class AwsController extends Controller {
  private readonly awsService: AwsService;

  constructor() {
    super();
    this.awsService = new AwsService();
  }

  @Post('/')
  public async uploadPicture(@Body() body: AwsUploadBody): Promise<any> {
    return await this.awsService.uploadFileToS3(
      'heeren-raoul',
      body.bufferImage,
      'test2'
    );
  }

  @Post('/multiple')
  public async uploadPictures(
    @Body() body: AwsMultipleUploadBody
  ): Promise<any> {
    return await this.awsService.uploadMultipleFilesToS3('heeren-raoul', body);
  }

  @Get('/all')
  public async getAllFiles(): Promise<any> {
    return await this.awsService.getAllFiles('heeren-raoul');
  }

  @Get('/song')
  public async getSong(): Promise<any> {
    return await this.awsService.getAllFiles('heeren-raoul-spotify');
  }
}
