import { State } from "src/app/shared/models/state.model";

export const defaultLocalization = {
    id: 0,
    language: '',
    imageURL: '',
    active: true,
    default: true
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
