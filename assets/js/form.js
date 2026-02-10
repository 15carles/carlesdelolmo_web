/**
 * Carles del Olmo — Desarrollador Web, SEO/GEO y Automatizaciones
 * Gestión profesional del formulario de contacto con Supabase
 */

'use strict';

// ============================================
// CONFIGURACIÓN DE SUPABASE
// ============================================
const supabaseUrl = 'https://gzrgxkjvxaflteilmjuq.supabase.co';
const supabaseKey = 'sb_publishable_-rNRG-bfifNaR--8DkvKvA_xXLh4eil';

// Usamos supabaseClient para evitar conflictos con el objeto global de la librería
const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

// ============================================
// VALIDACIÓN DE FORMULARIO
// ============================================
const FormValidator = {
    rules: {
        nombre: { required: true, minLength: 2, maxLength: 50 },
        email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
        empresa: { required: false, maxLength: 100 },
        mensaje: { required: true, minLength: 10, maxLength: 1000 }
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

        if (rule.required && !value.trim()) return { valid: false, message: this.errors.required };
        if (!rule.required && !value.trim()) return { valid: true };

        if (rule.minLength && value.length < rule.minLength) {
            return { valid: false, message: this.errors.minLength.replace('{min}', rule.minLength) };
        }
        if (rule.maxLength && value.length > rule.maxLength) {
            return { valid: false, message: this.errors.maxLength.replace('{max}', rule.maxLength) };
        }
        if (rule.pattern && !rule.pattern.test(value)) {
            return { valid: false, message: this.errors.pattern };
        }

        return { valid: true };
    },

    validateAll(formData) {
        const errors = {};
        let isValid = true;

        for (const [field, value] of Object.entries(formData)) {
            if (field === 'url_origen') continue;
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
// GESTOR DEL FORMULARIO
// ============================================
const ContactForm = {
    init() {
        this.form = document.getElementById('contact-form');
        if (this.form) this.bindEvents();
    },

    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearError(input));
        });
    },

    async handleSubmit(e) {
        e.preventDefault();

        const formData = this.getFormData();
        const { isValid, errors } = FormValidator.validateAll(formData);

        if (!isValid) {
            this.showErrors(errors);
            return;
        }

        this.clearAllErrors();
        this.setLoadingState(true);

        try {
            const { error } = await supabaseClient
                .from('leads_contacto')
                .insert([formData]);

            if (error) throw error;

            // Redirección directa al tener éxito
            window.location.href = 'gracias.html';

        } catch (error) {
            console.error('Error de envío:', error);
            this.showNotification('Hubo un error al enviar el mensaje. Inténtalo de nuevo.', 'error');
        } finally {
            this.setLoadingState(false);
        }
    },

    getFormData() {
        return {
            nombre: this.form.querySelector('#nombre')?.value || '',
            email: this.form.querySelector('#email')?.value || '',
            empresa: this.form.querySelector('#empresa')?.value || '',
            mensaje: this.form.querySelector('#mensaje')?.value || '',
            url_origen: window.location.href
        };
    },

    validateField(input) {
        const result = FormValidator.validate(input.id, input.value);
        if (!result.valid) this.showFieldError(input, result.message);
        else this.clearError(input);
    },

    showFieldError(input, message) {
        this.clearError(input);
        input.classList.add('form__input--error');
        const errorEl = document.createElement('div');
        errorEl.className = 'form__error';
        errorEl.textContent = message;
        input.parentNode.appendChild(errorEl);
    },

    clearError(input) {
        input.classList.remove('form__input--error');
        const errorEl = input.parentNode.querySelector('.form__error');
        if (errorEl) errorEl.remove();
    },

    showErrors(errors) {
        for (const [field, message] of Object.entries(errors)) {
            const input = this.form.querySelector(`#${field}`);
            if (input) this.showFieldError(input, message);
        }
        this.form.querySelector('.form__input--error')?.focus();
    },

    clearAllErrors() {
        this.form.querySelectorAll('input, textarea').forEach(input => this.clearError(input));
    },

    setLoadingState(isLoading) {
        const btn = this.form.querySelector('button[type="submit"]');
        if (btn) {
            btn.disabled = isLoading;
            btn.textContent = isLoading ? 'Enviando...' : 'Enviar Mensaje';
        }
    },

    showNotification(message, type = 'info') {
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();

        const n = document.createElement('div');
        n.className = `notification notification--${type}`;
        n.textContent = message;
        document.body.appendChild(n);

        setTimeout(() => n.classList.add('notification--show'), 10);
        setTimeout(() => {
            n.classList.remove('notification--show');
            setTimeout(() => n.remove(), 300);
        }, 5000);
    }
};

// Inicialización del script
ContactForm.init();