
document.addEventListener("DOMContentLoaded", () => {
    //Add toggle functionality to sections
    document.querySelectorAll(".indent").forEach(section => {
        const heading = section.previousElementSibling;

        // Check if it's a heading (h1–h6)
        if (heading && /^H[1-6]$/.test(heading.tagName)) {
            heading.style.display = 'flex';
            heading.style.setProperty('align-items', 'center');
            const toggle = document.createElement("span");
            toggle.className = "indent-toggle";
            const isCollapsed = section.classList.contains("collapse");
            toggle.textContent = isCollapsed ? "▶" : "▼";
            toggle.title = isCollapsed ? "Expand" : "Hide";

            toggle.addEventListener("click", () => {
                const isCollapsed = section.classList.contains("collapse");
                section.classList.toggle("collapse");
                toggle.textContent = isCollapsed ? "▼" : "▶";
            toggle.title = isCollapsed ? "Reduce" : "Expand";
            });

            heading.prepend(toggle);
        }
    });

    //Display the alt text under an image
    document.querySelectorAll(".img").forEach(image => {
        const alt = image.getAttribute('alt');
        if (alt && image.getAttribute('src')) {
            const caption = document.createElement('div');
            caption.textContent = alt;
            caption.className = 'img-caption';
            image.after(caption);
        }
    });
});