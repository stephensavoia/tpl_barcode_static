# TPL Barcode Generator

TPL Barcode Generator is a tool that generates phone wallpapers that double as digital Toronto Public Library cards. A digital version of your library card can be useful if you want to lighten your wallet or avoid forgetting your physical card.

[tplbarcode.com](https://tplbarcode.com/)

## TPL Barcode Generator Process Flow Diagram

```mermaid

graph TD
    A[/User goes to<br/>tplbarcode.com/] --> B{Is the browser<br/>an in-app browser?}
    B -- Yes --> C[Show 'Open in main<br/>browser' link]
    B -- No --> D[Set up form elements/<br/>carousel and add button<br/>event listeners]

    D --> E[/User clicks 'Generate<br/>Barcode' button/]
    E --> F{Is the form<br/>data valid?}
    F -- No --> G[Show form validation<br/>error messages]
    G --> E
    F -- Yes --> H[Show download page]

    H --> I[/User clicks 'Download<br/>Wallpaper' button/]
    I --> J[Send browser to wallpaper<br/>image that can be<br/>downloaded by the user]

```

## TPL Barcode Generator Hosting Setup

<div style="text-align: center;">

```mermaid
sequenceDiagram
    participant User
    participant CDN

    User->>CDN: Request Webpage
    CDN-->>User: Return Webpage
```

</div>

All application logic is performed by the user's browser. This allows the app to be hosted for free on Cloudflare Pages.
