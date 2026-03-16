/**
 * Site Configuration
 *
 * Edit the values below to customize branding, theming, and agent platform.
 * All pages (index.html, admin.html, agent pages) load this file and apply
 * settings automatically — no need to touch HTML or CSS.
 */

const SITE_CONFIG = {

    // ── Branding ───────────────────────────────────────────────
    companyName: "Acme Corp",
    siteTitle: "AI Agent Launchpad",
    departmentName: "Operations",
    poweredByText: "powered by AI Agents",
    badgeText: "BETA",
    adminBadgeText: "ADMIN",

    // ── Theme ──────────────────────────────────────────────────
    // Choose a preset ("carbon", "modern", "minimal") or set to "custom"
    // and fill in the custom theme values below.
    themePreset: "carbon",

    custom: {
        primaryColor: "#0f62fe",
        primaryHover: "#0043ce",
        accentColor: "#4589ff",
        headerBg: "#161616",
        pageBg: "#f4f4f4",
        cardBg: "#ffffff",
        textPrimary: "#161616",
        textSecondary: "#525252",
        textHelper: "#6f6f6f",
        borderRadius: "0px",
        fontFamily: "'Inter', sans-serif",
        fontUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;600;700&display=swap",
    },

    // ── Agent Platform ─────────────────────────────────────────
    // "widget" | "iframe" | "script" | "link"
    //
    //   widget   – platform-specific embed widget (set hostURL + config)
    //   iframe   – generic iframe embed (Dialogflow, Botpress, etc.)
    //   script   – load a custom embed script URL
    //   link     – simply open a URL in a new tab (default card behavior)
    agentPlatform: "link",

    agentDefaults: {
        // widget-specific
        hostURL: "",
        platformID: "",
        showPlatformHeader: true,

        // iframe-specific
        iframeBaseURL: "",

        // custom script
        embedScriptURL: "",
    },

    // ── Support ────────────────────────────────────────────────
    support: {
        slackUrl: "",
        slackName: "#help-agents",
        email: "support@example.com",
    },

    // ── Productivity Calculator ────────────────────────────────
    calculator: {
        costPerUserPerYear: 500,
        costLabel: "Platform Annual Cost",
        costDescription: "Estimated annual platform cost per user. Adjust this value in config.js to match your vendor pricing.",
    },

    // ── Storage ────────────────────────────────────────────────
    // Prefix for localStorage / sessionStorage keys (avoid collisions
    // if multiple launchpads share the same domain).
    storagePrefix: "launchpad_",

    // ── Admin ──────────────────────────────────────────────────
    adminPassword: "demo",
};

// ── Theme Presets ──────────────────────────────────────────────

const THEME_PRESETS = {
    carbon: {
        primaryColor: "#0f62fe",
        primaryHover: "#0043ce",
        accentColor: "#4589ff",
        headerBg: "#161616",
        pageBg: "#f4f4f4",
        cardBg: "#ffffff",
        textPrimary: "#161616",
        textSecondary: "#525252",
        textHelper: "#6f6f6f",
        borderRadius: "0px",
        fontFamily: "'Inter', sans-serif",
        fontUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;600;700&display=swap",
    },
    modern: {
        primaryColor: "#6366f1",
        primaryHover: "#4f46e5",
        accentColor: "#818cf8",
        headerBg: "#1e1b4b",
        pageBg: "#f8fafc",
        cardBg: "#ffffff",
        textPrimary: "#0f172a",
        textSecondary: "#475569",
        textHelper: "#94a3b8",
        borderRadius: "8px",
        fontFamily: "'Inter', sans-serif",
        fontUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;600;700&display=swap",
    },
    minimal: {
        primaryColor: "#18181b",
        primaryHover: "#27272a",
        accentColor: "#71717a",
        headerBg: "#fafafa",
        pageBg: "#ffffff",
        cardBg: "#fafafa",
        textPrimary: "#09090b",
        textSecondary: "#3f3f46",
        textHelper: "#71717a",
        borderRadius: "6px",
        fontFamily: "'DM Sans', sans-serif",
        fontUrl: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@100;300;400;600;700&display=swap",
    },
};

// ── Theme Engine (auto-runs on load) ──────────────────────────

(function applyTheme() {
    var preset = SITE_CONFIG.themePreset;
    var theme = (preset === "custom")
        ? SITE_CONFIG.custom
        : (THEME_PRESETS[preset] || THEME_PRESETS.carbon);

    var root = document.documentElement;
    root.style.setProperty("--color-primary", theme.primaryColor);
    root.style.setProperty("--color-primary-hover", theme.primaryHover);
    root.style.setProperty("--color-accent", theme.accentColor);
    root.style.setProperty("--header-bg", theme.headerBg);
    root.style.setProperty("--bg-page", theme.pageBg);
    root.style.setProperty("--card-bg", theme.cardBg);
    root.style.setProperty("--text-primary", theme.textPrimary);
    root.style.setProperty("--text-secondary", theme.textSecondary);
    root.style.setProperty("--text-helper", theme.textHelper);
    root.style.setProperty("--radius", theme.borderRadius);
    root.style.setProperty("--font-family", theme.fontFamily);

    var headerIsLight = isLightColor(theme.headerBg);
    root.style.setProperty("--header-text", headerIsLight ? "#161616" : "#ffffff");
    root.style.setProperty("--header-divider", headerIsLight ? "#d4d4d4" : "#525252");

    if (theme.fontUrl) {
        var existing = document.querySelector('link[data-config-font]');
        if (existing) existing.remove();
        var link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = theme.fontUrl;
        link.setAttribute("data-config-font", "true");
        document.head.appendChild(link);
    }

    document.body.style.fontFamily = theme.fontFamily;
})();

function isLightColor(hex) {
    hex = hex.replace("#", "");
    if (hex.length === 3) hex = hex.split("").map(function(c) { return c + c; }).join("");
    var r = parseInt(hex.substr(0, 2), 16);
    var g = parseInt(hex.substr(2, 2), 16);
    var b = parseInt(hex.substr(4, 2), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 > 128;
}

// ── Dynamic Text Injection ────────────────────────────────────

document.addEventListener("DOMContentLoaded", function () {
    var bindings = {
        siteTitle: SITE_CONFIG.siteTitle,
        poweredBy: SITE_CONFIG.poweredByText,
        badgeText: SITE_CONFIG.badgeText,
        adminBadgeText: SITE_CONFIG.adminBadgeText,
        companyName: SITE_CONFIG.companyName,
        departmentName: SITE_CONFIG.departmentName,
        costLabel: SITE_CONFIG.calculator.costLabel,
    };

    Object.keys(bindings).forEach(function (key) {
        document.querySelectorAll("[data-bind='" + key + "']").forEach(function (el) {
            el.textContent = bindings[key];
        });
    });

    if (document.title.indexOf("{{") !== -1 || document.title === "") {
        document.title = SITE_CONFIG.siteTitle;
    }
});
