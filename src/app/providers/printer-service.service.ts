import { Injectable } from '@angular/core';
import { ThemeService } from '../providers/theme.service';
import {
  Printer,
  ThermalPrinterPlugin,
} from 'thermal-printer-cordova-plugin/src';
import { UtilService } from './utilservice.service';

declare let ThermalPrinter: ThermalPrinterPlugin;
@Injectable({
  providedIn: 'root',
})
export class PrinterService {
  private thermalPrinter: any;
  constructor() {}

  checkPrinterDriver = () => {
    try {
      this.thermalPrinter = ThermalPrinter;
      return true;
    } catch {
      this.thermalPrinter = null;
      return false;
    }
  };

  getListOfPrinter = (): Promise<Printer[] | string> => {
    return new Promise((res, rej) => {
      const printerType: 'bluetooth' | 'usb' | 'tcp' = 'bluetooth';
      try {
        this.thermalPrinter = ThermalPrinter;
      } catch {
        this.thermalPrinter = null;
      }
      if (!this.thermalPrinter) {
        rej('Printer Driver Error');
        return;
      }
      this.thermalPrinter.listPrinters(
        { type: printerType },
        (printers: Printer[]) => {
          printers = printers.filter((p) => p.majorDeviceClass === 1536);

          if (printers.length > 0) {
            res(printers);
          } else {
            rej('No Printer Found');
          }
        },
        function (error) {
          rej('Ups, we cant list the printers! ' + error.toString());
        }
      );
    });
  };

  public print = (textToPrint: string, printer: Printer): Promise<string> => {
    const thermalPrinter = ThermalPrinter;
    return new Promise((res, rej) => {
      if (printer === null || !thermalPrinter) {
        rej('Printer not set yet. Please goto App Setting and set the printer');
        return;
      }
      ThermalPrinter.printFormattedTextAndCut(
        {
          type: 'bluetooth',
          id: printer.address,
          text: textToPrint,
        },
        function () {
          res('Successfully printed!');
        },
        function (error) {
          rej(error.toString());
        }
      );
    });
  };
}
