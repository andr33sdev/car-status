import { useEffect, createContext, useReducer, ReactNode } from 'react'

// Definimos el tipo de nuestros estados
type AuthState = {
    token: string | null,
    user: object
}

// Tipos de acción posibles con su payload
type AuthActions =
    | { type: 'SET_USER', payload: { token: string, user: object } }
    | { type: 'LOGOUT' }
    | { type: 'SET_USERNAME', payload: { username: string } }
    | { type: 'SET_EMAIL', payload: { email: string } }
    | { type: 'SET_PASSWORD', payload: { password: string } }

// Estado inicial
const initialState: AuthState = {
    token: localStorage.getItem('token'), // Obtenemos el token desde el localStorage
    user: {
        username: '',
        email: '',
        password: '',
    },
}

// Reducer para manejar las acciones
const authReducer = (state: AuthState, action: AuthActions): AuthState => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token
            }
        case 'LOGOUT':
            localStorage.removeItem('token') // Eliminamos el token al hacer logout
            return {
                ...state,
                user: {},
                token: null
            }
        case 'SET_USERNAME':
            return {
                ...state,
                user: {
                    ...state.user, username: action.payload.username
                }
            }
        case 'SET_EMAIL':
            return {
                ...state,
                user: {
                    ...state.user, email: action.payload.email
                }
            }
        case 'SET_PASSWORD':
            return {
                ...state,
                user: {
                    ...state.user, password: action.payload.password
                }
            }
        default:
            return state
    }
}

// Crear el Contexto
export const AuthContext = createContext<any>(null);

// Context Provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        if (state.token) {
            localStorage.setItem('token', state.token)
        }
    }, [state.token])

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
