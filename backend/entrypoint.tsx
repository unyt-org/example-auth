/**
 * Backend entrypoint:
 * This module provides a default export that defines the UI that is returned from the backend
 * when a page is visited
 */

import { AuthIcon } from "auth";
import { Datex, f } from "unyt_core/datex.ts";
import { Entrypoint } from "uix/html/entrypoints.ts";
import { Blockchain } from "unyt_core/network/blockchain_adapter.ts";

/**
 * Since the main endpoint has created a signed
 * entry for the app endpoint we can do a reverse
 * lookup to get the main endpoint.
 */
const getMainEndpoint = async (endpoint: Datex.Endpoint) =>
	await Blockchain.getEndpointCertifier(endpoint.main);

/**
 * We could do all kind of permission logic here.
 * In this case we ensure that only the main 
 * endpoint @jonas1 is able to see our secret.
 */
const isAllowed = async (endpoint: Datex.Endpoint) =>
	await getMainEndpoint(endpoint) === f("@jonas1");

/**
 * We can expose some backend functionality
 * and handle permission logic in there.
 * `datex.meta.sender` will give us the
 * requesting endpoint.
 */
@endpoint
export class AuthExample {
	@property static async secretMethod() {
		if (await isAllowed(datex.meta.sender)) {
			console.info("Hello from authorized endpoint...")
			return 42;
		}
		throw "You are not authorized!";
	}
}

/**
 * We can get the current requesting endpoint
 * via `ctx.endpoint` property. We may decide
 * which information we want to display:
 *   ctx.endpoint -> @@C74479660D00000000F0C3EE19FC7A60/0005
 *   ctx.endpoint.main -> @@C74479660D00000000F0C3EE19FC7A60
 *   ctx.endpoint.main.getAlias() -> @John.Twitter
 *   ctx.endpoint.main.getProperty("name") -> John Snow
 */
export default {
	'/': async (ctx) => {
		const alias = await ctx.endpoint.main.getAlias();
		return <main>
			<div class="header">
				Auth App <AuthIcon/>
			</div>
			{
				await isAllowed(ctx.endpoint) ? 
					<span>Pssst <a>{alias}</a>, the secret is 42!</span> : 
					undefined
			}
		</main>
	}
} satisfies Entrypoint;