import { State } from "src/app/shared/models/state.model";

export const defaultValue = {
    id: 0, 
    name: '',
    phone: '',
    lastLoginDate: '',
    role: 1,
    state: true,
    welcomePageType: 0,
    currencyType: 0,
    QRCodeURL: ''
}

export const activeStates: State[] = [
    {
        title: 'Tutti',
        value: null
    },
    {
        title: 'Attivi',
        value: true
    },
    {
        title: 'Inattivi',
        value: false
    }
];

export const tenantStates: State[] = [
    {
        title: 'Tutti',
        value: null
    },
    {
        title: 'Demo SI',
        value: true
    },
    {
        title: 'Demo NO',
        value: false
    }
];

export const welcomePageTypes: any[] = [
    {
        title: 'Default',
        value: 2
    },
    {
        title: 'TIpo 1',
        value: 1
    },
    {
        title: 'Tipo 2',
        value: 3
    },
    {
        title: 'Tipo 3',
        value: 4
    }
];

export const currencys: any[] = [
    {
        title: '€',
        value: 2
    },
    {
        title: '$',
        value: 1
    },
    {
        title: 'Fr.',
        value: 3
    }
];
