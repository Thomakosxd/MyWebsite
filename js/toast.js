function showToast(type, title, message) {

    const toast = document.getElementById("toast");

    if (!toast) return;

    document.getElementById("toastIcon").className =
        type === "success"
            ? "fa-solid fa-circle-check"
            : "fa-solid fa-circle-xmark";

    document.getElementById("toastTitle").textContent = title;

    document.getElementById("toastMessage").textContent = message;

    toast.className = `toast ${type} show`;

    clearTimeout(toast.timer);

    toast.timer = setTimeout(() => {

        toast.classList.remove("show");

    }, 4500);

}