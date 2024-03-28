# UIX + unyt Auth Project

This repository provides a simple UIX setup, that explains how to use the [unyt Auth](https://auth.unyt.org) authentication system for your app.

*[UIX Docs](https://docs.unyt.org/manual/uix/getting-started)*

# Getting Started
To include [unyt Auth](https://auth.unyt.org) functionality into your UIX project, you can include one of the unyt Auth components from our CDN (AuthIcon.tsx or ButtonComponent.tsx).
```tsx
import { AuthIcon } from "auth/AuthIcon.tsx";
```
Include a instance of this component in your login page as shown in the following.
```tsx
export default
    <main>
        <AuthIcon/>
		...
    </main>
```
---

The same applies to the Auth Button component:

```tsx
import { AuthButton } from "auth/AuthButton.tsx";
export default
    <main>
        <AuthButton/>
		...
    </main>
```


# Project Structure

## Directories
The source code is split into two directories. 

The `backend` directory contains the backend logic that runs on [Deno](https://deno.com/).

The `frontend` directory contains the code for the frontend clients (running in the web browser).

The default export of the `backend/entrypoint.tsx` and `frontend/entrypoint.tsx` determine what content
gets displayed when visiting a page in the browser.

The `common` directory contains common modules that can be initialized both in the browser and in the deno backend - they can be imported from modules in the `backend` and `frontend` directory.

The directory names (`backend`, `frontend`, `common`) are important to tell UIX which code runs in which context. The default names can also be changed in the `app.dx` config file.

## app.dx

The `app.dx` configuration file is required for a UIX app to run. It needs to contain at least the app name.
The `app.dx` has to be placed next to the app directories (`frontend`, `backend` and `common`) in the default configuration.

---

<sub>&copy; unyt 2024 • [unyt.org](https://unyt.org)</sub>
