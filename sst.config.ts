import { SSTConfig } from "sst";
import { StorageStack } from "./stacks/StorageStack";
import { ApiStack } from "./stacks/ApiStack";
import { AuthStack } from "./stacks/AuthStack";
import { FrontendStack } from "./stacks/FrontendStack";

export default {
	config(_input) {
		return {
			name: "sst-tutorial",
			region: "ap-southeast-1",
		};
	},
	stacks(app) {
		app
			.stack(StorageStack)
			.stack(ApiStack)
			.stack(AuthStack)
			.stack(FrontendStack);
	},
} satisfies SSTConfig;
