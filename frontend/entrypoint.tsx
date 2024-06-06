/**
 * Frontend entrypoint:
 * This module provides a default export that defines the UI that is created on the frontend
 * when a page is visited
 */
import { Datex } from "datex-core-legacy/datex.ts";
import { Entrypoint } from 'uix/html/entrypoints.ts';
import { AuthExample } from "backend/entrypoint.tsx";
import { MyHeader } from "../common/MyHeader.tsx";
import { AuthButton } from "auth/AuthButton.tsx";

const endpoint = Datex.Runtime.endpoint.main;
await Datex.Supranet.connect();

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
	</main>,
	
	/**
	 * Displays the auth button component
	 * on the /button route. You can modify
	 * appearance and shape via options.
	 */
	'/button': async () => {
		const alias = await endpoint.main.getAlias();
		return <main>
			<span>
				Hello {alias ?? "world"},<br/>
				this is an exemplary page.<br/>
			</span>
			<AuthButton appearance={"auto"} shape={"rect"}/>
		</main>
	}
} satisfies Entrypoint;