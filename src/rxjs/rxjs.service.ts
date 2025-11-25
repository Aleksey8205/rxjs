import { Injectable } from '@nestjs/common';
import { firstValueFrom, from, map, Observable } from 'rxjs';
import axios from 'axios';

export enum GitSearch {
  GITHUB = 'github',
  GITLAB = 'gitlab'
}

@Injectable()
export class RxjsService {
  private readonly githubUrl = 'https://api.github.com/search/repositories?q=';
  private readonly gitlabUrl = 'https://gitlab.com/api/v4/projects?search=';

  private getRepositories(
    url: string,
    text: string,
    count: number,
  ): Observable<any> {
    return from(axios.get(`${url}${text}`)).pipe(
      map((res) => (res.data.items ? res.data.items : res.data)),
      map((items) => items.slice(0, count)),
    );
  }

  async searchRepositories(
    text: string,
    hub: GitSearch,
    count: number,
  ): Promise<any> {
    let url = '';
    switch (hub.toLowerCase()) {
      case GitSearch.GITHUB:
        url = this.githubUrl;
        break;
      case GitSearch.GITLAB:
        url = this.gitlabUrl;
        break;
      default:
        throw new Error('Unknown hub');
    }

    const data$ = this.getRepositories(url, text, count);
    return await firstValueFrom(data$);
  }
}
