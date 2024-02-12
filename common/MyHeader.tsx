import { Component } from "uix/components/Component.ts";
import { AuthIcon } from "auth/AuthIcon.tsx";
import { Datex } from "unyt_core/datex.ts";

@template(function(this: MyHeader) {
	return <div data-align={this.options.align ?? "left"}>
		<span>MyLogo</span>
		<div>
			<a>MyLink 1</a>
			<a>MyLink 2</a>
			<a>MyLink 3</a>
			<a>MyLink 4</a>
		</div>
		<AuthIcon/>
	</div>
})
export class MyHeader extends Component<{align?: "left" | "right"}> {
	@frontend
	protected onDisplay(): void | Promise<void> {
		Datex.Supranet.connect();
	}
}