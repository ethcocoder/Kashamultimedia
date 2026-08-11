CREATE TABLE `events` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(220) NOT NULL,
	`description` text NOT NULL,
	`imageUrl` text NOT NULL,
	`ctaLabel` varchar(120) NOT NULL,
	`ctaTarget` varchar(240) NOT NULL,
	`sortOrder` int NOT NULL DEFAULT 0,
	`isPublished` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `events_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `inquiries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(180) NOT NULL,
	`email` varchar(320) NOT NULL,
	`brief` text NOT NULL,
	`status` enum('new','read','replied','archived') NOT NULL DEFAULT 'new',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `inquiries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `journal_entries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(260) NOT NULL,
	`category` varchar(100) NOT NULL,
	`dateLabel` varchar(120) NOT NULL,
	`body` text,
	`sortOrder` int NOT NULL DEFAULT 0,
	`isPublished` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `journal_entries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `media_assets` (
	`id` int AUTO_INCREMENT NOT NULL,
	`fileName` varchar(255) NOT NULL,
	`storageKey` text NOT NULL,
	`url` text NOT NULL,
	`altText` varchar(320) NOT NULL,
	`category` varchar(100) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `media_assets_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `programs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(180) NOT NULL,
	`subtitle` varchar(180) NOT NULL,
	`description` text NOT NULL,
	`tag` varchar(120) NOT NULL,
	`imageUrl` text,
	`featureTitle` varchar(240),
	`featureSubtitle` varchar(240),
	`sortOrder` int NOT NULL DEFAULT 0,
	`isPublished` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `programs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `services` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(180) NOT NULL,
	`description` text NOT NULL,
	`iconKey` varchar(64) NOT NULL,
	`sortOrder` int NOT NULL DEFAULT 0,
	`isPublished` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `services_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `site_settings` (
	`id` int NOT NULL,
	`siteName` varchar(160) NOT NULL,
	`brandLine` varchar(160) NOT NULL,
	`heroEyebrow` varchar(220) NOT NULL,
	`heroTitle` varchar(240) NOT NULL,
	`heroAccent` varchar(240) NOT NULL,
	`heroIntro` text NOT NULL,
	`heroCtaLabel` varchar(120) NOT NULL,
	`heroImageUrl` text NOT NULL,
	`heroAsideTitle` varchar(240) NOT NULL,
	`heroAsideBody` text NOT NULL,
	`aboutEyebrow` varchar(220) NOT NULL,
	`aboutTitle` varchar(240) NOT NULL,
	`aboutAccent` varchar(240) NOT NULL,
	`aboutBody` text NOT NULL,
	`aboutQuote` text NOT NULL,
	`aboutImageUrl` text NOT NULL,
	`programsEyebrow` varchar(220) NOT NULL,
	`programsTitle` varchar(240) NOT NULL,
	`programsAccent` varchar(240) NOT NULL,
	`programsSummary` text NOT NULL,
	`servicesEyebrow` varchar(220) NOT NULL,
	`servicesTitle` varchar(240) NOT NULL,
	`servicesAccent` varchar(240) NOT NULL,
	`servicesSummary` text NOT NULL,
	`eventEyebrow` varchar(220) NOT NULL,
	`eventTitle` varchar(240) NOT NULL,
	`eventAccent` varchar(240) NOT NULL,
	`eventBody` text NOT NULL,
	`eventCtaLabel` varchar(120) NOT NULL,
	`eventImageUrl` text NOT NULL,
	`journalEyebrow` varchar(220) NOT NULL,
	`journalTitle` varchar(240) NOT NULL,
	`journalAccent` varchar(240) NOT NULL,
	`contactEyebrow` varchar(220) NOT NULL,
	`contactTitle` varchar(240) NOT NULL,
	`contactAccent` varchar(240) NOT NULL,
	`contactBody` text NOT NULL,
	`contactEmail` varchar(320) NOT NULL,
	`contactLocation` varchar(320) NOT NULL,
	`instagramUrl` text NOT NULL,
	`youtubeUrl` text NOT NULL,
	`facebookUrl` text NOT NULL,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `site_settings_id` PRIMARY KEY(`id`)
);
