import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataSharingService {
    public companyList: BehaviorSubject<any> = new BehaviorSubject<any>([]);
}