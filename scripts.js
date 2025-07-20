
document.addEventListener("DOMContentLoaded", () => {
    //Add toggle functionality to sections
    document.querySelectorAll(".indent").forEach(section => {
        const heading = section.previousElementSibling;

        // Check if it's a heading (h1–h6)
        if (heading && /^H[1-6]$/.test(heading.tagName)) {
            heading.style.display = 'flex';
            heading.style.setProperty('align-items', 'baseline');
            const toggle = document.createElement("span");
            toggle.className = "indent-toggle";
            const isCollapsed = section.classList.contains("collapse");
            toggle.textContent = isCollapsed ? "Show" : "Hide";

            toggle.addEventListener("click", () => {
                const isCollapsed = section.classList.contains("collapse");
                section.classList.toggle("collapse");
                toggle.textContent = isCollapsed ? "Hide" : "Show";
            });

            heading.appendChild(toggle);
        }
    });

    //Display the alt text under an image
    document.querySelectorAll(".img").forEach(image => {
        const alt = image.getAttribute('alt');
        if (alt) {
            const caption = document.createElement('div');
            caption.textContent = alt;
            caption.className = 'img-caption';
            img.after(caption);
        }
    });
});