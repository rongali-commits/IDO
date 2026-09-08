CREATE TABLE `assistant_limits` (
	`bucket` text PRIMARY KEY NOT NULL,
	`count` integer NOT NULL,
	`expires_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `assistant_limits_expiry` ON `assistant_limits` (`expires_at`);