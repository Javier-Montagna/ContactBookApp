import { Injectable, Pipe } from '@angular/core';

@Pipe({
    name: 'phone'
})
export class PhonePipe {
    transform(phNum: string, args) {
        var parts = phNum.match(/^\(?(\d{3})\D*(\d{3})\D*(\d{4})$/);
        return ('('+parts[1]+') '+parts[2]+'-'+parts[3]);
    }
}