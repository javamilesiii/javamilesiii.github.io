(function() {
    'use strict';

    const EMAILJS_CONFIG = {
        publicKey: 'Xb5MQ92M7eFwdFMU2',
        serviceId: 'service_yvd7qxw',
        templateId: 'template_1z000uf'
    };

    function initEmailJS() {
        if (window.emailjs) {
            emailjs.init(EMAILJS_CONFIG.publicKey);
            return true;
        }
        return false;
    }

    document.addEventListener('DOMContentLoaded', function() {
        if (!initEmailJS()) {
            console.error('EmailJS konnte nicht initialisiert werden');
            return;
        }

        const form = document.getElementById('contactForm');
        const submitBtn = document.getElementById('submitBtn');
        const buttonText = document.getElementById('buttonText');
        const statusMessage = document.getElementById('statusMessage');

        if (!form || !submitBtn || !buttonText || !statusMessage) {
            console.error('Kontaktformular-Elemente nicht gefunden');
            return;
        }

        function showMessage(message, isError = false) {
            statusMessage.textContent = message;
            statusMessage.className = `mt-4 p-3 rounded ${isError ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}`;
            statusMessage.classList.remove('hidden');

            setTimeout(() => {
                statusMessage.classList.add('hidden');
            }, 5000);
        }

        function setLoading(loading) {
            submitBtn.disabled = loading;
            buttonText.textContent = loading ? 'Wird gesendet...' : 'Absenden';
        }

        function validateForm() {
            const name = form.user_name.value.trim();
            const email = form.user_email.value.trim();
            const message = form.message.value.trim();

            if (!name || !email || !message) {
                showMessage('Bitte fülle alle Felder aus.', true);
                return false;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showMessage('Bitte gib eine gültige E-Mail-Adresse ein.', true);
                return false;
            }

            return true;
        }
        const now = new Date();
        const timeString = now.toLocaleString('de-DE', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Europe/Zurich'
        });
        const timeInput = document.createElement('input');
        timeInput.type = 'hidden';
        timeInput.name = 'time';
        timeInput.value = timeString;
        form.appendChild(timeInput);

        function sendEmail() {
            return emailjs.sendForm(
                EMAILJS_CONFIG.serviceId,
                EMAILJS_CONFIG.templateId,
                form
            );
        }

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            if (!validateForm()) return;

            setLoading(true);

            sendEmail()
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    showMessage('Nachricht erfolgreich gesendet! Ich melde mich bald bei dir.');
                    form.reset();
                })
                .catch(function(error) {
                    console.error('FAILED...', error);

                    let errorMessage = 'Fehler beim Senden der Nachricht.';
                    if (error.text && error.text.includes('rate limit')) {
                        errorMessage = 'Zu viele Anfragen. Bitte warte einen Moment.';
                    } else if (error.text && error.text.includes('network')) {
                        errorMessage = 'Netzwerkfehler. Bitte prüfe deine Internetverbindung.';
                    }

                    showMessage(errorMessage + ' Versuche es später erneut.', true);
                })
                .finally(function() {
                    setLoading(false);
                });
        });

        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.classList.add('border-red-500');
                } else {
                    this.classList.remove('border-red-500');
                }
            });
        });

        console.log('Kontaktformular erfolgreich initialisiert');
    });

})();