import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Transfer, FileOpener } from 'ionic-native';
declare var cordova: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  getFile() {
    let localPath = cordova.file.cacheDirectory + '/test.xlsx';
    let transfer = new Transfer();
    transfer
      .download('http://192.168.0.12:3000/api/employees/download', localPath)
      .then((entry) => {
        console.log('download complete: ' + entry.toURL(), entry);
        FileOpener.open(entry.toURL(), 'application/vnd.ms-excel')
      }, (error) => console.log(error))
  }

}
