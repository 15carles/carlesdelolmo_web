/**
 * DEVGEO - Gestor de Formulario
 * Validación y envío del formulario de contacto
 */

'use strict';

// ============================================
// VALIDACIÓN DE FORMULARIO
// ============================================
const FormValidator = {
    rules: {
        nombre: {
            required: true,
            minLength: 2,
            maxLength: 50
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        },
        empresa: {
            required: false,
            maxLength: 100
        },
        mensaje: {
            required: true,
            minLength: 10,
            maxLength: 1000
        }
    },

    errors: {
        required: 'Este campo es obligatorio',
        minLength: 'Debe tener al menos {min} caracteres',
        maxLength: 'No puede exceder {max} caracteres',
        pattern: 'El formato no es válido'
    },

    validate(field, value) {
        const rule = this.rules[field];
        if (!rule) return { valid: true };

        // Validación de campo requerido
        if (rule.required && !value.trim()) {
            return {
                valid: false,
                message: this.errors.required
            };
        }

        // Saltar otras validaciones si el campo está vacío y no es requerido
        if (!rule.required && !value.trim()) {
            return { valid: true };
        }

        // Validación de longitud mínima
        if (rule.minLength && value.length < rule.minLength) {
            return {
                valid: false,
                message: this.errors.minLength.replace('{min}', rule.minLength)
            };
        }

        // Validación de longitud máxima
        if (rule.maxLength && value.length > rule.maxLength) {
            return {
                valid: false,
                message: this.errors.maxLength.replace('{max}', rule.maxLength)
            };
        }

        // Validación de patrón
        if (rule.pattern && !rule.pattern.test(value)) {
            return {
                valid: false,
                message: this.errors.pattern
            };
        }

        return { valid: true };
    },

    validateAll(formData) {
        const errors = {};
        let isValid = true;

        for (const [field, value] of Object.entries(formData)) {
            const result = this.validate(field, value);
            if (!result.valid) {
                errors[field] = result.message;
                isValid = false;
            }
        }

        return { isValid, errors };
    }
};

// ============================================
// GESTOR DE FORMULARIO
// ============================================
const ContactForm = {
    init() {
        this.form = document.getElementById('contact-form');

        if (this.form) {
            this.bindEvents();
        }
    },

    bindEvents() {
        // Envío de formulario
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Validación en tiempo real al perder foco
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearError(input));
        });
    },

    handleSubmit(e) {
        e.preventDefault();

        // Obtener datos del formulario
        const formData = this.getFormData();

        // Validar
        const { isValid, errors } = FormValidator.validateAll(formData);

        if (!isValid) {
            this.showErrors(errors);
            return;
        }

        // Limpiar errores existentes
        this.clearAllErrors();

        // Enviar formulario
        this.submitForm(formData);
    },

    getFormData() {
        return {
            nombre: this.form.querySelector('#nombre')?.value || '',
            email: this.form.querySelector('#email')?.value || '',
            empresa: this.form.querySelector('#empresa')?.value || '',
            mensaje: this.form.querySelector('#mensaje')?.value || ''
        };
    },

    validateField(input) {
        const field = input.id;
        const value = input.value;

        const result = FormValidator.validate(field, value);

        if (!result.valid) {
            this.showFieldError(input, result.message);
        } else {
            this.clearError(input);
        }
    },

    showFieldError(input, message) {
        // Eliminar error existente
        this.clearError(input);

        // Añadir clase de error
        input.classList.add('form__input--error');

        // Crear mensaje de error
        const errorEl = document.createElement('div');
        errorEl.className = 'form__error';
        errorEl.textContent = message;

        // Insertar después del input
        input.parentNode.appendChild(errorEl);
    },

    clearError(input) {
        input.classList.remove('form__input--error');
        const errorEl = input.parentNode.querySelector('.form__error');
        if (errorEl) {
            errorEl.remove();
        }
    },

    showErrors(errors) {
        for (const [field, message] of Object.entries(errors)) {
            const input = this.form.querySelector(`#${field}`);
            if (input) {
                this.showFieldError(input, message);
            }
        }

        // Enfocar primer error
        const firstError = this.form.querySelector('.form__input--error');
        if (firstError) {
            firstError.focus();
        }
    },

    clearAllErrors() {
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => this.clearError(input));
    },

    async submitForm(formData) {
        // Mostrar estado de carga
        this.setLoadingState(true);

        try {
            // TODO: Reemplazar con endpoint API real
            // Por ahora, simular llamada API
            await this.simulateApiCall(formData);

            // Mostrar mensaje de éxito
            this.showSuccess();

            // Resetear formulario
            this.form.reset();

        } catch (error) {
            // Mostrar mensaje de error
            this.showError(error.message);
        } finally {
            // Eliminar estado de carga
            this.setLoadingState(false);
        }
    },

    simulateApiCall(formData) {
        return new Promise((resolve) => {
            console.log('📧 Form data:', formData);
            setTimeout(() => {
                resolve({ success: true });
            }, 1000);
        });
    },

    setLoadingState(isLoading) {
        const submitBtn = this.form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = isLoading;
            submitBtn.textContent = isLoading ? 'Enviando...' : 'Enviar Mensaje';
        }
    },

    showSuccess() {
        // Crear notificación de éxito
        this.showNotification('¡Gracias por tu mensaje! Te contactaré pronto.', 'success');
    },

    showError(message) {
        // Crear notificación de error
        this.showNotification(message || 'Hubo un error al enviar el mensaje. Inténtalo de nuevo.', 'error');
    },

    showNotification(message, type = 'info') {
        // Eliminar notificación existente
        const existing = document.querySelector('.notification');
        if (existing) {
            existing.remove();
        }

        // Crear notificación
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.textContent = message;

        // Añadir al DOM
        document.body.appendChild(notification);

        // Activar animación
        setTimeout(() => notification.classList.add('notification--show'), 10);

        // Auto-eliminar después de 5 segundos
        setTimeout(() => {
            notification.classList.remove('notification--show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
};

// ============================================
// INITIALIZATION
// ============================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => ContactForm.init());
} else {
    ContactForm.init();
}

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FormValidator, ContactForm };
}
