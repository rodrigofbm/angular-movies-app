import { ConfigParams } from './../shared/models/config-params';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigParamsService {

  constructor() { }

  configParams(config: ConfigParams): HttpParams {
    let httParams = new HttpParams();
    if(config.page) httParams = httParams.set('_page', config.page.toString());
    if(config.limit) httParams = httParams.set('_limit', config.limit.toString());
    if(config.search) httParams = httParams.set('q', config.search);
    if(config.field.value) httParams = httParams.set(config.field.type, config.field.value.toString());
    httParams = httParams.set('_sort', 'id');
    httParams = httParams.set('_order', 'desc');

    return httParams;
  }
}
