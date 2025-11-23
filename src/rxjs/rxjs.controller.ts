import { Controller, Get, Query } from "@nestjs/common";
import { RxjsService } from "./rxjs.service";
import { ParamText } from "./interfaces/params";

@Controller("rxjs")
export class RxjsController {
  constructor(private rxjsService: RxjsService) {}

  @Get("repositories/")
  repositories(@Query() params: ParamText) {
    return this.rxjsService.searchRepositories(params.text, params.hub);
  }
}