import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
    selector: 'app-pages',
    templateUrl: './pages.component.html',
    styles: []
})
export class PagesComponent implements OnInit {



    // dump menu
    items: NbMenuItem[] = [
        {
            title: 'Inicio',
            icon: 'home-outline',
            link: '/home',
        },
        {
            title: 'Mantenimiento',
            icon: 'settings-2-outline',
            children: [
                {
                    title: 'Mant. de usuarios',
                    link: '/users'
                },
                {
                    title: 'Mant. de Empleados',
                    link: '/employees'
                },
                {
                    title: 'Mant. de Pacientes',
                    link: '/patients'
                },
            ]
        },
        {
            title: 'Pruebas psicológicas',
            icon: 'settings-2-outline',
            children: [
                {
                    title: 'Prueba de control',
                    link: '/control'
                }
            ]
        },
        {
            title: 'Perfil',
            icon: 'person-outline',
            children: [
                {
                    title: 'Cambiar contraseña',
                    icon: 'lock-outline',
                },
                {
                    title: 'Cerrar sesión',
                    icon: 'unlock-outline',
                    link: 'logout'
                },
            ]
        },
    ];

    constructor() { }

    ngOnInit(): void { }
}
