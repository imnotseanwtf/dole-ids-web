// ponytail: only JS the static screens need — toggle panels (notifications,
// profile menu) and close them on outside click.
document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-toggle]');
    if (trigger) {
        e.preventDefault();
        const panel = document.getElementById(trigger.dataset.toggle);
        document.querySelectorAll('.js-panel').forEach((p) => p !== panel && p.classList.add('hidden'));
        panel?.classList.toggle('hidden');
        return;
    }
    if (!e.target.closest('.js-panel')) {
        document.querySelectorAll('.js-panel').forEach((p) => p.classList.add('hidden'));
    }
});
