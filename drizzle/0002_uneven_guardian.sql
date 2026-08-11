ALTER TABLE `site_settings` ADD `heroFooterIndex` varchar(80) DEFAULT '01 / 06' NOT NULL;--> statement-breakpoint
ALTER TABLE `site_settings` ADD `heroFooterIndex` varchar(80) DEFAULT '01 / 06' NOT NULL;--> statement-breakpoint
ALTER TABLE `site_settings` ADD `heroFooterDescriptor` varchar(240) DEFAULT 'Radio + online media + event promotion' NOT NULL;--> statement-breakpoint
ALTER TABLE `site_settings` ADD `tickerItems` text;--> statement-breakpoint
UPDATE `site_settings` SET `tickerItems` = 'Broadcast|Documentary|Cultural memory|Open conversation|Events' WHERE `tickerItems` IS NULL;--> statement-breakpoint
ALTER TABLE `site_settings` MODIFY `tickerItems` text NOT NULL;--> statement-breakpoint
ALTER TABLE `site_settings` ADD `aboutRailLabel` varchar(160) DEFAULT 'About the signal' NOT NULL;--> statement-breakpoint
ALTER TABLE `site_settings` ADD `aboutCaptionLeft` varchar(240) DEFAULT 'Field recording / Addis Ababa' NOT NULL;--> statement-breakpoint
ALTER TABLE `site_settings` ADD `aboutCaptionRight` varchar(240) DEFAULT '03° 28'' N / 38° 44'' E' NOT NULL;--> statement-breakpoint
ALTER TABLE `site_settings` ADD `programsRailLabel` varchar(160) DEFAULT 'Programmes' NOT NULL;--> statement-breakpoint
ALTER TABLE `site_settings` ADD `audioImageLabel` varchar(160) DEFAULT 'Listen / 00:48' NOT NULL;--> statement-breakpoint
ALTER TABLE `site_settings` ADD `audioCaptionLabel` varchar(160) DEFAULT 'Latest signal' NOT NULL;--> statement-breakpoint
ALTER TABLE `site_settings` ADD `servicesRailLabel` varchar(160) DEFAULT 'What we make' NOT NULL;--> statement-breakpoint
ALTER TABLE `site_settings` ADD `eventImageLabel` varchar(200) DEFAULT 'Event promotion / Open room' NOT NULL;--> statement-breakpoint
ALTER TABLE `site_settings` ADD `journalRailLabel` varchar(160) DEFAULT 'Journal / field notes' NOT NULL;--> statement-breakpoint
ALTER TABLE `site_settings` ADD `contactRailLabel` varchar(160) DEFAULT 'Start a conversation' NOT NULL;--> statement-breakpoint
ALTER TABLE `site_settings` ADD `footerNavigateLabel` varchar(120) DEFAULT 'Navigate' NOT NULL;--> statement-breakpoint
ALTER TABLE `site_settings` ADD `footerFollowLabel` varchar(160) DEFAULT 'Follow the signal' NOT NULL;--> statement-breakpoint
ALTER TABLE `site_settings` ADD `footerBuiltLine` varchar(240) DEFAULT 'Built in Addis Ababa / Made to travel' NOT NULL;
