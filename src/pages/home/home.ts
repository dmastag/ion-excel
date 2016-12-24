import { Component } from '@angular/core';

import { NavController, Platform } from 'ionic-angular';
import { Transfer, FileOpener } from 'ionic-native';
declare var cordova: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public loadingState: boolean = false;

  constructor(
    public navCtrl: NavController,
    public platform: Platform
  ) {

  }

  getFile() {
    this.loadingState = true;
    let localPath = this.platform.is('android') ? cordova.file.externalDataDirectory + '/employee.xlsx' : cordova.file.cacheDirectory + '/employee.xlsx';
    let transfer = new Transfer();
    transfer
      .download('http://192.168.0.12:3000/api/employees/download', localPath)
      .then((entry) => {
        console.log('download complete: ' + entry.toURL(), entry);
        FileOpener.open(entry.toURL(), 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        this.loadingState = false;
      }, (error) => {
        console.log(error)
        this.loadingState = false;
      })
  }

}
