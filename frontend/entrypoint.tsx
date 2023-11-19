/**
 * Frontend entrypoint:
 * This module provides a default export that defines the UI that is created on the frontend
 * when a page is visited
 */

import { AuthIcon } from "auth";
import { Datex } from "unyt_core/datex.ts";
import { Entrypoint } from 'uix/html/entrypoints.ts';
import { AuthExample } from "backend/entrypoint.tsx";
const endpoint = Datex.Runtime.endpoint.main;
export default {
	'/frontend': async () => <main>
		<div class="header">
			Auth App <AuthIcon/>
		</div>
		<span>
			{ await endpoint.main.getAlias() }
			<br/>
			{ endpoint.main.toString() }
			<br/>
			{ await endpoint.main.getCertifier() ?? '-' }
			<br/>
			{ await endpoint.main.getProperty("name") ?? '-' }
		</span>
		<br/>
		<button onclick:frontend={async ()=>alert(await AuthExample.secretMethod())}>
			Click me!
		</button>
	</main>
} satisfies Entrypoint;