/**
 * Frontend entrypoint:
 * This module provides a default export that defines the UI that is created on the frontend
 * when a page is visited
 */
import { Datex } from "unyt_core/datex.ts";
import { Entrypoint } from 'uix/html/entrypoints.ts';
import { AuthExample } from "backend/entrypoint.tsx";
import { MyHeader } from "../common/MyHeader.tsx";
const endpoint = Datex.Runtime.endpoint.main;

export default {
	'/frontend': async () => <main>
		<MyHeader align={"right"}/>
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
		<button onclick:frontend={async ()=>await AuthExample.secretMethod().then(alert).catch(alert)}>
			Click me!
		</button>
	</main>
} satisfies Entrypoint;