import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class SnackBarServiceService {
  constructor(private toastr: ToastrService) {}

  showSuccess(message: string): void {
    this.toastr.success(`${message}`, '', {
      positionClass: 'toast-top-center',
      tapToDismiss: true,
      timeOut: 3000,
      messageClass: 'text-xs',
      toastClass: 'ngx-toastr top-4 !rounded-lg flex items-center !shadow-none',
    });
  }

  showError(message: string): void {
    this.toastr.error(`${message}`, '', {
      positionClass: 'toast-top-center',
      tapToDismiss: true,
      timeOut: 3000,
      messageClass: 'text-xs',
      toastClass: 'ngx-toastr top-4 !rounded-lg flex items-center',
    });
  }
}
