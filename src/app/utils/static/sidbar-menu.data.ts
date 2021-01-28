import { Tab } from 'src/app/components/dashboard/interfaces/sidebar.module';

export const navigationTabsList: Tab[] = [
    {
        id: 0,
        tabName: 'dashboard',
        tabText: 'Dashboard',
        svgTabIconName: 'dashboard.svg',
        subTabsList: [
            {
                id: 1,
                tabName: 'login-users',
                tabText: 'Login utenti',
                svgTabIconName: 'login.svg',
                subTabsList: []
            },
            {
                id: 2,
                tabName: 'scans',
                tabText: 'Scansioni',
                svgTabIconName: 'scans.svg'
            },
            {
                id: 3,
                tabName: 'deadlines',
                tabText: 'Scadenze ',
                svgTabIconName: 'deadline.svg'
            }
        ]
    },
    {
        id: 1,
        tabName: 'tenant',
        tabText: 'Tenant',
        svgTabIconName: 'tanent.svg',
        subTabsList: [
            {
                id: 1,
                tabName: 'clients',
                tabText: 'Clienti',
                svgTabIconName: 'client.svg',
                subTabsList: [
                    {
                        id: 1,
                        tabName: 'client-details',
                        tabText: 'Clienti',
                        svgTabIconName: 'client.svg',
                    },
                    {
                        id: 2,
                        tabName: 'client-creation',
                        tabText: 'Clienti',
                        svgTabIconName: 'client.svg'
                    },
                    {
                        id: 3,
                        tabName: 'documents',
                        tabText: 'Documenti',
                        svgTabIconName: 'client.svg'
                    },
                    {
                        id: 4,
                        tabName: 'users',
                        tabText: 'Utenti',
                        svgTabIconName: 'client.svg',
                        subTabsList: [
                            {
                                id: 1,
                                tabName: 'user-details',
                                tabText: 'Utenti',
                                svgTabIconName: 'client.svg'
                            }
                        ]
                    }
                ]
            },
            {
                id: 2,
                tabName: 'users',
                tabText: 'Utenti',
                svgTabIconName: 'user.svg',
                subTabsList: [
                    {
                        id: 1,
                        tabName: 'user-details',
                        tabText: 'Utenti',
                        svgTabIconName: 'user.svg'
                    }
                ]
            },
            {
                id: 3,
                tabName: 'styles',
                tabText: 'Stili',
                svgTabIconName: 'styles.svg',
                subTabsList: [ 
                    {
                        id: 1,
                        tabName: 'styles-details',
                        tabText: 'Stili',
                        svgTabIconName: 'styles.svg'
                    }
                ]
            },
            {
                id: 4,
                tabName: 'documents',
                tabText: 'Documenti',
                svgTabIconName: 'document.svg',
                subTabsList: [ ]
            }
        ]
    },

    {
        id: 2,
        tabName: 'galleria',
        tabText: 'Galleria',
        svgTabIconName: 'gallery.svg',
        subTabsList: [
            {
                id: 1,
                tabName: 'menu',
                tabText: 'Menu',
                svgTabIconName: 'menu.svg',
                subTabsList: []
            },
            {
                id: 2,
                tabName: 'activities',
                tabText: 'Attività',
                svgTabIconName: 'activity.svg'
            },
        ]
    }
];
