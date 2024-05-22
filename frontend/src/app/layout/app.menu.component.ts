import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }
    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
             
                    { label: 'Employees', icon: 'pi pi-fw pi-users', routerLink: ['user/'] },
                    { label: 'Department', icon: 'pi pi-fw pi-building', routerLink: ['department'] },
                    { label: 'Location', icon: 'pi pi-fw pi-map-marker', routerLink: ['location'] },
                    
                    
                ]
            }
        ];
    }
}
