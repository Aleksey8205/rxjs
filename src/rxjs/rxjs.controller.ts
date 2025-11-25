import { Controller, Get, Query } from "@nestjs/common";
import { RxjsService } from "./rxjs.service";
import { ParamText } from "./interfaces/params";

@Controller("rxjs")
export class RxjsController {
  constructor(private readonly rxjsService: RxjsService) {}

  @Get("repositories")
  repositories(@Query() { text, hub, count }: ParamText) {
    return this.rxjsService.searchRepositories(text, hub, count);
  }
}