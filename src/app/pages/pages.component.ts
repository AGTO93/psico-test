import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-pages',
    templateUrl: './pages.component.html',
    styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

    userName: string = '';
    roleName: string = '';
    userId: string = '';
    employeeName: string = '';
    employeeLastname: string = '';

    // dump menu
    items: NbMenuItem[] = [];
    adminMenu: NbMenuItem[] = [
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
    employeeMenu: NbMenuItem[] = [
        {
            title: 'Inicio',
            icon: 'home-outline',
            link: '/home',
        },
        /* {
            title: 'Mant. de Pacientes',
            icon: 'settings-2-outline',
            children: [
                {
                    title: 'Ficha técnica',
                    link: '/data-sheets'
                },
            ]
        }, */
        {
            title: 'Pruebas psicológicas',
            icon: 'settings-2-outline',
            children: [
                {
                    title: 'BDI-2',
                    link: '/bdi-2'
                },
                /* {
                    title: 'BAI',
                    link: '/bai'
                },
                {
                    title: 'Big Five',
                    link: '/big-five'
                },
                {
                    title: 'TIPI',
                    link: '/tipo'
                },
                {
                    title: 'PDI-5',
                    link: '/pdi-5'
                },
                {
                    title: 'CHASIDE',
                    link: '/chaside'
                },
                {
                    title: 'Salamanca',
                    link: '/salamanca'
                }, */
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

    constructor(public authService: AuthService) { }

    ngOnInit(): void {
        const { userId, username, role } = JSON.parse(this.authService.userData);
        const { name, lastname } = JSON.parse(this.authService.employeeData);
        this.userId = userId;
        this.userName = username;
        this.roleName = role;
        this.employeeName = name;
        this.employeeLastname = lastname;

        this.authService.role = role;

        // menu assigment per role
        this.items = role === 'ADMINISTRATOR' ? this.adminMenu : this.employeeMenu;
    }
}
