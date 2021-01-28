import { State } from 'src/app/shared/models/state.model';

export const defaultLocalization = {
    languageId: 0,
    title: '',
    note: '',
}

export const tenantStates: State[] = [
    {
        title: 'Demo NO',
        value: null
    },
    {
        title: 'Demo SI',
        value: true
    },
    {
        title: 'Tutti',
        value: false
    }
]