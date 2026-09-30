import { computed, ref } from "vue";

import { defineStore } from "pinia";

import { authService } from "@/services/auth.service";

import type { AuthUser, LoginCredentials } from "@/types/auth";

const TOKEN_KEY = 'broca_token'

export const useAuthStore = defineStore('auth',() => {
    const token = ref<string | null>(localStorage.getItem(TOKEN_KEY))

    const user = ref<AuthUser | null>(null)

    const loading = ref(false)

    const initialized = ref(false)

    const isAuthenticated = computed(() => {
        return Boolean(token.value && user.value)
    })

    const permissions = computed<string[]>(() => {
        return user.value?.permisos ?? []
    })

    const roleName = computed(() => {
        if (!user.value) {
            return ''
        }

        if (typeof user.value.rol === 'string') {
            return user.value.rol
        }
        
        return user.value.rol?.nombre ?? ''
    })

    const hasPermission = (permission: string): boolean => {
        return permissions.value.includes(permission)
    }
    
    const hasAnyPermission = (requiredPermissions: string[]): boolean => {
        return requiredPermissions.some((permission) =>
            hasPermission(permission)
    )}
    
    const hasAllPermissions = (requiredPermissions: string[]): boolean => {
        return requiredPermissions.every((permission) =>
            hasPermission(permission)
    )}

    const setToken = (newToken: string) => {
        token.value = newToken
        
        localStorage.setItem(TOKEN_KEY, newToken)
    }

    const clearSession = () => {
        token.value = null
        user.value = null
        
        localStorage.removeItem(TOKEN_KEY)
    }

    const login = async (credentials: LoginCredentials) => {
        loading.value = true
        
        try {
            const response = await authService.login(credentials)
            
            setToken(response.token)
            
            user.value = await authService.me()
            
            initialized.value = true
            
            return user.value
        } catch (error) {
            
            clearSession()
            
            throw error
        } finally {
            loading.value = false
        }
    }
    
    const restoreSession = async () => {
        if (initialized.value) {
            return
        }

        if (!token.value) {
            initialized.value = true
            return
        }

        loading.value = true

        try {
            user.value = await authService.me()
        } catch {

        clearSession()

        } finally {
            initialized.value = true
            loading.value = false
        }
    }

    const logout = () => {
        clearSession()
        
        initialized.value = true
    }

    return {
        token,
        user,
        loading,
        initialized,
        isAuthenticated,
        permissions,
        roleName,
        login,
        logout,
        restoreSession,
        hasPermission,
        hasAnyPermission,
        hasAllPermissions,
    }
})