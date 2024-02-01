import { SSTConfig } from "sst";
import { StorageStack } from "./stacks/StorageStack";
import { ApiStack } from "./stacks/APIStack";

export default {
	config(_input) {
		return {
			name: "sst-tutorial",
			region: "ap-southeast-1",
		};
	},
	stacks(app) {
		app.stack(StorageStack).stack(ApiStack);
	},
} satisfies SSTConfig;
